# 03 - İzinler ve Kullanıcılar

Linux çok kullanıcılı bir sistemdir. Her dosyanın bir sahibi, bir grubu ve izinleri vardır.

## İzinleri Anlamak (`ls -l`)

`ls -l` komutu şöyle bir çıktı verir:
`-rwxr-xr-- 1 user group 4096 Nov 20 15:00 script.sh`

Buradaki `-rwxr-xr--` kısmı izinleri belirtir:
1. Karakter: Dosya tipi (`-` dosya, `d` dizin, `l` link)
2. Kalan 9 karakter 3'erli gruplara ayrılır:
    - **User (u):** Dosya sahibinin izinleri (`rwx`)
    - **Group (g):** Grubun izinleri (`r-x`)
    - **Others (o):** Diğer herkesin izinleri (`r--`)

### İzin Harfleri
- **r (read):** Okuma izni (4)
- **w (write):** Yazma/Değiştirme izni (2)
- **x (execute):** Çalıştırma izni (1)

## İzinleri Değiştirmek: `chmod`

İzinleri değiştirmek için `chmod` (change mode) kullanılır. İki yöntemi vardır:

### 1. Sembolik Mod
```bash
chmod u+x script.sh    # Kullanıcıya çalıştırma izni ver
chmod g-w dosya.txt    # Gruptan yazma iznini al
chmod o=r dosya.txt    # Diğerlerine sadece okuma izni ver
chmod +x script.sh     # Herkese çalıştırma izni ver
```

### 2. Sayısal Mod (Octal)
Her izin grubunun toplamı alınır (r=4, w=2, x=1).
- 7 (4+2+1) = rwx (Tam yetki)
- 6 (4+2) = rw- (Okuma ve Yazma)
- 5 (4+1) = r-x (Okuma ve Çalıştırma)
- 4 = r-- (Sadece Okuma)

```bash
chmod 777 dosya.txt   # Herkes her şeyi yapabilir (Güvensiz!)
chmod 755 script.sh   # Sahip: rwx, Grup: r-x, Diğer: r-x (Standart script/dizin izni)
chmod 644 dosya.txt   # Sahip: rw-, Grup: r--, Diğer: r-- (Standart dosya izni)
chmod 600 key.pem     # Sadece sahip okuyup yazabilir (Gizli anahtarlar için)
```

## Sahiplik Değiştirmek: `chown`

Dosyanın sahibini ve grubunu değiştirir. Genelde `sudo` (yetkili kullanıcı) ile kullanılır.

```bash
sudo chown ahmet dosya.txt          # Sahibini ahmet yap
sudo chown ahmet:yazilim dosya.txt  # Sahibini ahmet, grubunu yazilim yap
sudo chown -R ahmet klasor/         # Klasör ve içindekileri recursive değiştir
```

## Kullanıcı İşlemleri (Kısaca)

- `sudo`: Komutu yönetici (root) yetkisiyle çalıştırır.
- `useradd`: Yeni kullanıcı ekler.
- `passwd`: Şifre değiştirir.
- `su`: Kullanıcı değiştirir (Switch User).
