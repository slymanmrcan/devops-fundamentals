# Ağ Protokolleri ve Kavramları

Bu bölüm, ağ yönetiminin temel taşları olan kritik protokolleri ve kavramları en yalın haliyle açıklar.

## 1. DHCP (Dynamic Host Configuration Protocol)
**"Ağın IP Dağıtıcısı"**

Ağa yeni bir cihaz (telefon, laptop) bağlandığında, ona otomatik olarak kimlik (IP adresi) veren sistemdir.

*   **Nasıl Çalışır? (DORA Süreci):**
    1.  **D**iscover: Cihaz bağırır: "Burada kimse var mı? Bana IP lazım!"
    2.  **O**ffer: DHCP Sunucusu cevap verir: "Sana `192.168.1.50` verebilirim."
    3.  **R**equest: Cihaz: "Tamam, bu IP'yi istiyorum."
    4.  **A**cknowledge: Sunucu: "Anlaştık, bu IP senindir."
*   **Neden Önemli?** Elle tek tek IP girmek zorunda kalmazsınız. IP çakışmalarını önler.

## 2. DNS (Domain Name System)
**"İnternetin Telefon Rehberi"**

İnsanların anlayacağı isimleri (`google.com`), bilgisayarların anlayacağı IP adreslerine (`142.250.1.1`) çevirir.

*   **Örnek:** Tarayıcıya `facebook.com` yazdığınızda, DNS sunucusu "Bu adres `31.13.79.35` numaralı sunucuda" der.
*   **Detay:** Daha fazla bilgi için [DNS, HTTP & HTTPS](08-Network/02-DNS-HTTP-HTTPS.md) dosyasına bakın.

## 3. IPv4 vs IPv6
**"Eski ve Yeni Kimlik Sistemi"**

*   **IPv4 (Eski):** `192.168.1.1` gibi görünür. 32-bitliktir. Adresler tükendiği için yetersiz kalmaktadır.
*   **IPv6 (Yeni):** `2001:0db8:85a3:0000:0000:8a2e:0370:7334` gibi görünür. 128-bitliktir. Neredeyse sınırsız adres sağlar.
*   **Fark:** IPv4 bir şehre yeterken, IPv6 galaksideki her kum tanesine IP verebilir.

## 4. TCP vs UDP
**"Garantili vs Hızlı İletişim"**

*   **TCP (Transmission Control Protocol):**
    *   **Özellik:** Güvenilirdir. Verinin gittiğinden emin olur (İmza karşılığı teslimat).
    *   **Kullanım:** Web siteleri, E-posta, Dosya transferi. (Eksik harf olursa dosya bozulur).
*   **UDP (User Datagram Protocol):**
    *   **Özellik:** Hızlıdır ama garantisizdir. Veriyi atar ve arkasına bakmaz (Mektubu posta kutusuna atıp kaçmak).
    *   **Kullanım:** Canlı yayın, Online oyunlar, Görüntülü konuşma. (Bir kare kaybolsa da yayın devam eder).

## 5. STP (Spanning Tree Protocol)
**"Döngü (Loop) Engelleyici"**

Ağda kabloları yanlışlıkla döngü oluşturacak şekilde takarsanız (Switch A -> Switch B -> Switch A), veri sonsuz döngüye girer ve ağı çökertir (Broadcast Storm).

*   **Görevi:** STP, bu döngüleri fark eder ve yedek yolları otomatik olarak "bloklar". Ana yol koparsa, blokladığı yolu açar.
*   **Özet:** Ağın sigortasıdır.

## 6. VLAN (Virtual Local Area Network)
**"Sanal Odalar"**

Tek bir fiziksel Switch'i, sanal olarak birden fazla Switch gibi kullanmanızı sağlar.

*   **Senaryo:** Bir şirkette Muhasebe ve Yazılım departmanları aynı switch'e bağlı.
*   **Çözüm:**
    *   `VLAN 10`: Muhasebe (Sadece birbirlerini görürler).
    *   `VLAN 20`: Yazılım (Sadece birbirlerini görürler).
*   **Fayda:** Güvenlik ve performans artışı sağlar.

## 7. LACP (Link Aggregation Control Protocol)
**"Kablo Birleştirme / Şerit Artırma"**

İki Switch arasında tek kablo yetmiyorsa (örn: 1 Gbps), birden fazla kabloyu birleştirip tek bir kablo gibi (örn: 2 Gbps) çalıştırır.

*   **Diğer Adları:** Port Channel, Link Aggregation, Bonding.
*   **Fayda:** Hem hız artar hem de bir kablo koparsa diğeri çalışmaya devam eder (Yedeklilik).

## 8. IGMP (Internet Group Management Protocol)
**"Grup Mesajlaşma Yöneticisi"**

Multicast (bir gönderici, çok alıcı) trafiğini yönetir.

*   **Örnek:** Bir IPTV yayını.
*   **Görevi:** Switch'in, yayını sadece izlemek isteyen (gruba üye olan) portlara göndermesini sağlar. İzlemeyenlere gönderip ağı şişirmez.
*   **Snooping:** Switch'in bu konuşmaları dinleyip akıllıca dağıtım yapmasıdır.

## 9. GVRP (GARP VLAN Registration Protocol)
**"Otomatik VLAN Paylaşımı"**

Büyük ağlarda, bir Switch'te VLAN açtığınızda, diğer Switch'lere de tek tek açmanız gerekir. GVRP bunu otomatik yapar.

*   **Görevi:** Switch A'da `VLAN 10` açarsanız, GVRP bunu Switch B ve C'ye "Hey, `VLAN 10` diye bir şey var, siz de ekleyin" diye haber verir.
*   **Not:** Günümüzde yerini daha çok VTP (Cisco) veya MVRP'ye bırakmıştır ama mantık aynıdır.

## 10. Network Erişim Kontrolü - AAA
**"Ağın Güvenlik Görevlisi"**

Ağa kimin gireceğini, ne yapabileceğini ve ne yaptığını takip eder.

1.  **A**uthentication (Kimlik Doğrulama): **"Kimsin?"** (Kullanıcı adı/Şifre, Parmak izi).
2.  **A**uthorization (Yetkilendirme): **"Ne yapabilirsin?"** (Sadece internete mi girebilirsin, yoksa sunuculara da erişebilir misin?).
3.  **A**ccounting (Hesap Tutma): **"Ne yaptın?"** (Saat kaçta girdin, ne kadar veri indirdin?).

*   **Protokoller:** RADIUS, TACACS+.

## 11. Statik ve Dinamik Yönlendirme (Routing)
**"Navigasyon Yöntemleri"**

Router'ların, veriyi A noktasından B noktasına nasıl götüreceğine karar verme şeklidir.

*   **Statik Yönlendirme (Static Routing):**
    *   **Nedir?** Yolu elle yazarsınız. "Hedef X ise, Y kapısından çık."
    *   **Artı:** Basit, güvenli, işlemciyi yormaz.
    *   **Eksi:** Yol koparsa router alternatif bilmez, trafik durur. Küçük ağlar için uygundur.

*   **Dinamik Yönlendirme (Dynamic Routing):**
    *   **Nedir?** Router'lar birbirleriyle konuşur ve haritayı çıkarır. (OSPF, BGP, EIGRP).
    *   **Artı:** Bir yol koparsa, router'lar saniyeler içinde yeni bir rota bulur (Navigasyonun "Rota yeniden oluşturuluyor" demesi gibi).
    *   **Eksi:** Kurulumu karmaşıktır, işlemci gücü harcar. Büyük ağlar ve İnternet için zorunludur.
