# 02 - İleri Seviye Scripting (Sed, Awk, Regex)

Bash scriptlerini bir üst seviyeye taşıyan metin işleme araçlarıdır.

## `grep` (Global Regular Expression Print)
Metin içinde arama yapar.

```bash
grep "hata" log.txt             # "hata" geçen satırları bul
grep -i "hata" log.txt          # Büyük/küçük harf duyarsız ara
grep -r "config" /etc/          # Klasör içinde recursive ara
grep -v "ok" log.txt            # "ok" GEÇMEYEN satırları bul
grep "^Start" dosya.txt         # "Start" ile BAŞLAYAN satırlar
grep "End$" dosya.txt           # "End" ile BİTEN satırlar
```

## `sed` (Stream Editor)
Metin akışını düzenler, bul-değiştir yapar.

```bash
# Dosyadaki "eski" kelimelerini "yeni" ile değiştir ve ekrana bas (dosyayı bozmaz)
sed 's/eski/yeni/g' dosya.txt

# Dosyada kalıcı değişiklik yap (-i)
sed -i 's/localhost/127.0.0.1/g' config.conf

# 5. satırı sil
sed '5d' dosya.txt
```

## `awk`
Güçlü bir metin işleme ve raporlama dilidir. Sütun bazlı verilerde harikadır.

```bash
# Sadece 1. sütunu yazdır (Boşluk ile ayrılmış)
ls -l | awk '{print $1}'

# CSV dosyasında 3. sütunu yazdır (Virgül ile ayrılmış)
awk -F',' '{print $3}' data.csv

# 2. sütunu 50'den büyük olan satırları yazdır
awk '$2 > 50 {print $0}' notlar.txt
```

## Hata Yönetimi ve Debugging

### Exit Codes
Her komut bittiğinde bir çıkış kodu üretir. `0` başarı, diğerleri hatadır. `$?` ile kontrol edilir.

```bash
ls /olmayan-klasor
if [ $? -ne 0 ]; then
    echo "Komut başarısız oldu!"
fi
```

### Set -e
Scriptin başında `set -e` kullanırsanız, herhangi bir komut hata verdiğinde script anında durur.

```bash
#!/bin/bash
set -e
# ...
```

### Debug Modu
Scripti `bash -x script.sh` ile çalıştırırsanız, her adımı ekrana basar.
