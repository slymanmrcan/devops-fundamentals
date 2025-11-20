# 02 - Temel Linux Komutları

Terminal (Konsol/Shell), Linux ile konuşmanın en güçlü yoludur. İşte en sık kullanılan komutlar:

## Dizin İşlemleri

### `pwd` (Print Working Directory)
Hangi klasörde olduğunuzu gösterir.
```bash
pwd
# Çıktı: /home/kullanici
```

### `ls` (List)
Dosya ve klasörleri listeler.
```bash
ls       # Sadece isimleri gösterir
ls -l    # Detaylı liste (izinler, boyut, tarih)
ls -a    # Gizli dosyaları da gösterir (. ile başlayanlar)
ls -la   # Hem gizli hem detaylı
```

### `cd` (Change Directory)
Dizin değiştirir.
```bash
cd Desktop      # Desktop klasörüne gir
cd ..           # Bir üst dizine çık
cd ~            # Ev dizinine dön (/home/kullanici)
cd -            # Bir önceki bulunduğun dizine dön
```

### `mkdir` (Make Directory)
Yeni klasör oluşturur.
```bash
mkdir YeniKlasor
mkdir -p projeler/web/site1  # İç içe klasörler oluşturur
```

## Dosya İşlemleri

### `touch`
Boş dosya oluşturur veya dosyanın zaman damgasını günceller.
```bash
touch notlar.txt
```

### `cp` (Copy)
Dosya veya klasör kopyalar.
```bash
cp dosya.txt kopya.txt
cp -r klasor1 klasor2   # Klasörü içindekilerle kopyalar (recursive)
```

### `mv` (Move)
Dosya taşır veya ismini değiştirir.
```bash
mv dosya.txt Belgeler/   # Taşıma
mv eski.txt yeni.txt     # İsim değiştirme
```

### `rm` (Remove)
Dosya veya klasör siler. **Dikkatli olun, geri dönüşüm kutusu yoktur!**
```bash
rm dosya.txt
rm -r klasor    # Klasörü ve içindekileri siler
rm -rf klasor   # Zorla ve sormadan siler (Çok tehlikeli!)
```

## Dosya Okuma

### `cat`
Dosya içeriğini ekrana basar.
```bash
cat /etc/os-release
```

### `less`
Uzun dosyaları sayfa sayfa okumanızı sağlar. (Çıkmak için `q`'ya basın).
```bash
less uzun_log_dosyasi.log
```

### `head` ve `tail`
Dosyanın başını veya sonunu gösterir.
```bash
head -n 5 dosya.txt   # İlk 5 satır
tail -n 5 dosya.txt   # Son 5 satır
tail -f log.txt       # Dosyayı canlı takip et (loglar için harika)
```

## Yardım Alma

### `man` (Manual)
Komutun kullanım kılavuzunu gösterir.
```bash
man ls
```
