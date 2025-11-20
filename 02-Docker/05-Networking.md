# Docker Networking

Konteynerlerin birbirleriyle ve dış dünyayla nasıl konuştuğunu anlamak kritiktir.

## 1. Network Sürücüleri (Drivers)

### Bridge (Varsayılan)
Siz özel bir ağ belirtmezseniz konteynerler buraya bağlanır.
*   Konteynerler birbirleriyle IP adresi üzerinden konuşabilir ama DNS isimleriyle konuşamazlar (Varsayılan bridge'de).
*   **Özel Bridge Ağı:** Kendi oluşturduğunuz bridge ağında konteynerler birbirini **isimleriyle** (container_name) bulabilir. En çok kullanılan yöntemdir.

### Host
Konteyner, host makinenin ağ yığınını (network stack) direkt kullanır.
*   Port yönlendirmesi (`-p 80:80`) gerekmez.
*   Performansı en yüksektir ama port çakışması riski vardır.
*   Linux'ta çalışır, Mac/Windows Docker Desktop'ta tam çalışmayabilir.

### None
Ağ erişimi yoktur. Sadece loopback (localhost) çalışır. Güvenlik gerektiren izole işler için kullanılır.

### Overlay
Farklı sunucular (Docker Swarm modunda) üzerindeki konteynerlerin haberleşmesini sağlar.

### Macvlan
Konteynere fiziksel ağdan gerçek bir MAC adresi atar. Konteyner sanki ağdaki fiziksel bir cihazmış gibi davranır.

## 2. Komutlar

```bash
# Ağları listele
docker network ls

# Yeni bir ağ oluştur
docker network create my-net

# Konteyneri ağa bağlayarak çalıştır
docker run -d --name db --network my-net postgres

# Çalışan konteyneri ağa bağla
docker network connect my-net web-app

# Ağ detaylarını gör (Hangi konteynerler bağlı?)
docker network inspect my-net
```

## 3. DNS Çözümleme
Aynı **custom bridge** ağındaki konteynerler birbirlerine servis isimleriyle ulaşabilir.

Örnek:
*   `web` konteyneri
*   `db` konteyneri
*   `web` içinden `ping db` derseniz, Docker bunu `db` konteynerinin IP adresine (örn: 172.18.0.2) otomatik çevirir.
