# Subnetting & CIDR: IP Yönetimi

## 1. IP Adresleri (IPv4)
Dört adet 8-bitlik bloktan (oktet) oluşan 32-bitlik bir sayıdır.
Örnek: `192.168.1.1`

### Public vs Private IP'ler (RFC 1918)
Adres tasarrufu sağlamak için, ağların içinde (LAN/VPC) özel (private) IP'ler, internette ise genel (public) IP'ler kullanırız.

| Sınıf | Aralık | Kullanım Alanı |
| :--- | :--- | :--- |
| **Class A** | `10.0.0.0` - `10.255.255.255` | Büyük Şirketler / Bulut VPC'leri |
| **Class B** | `172.16.0.0` - `172.31.255.255` | AWS varsayılanı, Docker |
| **Class C** | `192.168.0.0` - `192.168.255.255` | Ev Routerları |

> **NAT (Network Address Translation)**: Birden fazla özel IP'nin tek bir genel IP (Gateway) üzerinden internete erişmesini sağlar.

---

## 2. CIDR (Classless Inter-Domain Routing)
IP aralıkları için standart gösterim: `IP/PrefixUzunluğu`.
**Prefix Uzunluğu**, kaç bitin sabit olduğunu (Ağ Kimliği) söyler. Geri kalanı Hostlar içindir.

### Yaygın CIDR Blokları
| CIDR | Toplam IP | Kullanılabilir IP (yaklaşık) | Kullanım Alanı |
| :--- | :--- | :--- | :--- |
| `/32` | 1 | 1 | Tek Host (Güvenlik duvarı kuralı) |
| `/30` | 4 | 2 | Noktadan Noktaya (Point-to-Point) bağlantı |
| `/28` | 16 | 11-13 | Çok küçük subnet |
| `/24` | 256 | 251-254 | Standart LAN / Subnet |
| `/20` | 4,096 | 4,000+ | Orta ölçekli VPC |
| `/16` | 65,536 | 65,000+ | Büyük VPC (Standart AWS max) |
| `/0` | Tüm IP'ler | Hepsi | İnternet (`0.0.0.0/0`) |

### Hesaplama Örneği: `/24`
- **IP**: `192.168.1.0/24`
- **Maske**: `255.255.255.0`
- **Ağ (Network)**: `192.168.1.0` (Ayrılmış)
- **Yayın (Broadcast)**: `192.168.1.255` (Ayrılmış)
- **Aralık**: `192.168.1.1` - `192.168.1.254`

---

## 3. DevOps Bağlamı: VPC Tasarımı
Bir VPC (Sanal Özel Bulut) tasarlarken:
1.  **Çakışmayın (Don't overlap)**: VPC CIDR'ınızın (`10.0.0.0/16`), şirket içi ağınızla veya peer etmeyi planladığınız diğer VPC'lerle çakışmadığından emin olun.
2.  **Alt Ağlara Bölme (Subnetting)**: VPC'yi subnetlere bölün.
    - `10.0.1.0/24` -> Public Subnet A
    - `10.0.2.0/24` -> Private Subnet A
3.  **Yer Ayırın**: Tüm IP'leri hemen kullanmayın.
