# Docker Compose

Tek bir konteyneri `docker run` ile yönetmek kolaydır. Ancak uygulamanız Web + API + Database + Redis gibi parçalardan oluşuyorsa, her biri için tek tek komut yazmak kabusa dönüşür.

Docker Compose, çoklu konteyner uygulamalarını tanımlamak ve çalıştırmak için kullanılan bir araçtır.

## 1. `docker-compose.yml` Yapısı

```yaml
version: '3.8'  # Compose dosya versiyonu

services:
  # Servis 1: Web Uygulaması
  web:
    build: .            # Dockerfile'ı mevcut dizinden build et
    ports:
      - "5000:5000"     # Host:Container port eşleşmesi
    volumes:
      - .:/code         # Kod değişikliklerini canlı yansıt (Bind Mount)
    environment:
      FLASK_ENV: development
    depends_on:
      - redis           # Redis başlamadan başlama

  # Servis 2: Redis Önbellek
  redis:
    image: "redis:alpine"

  # Servis 3: Veritabanı
  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: example
    volumes:
      - db-data:/var/lib/postgresql/data # Kalıcı veri (Volume)

# Volume Tanımları
volumes:
  db-data:
```

## 2. Temel Komutlar

*   `docker-compose up`: Tüm servisleri oluştur ve başlat (Logları ekrana basar).
*   `docker-compose up -d`: Arka planda (Detached) başlat.
*   `docker-compose down`: Servisleri durdur ve konteynerleri/ağları sil.
*   `docker-compose down -v`: Volume'leri de sil (Veri kaybı olur!).
*   `docker-compose logs -f`: Logları takip et.
*   `docker-compose ps`: Servislerin durumunu gör.
*   `docker-compose exec web bash`: Web servisine terminal ile gir.
*   `docker-compose build`: İmajları tekrar build et (Dockerfile değiştiyse).

## 3. Environment Variables (.env)
Şifreleri YAML dosyasına yazmak yerine `.env` dosyasında saklayın. Docker Compose otomatik olarak bu dosyayı okur.

`.env`:
```bash
DB_PASSWORD=gizlisifre123
```

`docker-compose.yml`:
```yaml
environment:
  - POSTGRES_PASSWORD=${DB_PASSWORD}
```
