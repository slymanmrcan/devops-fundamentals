# Linux – DevOps Mühendisleri İçin Temeller

## Genel Bakış
Linux, dünyadaki sunucuların, süper bilgisayarların ve bulut altyapısının büyük çoğunluğuna güç veren açık kaynaklı işletim sistemi çekirdeğidir. Bir DevOps mühendisi için Linux sadece bir işletim sistemi değil; otomasyon, konteynerizasyon ve orkestrasyon için evrensel bir çalışma ortamıdır.

## DevOps İçin Neden Önemli?
*   **Infrastructure as Code (IaC):** Çoğu IaC aracı (Terraform, Ansible) ve CI/CD pipeline'ları Linux ajanları üzerinde çalışır.
*   **Konteynerizasyon:** Docker ve Kubernetes, Linux'a özgüdür (native). Cgroups ve namespace mantığını anlamak, konteynerleri debug etmek için şarttır.
*   **Sunucu Kararlılığı:** Linux, tüketici işletim sistemlerine kıyasla üstün çalışma süresi (uptime), kaynak yönetimi ve güvenlik sunar.
*   **Bulut Hakimiyeti:** AWS, Azure ve GCP ortamları ağırlıklı olarak Linux tabanlıdır.

## Temel Kavramlar

### 1. Kernel (Çekirdek)
Donanım ve yazılım arasındaki temel arayüzdür. CPU, bellek ve çevresel aygıtları yönetir.
*   **User Space:** Uygulamaların ve kullanıcı süreçlerinin çalıştığı yer.
*   **Kernel Space:** Temel işletim sistemi fonksiyonlarının tam yetkiyle çalıştığı yer.

### 2. Shell (Kabuk)
Kullanıcı komutlarını yorumlayan komut satırı arayüzüdür (CLI).
*   **Bash (Bourne Again SHell):** Çoğu dağıtım için standarttır.
*   **Zsh:** Etkileşimli kullanım için popülerdir (macOS'ta varsayılan).
*   **Stdin/Stdout/Stderr:** Giriş, çıkış ve hata loglaması için üç standart akış.

### 3. Dosya Sistemi Hiyerarşisi (FHS)
Linux'ta her şey bir dosyadır.
*   `/`: Kök (Root) dizini.
*   `/bin` & `/usr/bin`: Temel kullanıcı komutları (ls, cp, cat).
*   `/etc`: Yapılandırma (Config) dosyaları.
*   `/var`: Değişken veriler (loglar, spool dosyaları).
*   `/home`: Kullanıcı ev dizinleri.
*   `/proc` & `/sys`: Sistem durumunu temsil eden sanal dosya sistemleri.

### 4. İzinler ve Sahiplik
Sahip (u), Grup (g) ve Diğerleri (o) için Okuma (r), Yazma (w) ve Çalıştırma (x) tabanlı güvenlik modeli.

### 5. Süreç (Process) Yönetimi
Çalışan her program, benzersiz bir Süreç Kimliğine (PID) sahip bir süreçtir.
*   **Daemon:** Arka plan süreci (servis).
*   **Zombie:** Ebeveyni tarafından çıkış durumu okunmayı bekleyen ölü süreç.

## Temel Komutlar (Özet)

| Komut | Açıklama | Örnek |
| :--- | :--- | :--- |
| `ls` | Dizin içeriğini listele | `ls -lah` |
| `cd` | Dizin değiştir | `cd /var/log` |
| `cp` | Kopyala | `cp -r kaynak/ hedef/` |
| `mv` | Taşı veya yeniden adlandır | `mv eski.txt yeni.txt` |
| `rm` | Sil | `rm -rf /tmp/cache` |
| `grep` | Metin ara | `grep "ERROR" server.log` |
| `chmod` | İzinleri değiştir | `chmod +x script.sh` |
| `chown` | Sahipliği değiştir | `chown user:group dosya` |
| `sudo` | Yönetici olarak çalıştır | `sudo apt update` |

## En İyi Uygulamalar (Best Practices)
1.  **En Az Yetki (Least Privilege):** Uygulamaları asla `root` olarak çalıştırmayın. Özel servis kullanıcıları oluşturun.
2.  **Değişmez Altyapı (Immutable Infrastructure):** Canlı sunucuları yamalamaktan kaçının; onları yeni imajlarla değiştirin.
3.  **Her Şeyi Scriptleyin:** Bir komutu iki kez çalıştırıyorsanız, bir script yazın.
4.  **Log Rotasyonu:** Disk dolmasını önlemek için `logrotate` yapılandırmasının olduğundan emin olun.
5.  **SSH Anahtarları:** Şifre ile girişi kapatın; erişim için SSH anahtarları kullanın.
