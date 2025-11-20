# DNS, HTTP & HTTPS: The Web Layer

## 1. DNS (Domain Name System)
The "Phonebook of the Internet". Translates human-readable names (`google.com`) to IP addresses (`142.250.1.1`).

### How it Works (Simplified)
1.  **Browser**: Checks local cache.
2.  **OS**: Checks `/etc/hosts`.
3.  **Resolver**: Asks ISP's DNS server.
4.  **Root Server**: Directs to TLD server (`.com`).
5.  **TLD Server**: Directs to Authoritative Name Server (e.g., AWS Route53).
6.  **Authoritative Server**: Returns the IP.

### Common Record Types
- **A**: Maps Hostname -> IPv4 (`1.2.3.4`).
- **AAAA**: Maps Hostname -> IPv6.
- **CNAME**: Maps Hostname -> Hostname (Alias). *Cannot be used at root domain (@).*
- **MX**: Mail Exchange (Email).
- **TXT**: Text notes (SPF, verification).
- **NS**: Name Server (Who manages this zone?).

---

## 2. HTTP (HyperText Transfer Protocol)
The protocol of the web. Request/Response model.

### HTTP Methods (Verbs)
- **GET**: Retrieve data. (Idempotent).
- **POST**: Create new data.
- **PUT**: Update/Replace data. (Idempotent).
- **PATCH**: Partial update.
- **DELETE**: Remove data.

### HTTP Status Codes
- **2xx (Success)**:
    - `200 OK`: Standard success.
    - `201 Created`: Resource created.
- **3xx (Redirection)**:
    - `301 Moved Permanently`: SEO friendly.
    - `302 Found`: Temporary redirect.
- **4xx (Client Error)**:
    - `400 Bad Request`: Invalid syntax.
    - `401 Unauthorized`: Authentication required.
    - `403 Forbidden`: Authenticated but no permission.
    - `404 Not Found`: Resource doesn't exist.
- **5xx (Server Error)**:
    - `500 Internal Server Error`: App crashed.
    - `502 Bad Gateway`: Upstream server failed (Nginx -> App).
    - `503 Service Unavailable`: Overloaded or maintenance.
    - `504 Gateway Timeout`: Upstream took too long.

---

## 3. HTTPS (Secure)
HTTP over SSL/TLS. Encrypts data in transit.

### TLS Handshake (Simplified)
1.  **Client Hello**: "I support TLS 1.2/1.3".
2.  **Server Hello**: "Let's use TLS 1.3. Here is my Certificate."
3.  **Verification**: Client checks if Certificate is valid (issued by trusted CA, not expired).
4.  **Key Exchange**: They agree on a symmetric session key.
5.  **Secure Session**: All future data is encrypted with the session key.

### Certificates
- **CA (Certificate Authority)**: Trusted entity (e.g., Let's Encrypt, DigiCert).
- **Self-Signed**: Good for dev, triggers browser warnings.
- **Wildcard**: `*.example.com` covers `api.example.com`, `www.example.com`.
