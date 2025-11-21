# DNS & SSL/TLS Yönetimi

Cloudflare'in en kritik iki fonksiyonu DNS yönetimi ve SSL şifrelemesidir. Bu ayarların yanlış yapılması sitenizin erişilemez olmasına neden olabilir.

---

## 1. DNS Yönetimi

Cloudflare, dünyanın en hızlı DNS sağlayıcılarından biridir (1.1.1.1 altyapısı). Alan adınızın NS (Nameserver) kayıtlarını Cloudflare'e yönlendirdiğinizde, tüm trafik kontrolü Cloudflare'e geçer.

### Proxy Modları (Bulut Simgeleri)

DNS kayıtlarını eklerken iki seçenek görürsünüz:

#### 🟠 Proxied (Turuncu Bulut)
*   **Durum:** Trafik Cloudflare üzerinden geçer.
*   **Özellikler:** CDN, WAF, DDoS koruması, SSL **AKTİFTİR**.
*   **IP:** Ziyaretçiler Cloudflare IP'lerini görür. Gerçek sunucu IP'niz gizlidir.
*   **Kullanım:** Web siteniz (A, CNAME kayıtları) için bunu kullanın.

#### 🔘 DNS Only (Gri Bulut)
*   **Durum:** Trafik doğrudan sunucunuza gider (Cloudflare bypass edilir).
*   **Özellikler:** CDN ve Güvenlik **KAPALIDIR**. Sadece isim çözümlemesi yapılır.
*   **IP:** Ziyaretçiler gerçek sunucu IP'nizi görür.
*   **Kullanım:** FTP, SSH, Mail sunucuları veya Cloudflare ile uyumsuz özel servisler için kullanın.

---

## 2. SSL/TLS Modları (Kritik!)

"SSL/TLS" menüsünde 4 farklı şifreleme modu bulunur. Yanlış seçim **"Too Many Redirects"** hatasına yol açar.

### 1. Off (Kapalı)
*   Şifreleme yok. Siteniz sadece HTTP üzerinden çalışır.
*   **Öneri:** Asla kullanmayın.

### 2. Flexible (Esnek)
*   **Ziyaretçi <-> Cloudflare:** Şifreli (HTTPS).
*   **Cloudflare <-> Sunucunuz:** Şifresiz (HTTP).
*   **Kullanım:** Sunucunuzda SSL sertifikası kurulu **DEĞİLSE** bunu seçin.
*   **Risk:** Cloudflare ile sunucunuz arasındaki trafik dinlenebilir.

### 3. Full
*   **Ziyaretçi <-> Cloudflare:** Şifreli (HTTPS).
*   **Cloudflare <-> Sunucunuz:** Şifreli (HTTPS).
*   **Kullanım:** Sunucunuzda bir SSL sertifikası (Self-signed veya süresi dolmuş olabilir) varsa bunu seçin.
*   **Öneri:** En yaygın kullanılan güvenli moddur.

### 4. Full (Strict)
*   **Ziyaretçi <-> Cloudflare:** Şifreli (HTTPS).
*   **Cloudflare <-> Sunucunuz:** Şifreli (HTTPS).
*   **Fark:** Sunucunuzdaki sertifikanın **geçerli ve güvenilir** (Let's Encrypt, Cloudflare Origin CA vb.) olmasını zorunlu kılar.
*   **Öneri:** Maksimum güvenlik için bunu kullanın.

> **⚠️ Sık Yapılan Hata:** Sunucunuzda SSL varken (örneğin Nginx 443 portu açık ve redirect var), Cloudflare'de **Flexible** seçerseniz sonsuz yönlendirme döngüsü (Redirect Loop) oluşur. Sunucuda SSL varsa **Full** veya **Full (Strict)** seçmelisiniz.

---

## 3. Edge Certificates

Cloudflare, siteniz için ücretsiz SSL sertifikaları sağlar.
*   **Universal SSL:** Otomatik olarak oluşturulur ve tüm modern tarayıcılarla uyumludur.
*   **Always Use HTTPS:** Bu ayarı açarak tüm HTTP isteklerini otomatik olarak HTTPS'e yönlendirebilirsiniz (Tavsiye edilir).
*   **HSTS:** Tarayıcıların sitenize sadece HTTPS ile bağlanmasını zorunlu kılar (Gelişmiş güvenlik).
