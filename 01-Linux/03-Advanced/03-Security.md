# 03 - Linux Güvenliği (Security)

Sunucunuzu korumak için temel güvenlik önlemleri.

## SSH Güvenliği (`/etc/ssh/sshd_config`)

SSH, saldırganların ilk hedefidir.
1. **Root girişini kapatın:** `PermitRootLogin no`
2. **Şifre girişini kapatın (Sadece Anahtar):** `PasswordAuthentication no`
3. **Portu değiştirin:** Varsayılan 22 yerine farklı bir port kullanın (örn: 2244).

Değişikliklerden sonra servisi yeniden başlatın: `sudo systemctl restart sshd`

## Güvenlik Duvarı (Firewall)

### UFW (Uncomplicated Firewall)
Ubuntu/Debian'da yaygındır.

```bash
sudo ufw allow 22/tcp       # SSH portuna izin ver
sudo ufw allow 80/tcp       # HTTP portuna izin ver
sudo ufw allow 443/tcp      # HTTPS portuna izin ver
sudo ufw enable             # Güvenlik duvarını aktif et
sudo ufw status             # Durumu kontrol et
```

### Iptables
Daha düşük seviyeli ve karmaşıktır ama her Linux'ta vardır.

## Dosya İzinleri ve Kullanıcılar

- **En Az Yetki Prensibi:** Kullanıcılara ve servislere sadece ihtiyaç duydukları kadar yetki verin.
- Gereksiz kullanıcıları silin.
- `777` izninden kaçının.

## Güncellemeler

Sistemi düzenli güncelleyin.

```bash
sudo apt update && sudo apt upgrade -y   # Debian/Ubuntu
sudo dnf update -y                       # RHEL/CentOS
```

## Fail2Ban

Sürekli yanlış şifre deneyen IP adreslerini otomatik olarak banlayan bir servistir. SSH güvenliği için mutlaka kurulmalıdır.

## Dosya Bütünlüğü

Önemli sistem dosyalarının değişip değişmediğini kontrol eden araçlar (örn: AIDE, Tripwire) kullanın.
