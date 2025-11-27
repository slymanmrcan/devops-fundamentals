# Network İleri Kavramlar

## 1) STP / RSTP ve Edge Port Davranışı
- **Bridge ID**: `Bridge Priority (2 byte) + MAC Address (6 byte)` → toplam 8 byte. Önce priority, eşitse en düşük MAC kök olur.
- **Bridge Priority**: Varsayılan 32768, 4096'lık adımlarla değiştirilir. Root Bridge seçimini belirler.
- **Root Bridge Seçimi**: Öncelik sırasıyla `düşük priority`, ardından `düşük MAC`.
- **RSTP Edge Port**: Uç cihazlara (PC, printer vb.) giden ve direkt Forwarding’e geçen port.
- **Edge Port BPDU Alırsa**: Normal RSTP portuna döner; geçiş sürecine ve olası blocking’e girer.
- **BPDU Guard**: Edge port BPDU alınca portu err-disable yapar; loop riskini engeller.
- **BPDU Filter**: BPDU gönderimini/alımını bastırır; yanlış kullanılırsa loop riski doğar.

## 2) DHCP Özel Alanları ve Havuz Yönetimi
- **Option 66**: TFTP sunucu adı/domain bilgisi.
- **Option 150**: (Cisco ağırlıklı) TFTP sunucusunun IP adresi.
- **Reservation**: Belirli MAC’e hep aynı IP’yi ver.
- **Exclusion Range**: Havuzdan dağıtılmayacak IP aralığı.
- **Scope / Adres Havuzu**: Belirli bir subnet için dağıtılabilir IP seti.
- **Superscope**: Birden fazla scope’u aynı mantıksal grup altında toplar.

## 3) DNS Kayıtları ve Zone’lar
- **Forward vs Reverse Lookup Zone**: Forward → isimden IP; Reverse → IP’den isim.
- **PTR Kaydı**: Sadece Reverse Lookup Zone içinde kullanılır; IP → isim eşlemesi.
- **SOA (Start of Authority)**: Zone’un otorite başlangıcını tanımlar; tüm DNS sunucularını değil, authoritative kaynağı belirtir.
- **NS (Name Server)**: Zone için yetkili DNS sunucularını listeler.

## 4) AAA ve İlgili Protokoller
- **AAA**: Authentication, Authorization, Accounting.
- **RADIUS**: AAA için UDP tabanlı; auth+acct birleşik; şifreleme sadece kimlik bilgisi alanlarında.
- **TACACS+**: AAA için TCP tabanlı; auth/author/acct ayrık; tüm payload şifreli.
- **Diameter**: Modern, TCP/SCTP tabanlı; RADIUS’un yerini almaya yönelik.
- **AAA olmayanlar (karıştırmayın)**: DHCP, DNS, SNMP, OSPF, FTP, GRE, SSH vb.

## 5) Multicast Üyeliği
- **IGMP**: IPv4 multicast grup üyeliği yönetimi.
- **MLD**: IPv6 multicast grup üyeliği (ICMPv6 tabanlı).
- **IGMP vs MLD**: IPv4 vs IPv6 ayrımı; işlev benzer.
- **Katılım Süreci**: İstemci IGMP/MLD report gönderir; router/switch buna göre forwarding ağaçlarını günceller.

## 6) VLAN Temelleri
- **Management VLAN**: Switch yönetimi için kullanılan VLAN.
- **Default VLAN**: Varsayılan genelde VLAN 1.
- **Native VLAN**: 802.1Q trunk üzerinde tag’siz trafiğin ait olduğu VLAN.
- **Access Port**: Tek VLAN üyesi; frame’ler tag’siz taşınır.
- **Trunk Port**: Birden fazla VLAN trafiğini tag’li taşır.
- **“Akışkan/Fluid VLAN”**: Standart bir VLAN türü değildir; yanlış kullanımdan kaçının.

## 7) Tünelleme ve Multicast
- **GRE (Generic Routing Encapsulation)**: Katman 3 tünelleme; multicast/broadcast’ı doğal olarak keşfetmez.
- **Multicast Dinleyiciler**: IGMP/MLD ile router’a katılım bildirir; GRE tüneli üzerinden otomatik keşif beklenmez.

## 8) VLAN Yayılım Protokolleri
- **GVRP (GARP VLAN Registration Protocol)**: IEEE 802.1Q içinde; switch’ler arası VLAN membership bilgisini yayar (standart).
- **VTP (VLAN Trunking Protocol)**: Cisco’ya özel; VLAN database yönetimini merkezileştirir.
- **GVRP vs VTP**: Standart vs proprietary; membership yayılımı vs VLAN database çoğaltma farkı.

## 9) Güvenilirlik ve MTU
- **Ağ Güvenilirliği**: Segmentler kaybolabilir, bozulabilir, sırası değişebilir.
- **TCP Mekanizmaları**: Sequence number, ACK, retransmission, windowing ile güvenilirlik sağlar.
- **MTU (Maximum Transmission Unit)**: Çerçeve boyut limiti; üstünde fragmentation gerekebilir.
- **İlişkili Kavramlar**: Fragmentation, MSS, Path MTU Discovery (PMTUD) ile yol üzerindeki en düşük MTU’nun tespiti.
