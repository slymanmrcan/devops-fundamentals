# 01 - Bash Scripting Temelleri

Bash scriptleri, Linux komutlarını otomatize etmenin yoludur. `.sh` uzantısı ile biterler ve `#!/bin/bash` (shebang) ile başlarlar.

## İlk Script: Merhaba Dünya

Bir dosya oluşturun: `nano merhaba.sh`

```bash
#!/bin/bash
echo "Merhaba Dünya!"
```

Çalıştırmak için izin verin ve çalıştırın:
```bash
chmod +x merhaba.sh
./merhaba.sh
```

## Değişkenler

```bash
#!/bin/bash
ISIM="Ahmet"
YAS=25
echo "Merhaba $ISIM, yaşın $YAS"
```
*Not: Eşittir işaretinin sağında ve solunda boşluk olmamalıdır!*

## Kullanıcıdan Girdi Alma

```bash
#!/bin/bash
echo "Adın ne?"
read AD
echo "Tanıştığımıza memnun oldum $AD"
```

## Koşullu İfadeler (If/Else)

```bash
#!/bin/bash
echo "Bir sayı gir:"
read SAYI

if [ $SAYI -gt 10 ]; then
    echo "Sayı 10'dan büyük."
elif [ $SAYI -eq 10 ]; then
    echo "Sayı 10'a eşit."
else
    echo "Sayı 10'dan küçük."
fi
```

### Karşılaştırma Operatörleri
- `-eq`: Eşit (equal)
- `-ne`: Eşit değil (not equal)
- `-gt`: Büyük (greater than)
- `-lt`: Küçük (less than)
- `-ge`: Büyük eşit (greater or equal)
- `-le`: Küçük eşit (less or equal)

## Döngüler

### For Döngüsü
```bash
#!/bin/bash
for i in {1..5}; do
    echo "Sayı: $i"
done
```

### While Döngüsü
```bash
#!/bin/bash
SAYAC=1
while [ $SAYAC -le 5 ]; do
    echo "Sayaç: $SAYAC"
    ((SAYAC++))
done
```

## Fonksiyonlar

```bash
#!/bin/bash
selamla() {
    echo "Merhaba $1!"
}

selamla "Ali"
selamla "Ayşe"
```
