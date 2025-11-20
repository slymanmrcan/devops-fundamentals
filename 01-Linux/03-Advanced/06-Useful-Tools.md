# Faydalı Linux Araçları

Standart komutların ötesinde, her DevOps mühendisinin alet çantasında bulunması gereken, işleri hızlandıran ve güvenliği artıran araçlar.

## 1. Güvenlik Araçları

### 🛡️ Fail2Ban
Sunucunuza yapılan kaba kuvvet (brute-force) saldırılarını otomatik olarak engeller. Özellikle SSH servisini internete açtıysanız **zorunludur**.
Log dosyalarını izler ve belirtilen sayıda hatalı giriş yapan IP adreslerini Firewall üzerinden banlar.

*   **Kurulum:** `sudo apt install fail2ban`
*   **Yapılandırma:** Asla `.conf` dosyasını düzenlemeyin, `.local` kopyasını oluşturun.
    `sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local`
    
    `/etc/fail2ban/jail.local` içine ekleyin:
    ```ini
    [sshd]
    enabled = true
    port = ssh
    filter = sshd
    logpath = /var/log/auth.log
    maxretry = 3
    bantime = 3600 # 1 saat banla (saniye cinsinden)
    findtime = 600 # 10 dakika içinde 3 hata yaparsa banla
    ignoreip = 127.0.0.1/8 192.168.1.5 # Kendi IP'nizi banlamayın!
    ```
*   **Servisi Başlat:** `sudo systemctl restart fail2ban`
*   **Banlananları Gör:** `sudo fail2ban-client status sshd`

### 🔥 UFW (Uncomplicated Firewall)
`iptables` kuralları yazmak zordur. UFW, firewall yönetimini insan dostu hale getirir.

*   **Kurulum:** `sudo apt install ufw`
*   **Kurallar:**
    ```bash
    sudo ufw default deny incoming # Her şeyi engelle (Varsayılan)
    sudo ufw allow 22/tcp          # SSH'a izin ver (Bunu yapmadan enable etmeyin!)
    sudo ufw allow 80/tcp          # HTTP
    sudo ufw allow 443/tcp         # HTTPS
    ```
*   **Aktif Et:** `sudo ufw enable`
*   **Durum:** `sudo ufw status`

---

## 2. İzleme ve Performans (Monitoring)

### 📊 htop / btop
Standart `top` komutunun çok daha yetenekli, renkli ve fare destekli versiyonlarıdır.
*   **htop:** Klasik, renkli süreç yöneticisi.
*   **btop:** Çok daha modern, grafiksel, network ve disk I/O gösteren harika bir araç.
*   **Kurulum:** `sudo apt install htop` veya `snap install btop`

### 💾 ncdu (NCurses Disk Usage)
"Disk doldu ama neresi doldu?" sorusunun en hızlı cevabı. Klasörler arasında hızlıca gezinip neyin yer kapladığını gösterir.
*   **Kurulum:** `sudo apt install ncdu`
*   **Kullanım:** `ncdu /` (Root dizininden itibaren tarar).

---

## 3. Veri İşleme ve Transfer

### 🔧 jq
Terminalde JSON verilerini okumak, filtrelemek ve formatlamak (pretty-print) için vazgeçilmezdir.
*   **Kurulum:** `sudo apt install jq`
*   **Örnek:** GitHub API'den veri çekip sadece isimi alalım.
    ```bash
    curl -s https://api.github.com/users/slymanmrcan | jq '.name'
    ```

### 🔄 rsync
Dosyaları sunucular arası veya klasörler arası senkronize eder. `cp` komutundan çok daha akıllıdır; sadece değişen kısımları kopyalar ve bağlantı kopsa bile kaldığı yerden devam edebilir.
*   **Örnek:**
    ```bash
    # Yerel klasörü sunucuya gönder
    rsync -avz -e ssh /local/klasor/ user@sunucu:/remote/klasor/
    ```
    *   `-a`: Archive (İzinleri koru)
    *   `-v`: Verbose (Detay göster)
    *   `-z`: Zip (Sıkıştırarak gönder)

---

## 4. Terminal Yönetimi

### 🖥️ tmux
Terminali sekmelere ve pencerelere böler. En önemli özelliği: **SSH bağlantınız kopsa bile işlemler arka planda çalışmaya devam eder.** Uzun süren işlemler (backup, restore, büyük indirmeler) için hayat kurtarır.

*   **Oturum Aç:** `tmux new -s mysession`
*   **Çık (Detach):** `Ctrl+B` tuşuna bas, bırak, sonra `D` tuşuna bas. (İşlem arkada çalışmaya devam eder).
*   **Geri Gel (Attach):** `tmux attach -t mysession`
