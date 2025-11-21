# Kubernetes Deployments: Stateless Uygulamalar İçin Standart

## 1. Giriş
**Deployment**, stateless (durumsuz) uygulamaları yönetmek için kullanılan standart Kubernetes nesnesidir. Pod'lar ve ReplicaSet'ler için bildirimsel (declarative) güncellemeler sağlar.

Deployment içinde *istenen durumu (desired state)* tanımlarsınız ve Deployment Controller, mevcut durumu kontrollü bir hızda istenen duruma getirir.

### Neden Sadece Pod Kullanmıyoruz?
- **Pod'lar geçicidir (ephemeral)**: Bir node ölürse, Pod da ölür.
- **ReplicaSet'ler**, belirli sayıda pod'un çalışmasını sağlar ancak güncellemeleri (yeni sürümleri yaymayı) yönetmez.
- **Deployment'lar**, rollout (yayılım) ve rollback (geri alma) işlemlerini yönetmek için ReplicaSet'leri kullanır.

---

## 2. İç Mekanikler: Nasıl Çalışır?
Bir Deployment oluşturduğunuzda, aşağıdaki olay zinciri gerçekleşir:

1.  **Deployment Oluşturulur**: YAML'ı API Sunucusuna gönderirsiniz.
2.  **Controller Manager**: Deployment Controller yeni nesneyi fark eder.
3.  **ReplicaSet Oluşturma**: Deployment, belirli bir hash etiketiyle (örn: `pod-template-hash`) bir **ReplicaSet** (RS) oluşturur.
4.  **Pod Oluşturma**: ReplicaSet, istenen sayıda **Pod** oluşturur.

### Uzlaştırma Döngüsü (Reconcile Loop)
Kubernetes her zaman "uzlaştırma" (İstenen vs. Mevcut durumu karşılaştırma) yapar.
- **İstenen**: "Nginx v1.14'ten 3 kopya istiyorum"
- **Mevcut**: "0 kopya var"
- **Eylem**: 3 Pod oluştur.

Bir imajı güncellediğinizde (v1.14 -> v1.15):
1.  Deployment, v1.15 için **YENİ** bir ReplicaSet oluşturur.
2.  Yeni RS'i ölçeklendirir (**UP**) ve eski RS'i kademeli olarak küçültür (**DOWN**) (RollingUpdate).

---

## 3. YAML Analizi
Prodüksiyon seviyesinde bir Deployment YAML örneği.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-api
  labels:
    app: backend
    tier: api
spec:
  replicas: 3
  revisionHistoryLimit: 10 # Geri alma için 10 eski ReplicaSet sakla
  selector:
    matchLabels:
      app: backend # template.metadata.labels ile EŞLEŞMELİDİR
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1 # Güncelleme sırasında kapalı olabilecek max pod
      maxSurge: 1       # Güncelleme sırasında fazladan açılabilecek max pod
  template: # Pod Şablonu
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: api-container
        image: my-registry/backend:v2.0.1
        ports:
        - containerPort: 8080
        resources: # HER ZAMAN kaynakları tanımlayın
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
        livenessProbe: # Ölürse yeniden başlat
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
        readinessProbe: # Hazır değilse Servis endpoint'lerinden çıkar
          httpGet:
            path: /ready
            port: 8080
```

### Önemli Alanlar
- **`spec.selector`**: Bu Deployment'ın hangi Pod'ları yöneteceğini belirler. Oluşturulduktan sonra **değiştirilemez (Immutable)**.
- **`spec.strategy`**: Güncellemelerin nasıl yapılacağını kontrol eder (Sıfır kesinti için kritiktir).
- **`spec.template`**: Pod'ların şablonudur. Buradaki herhangi bir değişiklik bir rollout tetikler.

---

## 4. Dağıtım Stratejileri (Deployment Strategies)

### A. Rolling Update (Varsayılan & Önerilen)
Eski podları kademeli olarak yenileriyle değiştirir.
- **En iyisi**: Stateless uygulamalar, sıfır kesinti gereksinimleri.
- **Artıları**: Kesinti yok.
- **Eksileri**: Uygulama, yayılım sırasında iki versiyonun aynı anda çalışmasını desteklemelidir.

### B. Recreate
TÜM eski podları öldürür, sonra TÜM yeni podları başlatır.
- **En iyisi**: Dev ortamları veya aynı anda birden fazla sürümün çalışamayacağı uygulamalar (örn: veritabanı şema çakışmaları).
- **Artıları**: Basit, temiz durum.
- **Eksileri**: Öldürme ve başlatma arasında **Kesinti (Downtime)** oluşur.

### C. Canary (İleri Seviye)
Yeni bir sürümü tam yayılımdan önce küçük bir kullanıcı alt kümesine sunmak.
- **Native K8s**: Tam olarak bir "strateji" alanı değildir, ancak **aynı Servis** arkasında **iki Deployment** (biri `stable`, biri `canary`) oluşturarak elde edilir.
- **Otomatik**: **Argo Rollouts** veya **Flagger** gibi araçlar gerçek trafik bölmeli canary dağıtımları sağlar.

---

## 5. Ölçeklendirme (Scaling)

### Manuel Ölçeklendirme
Emir kipi komutu (acil durumlar için iyidir):
```bash
kubectl scale deployment/backend-api --replicas=5
```

### Horizontal Pod Autoscaler (HPA)
Prodüksiyon yöntemi. CPU/Bellek metriklerine göre ölçeklenir.
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70 # Ort. CPU > %70 ise büyüt
```

---

## 6. Sorun Giderme & Operasyonlar

### Yaygın Komutlar

| İşlem | Komut |
| :--- | :--- |
| **Durumu Kontrol Et** | `kubectl rollout status deployment/my-app` |
| **Geçmişi Gör** | `kubectl rollout history deployment/my-app` |
| **Geri Al (Undo)** | `kubectl rollout undo deployment/my-app` |
| **Belirli Sürüme Dön**| `kubectl rollout undo deployment/my-app --to-revision=2` |
| **Podları Yeniden Başlat** | `kubectl rollout restart deployment/my-app` (Config güncellemeleri için yararlı) |

### "Pending" veya "CrashLoopBackOff" Hata Ayıklama
1.  **Deployment'ı Tanımla (Describe)**: Controller hatalarını kontrol edin (örn: kota aşımı).
    ```bash
    kubectl describe deployment my-app
    ```
2.  **Pod'u Tanımla**: Olayları (events) kontrol edin (zamanlama hataları, imaj çekme hataları).
    ```bash
    kubectl describe pod my-app-xyz
    ```
3.  **Loglar**: Uygulama loglarını kontrol edin.
    ```bash
    kubectl logs my-app-xyz --previous # Neden çöktüğünü kontrol et
    ```

---

## 7. Gerçek DevOps Senaryoları

### Senaryo 1: Sıfır Kesintili Config Güncellemesi
**Durum**: Bir ortam değişkenini veya `ConfigMap`i güncellemeniz gerekiyor.
**Çözüm**:
1. ConfigMap'i güncelleyin.
2. Pod'lar otomatik olarak yeniden yüklenmez.
3. `kubectl rollout restart deployment/my-app` çalıştırın.
4. K8s, yeni config ile yeni podlar oluşturarak bir RollingUpdate gerçekleştirir.

### Senaryo 2: Trafik Ani Artışlarını Yönetme
**Durum**: Black Friday trafiği.
**Çözüm**:
- **Ön Ölçeklendirme (Pre-scaling)**: HPA tepki süresi çok yavaşsa etkinlikten önce manuel olarak ölçeklendirin.
- **HPA**: HPA `maxReplicas` değerinin yeterince yüksek olduğundan emin olun.

### Senaryo 3: "Kötü İmaj" Geri Alma (Rollback)
**Durum**: `v2.0` sürümünü dağıttınız ancak kritik bir hatası var.
**Eylem**:
```bash
kubectl rollout undo deployment/backend-api
```
**Sonuç**: K8s, yeni ReplicaSet'i büyütmeyi hemen durdurur ve eski (kararlı) ReplicaSet'i tekrar büyütür.
