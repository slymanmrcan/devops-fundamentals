# Güvenlik Duvarları & Güvenlik: Ağ Savunması

## 1. Güvenlik Duvarları (Firewalls)
Ağ trafiğini kurallara göre kontrol eden cihazlar veya yazılımlardır.

### Stateful vs Stateless
- **Stateless (Durumsuz - ACL'ler)**: Paketleri tek tek kontrol eder. Gelen isteğe izin verirseniz, giden yanıtı da açıkça (explicitly) izin vermelisiniz.
    - *Örnek*: AWS Network ACLs (NACL).
- **Stateful (Durumlu)**: Bağlantıları hatırlar. Gelen isteğe (port 80) izin verirseniz, dönüş trafiğine otomatik olarak izin verir.
    - *Örnek*: AWS Security Groups, `iptables`.

---

## 2. Bulut Güvenliği (AWS Bağlamı)
Aradaki farkı anlamak DevOps için kritiktir.

| Özellik | Security Group (SG) | Network ACL (NACL) |
| :--- | :--- | :--- |
| **Seviye** | Instance (EC2) | Subnet |
| **Tür** | Stateful | Stateless |
| **Kurallar** | Sadece İzin Ver (Varsayılan Red) | İzin Ver ve Reddet |
| **Sıra** | Tüm kurallar değerlendirilir | Numaralı sıra (100, 200) |
| **Kullanım**| Uygulamalar için birincil duvar | Ekstra katman (IP engelleme) |

---

## 3. VPN (Sanal Özel Ağ)
Özel bir ağı genel bir ağ üzerinden genişletmek.

- **Site-to-Site**: Bir Ofis Router'ını Bulut VPC'sine bağlar. Sunucular sunucularla özel olarak konuşur.
- **Client-to-Site**: Uzaktan çalışan geliştirici laptopunu Ofis/Bulut ağına bağlar.

---

## 4. DDOS (Dağıtık Hizmet Reddi)
- **Hacimsel (Volumetric)**: Bant genişliğini doldurma (UDP selleri).
- **Protokol**: Sunucu kaynaklarını tüketme (SYN Flood).
- **Uygulama**: CPU'yu öldürmek için karmaşık istekler (Arama sorguları).

**Azaltma (Mitigation)**:
- **CDN**: Cloudflare/CloudFront trafiği emer.
- **WAF (Web Application Firewall)**: Zararlı HTTP desenlerini engeller (SQL Injection).
- **Autoscaling**: Yükü karşılar (pahalıdır).
