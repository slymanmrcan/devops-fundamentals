# Kullanıcı Yönetimi ve SSH Güvenliği

Linux sistem yönetiminin en kritik parçalarından biri, kullanıcıları doğru yönetmek ve sunucuya erişimi güvenli hale getirmektir.

## 1. Kullanıcı Yönetimi

### Yeni Kullanıcı Oluşturma
`useradd` veya daha kullanıcı dostu olan `adduser` komutu kullanılır.

```bash
# Yeni kullanıcı oluştur (ev dizini ve shell ile)
sudo adduser ahmet

# Şifre belirle (adduser kullanınca otomatik sorar)
sudo passwd ahmet
```

### Kullanıcıyı Gruba Ekleme
Kullanıcıya `sudo` (yönetici) yetkisi vermek için genellikle `sudo` (Debian/Ubuntu) veya `wheel` (RHEL/CentOS) grubuna eklenir.

```bash
# Ahmet'i sudo grubuna ekle
sudo usermod -aG sudo ahmet
```
*   `-a`: Append (Ekle)
*   `-G`: Groups (Gruplar)

### Kullanıcı Silme
```bash
# Kullanıcıyı ve ev dizinini sil
sudo deluser --remove-home ahmet
```

## 2. SSH Anahtarı ile Erişim (Passwordless Login)

Şifre ile giriş yapmak güvensizdir ve brute-force saldırılarına açıktır. SSH anahtarı kullanmak en iyi pratiktir.

### Adım 1: Anahtar Oluşturma (Kendi Bilgisayarınızda)
```bash
ssh-keygen -t ed25519 -C "email@example.com"
```
Bu komut size `id_ed25519` (özel anahtar) ve `id_ed25519.pub` (açık anahtar) dosyalarını oluşturur.

### Adım 2: Anahtarı Sunucuya Kopyalama
```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub ahmet@sunucu-ip-adresi
```
Alternatif olarak manuel yöntem:
Sunucuda `~/.ssh/authorized_keys` dosyasına `pub` dosyasının içeriğini yapıştırın.

### Adım 3: Test Etme
```bash
ssh ahmet@sunucu-ip-adresi
```
Şifre sormadan girmesi gerekir.

## 3. SSH Hardening (Sıkılaştırma)

Sunucu güvenliği için `/etc/ssh/sshd_config` dosyasını düzenleyerek bazı kısıtlamalar getirmeliyiz.

Dosyayı açın:
```bash
sudo nano /etc/ssh/sshd_config
```

### Kritik Ayarlar

1.  **Root Girişini Kapatın:**
    Root kullanıcısının doğrudan SSH ile girmesini engelleyin.
    ```ssh
    PermitRootLogin no
    ```

2.  **Şifre ile Girişi Kapatın:**
    Sadece SSH anahtarı ile girişe izin verin (Anahtarınızı eklediğinizden emin olun!).
    ```ssh
    PasswordAuthentication no
    ```

3.  **Belirli Kullanıcılara İzin Verin:**
    Sadece izin verilen kullanıcılar SSH yapabilsin.
    ```ssh
    AllowUsers ahmet mehmet
    ```

4.  **Portu Değiştirin (Opsiyonel):**
    Varsayılan 22 portunu değiştirerek bot taramalarından kaçınabilirsiniz.
    ```ssh
    Port 2222
    ```

### Servisi Yeniden Başlatma
Ayarların geçerli olması için SSH servisini yeniden başlatın.
```bash
sudo systemctl restart sshd
```

## 4. Sudo Yetkilerini Sınırlama (`visudo`)

`sudo` yetkisi çok güçlüdür. Bazen bir kullanıcıya sadece belirli komutları çalıştırma yetkisi vermek isteyebilirsiniz.

`visudo` komutu ile `/etc/sudoers` dosyasını güvenli bir şekilde düzenleyin.

```bash
sudo visudo
```

**Örnek: Mehmet sadece Nginx'i yeniden başlatabilsin**
```text
mehmet ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx
```
Bu satır sayesinde Mehmet şifre girmeden sadece nginx'i restart edebilir, ama başka hiçbir sudo komutunu çalıştıramaz.
