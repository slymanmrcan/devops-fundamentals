# Yük Dengeleme (Load Balancing) & Proxyler: Trafik Yönetimi

## 1. Yük Dengeleme (Load Balancing)
Güvenilirlik ve ölçeklenebilirlik sağlamak için gelen ağ trafiğini birden fazla sunucuya dağıtma işlemidir.

### Katman 4 vs Katman 7
| Özellik | Katman 4 (Taşıma) | Katman 7 (Uygulama) |
| :--- | :--- | :--- |
| **Veri** | IP & Port | HTTP Başlıkları, Çerezler, URL |
| **Hız** | Daha Hızlı (Paket seviyesi) | Daha Yavaş (İçeriği inceler) |
| **Kararlar**| "TCP port 80'i Sunucu A'ya gönder" | "`/api`'yi Servis A'ya, `/img`'yi Servis B'ye gönder" |
| **Örnekler** | AWS Network Load Balancer (NLB) | AWS Application Load Balancer (ALB), Nginx |

### Algoritmalar
- **Round Robin**: Sıralı (A -> B -> C -> A).
- **Least Connections**: En az aktif kullanıcısı olan sunucuya gönder.
- **IP Hash**: İstemci IP'si her zaman aynı sunucuya gider (Sticky Sessions).

---

## 2. Proxyler (Vekil Sunucular)
İstemci ve sunucu arasındaki aracılardır.

### Forward Proxy (İleri Yönlü Vekil)
- **Konumu**: İstemcinin önünde.
- **Amacı**: İstemciyi korumak.
- **Kullanım Alanı**: Kurumsal ofislerde Facebook'u engelleme, yaygın siteleri önbellekleme, anonimlik (VPN).
- **Akış**: İstemci -> Forward Proxy -> İnternet.

### Reverse Proxy (Ters Yönlü Vekil)
- **Konumu**: Sunucunun önünde.
- **Amacı**: Sunucuyu korumak.
- **Kullanım Alanı**: Yük dengeleme, SSL Sonlandırma, Önbellekleme, backend topolojisini gizleme.
- **Akış**: İnternet -> Reverse Proxy (Nginx) -> Uygulama Sunucusu (Node.js).

> **DevOps Standardı**: Neredeyse TÜM web uygulamaları bir reverse proxy (Nginx, Traefik, HAProxy veya Cloud LB) arkasında çalışır.

---

## 3. SSL Sonlandırma (SSL Termination)
HTTPS trafiğinin şifresini Load Balancer/Proxy seviyesinde çözerek backend sunucusunun sadece HTTP ile uğraşmasını sağlamaktır.
- **Avantajları**: Şifreleme yükünü uygulama sunucularından alır. Merkezi sertifika yönetimi sağlar.
- **Dezavantajları**: LB ve Uygulama arasındaki trafik şifresizdir (özel VPC içinde genellikle sorun değildir).
