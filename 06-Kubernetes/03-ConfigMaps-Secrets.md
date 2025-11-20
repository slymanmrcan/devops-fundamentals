# ConfigMaps & Secrets

Uygulama konfigürasyonlarını container imajından ayırmak için kullanılır. Bu sayede imajı değiştirmeden konfigürasyonu değiştirebilirsiniz (12-Factor App prensibi).

## 1. ConfigMap
Hassas olmayan veriler için (örn: veritabanı hostu, log seviyesi).

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: "localhost"
  LOG_LEVEL: "info"
```

**Pod İçinde Kullanım:**
```yaml
envFrom:
  - configMapRef:
      name: app-config
```

## 2. Secret
Hassas veriler için (örn: şifreler, API anahtarları). Base64 ile encode edilir (ancak şifrelenmiş değildir, etcd'de şifreli saklanması önerilir).

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  # echo -n "s3cr3t" | base64
  DB_PASSWORD: czNjcjN0
```

**Pod İçinde Kullanım:**
```yaml
env:
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: app-secret
        key: DB_PASSWORD
```
