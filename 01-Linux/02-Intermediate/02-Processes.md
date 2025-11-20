# 02 - Süreç Yönetimi (Process Management)

Linux'ta çalışan her programa "Process" (Süreç) denir. Her sürecin benzersiz bir ID'si (PID) vardır.

## Süreçleri İzleme

### `ps` (Process Status)
Anlık çalışan süreçleri gösterir.
```bash
ps          # Sadece şu anki terminaldeki süreçler
ps aux      # Tüm kullanıcıların tüm süreçleri (Detaylı)
```

### `top` ve `htop`
Sistem kaynaklarını (CPU, RAM) ve süreçleri canlı olarak gösterir.
- `top`: Varsayılan olarak gelir.
- `htop`: Daha renkli ve kullanıcı dostudur (yüklemeniz gerekebilir: `sudo apt install htop`).

## Süreçleri Yönetme

### Arka Plan ve Ön Plan
Bir komutun sonuna `&` koyarsanız arka planda çalışır.
```bash
sleep 100 &  # 100 saniye uyuyan bir süreci arka plana at
jobs         # Arka plandaki işleri listele
fg %1        # 1 numaralı işi ön plana (foreground) al
bg %1        # Durdurulmuş işi arka planda devam ettir
```
*Bir süreci durdurmak için `Ctrl+Z`, sonlandırmak için `Ctrl+C` kullanılır.*

### `kill`
Bir süreci sonlandırmak için kullanılır. PID (Process ID) gerektirir.
```bash
kill 1234        # 1234 PID'li sürece nazikçe kapanma sinyali (SIGTERM) gönderir
kill -9 1234     # 1234 PID'li süreci zorla öldürür (SIGKILL) - Kaydedilmemiş veriler kaybolabilir!
killall firefox  # İsmine göre tüm firefox süreçlerini öldürür
```

## Servis Yönetimi (Systemd)

Modern Linux dağıtımlarında servisler `systemctl` ile yönetilir.

```bash
sudo systemctl start nginx       # Servisi başlat
sudo systemctl stop nginx        # Servisi durdur
sudo systemctl restart nginx     # Servisi yeniden başlat
sudo systemctl status nginx      # Servis durumunu gör
sudo systemctl enable nginx      # Başlangıçta otomatik çalışmasını sağla
sudo systemctl disable nginx     # Başlangıçta çalışmasını engelle
```

## Arka Planda Çalıştırma (Advanced)

### `nohup` (No Hang Up)
Normalde bir terminali kapattığınızda, o terminalde çalışan tüm işlemler de kapanır. `nohup` komutu, oturum kapansa bile işlemin çalışmaya devam etmesini sağlar.

```bash
nohup python script.py &
# Çıktılar varsayılan olarak 'nohup.out' dosyasına yazılır.
```

### `disown`
Bir işlemi başlattıktan sonra onu terminalden bağımsız hale getirmek için kullanılır.
```bash
sleep 100 &
disown %1  # 1 numaralı işi terminalden kopar
```

## Zamanlanmış Görevler (Cron Jobs)

Linux'ta belirli zamanlarda otomatik çalışacak görevler `cron` servisi ile yönetilir.

### `crontab`
Kullanıcının zamanlanmış görevlerini düzenler.

```bash
crontab -e    # Cron dosyasını düzenle
crontab -l    # Mevcut görevleri listele
```

**Cron Formatı:**
`* * * * * komut`
(Dakika - Saat - Gün - Ay - Haftanın Günü)

Örnekler:
```bash
# Her dakika çalışır
* * * * * /home/user/script.sh

# Her gün saat 03:30'da çalışır
30 3 * * * /usr/bin/python3 /home/user/backup.py

# Her Pazartesi saat 08:00'de çalışır
0 8 * * 1 /home/user/report.sh
```
