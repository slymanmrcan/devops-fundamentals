# Helm (Package Manager)

Helm, Kubernetes için bir paket yöneticisidir (apt, yum veya npm gibi). Karmaşık Kubernetes uygulamalarını tanımlamanıza, kurmanıza ve yükseltmenize yardımcı olur.

## 1. Temel Kavramlar
*   **Chart:** Helm paketidir. Kubernetes kaynak tanımlarını (YAML) içerir.
*   **Release:** Bir Chart'ın cluster üzerinde çalışan bir örneğidir.
*   **Repository:** Chart'ların saklandığı depodur.

## 2. Kurulum

```bash
brew install helm
```

## 3. Kullanım

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

### Kaldırma (Uninstall)
```bash
helm uninstall my-nginx
```

## 4. Kendi Chart'ını Oluşturma
```bash
helm create mychart
```
Bu komut standart bir klasör yapısı oluşturur:
*   `Chart.yaml`: Metadata
*   `values.yaml`: Varsayılan değişkenler
*   `templates/`: YAML şablonları
