# Firewalls & Security: Network Defense

## 1. Firewalls
Devices or software that control network traffic based on rules.

### Stateful vs Stateless
- **Stateless (ACLs)**: Checks packets individually. If you allow inbound request, you MUST explicitly allow outbound reply.
    - *Example*: AWS Network ACLs (NACL).
- **Stateful**: Remembers connections. If you allow inbound request (port 80), it automatically allows the return traffic.
    - *Example*: AWS Security Groups, `iptables`.

---

## 2. Cloud Security (AWS Context)
Understanding the difference is critical for DevOps.

| Feature | Security Group (SG) | Network ACL (NACL) |
| :--- | :--- | :--- |
| **Level** | Instance (EC2) | Subnet |
| **Type** | Stateful | Stateless |
| **Rules** | Allow only (Implicit Deny) | Allow and Deny |
| **Order** | All rules evaluated | Numbered order (100, 200) |
| **Use Case**| Primary firewall for apps | Optional extra layer (blocking IPs) |

---

## 3. VPN (Virtual Private Network)
Extending a private network across a public one.

- **Site-to-Site**: Connects an Office Router to a Cloud VPC. Servers talk to servers privately.
- **Client-to-Site**: Remote developer connects laptop to Office/Cloud network.

---

## 4. DDOS (Distributed Denial of Service)
- **Volumetric**: Flooding bandwidth (UDP floods).
- **Protocol**: Exhausting server resources (SYN Flood).
- **Application**: Complex requests (Search queries) to kill CPU.

**Mitigation**:
- **CDN**: Cloudflare/CloudFront absorbs traffic.
- **WAF (Web Application Firewall)**: Blocks malicious HTTP patterns (SQL Injection).
- **Autoscaling**: Absorbs load (expensive).
