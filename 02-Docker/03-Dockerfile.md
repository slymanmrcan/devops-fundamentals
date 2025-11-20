# Dockerfile Hazırlama ve Best Practices

Dockerfile, bir Docker imajının nasıl oluşturulacağını tarif eden reçetedir.

## 1. Temel Komutlar

*   `FROM`: Baz imajı belirler (Örn: `FROM python:3.9`). Her Dockerfile bununla başlamalıdır.
*   `WORKDIR`: Çalışma dizinini ayarlar (Örn: `WORKDIR /app`). `cd` komutu gibidir.
*   `COPY`: Dosyaları host makineden imaja kopyalar (Örn: `COPY . .`).
*   `RUN`: İmaj oluşturulurken komut çalıştırır (Örn: `RUN pip install flask`). Paket yüklemeleri için kullanılır.
*   `CMD`: Konteyner başlatıldığında çalışacak varsayılan komuttur (Örn: `CMD ["python", "app.py"]`).
*   `EXPOSE`: Konteynerin hangi portu dinlediğini belirtir (Sadece dokümantasyon amaçlıdır).
*   `ENV`: Ortam değişkeni tanımlar.

## 2. Örnek Dockerfile (Python Flask)

```dockerfile
# 1. Hafif bir baz imaj seç
FROM python:3.9-slim

# 2. Çalışma dizinini ayarla
WORKDIR /app

# 3. Önce sadece gereksinimleri kopyala (Cache optimizasyonu için)
COPY requirements.txt .

# 4. Bağımlılıkları yükle
RUN pip install --no-cache-dir -r requirements.txt

# 5. Kalan kodları kopyala
COPY . .

# 6. Güvenlik için root olmayan kullanıcı oluştur
RUN useradd -m myuser
USER myuser

# 7. Uygulamayı başlat
CMD ["python", "app.py"]
```

## 3. Best Practices (En İyi Uygulamalar)

### Cache Kullanımı (Layer Caching)
Docker her satırı bir "katman" (layer) olarak kaydeder. Değişmeyen katmanları tekrar build etmez.
Bu yüzden, **sık değişen dosyaları (kodlarınız) en sona**, **az değişenleri (paket yükleme) en başa** koyun.

### Multi-Stage Builds (Çok Aşamalı Build)
İmaj boyutunu küçültmek için harika bir yöntemdir. Derleme (build) araçlarını son imaja dahil etmezsiniz.

**Örnek (Go Uygulaması):**
```dockerfile
# Aşama 1: Builder (Derleyici)
FROM golang:1.19 AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp main.go

# Aşama 2: Runtime (Çalıştırıcı)
FROM alpine:latest
WORKDIR /root/
# Sadece derlenmiş binary dosyasını kopyala
COPY --from=builder /app/myapp .
CMD ["./myapp"]
```
*Sonuç:* 800MB yerine 15MB'lık bir imaj!

### .dockerignore
Git için `.gitignore` neyse, Docker için de `.dockerignore` odur. Gereksiz dosyaların (node_modules, .git, loglar) imaja kopyalanmasını engeller. Build süresini hızlandırır.
