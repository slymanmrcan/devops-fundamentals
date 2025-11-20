# 03 - Ağ İşlemleri (Networking)

Linux sunucuların kalbidir ve ağ yönetimi kritik bir beceridir.

## IP Adresini Öğrenme

### `ip`
Modern araç.
```bash
ip addr show   # IP adreslerini göster (kısaca: ip a)
ip link show   # Ağ arayüzlerini göster
```

### `ifconfig`
Eski ama hala yaygın araç (`net-tools` paketiyle gelir).
```bash
ifconfig
```

## Bağlantı Testi

### `ping`
Bir sunucunun ulaşılabilir olup olmadığını test eder.
```bash
ping google.com
ping -c 4 google.com  # Sadece 4 paket gönder ve dur
```

## Portları ve Bağlantıları İzleme

### `netstat` ve `ss`
Hangi portların dinlendiğini veya hangi bağlantıların açık olduğunu gösterir.
```bash
ss -tuln      # TCP (t), UDP (u), Listening (l), Numeric (n) portları göster
netstat -tuln # (Benzer çıktı verir)
```

## DNS Sorgulama

### `nslookup` ve `dig`
Alan adı çözünürlüğünü test eder.
```bash
nslookup google.com
dig google.com
```

## Dosya İndirme

### `curl` ve `wget`
Terminalden dosya indirmek veya API isteği atmak için kullanılır.

```bash
wget https://ornek.com/dosya.zip           # Dosyayı indir
curl https://ornek.com                     # Sayfa kaynağını ekrana bas
curl -O https://ornek.com/dosya.zip        # Dosyayı indir (Orijinal ismiyle)
curl -I https://google.com                 # Sadece başlıkları (headers) getir
```

## Uzaktan Bağlantı: `ssh`

Başka bir Linux sunucuya bağlanmak için kullanılır.
```bash
ssh kullanici@192.168.1.50
ssh -p 2222 kullanici@sunucu.com   # Farklı bir porttan bağlan
```
