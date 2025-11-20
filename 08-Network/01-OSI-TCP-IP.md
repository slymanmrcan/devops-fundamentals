# OSI & TCP/IP Models: The Foundation

## 1. The OSI Model (Open Systems Interconnection)
A conceptual framework used to understand network interactions in 7 layers.

| Layer | Name | Data Unit | Function | DevOps Relevance |
| :--- | :--- | :--- | :--- | :--- |
| **7** | **Application** | Data | Network process to application (HTTP, SSH, FTP). | **High**: APIs, Web Servers. |
| **6** | **Presentation**| Data | Data representation & encryption (SSL/TLS). | **Med**: Encoding, Serialization. |
| **5** | **Session** | Data | Interhost communication. | **Low**: RPC, Sockets. |
| **4** | **Transport** | Segment | End-to-end connections & reliability (TCP/UDP). | **High**: Ports, Load Balancing. |
| **3** | **Network** | Packet | Path determination & IP addressing (Routers). | **High**: IP, Subnets, VPCs. |
| **2** | **Data Link** | Frame | Physical addressing (MAC, Switches). | **Low**: ARP, VLANs (mostly cloud-managed). |
| **1** | **Physical** | Bit | Media, signal, and binary transmission. | **Low**: Cables, Wifi (Cloud abstracts this). |

> **Mnemonic**: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way.

---

## 2. The TCP/IP Model
The practical model used by the Internet, condensing OSI into 4 layers.

1.  **Application** (OSI 5, 6, 7): HTTP, DNS, SSH.
2.  **Transport** (OSI 4): TCP, UDP.
3.  **Internet** (OSI 3): IP, ICMP.
4.  **Network Access** (OSI 1, 2): Ethernet, Wi-Fi.

---

## 3. TCP vs UDP (Layer 4)

### TCP (Transmission Control Protocol)
- **Connection-oriented**: Establishes a session before sending data.
- **Reliable**: Guarantees delivery (ACKs) and order.
- **Heavy**: Slower due to overhead.
- **Use Cases**: Web (HTTP), Email (SMTP), File Transfer (FTP), SSH.

**The 3-Way Handshake**:
1.  **SYN**: Client asks "Can I connect?"
2.  **SYN-ACK**: Server says "Yes, I'm ready."
3.  **ACK**: Client says "Okay, connecting now."

### UDP (User Datagram Protocol)
- **Connectionless**: Fire and forget.
- **Unreliable**: No guarantee of delivery or order.
- **Fast**: Low overhead.
- **Use Cases**: Streaming, VoIP, DNS lookups, Gaming.

---

## 4. Common Ports
You must memorize these.

| Port | Protocol | Service |
| :--- | :--- | :--- |
| **20/21** | TCP | FTP (File Transfer) |
| **22** | TCP | **SSH** (Secure Shell) - *Critical* |
| **53** | TCP/UDP| **DNS** (Domain Name System) |
| **80** | TCP | **HTTP** (Web) |
| **443** | TCP | **HTTPS** (Secure Web) |
| **3306** | TCP | MySQL / MariaDB |
| **5432** | TCP | PostgreSQL |
| **6379** | TCP | Redis |
| **8080** | TCP | Common HTTP Alt (Tomcat, Jenkins) |
