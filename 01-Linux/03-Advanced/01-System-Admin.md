# 01 - Sistem Yönetimi (System Administration)

İleri seviye Linux kullanımı, sistemi ayakta tutmak ve yönetmekle ilgilidir.

## Disk Yönetimi

### Disk Kullanımı
```bash
df -h       # Disk doluluk oranlarını insan okunabilir formatta gösterir
du -sh *    # Bulunduğun dizindeki dosyaların boyutunu gösterir
```

### Disk Bölümleme ve Formatlama
**Dikkat: Bu komutlar veri kaybına neden olabilir!**
- `fdisk` veya `parted`: Disk bölümleme araçları.
- `mkfs.ext4 /dev/sdb1`: Diski ext4 formatında biçimlendirir.

### Mount (Bağlama)
Linux'ta diskler bir klasöre "bağlanarak" kullanılır.
```bash
mount /dev/sdb1 /mnt/yedek    # Diski bağla
umount /mnt/yedek             # Diski ayır
```
Kalıcı olması için `/etc/fstab` dosyasına eklenir.

## Log Yönetimi

Sistemde ne olup bittiğini anlamak için loglar hayati önem taşır.
Genellikle `/var/log` altında bulunurlar.

- `/var/log/syslog` veya `/var/log/messages`: Genel sistem logları.
- `/var/log/auth.log`: Giriş denemeleri ve yetki işlemleri.
- `/var/log/nginx/access.log`: Web sunucusu erişim logları.

```bash
tail -f /var/log/syslog   # Canlı log takibi
grep "error" /var/log/syslog  # Hataları filtrele
```

### Log Rotate
Log dosyaları zamanla şişer. `logrotate` servisi bunları sıkıştırır ve arşivler.

## Zamanlanmış Görevler (Cron Jobs)

Belirli zamanlarda otomatik çalışacak komutlar için `cron` kullanılır.

```bash
crontab -e    # Cron tablosunu düzenle
crontab -l    # Cron tablosunu listele
```

**Format:**
`* * * * * komut`
(Dakika - Saat - Gün - Ay - Haftanın Günü)

Örnekler:
```bash
# Her gün saat 03:00'te yedek al
0 3 * * * /home/user/backup.sh

# Her 5 dakikada bir çalış
*/5 * * * * /home/user/check_status.sh
```

## Arşivleme ve Sıkıştırma

### `tar` (Tape Archive)
Dosyaları birleştirir ve sıkıştırır.
```bash
tar -cvf arsiv.tar klasor/      # Sıkıştırmadan paketle
tar -czvf arsiv.tar.gz klasor/  # Gzip ile sıkıştır (En yaygın)
tar -xzvf arsiv.tar.gz          # Arşivi çıkar
```

### `zip` / `unzip`
```bash
zip -r arsiv.zip klasor/
unzip arsiv.zip
```
