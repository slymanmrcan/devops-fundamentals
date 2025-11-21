# Performans ve Caching (Önbellekleme)

Cloudflare, sitenizi hızlandırmak için içerikleri önbelleğe alır (Caching) ve dosyaları optimize eder. Doğru yapılandırma ile sunucu yükünüzü %70-80 oranında azaltabilirsiniz.

---

## 1. Caching Nasıl Çalışır?

Cloudflare varsayılan olarak sadece **statik** dosyaları (Resim, CSS, JS, PDF vb.) önbelleğe alır. HTML dosyalarını (dinamik içerik) önbelleğe ALMAZ.

### Caching Levels (Önbellek Seviyeleri)
*   **No Query String:** `style.css?v=1` ile `style.css?v=2` aynı dosya olarak kabul edilir.
*   **Ignore Query String:** Parametreler tamamen yok sayılır.
*   **Standard (Varsayılan):** Her farklı query string (`?id=1`, `?id=2`) ayrı bir dosya olarak saklanır.

### Browser TTL vs Edge TTL
*   **Browser Cache TTL:** Dosyanın ziyaretçinin tarayıcısında ne kadar süre saklanacağını belirler.
*   **Edge Cache TTL:** Dosyanın Cloudflare sunucularında ne kadar süre saklanacağını belirler (Page Rules ile ayarlanır).

---

## 2. Page Rules (Sayfa Kuralları)

Cloudflare'in en güçlü performans aracıdır. URL bazlı özel ayarlar yapmanızı sağlar. (Free planda 3 adet kural hakkınız vardır).

### Örnek Senaryolar:

#### Senaryo 1: WordPress Admin Panelini Korumak
*   **URL:** `example.com/wp-admin/*`
*   **Ayar:** Security Level: High, Cache Level: Bypass (Önbellekleme yapma), Disable Performance.

#### Senaryo 2: Tüm Siteyi Önbelleğe Almak (HTML Dahil)
*   **URL:** `example.com/*`
*   **Ayar:** Cache Level: **Cache Everything**, Edge Cache TTL: 2 hours.
*   *Dikkat: Bu ayar dinamik sitelerde (üyelik girişi olan vb.) sorun yaratabilir. Sadece statik bloglar veya landing page'ler için kullanın.*

---

## 3. Optimizasyon Araçları

### Auto Minify
HTML, CSS ve JavaScript dosyalarınızdaki gereksiz boşlukları, yorum satırlarını ve satır sonlarını silerek dosya boyutunu küçültür. Kodun çalışmasını bozmaz.
*   **Öneri:** Hepsini (HTML, CSS, JS) işaretleyin.

### Brotli
Gzip'ten daha verimli bir sıkıştırma algoritmasıdır. Metin tabanlı dosyaların (HTML, CSS, JS) boyutunu ciddi oranda düşürür.
*   **Öneri:** Açık tutun.

### Rocket Loader™
JavaScript dosyalarının yüklenmesini erteler (defer) ve asenkron olarak yükler.
*   **Fayda:** "First Contentful Paint" (İlk boyama) süresini iyileştirir.
*   **Risk:** Bazı karmaşık JS uygulamalarında (React, Vue) uyumsuzluk çıkarabilir. Test ederek açın.

### Image Optimization (Pro Plan)
*   **Polish:** Resimlerin kalitesini bozmadan meta verilerini silerek boyutunu küçültür.
*   **Mirage:** Mobil cihazlar için resim boyutlarını optimize eder ve lazy-load (sonradan yükleme) uygular.
