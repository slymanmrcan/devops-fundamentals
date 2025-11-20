# Docker Giriş ve Alternatifler

## 1. Docker Nedir?
Docker, uygulamalarınızı ve bağımlılıklarını "konteyner" adı verilen izole paketler halinde çalıştırmanızı sağlayan bir platformdur.
*   **Hafiftir:** Sanal makineler (VM) gibi ayrı bir işletim sistemi (OS) kurmaz, host OS'in çekirdeğini paylaşır.
*   **Taşınabilirdir:** "Benim makinemde çalışıyordu" sorununu bitirir.

## 2. Docker Mimarisi
Docker, Client-Server mimarisini kullanır.

*   **Docker Daemon (`dockerd`):** Arka planda çalışan, imajları, konteynerleri ve ağları yöneten asıl motor.
*   **Docker Client (`docker`):** Bizim terminalden yazdığımız komutları Daemon'a ileten araç.
*   **Docker Registry:** İmajların saklandığı depo (Docker Hub, AWS ECR, GHCR).

## 3. Docker Desktop ve Alternatifleri

Docker motoru Linux tabanlıdır. Windows ve Mac üzerinde çalışabilmesi için arka planda bir Linux sanal makinesine ihtiyaç duyar.

### 🐳 Docker Desktop (Mac / Windows / Linux)
En popüler ve kullanıcı dostu seçenektir.
*   **Artıları:** Kolay kurulum, GUI arayüzü, Kubernetes entegrasyonu, Extensions desteği.
*   **Eksileri:** Büyük şirketler için ücretlidir (Lisans gerektirir). Kaynak tüketimi yüksek olabilir.

### 🐢 Colima (Mac / Linux)
Docker Desktop'ın en güçlü açık kaynaklı alternatifidir. Özellikle macOS üzerinde `lima` kullanarak çok hafif bir VM oluşturur.
*   **Artıları:** Tamamen ücretsiz, açık kaynak, çok hafif, `docker` komutlarıyla tam uyumlu.
*   **Kurulum:** `brew install colima docker`
*   **Başlatma:** `colima start`

### 🦭 Podman (Mac / Windows / Linux)
Red Hat tarafından geliştirilen, Daemon'sız (Daemonless) bir alternatiftir.
*   **Artıları:** Root yetkisi gerektirmez (Rootless), Daemon olmadığı için daha güvenli kabul edilir.
*   **Farkı:** `docker` komutu yerine `podman` kullanılır (alias yapılabilir: `alias docker=podman`).

### 🤠 Rancher Desktop
Kubernetes odaklı, açık kaynaklı bir Docker Desktop alternatifidir.
*   **Artıları:** Kubernetes (k3s) ile birlikte gelir. `dockerd` veya `containerd` kullanabilir.
