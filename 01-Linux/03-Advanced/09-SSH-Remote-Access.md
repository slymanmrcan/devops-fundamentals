# 09 - SSH ve Uzaktan Erişim (Remote Access)

SSH (Secure Shell), uzaktaki Linux sunucularını yönetmek için kullanılan standart protokoldür. Güvenli, şifreli bir iletişim sağlar.

## 1. Temel Bağlantı

```bash
ssh user@192.168.1.50
ssh -p 2222 user@192.168.1.50  # Farklı port kullanımı
```

## 2. Anahtar Tabanlı Kimlik Doğrulama (Key-Based Auth)
Şifre girmek yerine SSH anahtarları kullanmak hem daha güvenli hem de daha pratiktir.

### Adım 1: Anahtar Oluşturma
Kendi bilgisayarınızda (Client) çalıştırın:
```bash
ssh-keygen -t rsa -b 4096
# Enter'a basarak varsayılan konuma (~/.ssh/id_rsa) kaydedin.
```

### Adım 2: Anahtarı Sunucuya Kopyalama
```bash
ssh-copy-id user@192.168.1.50
```
Artık şifresiz giriş yapabilirsiniz!

## 3. SSH Config Dosyas (`~/.ssh/config`)
Sürekli IP adresi yazmak yerine sunuculara takma isim (alias) verebilirsiniz.

`~/.ssh/config` dosyasını oluşturun veya düzenleyin:

```ssh
Host web-prod
    HostName 192.168.1.50
    User ubuntu
    Port 22
    IdentityFile ~/.ssh/id_rsa

Host db-server
    HostName 10.0.0.5
    User admin
    ProxyJump web-prod  # web-prod üzerinden atlayarak bağlan
```

Kullanım:
```bash
ssh web-prod
ssh db-server
```

## 4. SSH Tünelleme (Port Forwarding)

### Local Port Forwarding
Uzaktaki bir servisi (örn: veritabanı) kendi bilgisayarınızdaymış gibi kullanmak.

```bash
# Uzaktaki 3306 (MySQL) portunu, kendi bilgisayarımın 3307 portuna bağla
ssh -L 3307:localhost:3306 user@remote-server
```
Artık `localhost:3307` adresine bağlandığınızda aslında uzaktaki veritabanına bağlanırsınız.

### Remote Port Forwarding
Kendi bilgisayarınızdaki bir servisi (örn: geliştirdiğiniz web sitesi) dış dünyaya açmak.

```bash
# Kendi 8080 portumu, sunucunun 9090 portuna bağla
ssh -R 9090:localhost:8080 user@remote-server
```

## 5. Dosya Transferi (SCP & SFTP)

```bash
# Dosya Gönder
scp dosya.txt user@remote:/tmp/

# Klasör Çek
scp -r user@remote:/var/www/html ./yedek
```
