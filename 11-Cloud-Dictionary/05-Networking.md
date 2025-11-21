# Bulut Sözlüğü: Ağ (Networking)

Buluttaki sanal kablolar ve trafik polisleri.

## 1. Sanal Ağ (VPC / VNet)
**AWS VPC, Azure VNet, Google VPC**

Bulutun içinde size ayrılmış, izole edilmiş özel bir alandır. Evinizdeki yerel ağ (LAN) gibidir ama buluttadır.
- **Alt Ağ (Subnet):** VPC'yi daha küçük parçalara böler (Public Subnet: İnternete açık, Private Subnet: İnternete kapalı).

## 2. Yük Dengeleyici (Load Balancer)
**AWS ELB, Azure Load Balancer**

Gelen trafiği birden fazla sunucuya dağıtır.
- **Layer 4 (Network):** IP ve Port'a bakar. Çok hızlıdır.
- **Layer 7 (Application):** URL'e bakar (`/api` sunucu A'ya, `/images` sunucu B'ye). Daha akıllıdır.

## 3. CDN (Content Delivery Network)
**AWS CloudFront, Azure CDN, Google Cloud CDN**

Web sitenizin statik dosyalarını (resim, CSS, JS) dünyanın her yerindeki sunuculara (Edge Locations) kopyalar.
- **Fayda:** Türkiye'den giren kullanıcı dosyayı Amerika'dan değil, İstanbul'daki sunucudan çeker. Site çok hızlanır.

## 4. DNS (Domain Name System)
**AWS Route 53, Azure DNS**

Alan adınızı (`site.com`) yönetir ve trafiği doğru yere yönlendirir.
- **Özellik:** Sadece isim çözmez, aynı zamanda sunucunun sağlıklı olup olmadığını (Health Check) kontrol eder. Sunucu çökerse trafiği yedek sunucuya çevirir.

## 5. Özel Hat (Dedicated Line)
**AWS Direct Connect, Azure ExpressRoute**

Şirket ofisiniz ile bulut veri merkezi arasında çekilen fiziksel fiber kablodur.
- **Fayda:** İnternet üzerinden gitmez. Çok güvenli, çok hızlı ve düşük gecikmelidir. Bankalar ve büyük şirketler kullanır.
