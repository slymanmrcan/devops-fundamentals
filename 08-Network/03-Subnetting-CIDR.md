# Subnetting & CIDR: IP Management

## 1. IP Addresses (IPv4)
A 32-bit number formatted as four 8-bit blocks (octets).
Example: `192.168.1.1`

### Public vs Private IPs (RFC 1918)
To save addresses, we use private IPs inside networks (LAN/VPC) and public IPs on the internet.

| Class | Range | Use Case |
| :--- | :--- | :--- |
| **Class A** | `10.0.0.0` - `10.255.255.255` | Large Corps / Cloud VPCs |
| **Class B** | `172.16.0.0` - `172.31.255.255` | AWS default, Docker |
| **Class C** | `192.168.0.0` - `192.168.255.255` | Home Routers |

> **NAT (Network Address Translation)**: Allows multiple private IPs to access the internet via one public IP (Gateway).

---

## 2. CIDR (Classless Inter-Domain Routing)
The standard notation for IP ranges: `IP/PrefixLength`.
The **Prefix Length** tells you how many bits are fixed (Network ID). The rest are for Hosts.

### Common CIDR Blocks
| CIDR | Total IPs | Usable IPs (approx) | Use Case |
| :--- | :--- | :--- | :--- |
| `/32` | 1 | 1 | Single Host (Firewall rule) |
| `/30` | 4 | 2 | Point-to-Point link |
| `/28` | 16 | 11-13 | Very small subnet |
| `/24` | 256 | 251-254 | Standard LAN / Subnet |
| `/20` | 4,096 | 4,000+ | Medium VPC |
| `/16` | 65,536 | 65,000+ | Large VPC (Standard AWS max) |
| `/0` | All IPs | All | The Internet (`0.0.0.0/0`) |

### Calculation Example: `/24`
- **IP**: `192.168.1.0/24`
- **Mask**: `255.255.255.0`
- **Network**: `192.168.1.0` (Reserved)
- **Broadcast**: `192.168.1.255` (Reserved)
- **Range**: `192.168.1.1` to `192.168.1.254`

---

## 3. DevOps Context: VPC Design
When designing a VPC (Virtual Private Cloud):
1.  **Don't overlap**: Ensure your VPC CIDR (`10.0.0.0/16`) doesn't overlap with your on-prem network or other VPCs if you plan to peer them.
2.  **Subnetting**: Divide the VPC into subnets.
    - `10.0.1.0/24` -> Public Subnet A
    - `10.0.2.0/24` -> Private Subnet A
3.  **Reserve space**: Don't use all IPs immediately.
