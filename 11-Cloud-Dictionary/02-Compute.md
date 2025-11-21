# Bulut Sözlüğü: Hesaplama (Compute)

Hesaplama hizmetleri, uygulamanızın kodunu çalıştıran "beyin" kısmıdır.

## 1. Sanal Sunucular (Virtual Machines - VMs)
**AWS EC2, Azure VM, Google Compute Engine**

En temel yapı taşıdır. Bulut sağlayıcısının veri merkezindeki fiziksel bir sunucunun bir parçasını kiralarsınız.
- **Ne zaman kullanılır?** İşletim sistemi üzerinde tam kontrol istediğinizde (Windows/Linux ayarları, özel yazılımlar).
- **Örnek:** Geleneksel bir WordPress sitesi barındırmak veya eski (legacy) bir uygulamayı buluta taşımak.

## 2. Sunucusuz (Serverless)
**AWS Lambda, Azure Functions, Google Cloud Functions**

Sunucu yönetimiyle hiç uğraşmazsınız. Sadece kodunuzu yüklersiniz ve kodunuz çalıştığı süre kadar (milisaniye bazında) ödeme yaparsınız.
- **Ne zaman kullanılır?** Olay tabanlı işlerde (örn: bir resim yüklendiğinde onu küçültmek, veritabanına kayıt girildiğinde e-posta atmak).
- **Avantajı:** Sunucu boşta beklerken para ödemezsiniz.

## 3. Konteynerler & Kubernetes
**AWS EKS, Azure AKS, Google GKE**

Uygulamanızı ve tüm bağımlılıklarını (kütüphaneler vb.) bir kutuya (Docker Container) koyup çalıştırmaktır.
- **Container Runner (Fargate/Cloud Run):** Konteyneri verirsiniz, bulut çalıştırır. Sunucu yönetimi yoktur.
- **Kubernetes (K8s):** Yüzlerce veya binlerce konteyneri yönetmek için kullanılan orkestra şefidir. Karmaşıktır ama çok güçlüdür.

## 4. Otomatik Ölçeklendirme (Auto Scaling)
**AWS Auto Scaling, Azure VM Scale Sets**

Trafiğe göre sunucu sayısını otomatik artırıp azaltan sistemdir.
- **Senaryo:** Gündüz siteye çok kişi giriyor -> Sunucu sayısı 10'a çıkar. Gece kimse yok -> Sunucu sayısı 2'ye düşer.
- **Fayda:** Hem performans sağlar hem de boşuna para ödemenizi engeller.
