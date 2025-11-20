# Linux Dağıtımları ve Mimariler

Linux tek bir işletim sistemi değil, bir "Çekirdek"tir (Kernel). Bu çekirdeğin üzerine paket yöneticileri, masaüstü ortamları ve araçlar eklenerek farklı "Dağıtımlar" (Distros) oluşturulur.

## 1. Dağıtım Aileleri (Distro Families)

DevOps dünyasında karşılaşacağınız dağıtımlar genellikle 3 ana aileden gelir. Hangi aileyi kullandığınız, paket yükleme komutlarını ve konfigürasyon dosyalarının yerlerini değiştirir.

### 🟢 Debian Ailesi (`.deb`)
Kullanıcı dostu olması ve devasa paket deposuyla bilinir.
*   **Paket Yöneticisi:** `apt` (Advanced Package Tool)
*   **Yaygın Dağıtımlar:**
    *   **Ubuntu:** En popüler sunucu ve masaüstü dağıtımı. LTS (Long Term Support) sürümleri 5 yıl desteklenir.
    *   **Debian:** Ubuntu'nun atasıdır. Çok kararlıdır (stable), ancak paketleri biraz eski olabilir.
    *   **Kali Linux:** Siber güvenlik ve penetrasyon testleri için özelleştirilmiştir.
*   **Örnek Komut:** `sudo apt update && sudo apt install nginx`

### 🔴 RHEL Ailesi (`.rpm`)
Kurumsal (Enterprise) dünyada standarttır. Güvenlik ve kararlılık odaklıdır.
*   **Paket Yöneticisi:** `yum` (eski) veya `dnf` (yeni)
*   **Yaygın Dağıtımlar:**
    *   **Red Hat Enterprise Linux (RHEL):** Ücretli lisans ve destek gerektirir. Bankalar ve büyük şirketler kullanır.
    *   **CentOS / Rocky Linux / AlmaLinux:** RHEL'in ücretsiz, birebir (binary compatible) kopyalarıdır. CentOS'un desteği değiştiği için Rocky ve AlmaLinux yükseliştedir.
    *   **Fedora:** RHEL'in test sahasıdır (upstream). En yeni teknolojiler önce buraya gelir.
*   **Örnek Komut:** `sudo dnf install nginx`

### 🔵 Alpine Linux (`.apk`)
Konteyner dünyasının yıldızıdır.
*   **Özelliği:** İnanılmaz derecede hafiftir (Base image ~5MB). Güvenlik odaklıdır.
*   **Farkı:** Standart `glibc` yerine `musl libc` kullanır. Bu bazen uyumluluk sorunlarına yol açabilir.
*   **Paket Yöneticisi:** `apk`
*   **Örnek Komut:** `apk add nginx`

---

## 2. İşlemci Mimarileri (Architectures)

Yazdığınız kod veya kullandığınız Docker imajı, çalışacağı işlemcinin dilini konuşmalıdır.

### 🖥️ x86_64 (AMD64)
*   **Nedir:** 64-bit Intel ve AMD işlemciler.
*   **Kullanım:** Geleneksel sunucuların, laptopların ve bulut instance'larının (örn: AWS t3, m5) %90'ı.
*   **Docker:** `linux/amd64`

### 📱 ARM64 (AArch64)
*   **Nedir:** RISC tabanlı, enerji verimliliği yüksek işlemciler.
*   **Kullanım:**
    *   Apple Silicon (M1, M2, M3) Mac'ler.
    *   AWS Graviton (c6g, m6g) sunucuları (Daha ucuz ve performanslı).
    *   Raspberry Pi.
*   **Docker:** `linux/arm64`

### ⚠️ Kritik Uyarı: Cross-Platform Build
M1 Mac (ARM64) kullanıyorsanız ve build aldığınız Docker imajını standart bir Intel sunucuya (AMD64) atarsanız **"Exec format error"** hatası alırsınız.

**Çözüm (Docker Buildx):**
```bash
docker buildx build --platform linux/amd64 -t myapp:latest .
```
Bu komutla, ARM makinede AMD64 uyumlu imaj üretebilirsiniz.

---

## 3. Diğer Kavramlar

### Init Systems (Systemd vs Init)
Linux açıldığında ilk çalışan süreçtir (PID 1). Diğer tüm servisleri o başlatır.
*   **Systemd:** Modern standarttır (`systemctl start nginx`). Ubuntu, RHEL, CentOS kullanır.
*   **OpenRC / SysVinit:** Daha eski veya hafif sistemlerde (Alpine) kullanılır (`service nginx start`).

### Shell Farklılıkları
*   **Bash:** Standarttır. Scriptler genelde `#!/bin/bash` ile başlar.
*   **Sh:** Daha basittir. Alpine gibi hafif sistemlerde varsayılan olabilir. Bash scriptleri bazen sh ile çalışmaz (syntax farkı).
