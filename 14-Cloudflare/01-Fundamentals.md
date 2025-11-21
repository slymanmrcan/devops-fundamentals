# Cloudflare Fundamentals

Cloudflare, internetin güvenliğini, performansını ve güvenilirliğini artıran devasa bir küresel ağdır. Bir "Reverse Proxy" (Ters Vekil) olarak çalışır; yani web sitenize gelen trafik önce Cloudflare sunucularına uğrar, temizlenir ve optimize edildikten sonra sizin sunucunuza iletilir.

---

## 1. Nasıl Çalışır? (Anycast Network)
Cloudflare, **Anycast** teknolojisini kullanır. Bu teknoloji sayesinde, dünyanın neresinde olursanız olun, size **fiziksel olarak en yakın** Cloudflare veri merkezine bağlanırsınız.

*   **Örnek:** Siteniz New York'taki bir sunucuda barınıyor olsun.
    *   İstanbul'daki bir ziyaretçi sitenize girdiğinde, istek New York'a gitmek yerine Cloudflare'in **İstanbul** sunucusuna gider.
    *   Eğer içerik önbellekte (cache) varsa, yanıt direkt İstanbul'dan döner (Milisaniyeler içinde!).
    *   Yoksa, Cloudflare New York'tan veriyi alır ve ziyaretçiye iletir.

---

## 2. Temel Avantajları

### 🛡️ Güvenlik
Sitenizi internetin "kötü mahallelerinden" korur.
*   **IP Gizleme:** Gerçek sunucu IP adresiniz gizlenir, saldırganlar doğrudan sunucunuza saldıramaz.
*   **DDoS Koruması:** Terabitler boyutundaki saldırıları bile emebilir.
*   **WAF:** Web sitenizi hacklemeye çalışan botları durdurur.

### 🚀 Performans
*   **CDN:** Statik dosyalarınız (resim, CSS, JS) dünya genelindeki 300+ veri merkezine dağıtılır.
*   **Optimizasyon:** Resimler sıkıştırılır, kodlar küçültülür (Minify).

### 💎 Güvenilirlik
*   **Always Online:** Sunucunuz çökse bile Cloudflare sitenizin önbelleğe alınmış bir kopyasını göstermeye devam edebilir.

---

## 3. Plan Karşılaştırması (Özet)

| Özellik | Free (Ücretsiz) | Pro ($20/ay) | Business ($200/ay) | Enterprise |
| :--- | :--- | :--- | :--- | :--- |
| **DDoS Koruması** | ✅ Sınırsız | ✅ Sınırsız | ✅ Sınırsız | ✅ Gelişmiş |
| **CDN** | ✅ Global | ✅ Global | ✅ Global | ✅ Öncelikli |
| **WAF** | ❌ (Kısıtlı) | ✅ Tam Özellik | ✅ Tam Özellik | ✅ Özelleştirilebilir |
| **Resim Opt.** | ❌ | ✅ (Lossless) | ✅ (Gelişmiş) | ✅ |
| **Destek** | Topluluk | E-posta | Chat (7/24) | Telefon/Özel |
| **SLA** | Yok | Yok | %100 Uptime | %100 Uptime (Tazminatlı) |

> **Öneri:** Kişisel projeler ve küçük işletmeler için **Free** plan fazlasıyla yeterlidir. E-ticaret ve kritik işler için **Pro** önerilir.
