# OSI & TCP/IP Modelleri: Temeller

## 1. OSI Modeli (Open Systems Interconnection)
Ağ etkileşimlerini 7 katmanda anlamak için kullanılan kavramsal bir çerçevedir.

| Katman | İsim | Veri Birimi | İşlev | DevOps İlgisi |
| :--- | :--- | :--- | :--- | :--- |
| **7** | **Application** (Uygulama) | Veri | Ağ sürecinden uygulamaya (HTTP, SSH, FTP). | **Yüksek**: API'ler, Web Sunucuları. |
| **6** | **Presentation** (Sunum) | Veri | Veri gösterimi ve şifreleme (SSL/TLS). | **Orta**: Kodlama (Encoding), Serileştirme. |
| **5** | **Session** (Oturum) | Veri | Hostlar arası iletişim. | **Düşük**: RPC, Soketler. |
| **4** | **Transport** (Taşıma) | Segment | Uçtan uca bağlantılar ve güvenilirlik (TCP/UDP). | **Yüksek**: Portlar, Yük Dengeleme. |
| **3** | **Network** (Ağ) | Paket | Yol belirleme ve IP adresleme (Routerlar). | **Yüksek**: IP, Subnetler, VPC'ler. |
| **2** | **Data Link** (Veri Bağlantısı) | Çerçeve (Frame) | Fiziksel adresleme (MAC, Switchler). | **Düşük**: ARP, VLAN'lar (çoğunlukla bulut yönetir). |
| **1** | **Physical** (Fiziksel) | Bit | Medya, sinyal ve ikili iletim. | **Düşük**: Kablolar, Wifi (Bulut bunu soyutlar). |

> **Akılda Tutma Yöntemi**: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way.

---

## 2. TCP/IP Modeli
İnternet tarafından kullanılan pratik modeldir, OSI'yi 4 katmana indirger.

1.  **Application** (OSI 5, 6, 7): HTTP, DNS, SSH.
2.  **Transport** (OSI 4): TCP, UDP.
3.  **Internet** (OSI 3): IP, ICMP.
4.  **Network Access** (OSI 1, 2): Ethernet, Wi-Fi.

---

## 3. TCP vs UDP (Katman 4)

### TCP (Transmission Control Protocol)
- **Bağlantı odaklı (Connection-oriented)**: Veri göndermeden önce bir oturum kurar.
- **Güvenilir (Reliable)**: Teslimatı (ACK'lar) ve sırayı garanti eder.
- **Ağır (Heavy)**: Ek yük (overhead) nedeniyle daha yavaştır.
- **Kullanım Alanları**: Web (HTTP), E-posta (SMTP), Dosya Transferi (FTP), SSH.

**3 Yönlü El Sıkışma (3-Way Handshake)**:
1.  **SYN**: İstemci sorar "Bağlanabilir miyim?"
2.  **SYN-ACK**: Sunucu der ki "Evet, hazırım."
3.  **ACK**: İstemci der ki "Tamam, şimdi bağlanıyorum."

### UDP (User Datagram Protocol)
- **Bağlantısız (Connectionless)**: Gönder ve unut.
- **Güvenilmez (Unreliable)**: Teslimat veya sıra garantisi yoktur.
- **Hızlı (Fast)**: Düşük ek yük.
- **Kullanım Alanları**: Yayın (Streaming), VoIP, DNS sorguları, Oyun.

---

## 4. Yaygın Portlar
Bunları ezberlemelisiniz.

| Port | Protokol | Servis |
| :--- | :--- | :--- |
| **20/21** | TCP | FTP (Dosya Transferi) |
| **22** | TCP | **SSH** (Güvenli Kabuk) - *Kritik* |
| **53** | TCP/UDP| **DNS** (Alan Adı Sistemi) |
| **80** | TCP | **HTTP** (Web) |
| **443** | TCP | **HTTPS** (Güvenli Web) |
| **3306** | TCP | MySQL / MariaDB |
| **5432** | TCP | PostgreSQL |
| **6379** | TCP | Redis |
| **8080** | TCP | Yaygın HTTP Alternatifi (Tomcat, Jenkins) |
