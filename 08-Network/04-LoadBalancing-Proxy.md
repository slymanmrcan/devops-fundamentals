# Load Balancing & Proxies: Traffic Management

## 1. Load Balancing
Distributing incoming network traffic across multiple servers to ensure reliability and scalability.

### Layer 4 vs Layer 7
| Feature | Layer 4 (Transport) | Layer 7 (Application) |
| :--- | :--- | :--- |
| **Data** | IP & Port | HTTP Headers, Cookies, URL |
| **Speed** | Faster (Packet level) | Slower (Inspects content) |
| **Decisions**| "Send TCP port 80 to Server A" | "Send `/api` to Svc A, `/img` to Svc B" |
| **Examples** | AWS Network Load Balancer (NLB) | AWS Application Load Balancer (ALB), Nginx |

### Algorithms
- **Round Robin**: Sequential (A -> B -> C -> A).
- **Least Connections**: Send to server with fewest active users.
- **IP Hash**: Client IP always goes to same server (Sticky Sessions).

---

## 2. Proxies
Intermediaries between client and server.

### Forward Proxy
- **Sits before**: The Client.
- **Purpose**: Protects the client.
- **Use Case**: Corporate office blocking Facebook, caching common sites, anonymity (VPN).
- **Flow**: Client -> Forward Proxy -> Internet.

### Reverse Proxy
- **Sits before**: The Server.
- **Purpose**: Protects the server.
- **Use Case**: Load balancing, SSL Termination, Caching, hiding backend topology.
- **Flow**: Internet -> Reverse Proxy (Nginx) -> App Server (Node.js).

> **DevOps Standard**: almost ALL web apps run behind a reverse proxy (Nginx, Traefik, HAProxy, or Cloud LB).

---

## 3. SSL Termination
Decrypting HTTPS traffic at the Load Balancer/Proxy level so the backend server only deals with HTTP.
- **Pros**: Offloads CPU intensive encryption from app servers. Centralized certificate management.
- **Cons**: Traffic between LB and App is unencrypted (usually fine in private VPC).
