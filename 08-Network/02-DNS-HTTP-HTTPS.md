# DNS, HTTP & HTTPS: Web Katmanı

## 1. DNS (Domain Name System)
"İnternetin Telefon Rehberi". İnsanların okuyabildiği isimleri (`google.com`) IP adreslerine (`142.250.1.1`) çevirir.

### Nasıl Çalışır (Basitleştirilmiş)
1.  **Tarayıcı**: Yerel önbelleği (cache) kontrol eder.
2.  **İşletim Sistemi**: `/etc/hosts` dosyasını kontrol eder.
3.  **Resolver**: İSS'nin (ISP) DNS sunucusuna sorar.
4.  **Root Server**: TLD sunucusuna yönlendirir (`.com`).
5.  **TLD Server**: Yetkili İsim Sunucusuna (Authoritative Name Server) yönlendirir (örn: AWS Route53).
6.  **Authoritative Server**: IP adresini döndürür.

### Yaygın Kayıt Türleri
- **A**: Hostname -> IPv4 (`1.2.3.4`).
- **AAAA**: Hostname -> IPv6.
- **CNAME**: Hostname -> Hostname (Takma Ad). *Kök domainde (@) kullanılamaz.*
- **MX**: Mail Exchange (E-posta).
- **TXT**: Metin notları (SPF, doğrulama).
- **NS**: Name Server (Bu bölgeyi kim yönetiyor?).

---

## 2. HTTP (HyperText Transfer Protocol)
Web'in protokolü. İstek/Yanıt (Request/Response) modeli.

### HTTP Metotları (Fiiller)
- **GET**: Veri getir. (Idempotent - Tekrarlanabilir).
- **POST**: Yeni veri oluştur.
- **PUT**: Veriyi güncelle/değiştir. (Idempotent).
- **PATCH**: Kısmi güncelleme.
- **DELETE**: Veriyi sil.

### HTTP Durum Kodları
- **2xx (Başarılı)**:
    - `200 OK`: Standart başarı.
    - `201 Created`: Kaynak oluşturuldu.
- **3xx (Yönlendirme)**:
    - `301 Moved Permanently`: SEO dostu kalıcı yönlendirme.
    - `302 Found`: Geçici yönlendirme.
- **4xx (İstemci Hatası)**:
    - `400 Bad Request`: Geçersiz sözdizimi.
    - `401 Unauthorized`: Kimlik doğrulama gerekli.
    - `403 Forbidden`: Kimlik doğrulandı ama yetki yok.
    - `404 Not Found`: Kaynak bulunamadı.
- **5xx (Sunucu Hatası)**:
    - `500 Internal Server Error`: Uygulama çöktü.
    - `502 Bad Gateway`: Üst sunucu (upstream) başarısız oldu (Nginx -> App).
    - `503 Service Unavailable`: Aşırı yüklenme veya bakım.
    - `504 Gateway Timeout`: Üst sunucu çok uzun sürdü.

---

## 3. HTTPS (Güvenli)
SSL/TLS üzerinden HTTP. Veriyi iletim sırasında şifreler.

### TLS El Sıkışma (Basitleştirilmiş)
1.  **Client Hello**: "Ben TLS 1.2/1.3 destekliyorum".
2.  **Server Hello**: "Hadi TLS 1.3 kullanalım. İşte Sertifikam."
3.  **Doğrulama (Verification)**: İstemci sertifikanın geçerli olup olmadığını kontrol eder (güvenilir CA tarafından verilmiş mi, süresi dolmuş mu).
4.  **Anahtar Değişimi (Key Exchange)**: Simetrik bir oturum anahtarı üzerinde anlaşırlar.
5.  **Güvenli Oturum**: Gelecekteki tüm veriler oturum anahtarı ile şifrelenir.

### Sertifikalar
- **CA (Certificate Authority)**: Güvenilir otorite (örn: Let's Encrypt, DigiCert).
- **Self-Signed**: Geliştirme için iyidir, tarayıcı uyarılarını tetikler.
- **Wildcard**: `*.ornek.com`, `api.ornek.com` ve `www.ornek.com` adreslerini kapsar.
