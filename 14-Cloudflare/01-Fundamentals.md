# Cloudflare Fundamentals

Cloudflare, internet güvenliği, performansı ve güvenilirliği sağlayan küresel bir ağdır (CDN - Content Delivery Network). Web sitenizi kötü niyetli trafikten korur, statik içerikleri önbelleğe alarak hızlandırır ve DNS yönetimini üstlenir.

---

## 1. Temel Özellikler

### 🛡️ Güvenlik (Security)
*   **DDoS Koruması:** Sitenize gelen saldırıları (Distributed Denial of Service) otomatik olarak engeller.
*   **WAF (Web Application Firewall):** SQL Injection, XSS gibi yaygın web saldırılarını durdurur.
*   **SSL/TLS:** Siteniz için ücretsiz SSL sertifikası sağlar ve trafiği şifreler.
*   **Bot Management:** Kötü niyetli botları ve örümcekleri engeller.

### 🚀 Performans (Performance)
*   **CDN (Content Delivery Network):** Resim, CSS, JS gibi dosyaları dünya genelindeki sunucularında (Edge Locations) saklar. Kullanıcıya en yakın sunucudan yanıt vererek siteyi hızlandırır.
*   **Caching:** Dinamik olmayan içerikleri önbelleğe alır.
*   **Image Optimization:** Resimleri otomatik olarak sıkıştırır ve WebP formatına dönüştürür (Pro özellik).

### 🌐 DNS Yönetimi
Cloudflare, dünyanın en hızlı DNS sağlayıcılarından biridir (1.1.1.1).
*   **Proxy (Turuncu Bulut ☁️):** Trafik Cloudflare üzerinden geçer. Güvenlik ve CDN aktiftir. IP adresiniz gizlenir.
*   **DNS Only (Gri Bulut ☁️):** Trafik doğrudan sunucunuza gider. Cloudflare sadece isim çözümlemesi yapar. Güvenlik ve CDN devre dışıdır.

---

## 2. Cloudflare Teknolojileri

### Workers
Sunucuya ihtiyaç duymadan (Serverless) JavaScript, Rust veya C++ kodlarını Cloudflare'in Edge ağında çalıştırmanızı sağlar.
*   **Kullanım:** HTTP isteklerini değiştirme, yönlendirme, basit API'ler.

### Zero Trust (Cloudflare Access)
VPN kullanmadan, şirket içi uygulamalarınıza güvenli erişim sağlar. Kullanıcıları kimlik sağlayıcılar (Google, GitHub, Okta) ile doğrular.

### Pages
Statik sitelerinizi (React, Vue, Hugo, vb.) doğrudan Git reponuzdan (GitHub/GitLab) alıp build eder ve yayınlar. (Netlify/Vercel alternatifi).

### R2
AWS S3 alternatifi nesne depolama (Object Storage). En büyük avantajı **Egress (veri çıkış) ücreti olmamasıdır**.

---

## 3. Alternatifler

| Özellik | Cloudflare | AWS Alternatifi | Diğer Alternatifler |
| :--- | :--- | :--- | :--- |
| **CDN** | Cloudflare CDN | Amazon CloudFront | Akamai, Fastly |
| **DNS** | Cloudflare DNS | Amazon Route 53 | Google Cloud DNS, NS1 |
| **WAF** | Cloudflare WAF | AWS WAF | Imperva |
| **DDoS** | Unmetered DDoS Protection | AWS Shield | Akamai |
| **Serverless** | Workers | Lambda @ Edge | Vercel Edge Functions |
| **Storage** | R2 | S3 | Backblaze B2 |

---

## 4. Sıkça Sorulan Sorular (SSS)

**S: Cloudflare kullanırsam sitemin IP adresi değişir mi?**
C: Evet, eğer "Proxy" (Turuncu Bulut) modunu kullanırsanız, ziyaretçiler sitenizin gerçek IP'sini değil, Cloudflare IP'lerini görür. Bu bir güvenlik önlemidir.

**S: Nameserver (NS) değişikliği zorunlu mu?**
C: Genellikle evet. Alan adınızın yönetimini Cloudflare'e devretmek için NS kayıtlarını Cloudflare'e yönlendirmeniz gerekir.

**S: Ücretsiz plan yeterli mi?**
C: Kişisel siteler, bloglar ve küçük işletmeler için ücretsiz plan (Free Tier) fazlasıyla yeterlidir. DDoS koruması, CDN ve SSL ücretsizdir.
