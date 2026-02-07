# Helm (Package Manager)

Helm, Kubernetes için bir paket yöneticisidir (apt, yum veya npm gibi). Karmaşık Kubernetes uygulamalarını tanımlamanıza, kurmanıza ve yükseltmenize yardımcı olur.

---

## 1. Temel Kavramlar

- **Chart**: Helm paketidir. Kubernetes YAML şablonlarını içerir.
- **Release**: Bir Chart'ın cluster üzerinde çalışan bir örneğidir.
- **Repository**: Chart'ların saklandığı depodur.
- **Values**: Chart'ın değişken değerleri (`values.yaml`).

---

## 2. Kurulum

```bash
brew install helm
```

---

## 3. Chart Yapısı

```text
mychart/
  Chart.yaml
  values.yaml
  templates/
  charts/
```

- **`Chart.yaml`**: Metadata ve versiyon.
- **`values.yaml`**: Varsayılan konfigürasyon.
- **`templates/`**: Kubernetes YAML şablonları.
- **`charts/`**: Bağımlı chart'lar.

---

## 4. Kullanım

### Repo Ekleme
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

### Chart Arama
```bash
helm search repo nginx
```

### Uygulama Kurma (Install)
```bash
helm install my-nginx bitnami/nginx
```

### Yükseltme (Upgrade)
```bash
# values.yaml dosyasını değiştirip güncelleme
helm upgrade my-nginx bitnami/nginx -f values.yaml
```

### Kur ve Yükselt (Tek Komut)
```bash
helm upgrade --install my-nginx bitnami/nginx -f values.yaml
```

### Kaldırma (Uninstall)
```bash
helm uninstall my-nginx
```

---

## 5. Values Yönetimi

- **Öncelik sırası**: `values.yaml` < `-f custom.yaml` < `--set key=val`
- String değerler için `--set-string` kullanın.

Örnek:
```bash
helm upgrade my-nginx bitnami/nginx \
  -f values.yaml \
  --set replicaCount=3 \
  --set-string image.tag=1.25.4
```

---

## 6. Faydalı Komutlar

```bash
helm lint mychart
helm template mychart
helm install mychart --dry-run --debug
helm status my-nginx
helm history my-nginx
helm rollback my-nginx 2
```

---

## 7. Bağımlılıklar (Dependencies)

`Chart.yaml` içinde bağımlılık tanımlanır:
```yaml
dependencies:
  - name: redis
    version: "19.0.0"
    repository: "https://charts.bitnami.com/bitnami"
```

Bağımlılıkları çekmek için:
```bash
helm dependency update
```

---

## 8. Operasyon İpuçları

- **`--atomic`**: Hata olursa otomatik rollback.
- **`--wait --timeout`**: Pod'lar hazır olana kadar bekler.
- Büyük değişikliklerde önce `helm template` ile çıktıyı gözden geçirin.
