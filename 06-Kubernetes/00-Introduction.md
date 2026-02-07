# Kubernetes: İlk Bakışta Anla (Uygulama Odaklı)

Kubernetes (k8s), **container çalışan uygulamaları** otomatik olarak çalıştıran, ölçekleyen ve güncelleyen bir orkestrasyon platformudur. Kısaca: "Sunucularla değil, uygulamayla uğraş" prensibidir.

---

## 1. Kubernetes Ne İşe Yarar?

- Uygulama çökerse **yeniden başlatır** (self-healing).
- Trafik artınca **yeni pod açar** (auto-scaling).
- Sürüm güncellemesini **kesintisiz** yapar (rolling update).
- Servisleri **sabit bir DNS/IP** ile sunar.
- Konfigürasyon ve secret'ları **imajdan ayırır**.

---

## 2. En Temel Kavramlar (Özet)

- **Cluster**: Birden fazla makinenin (node) toplamı.
- **Control Plane**: Cluster'ı yöneten beyin (API server, scheduler, controller manager).
- **Node**: Uygulamanın koştuğu makine.
- **Namespace**: Mantıksal ortam ayırma (dev, test, prod gibi).
- **Pod**: Kubernetes'in en küçük çalıştırılabilir birimi (1+ container).
- **Deployment**: Pod'ları yönetir, ölçekler, günceller.
- **Service**: Pod'lara sabit erişim sağlar (IP/DNS).
- **Ingress**: HTTP/HTTPS trafiğini Service'lere yönlendirir.
- **ConfigMap / Secret**: Konfigürasyon ve gizli veriler.
- **Volume / PVC**: Kalıcı veri saklama.
- **StatefulSet**: Stateful uygulamalar (DB gibi) için.
- **HPA**: CPU/bellek bazlı otomatik ölçekleme.

---

## 3. Basit Akış: "Koddan Üretime"

1. Uygulamanı container imajına çevir (`Dockerfile`).
2. İmajı registry'ye push et.
3. Deployment ile pod'ları ayağa kaldır.
4. Service ile sabit IP/DNS ver.
5. Ingress ile dış dünyaya aç.
6. Güncelleme geldiğinde yeni imajla rollout yap.

---

## 4. İlk Uygulama: Basit Web Uygulaması

Aşağıdaki örnek şunları gösterir:
- ConfigMap ile içerik yönetimi
- Secret ile gizli değer
- Deployment + Service + Ingress

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: demo
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: web-config
  namespace: demo
  labels:
    app: web
    tier: frontend
data:
  index.html: |
    <h1>Merhaba Kubernetes!</h1>
    <p>Bu sayfa ConfigMap'ten geliyor.</p>
---
apiVersion: v1
kind: Secret
metadata:
  name: web-secret
  namespace: demo
stringData:
  API_KEY: super-secret
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx:1.25.4
        ports:
        - containerPort: 80
        env:
        - name: API_KEY
          valueFrom:
            secretKeyRef:
              name: web-secret
              key: API_KEY
        volumeMounts:
        - name: web-content
          mountPath: /usr/share/nginx/html
        resources:
          requests:
            cpu: "50m"
            memory: "64Mi"
          limits:
            cpu: "250m"
            memory: "256Mi"
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 3
          periodSeconds: 10
      volumes:
      - name: web-content
        configMap:
          name: web-config
---
apiVersion: v1
kind: Service
metadata:
  name: web
  namespace: demo
spec:
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
  namespace: demo
spec:
  rules:
  - host: demo.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web
            port:
              number: 80
```

Uygulamayı çalıştırmak için:
```bash
kubectl apply -f app.yaml
```

Kontrol komutları:
```bash
kubectl get pods -n demo
kubectl get svc -n demo
kubectl get ingress -n demo
kubectl describe deploy web -n demo
kubectl logs deploy/web -n demo
```

Notlar:
- Ingress çalışması için Ingress Controller kurulu olmalı.
- Lokal kullanımda `kubectl port-forward svc/web 8080:80 -n demo` ile test edebilirsin.

---

## 5. Güncelleme, Ölçekleme, Geri Alma

**Güncelleme** (yeni imaj):
```bash
kubectl set image deployment/web nginx=nginx:1.26.0 -n demo
kubectl rollout status deployment/web -n demo
```

**Ölçekleme**:
```bash
kubectl scale deployment/web --replicas=4 -n demo
```

**Rollback**:
```bash
kubectl rollout undo deployment/web -n demo
```

---

## 6. Ne Zaman Ne Kullanılır?

- **Deployment**: Web/API gibi stateless uygulamalar.
- **StatefulSet + PVC**: Veritabanı, queue gibi stateful işler.
- **DaemonSet**: Her node'da çalışan agent'lar (log, monitoring).
- **Job/CronJob**: Tek seferlik veya periyodik işler.

---

## 7. En Sık Hatalar ve Çözümler

- **Pod Pending**: Node'da kaynak yok ya da PVC bağlanamadı.
- **ImagePullBackOff**: İmaj adı yanlış veya registry erişimi yok.
- **CrashLoopBackOff**: Uygulama sürekli çöküyor (loglara bak).

Hızlı kontrol:
```bash
kubectl describe pod <pod-adi> -n demo
kubectl logs <pod-adi> -n demo
```

---

## 8. Kısaca Özet

Kubernetes, uygulamanın **kaç kopya çalışacağını**, **nasıl güncelleneceğini** ve **nasıl erişileceğini** senin yerine yönetir. Sen sadece **istenen durumu** tanımlarsın.
