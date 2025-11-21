# Sorun Giderme Araçları: DevOps Alet Çantası

## 1. Bağlantı ve Erişilebilirlik

### `ping`
Bir host'un ulaşılabilir olup olmadığını kontrol eder (ICMP).
```bash
ping google.com
```
*Not: Birçok güvenlik duvarı ICMP'yi engeller, bu yüzden başarısız olması sunucunun kapalı olduğu anlamına gelmeyebilir.*

### `telnet` / `nc` (netcat)
Belirli bir **TCP Portunun** açık olup olmadığını kontrol eder.
```bash
nc -zv google.com 443
# Connection to google.com port 443 [tcp/https] succeeded!
```
*Not: "Connection Refused" veya Zaman Aşımı hatalarını ayıklamak için kritiktir.*

---

## 2. DNS Hata Ayıklama

### `nslookup` / `dig`
DNS kayıtlarını sorgular.
```bash
dig google.com A
dig google.com MX +short
```
*Not: DNS yayılma sorunlarından şüphelendiğinizde bunu kullanın.*

---

## 3. Yol ve Gecikme (Path & Latency)

### `traceroute`
Siz ve hedef arasındaki her bir durağı (router) gösterir.
```bash
traceroute google.com
```
*Not: Bağlantının NEREDE koptuğunu (İSS, Omurga veya Hedef) belirlemeye yardımcı olur.*

---

## 4. Dinlenen Portlar (Sunucu Üzerinde)

### `netstat` / `ss`
Sunucunuzun hangi portları dinlediğini görün.
```bash
ss -tulpn
# TCP/UDP, Dinleniyor, İşlem Adı, Sayısal portları gösterir
```
*Not: Uygulamanızın gerçekten başlayıp doğru porta bağlandığını doğrulamak için kullanın.*

### `lsof`
Açık Dosyaları (ve ağ soketlerini) listeler.
```bash
lsof -i :80
# 80 portunu hangi işlemin tuttuğunu gösterir
```

---

## 5. Veri İnceleme

### `curl`
HTTP için İsviçre çakısı.
```bash
curl -I https://example.com       # Sadece Başlıklar (Headers)
curl -v https://example.com       # Ayrıntılı (El sıkışma bilgisi)
curl -L https://example.com       # Yönlendirmeleri takip et
```

### `tcpdump`
Gerçek paketleri yakalar. İleri seviye hata ayıklama.
```bash
tcpdump -i eth0 port 80
```
*Not: Kablo üzerindeki ham veriyi görmeniz gerektiğinde kullanın.*
