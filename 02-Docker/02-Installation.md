# Docker Kurulum ve İnce Ayarlar (Advanced Setup)

> [!NOTE]
> Bu rehber, sadece "Next > Next > Install" kurulumunu değil, performans ve kaynak yönetimi için kritik olan ince ayarları da kapsar.

---

## 1. macOS: Colima (Detaylı Yapılandırma)

Colima, macOS üzerinde Docker çalıştırmak için en hafif ve esnek yöntemdir.

> [!WARNING]
> Varsayılan ayarlar (2CPU, 2GB RAM) çoğu zaman yetersiz kalır.

### Kurulum
```bash
brew install colima docker
```

### Başlatma Parametreleri
Colima'yı ihtiyacınıza göre özelleştirerek başlatın:

```bash
# 4 CPU, 8GB RAM ve 100GB Disk ile başlat
colima start --cpu 4 --memory 8 --disk 100
```

*   `--cpu`: Sanal makineye verilecek işlemci çekirdeği sayısı.
*   `--memory`: GB cinsinden RAM miktarı.
*   `--disk`: GB cinsinden disk alanı.

### İleri Seviye Ayarlar

#### 1. Rosetta 2 (x86_64 Emülasyonu)
> [!TIP]
> Apple Silicon (M1/M2) kullanıyorsanız ve Intel tabanlı (amd64) imajları hızlı çalıştırmak istiyorsanız Rosetta'yı etkinleştirin.

```bash
colima start --arch aarch64 --vm-type=vz --vz-rosetta
```
*   `--vm-type=vz`: Apple'ın yeni Virtualization.framework'ünü kullanır (Daha hızlıdır).
*   `--vz-rosetta`: Rosetta 2 desteğini açar.

#### 2. Profil Yönetimi
Farklı projeler için farklı profiller oluşturabilirsiniz.
```bash
# "HighPerf" adında güçlü bir profil oluştur
colima start HighPerf --cpu 8 --memory 16

# Profiller arası geçiş
colima stop
colima start HighPerf
```

#### 3. Dosya Bağlama (Mounts)
Varsayılan olarak sadece `/Users` klasörü mount edilir. Başka bir klasöre erişim gerekiyorsa:
```bash
colima start --mount /Volumes/Work:w
```

#### 4. Kubernetes (k3s)
Docker ile birlikte Kubernetes de lazım mı?
```bash
colima start --kubernetes
```

### Konfigürasyon Dosyası
Her seferinde parametre yazmak yerine ayarları kalıcı yapın:
```bash
colima template
# Açılan dosyada cpu, memory, disk, mount ayarlarını düzenleyip kaydedin.
```

---

## 2. Windows: WSL2 (Performans Ayarları)

WSL2 harikadır ancak varsayılan olarak **tüm RAM'inizi yiyebilir**.

> [!IMPORTANT]
> Kaynak kullanımını sınırlamak şarttır.

### .wslconfig ile Kaynak Sınırlama
Windows kullanıcı dizininizde (`C:\Users\KullaniciAdi\.wslconfig`) bir dosya oluşturun ve şunları ekleyin:

```ini
[wsl2]
# WSL2 en fazla 6GB RAM kullansın
memory=6GB

# 4 Çekirdek kullansın
processors=4

# Swap alanı (RAM yetmezse diskten kullanacağı alan)
swap=2GB

# localhost yönlendirmesini aç (WSL içindeki porta Windows'tan erişim)
localhostForwarding=true
```
*Bu ayardan sonra `wsl --shutdown` komutuyla WSL'i yeniden başlatın.*

### Docker Desktop Ayarları
Docker Desktop kullanıyorsanız:
1.  **Settings > Resources > WSL Integration:**
    *   Ubuntu (veya kullandığınız distro) seçeneğini açın. Bu sayede Ubuntu terminalinden `docker` komutunu direkt kullanabilirsiniz.

---

## 3. Linux (Post-Installation Steps)

Linux kurulumundan sonra yapılması gereken kritik ayarlar:

### 1. Sudo'suz Kullanım
Her komutun başına `sudo` yazmamak için kullanıcınızı docker grubuna ekleyin.
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### 2. Başlangıçta Çalıştırma
Sunucu yeniden başladığında Docker'ın da kalkması için:
```bash
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

### 3. Log Rotasyonu (ÖNEMLİ!)

> [!CAUTION]
> Docker varsayılan olarak logları sınırsız tutar. Bir gün diskiniz dolabilir.

`/etc/docker/daemon.json` dosyasını oluşturun/düzenleyin:

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```
*Her konteyner için en fazla 3 adet 10MB'lık log dosyası tutulur.*
Ardından servisi yeniden başlatın: `sudo systemctl restart docker`
