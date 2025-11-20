# 07 - Yedekleme ve Geri Yükleme (Backup & Restore)

Linux sistem yöneticiliğinin en kritik parçalarından biri veri yedeklemesidir. İşte en sık kullanılan araçlar:

## 1. Arşivleme ve Sıkıştırma (`tar`)

`tar` (Tape Archive), dosyaları tek bir paket haline getirmek ve sıkıştırmak için kullanılır.

### Sık Kullanılan Parametreler
*   `-c`: Create (Oluştur)
*   `-x`: Extract (Çıkar)
*   `-v`: Verbose (Detaylı göster)
*   `-f`: File (Dosya adı belirt)
*   `-z`: Gzip ile sıkıştır (.tar.gz)
*   `-j`: Bzip2 ile sıkıştır (.tar.bz2)

### Örnekler

**Yedek Alma (Sıkıştırma):**
```bash
# /var/www klasörünü backup.tar.gz olarak sıkıştır
tar -czvf backup.tar.gz /var/www
```

**Yedeği Açma (Geri Yükleme):**
```bash
# backup.tar.gz dosyasını olduğu yere çıkar
tar -xzvf backup.tar.gz

# Belirli bir klasöre çıkar (-C)
tar -xzvf backup.tar.gz -C /tmp/restore_folder
```

## 2. Dosya Kopyalama (`cp` ve `scp`)

### `cp` (Copy)
Yerel diskte kopyalama yapar.
```bash
cp -r /var/www /backup/www_yedek  # Klasörü içindekilerle kopyalar
```

### `scp` (Secure Copy)
SSH üzerinden güvenli dosya transferi yapar. Uzak sunucuya yedek atmak için idealdir.
```bash
# Yerel dosyayı uzak sunucuya gönder
scp backup.tar.gz user@192.168.1.50:/home/user/backups/

# Uzak sunucudan dosya çek
scp user@192.168.1.50:/var/log/syslog ./local_syslog
```

## 3. Gelişmiş Senkronizasyon (`rsync`)

`rsync`, sadece **değişen** dosyaları kopyaladığı için `cp` ve `scp`'den çok daha hızlı ve verimlidir. Yedekleme scriptlerinde standarttır.

### Temel Kullanım
```bash
# Kaynak klasörü hedefe senkronize et
# -a: Archive mode (izinleri, sahiplikleri korur)
# -v: Verbose
# -z: Transfer sırasında sıkıştır
# --delete: Kaynakta silineni hedefte de sil (Birebir ayna)

rsync -avz /var/www/ /backup/www_mirror/
```

### Uzak Sunucuya Yedekleme
```bash
rsync -avz -e ssh /var/www/ user@192.168.1.50:/backup/www_remote/
```

## 4. Basit Bir Yedekleme Scripti

Aşağıdaki scripti `cron` ile her gece çalıştırabilirsiniz.

```bash
#!/bin/bash

# Ayarlar
SOURCE="/var/www/html"
DEST="/home/user/backups"
DATE=$(date +%Y-%m-%d)
FILENAME="website_backup_$DATE.tar.gz"

# Yedekle
echo "Yedekleme basliyor: $DATE"
tar -czf $DEST/$FILENAME $SOURCE

# 7 günden eski yedekleri sil
find $DEST -name "website_backup_*.tar.gz" -mtime +7 -delete

echo "Yedekleme tamamlandi."
```
