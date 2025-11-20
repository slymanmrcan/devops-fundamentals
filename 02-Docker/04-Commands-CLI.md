# Docker CLI Komutları

## 1. İmaj (Image) Komutları

*   `docker build -t myapp:v1 .`: Dockerfile'dan imaj oluştur.
*   `docker images`: İndirilmiş/oluşturulmuş imajları listele.
*   `docker rmi <image_id>`: İmajı sil.
*   `docker pull nginx`: Docker Hub'dan imaj indir.
*   `docker tag myapp:v1 myuser/myapp:latest`: İmajanı etiketle (tagle).
*   `docker push myuser/myapp:latest`: İmajı Registry'e gönder.

## 2. Konteyner (Container) Komutları

*   `docker run -d -p 80:80 nginx`: Konteyneri arka planda (`-d`) ve port yönlendirmesiyle (`-p`) çalıştır.
*   `docker ps`: Çalışan konteynerleri listele.
*   `docker ps -a`: Durmuş olanlar dahil hepsini listele.
*   `docker stop <container_id>`: Konteyneri durdur.
*   `docker rm <container_id>`: Konteyneri sil (Önce durdurulmalı).
*   `docker rm -f <container_id>`: Zorla durdur ve sil.

## 3. Debug ve İnceleme

*   `docker logs <container_id>`: Konteynerin loglarını gör. (`-f` ile canlı takip et).
*   `docker exec -it <container_id> /bin/bash`: Çalışan konteynerin içine terminal ile gir. (Alpine için `/bin/sh` kullanın).
*   `docker inspect <container_id>`: Tüm detaylı konfigürasyonu (IP, Volume, Env) JSON olarak gör.
*   `docker stats`: Canlı CPU ve RAM kullanımını gör.

## 4. Temizlik (Prune)

Disk dolduğunda hayat kurtarır.

*   `docker system prune`: Durmuş konteynerleri, kullanılmayan ağları ve sarkan (dangling) imajları siler.
*   `docker system prune -a`: **Kullanılmayan tüm imajları** da siler (Dikkat!).
*   `docker volume prune`: Kullanılmayan volume'leri siler.
