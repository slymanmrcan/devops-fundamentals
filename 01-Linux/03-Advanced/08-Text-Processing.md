# 08 - Metin İşleme (Text Processing)

Linux'un en büyük gücü, her şeyin bir dosya olması ve metin tabanlı çalışmasıdır. Bu araçlar, log dosyalarını analiz etmek, verileri dönüştürmek ve raporlamak için hayati önem taşır.

## 1. `grep` (Global Regular Expression Print)
Dosya içinde metin arar.

```bash
grep "error" app.log           # "error" geçen satırları göster
grep -i "error" app.log        # Büyük/küçük harf duyarsız ara
grep -r "config" /etc/         # Klasör içinde recursive (derinlemesine) ara
grep -v "info" app.log         # "info" GEÇMEYEN satırları göster (Hariç tutma)
grep -c "error" app.log        # Kaç satırda geçtiğini say
```

## 2. `cut`
Satırları belirli bir ayırıcıya göre böler ve istenen sütunu alır.

```bash
# /etc/passwd dosyasından kullanıcı adlarını (1. alan) al
# -d: Delimiter (Ayırıcı, burada :)
# -f: Field (Alan, burada 1.)
cut -d: -f1 /etc/passwd

# CSV dosyasından 2. sütunu al
cut -d, -f2 data.csv
```

## 3. `sort` ve `uniq`
Sıralama ve tekilleştirme yapar.

```bash
sort isimler.txt               # Alfabetik sırala
sort -n sayilar.txt            # Sayısal sırala (Numeric)
sort -r isimler.txt            # Tersten sırala (Reverse)

# Benzersiz satırları bul (Önce sort gerekir!)
sort access.log | uniq         # Tekrar edenleri sil
sort access.log | uniq -c      # Tekrar sayılarını göster (Count)
```

## 4. `awk`
Gelişmiş metin işleme ve raporlama dilidir. Sütun bazlı işlemlerde çok güçlüdür.

```bash
# Boşlukla ayrılmış bir dosyada 1. ve 3. sütunu yazdır
ps aux | awk '{print $1, $3}'

# Sadece belirli bir koşulu sağlayanları yazdır (3. sütun > 50 ise)
awk '$3 > 50 {print $0}' notlar.txt

# Log dosyasından IP adreslerini (1. sütun) al ve say
awk '{print $1}' access.log | sort | uniq -c | sort -nr
```

## 5. `sed` (Stream Editor)
Metin akışı üzerinde bul-değiştir yapar.

```bash
# Dosyadaki "foo" kelimelerini "bar" ile değiştir (Sadece ekrana basar)
sed 's/foo/bar/g' dosya.txt

# Dosyayı yerinde değiştir (-i: in-place)
sed -i 's/localhost/127.0.0.1/g' config.conf

# 5. satırı sil
sed '5d' dosya.txt
```

## 6. Zincirleme (Piping) Örneği
Bir web sunucusu logundan en çok istek yapan 5 IP adresini bulalım:

```bash
# 1. Logu oku
# 2. Sadece IP kısmını al (awk)
# 3. Sırala (sort)
# 4. Tekrar sayılarını bul (uniq -c)
# 5. Sayıya göre tersten sırala (sort -nr)
# 6. İlk 5'i al (head -n 5)

cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -n 5
```
