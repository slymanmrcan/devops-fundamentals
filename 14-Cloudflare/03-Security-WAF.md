# Güvenlik ve WAF (Web Application Firewall)

Cloudflare'in en güçlü yanı güvenlik özellikleridir. Sitenizi L3 (Network) ve L7 (Uygulama) katmanındaki saldırılara karşı korur.

---

## 1. WAF (Web Application Firewall)

WAF, web trafiğini analiz eder ve kötü niyetli istekleri sunucunuza ulaşmadan engeller.

### Managed Rules (Yönetilen Kurallar)
Cloudflare mühendisleri tarafından hazırlanan hazır kural setleridir.
*   **Cloudflare Specials:** Yaygın saldırıları engeller.
*   **OWASP Core Rules:** SQL Injection, XSS (Cross Site Scripting) gibi standart web açıklarını kapatır.
*   *Not: Free planda kısıtlıdır, Pro ve üzeri planlarda tam erişim vardır.*

### Custom Rules (Özel Kurallar)
Kendi güvenlik duvarı kurallarınızı yazabilirsiniz.
*   **Örnek:** "Eğer ziyaretçi `/admin` paneline girmeye çalışıyorsa VE IP adresi `Ofis IP`'si değilse -> **BLOCK**."
*   **Örnek:** "Eğer istek `Rusya` veya `Çin`'den geliyorsa -> **JS CHALLENGE** (Doğrulama) göster."

---

## 2. DDoS Koruması

Cloudflare, "Unmetered" (Ölçülmeyen) DDoS koruması sunar. Yani saldırı ne kadar büyük olursa olsun (100 Gbps+), faturanıza ek ücret yansımaz ve siteniz korunur.

### Under Attack Mode
Siteniz yoğun bir saldırı altındaysa bu modu açabilirsiniz.
*   **Ne Yapar?** Sitenize giren HERKESE 5 saniyelik bir "JavaScript Challenge" (Tarayıcı kontrolü) sayfası gösterir.
*   **Sonuç:** Botlar bu testi geçemez, sadece gerçek insanlar siteye girebilir.

---

## 3. Bot Fight Mode

İnternet trafiğinin büyük bir kısmı botlardan oluşur.
*   **Bot Fight Mode (Free):** Bilinen kötü amaçlı botları otomatik engeller.
*   **Super Bot Fight Mode (Pro):** Kesin botlar, muhtemel botlar ve doğrulanmış botlar (Googlebot) için ayrı aksiyonlar almanızı sağlar.

---

## 4. Rate Limiting (Hız Sınırlama)

Bir IP adresinin belirli bir süre içinde yapabileceği istek sayısını sınırlar.
*   **Amaç:** Brute-force (şifre deneme) saldırılarını ve API kötüye kullanımını engeller.
*   **Kural:** "Aynı IP, `/login` sayfasına 1 dakika içinde 5'ten fazla istek atarsa -> 1 saat engelle."

---

## 5. IP Access Rules (IP Erişim Kuralları)

En basit güvenlik katmanıdır. Belirli IP adreslerini, IP aralıklarını (CIDR) veya ülkeleri (ASN) engelleyebilir veya izin verebilirsiniz.
*   **Whitelist:** Sadece ofis IP'lerine izin ver.
*   **Blacklist:** Şüpheli bir IP bloğunu tamamen engelle.
