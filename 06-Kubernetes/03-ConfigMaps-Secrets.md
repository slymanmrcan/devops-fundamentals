# ConfigMaps & Secrets

Uygulama konfigürasyonlarını container imajından ayırmak için kullanılır. Bu sayede imajı değiştirmeden konfigürasyonu değiştirebilirsiniz (12-Factor App prensibi).

---

## 1. ConfigMap
Hassas olmayan veriler için kullanılır (örn: veritabanı hostu, log seviyesi).

### YAML ile Oluşturma
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: "localhost"
  LOG_LEVEL: "info"
```

### Komutla Oluşturma
```bash
kubectl create configmap app-config \
  --from-literal=DB_HOST=localhost \
  --from-literal=LOG_LEVEL=info
```

### Pod İçinde Kullanım (Env)
```yaml
envFrom:
  - configMapRef:
      name: app-config
```

### Pod İçinde Kullanım (Volume)
```yaml
volumes:
  - name: config
    configMap:
      name: app-config
containers:
  - name: api
    volumeMounts:
      - name: config
        mountPath: /etc/app/config
```

---

## 2. ConfigMap Güncelleme Davranışı

- **Env ile bağlandıysa**, mevcut Pod'lar güncellenmez. Yeni Pod'lar yeni değerleri alır.
- **Volume ile bağlandıysa**, Kubelet belirli aralıklarla dosyaları güncelleyebilir.
- **`subPath` ile bağlandıysa**, dosya güncellenmez (Pod restart gerekir).

Yaygın yöntem: ConfigMap değişince deployment'a restart yaptırmak.
```bash
kubectl rollout restart deployment/my-app
```

---

## 3. Secret
Hassas veriler için kullanılır (örn: şifreler, API anahtarları). Base64 ile encode edilir, bu şifreleme değildir. etcd'de **encryption at rest** önerilir.

### YAML ile Oluşturma (stringData ile)
`stringData` kullanırsanız base64 gerekmez.
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
stringData:
  DB_PASSWORD: s3cr3t
```

### Pod İçinde Kullanım (Env)
```yaml
env:
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: app-secret
        key: DB_PASSWORD
```

### Pod İçinde Kullanım (Volume)
```yaml
volumes:
  - name: secret
    secret:
      secretName: app-secret
containers:
  - name: api
    volumeMounts:
      - name: secret
        mountPath: /etc/app/secret
        readOnly: true
```

---

## 4. Secret Tipleri (Örnekler)

- **Opaque**: Genel amaçlı secret.
- **`kubernetes.io/tls`**: TLS sertifikası için (`tls.crt`, `tls.key`).
- **`kubernetes.io/dockerconfigjson`**: Private registry için `imagePullSecrets`.

Örnek TLS Secret:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-tls
type: kubernetes.io/tls
stringData:
  tls.crt: |-
    -----BEGIN CERTIFICATE-----
    ...
  tls.key: |-
    -----BEGIN PRIVATE KEY-----
    ...
```

---

## 5. Güvenlik ve İyi Pratikler

- Secret'ları Git'e koyma.
- RBAC ile secret erişimini minimumda tut.
- etcd encryption at rest aktif et.
- CI/CD pipeline'da secret'ları environment variable veya secret manager üzerinden taşı.
- Uygulama loglarında secret sızıntısı riskine dikkat et.

---

## 6. Immutable ConfigMap/Secret

Sık değişmeyen config'ler için **immutable** yapmak performansı artırır ve yanlış değişiklikleri engeller.
```yaml
immutable: true
```
