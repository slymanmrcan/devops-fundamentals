# Troubleshooting Tools: The DevOps Toolkit

## 1. Connectivity & Reachability

### `ping`
Checks if a host is reachable (ICMP).
```bash
ping google.com
```
*Note: Many firewalls block ICMP, so a fail doesn't always mean the server is down.*

### `telnet` / `nc` (netcat)
Checks if a specific **TCP Port** is open.
```bash
nc -zv google.com 443
# Connection to google.com port 443 [tcp/https] succeeded!
```
*Crucial for debugging "Connection Refused" or Timeout errors.*

---

## 2. DNS Debugging

### `nslookup` / `dig`
Query DNS records.
```bash
dig google.com A
dig google.com MX +short
```
*Use this when you suspect DNS propagation issues.*

---

## 3. Path & Latency

### `traceroute`
Shows every hop (router) between you and the destination.
```bash
traceroute google.com
```
*Helps identify WHERE the connection is dropping (ISP, Backbone, or Destination).*

---

## 4. Listening Ports (On the Server)

### `netstat` / `ss`
See what ports your server is listening on.
```bash
ss -tulpn
# Shows TCP/UDP, Listening, Process Name, Numeric ports
```
*Use this to verify your app actually started and bound to the correct port.*

### `lsof`
List Open Files (and network sockets).
```bash
lsof -i :80
# Shows which process is holding port 80
```

---

## 5. Data Inspection

### `curl`
The swiss-army knife for HTTP.
```bash
curl -I https://example.com       # Headers only
curl -v https://example.com       # Verbose (Handshake info)
curl -L https://example.com       # Follow redirects
```

### `tcpdump`
Capture actual packets. Hardcore debugging.
```bash
tcpdump -i eth0 port 80
```
*Use when you need to see the raw data on the wire.*
