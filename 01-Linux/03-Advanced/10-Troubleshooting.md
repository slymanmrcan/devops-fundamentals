# 10 - Sorun Giderme (Troubleshooting)

Bir sistem yöneticisinin en önemli yeteneği, sorunları hızlıca teşhis edip çözmektir. İşte adım adım sorun giderme rehberi.

## 1. Sistem Yavaş mı? (Kaynak Kontrolü)

### CPU ve RAM
`htop` veya `top` komutunu çalıştırın.
*   **Load Average:** Sağ üstteki 3 sayı (1dk, 5dk, 15dk ortalaması). Eğer bu sayı CPU çekirdek sayısından büyükse sistem darboğazdadır.
*   **%CPU:** Hangi işlem işlemciyi sömürüyor?
*   **%MEM:** RAM doldu mu? Swap (takas alanı) kullanılıyor mu?

### Disk I/O
Disk okuma/yazma hızı yavaşlamış olabilir.
```bash
iostat -x 1   # 1 saniyede bir disk istatistiklerini göster
iotop         # Diski en çok kullanan işlemleri göster (sudo gerekir)
```

## 2. Disk Dolu mu?

"No space left on device" hatası alıyorsanız:

```bash
df -h          # Genel doluluk oranları
ncdu /         # Hangi klasörün yer kapladığını bulmak için en iyi araç
```

Bazen dosya silinse bile işlem dosyayı tuttuğu için yer açılmaz. Bunu bulmak için:
```bash
lsof +L1       # Silinmiş ama hala açık olan dosyaları listele
```

## 3. Ağ Bağlantısı Sorunları

### Bağlantı Var mı?
```bash
ping google.com       # İnternet var mı?
ping 192.168.1.50     # Sunucuya erişim var mı?
```

### Port Açık mı?
```bash
telnet google.com 80
# veya
nc -zv google.com 80
```

### Hangi Portlar Dinleniyor?
Sunucuda hangi servislerin çalıştığını görmek için:
```bash
sudo ss -tulpn
# -t: TCP, -u: UDP, -l: Listening, -p: Process name, -n: Numeric
```

## 4. Servis Çalışıyor mu?

```bash
systemctl status nginx
journalctl -u nginx -xe   # Servisin son loglarını ve hata detaylarını göster
```

## 5. Logları İnceleyin

Sorunun kaynağı %90 loglardadır.

```bash
tail -f /var/log/syslog        # Genel sistem hataları
tail -f /var/log/auth.log      # Yetki/Giriş hataları
tail -f /var/log/nginx/error.log # Web sunucusu hataları
dmesg | tail                   # Kernel ve donanım hataları
```

## Özet Kontrol Listesi
1.  Sistem kaynakları (CPU/RAM) dolu mu? (`htop`)
2.  Disk dolu mu? (`df -h`)
3.  Servis çalışıyor mu? (`systemctl status`)
4.  Port açık mı? (`ss -tulpn`)
5.  Loglarda ne yazıyor? (`tail -f /var/log/...`)
