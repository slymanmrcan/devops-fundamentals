# Services & Networking

Kubernetes'te Pod'lar geçicidir (ephemeral). Bir Pod ölünce IP adresi değişir. **Service**, Pod'lara sabit bir sanal IP (ClusterIP) ve DNS adı sağlayarak bu sorunu çözer. Trafik yönlendirme çoğunlukla `kube-proxy` tarafından `iptables`/`ipvs` kurallarıyla yapılır.

---

## 1. Service Tipleri

### ClusterIP (Varsayılan)
Sadece cluster içinden erişilebilir. Microservice içi iletişim için standarttır.
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-backend
spec:
  selector:
    app: backend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: ClusterIP
```

### NodePort
Her node üzerinde sabit bir portu (varsayılan 30000-32767) dışarı açar. Küçük test ortamları için hızlı çözümdür.
```yaml
type: NodePort
```

### LoadBalancer
Cloud provider'ın Load Balancer'ını kullanır ve dışarıdan erişim sağlar. Prod ortamları için standarttır.
```yaml
type: LoadBalancer
```

### ExternalName
Service'i cluster dışındaki bir DNS adına yönlendirir. Trafik cluster dışına gider.
```yaml
type: ExternalName
externalName: api.example.com
```

### Headless Service
`clusterIP: None` ile sabit IP yerine **DNS üzerinden Pod'ların gerçek IP'leri** döner. StatefulSet ve servis discovery için kullanılır.
```yaml
clusterIP: None
```

---

## 2. Port Alanları (Sık Karıştırılanlar)

- **`port`**: Service'in dinlediği port.
- **`targetPort`**: Pod içindeki container portu.
- **`nodePort`**: Node üzerinde açılan port (NodePort/LoadBalancer için).

---

## 3. Selector, Endpoints ve EndpointSlice

Service `selector` ile Pod'ları seçer. Seçilen Pod'ların IP'leri **EndpointSlice** nesnelerine yazılır. Eğer `selector` yoksa, endpoint'leri manuel olarak tanımlamak gerekir.

Kontrol komutları:
```bash
kubectl get svc
kubectl get endpoints
kubectl get endpointslices
kubectl describe svc my-backend
```

---

## 4. DNS ve Service Discovery

Kubernetes DNS formatı:
```
<service>.<namespace>.svc.cluster.local
```
Örnek: `my-backend.default.svc.cluster.local`

Pod içinde sadece `my-backend` yazarak da erişilebilir (aynı namespace ise).

---

## 5. Session Affinity

Aynı client'ın aynı pod'a gitmesini istiyorsanız:
```yaml
sessionAffinity: ClientIP
```

---

## 6. Ingress

Ingress, HTTP/HTTPS trafiğini Service'lere yönlendiren kurallar bütünüdür. **Ingress Controller** (nginx, traefik, haproxy vb.) gerektirir.

### Temel Örnek
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
  - host: myapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-frontend
            port:
              number: 80
```

### TLS (HTTPS) Örneği
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  tls:
  - hosts:
    - myapp.com
    secretName: myapp-tls
  rules:
  - host: myapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-frontend
            port:
              number: 80
```

---

## 7. NetworkPolicy (Trafik Kısıtlama)

Varsayılan olarak tüm Pod'lar birbirine erişebilir. **NetworkPolicy** ile izinleri kısıtlayabilirsiniz.

### Örnek: Sadece `frontend` Pod'ları `backend`'e erişsin
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
```

Not: NetworkPolicy'nin çalışması için CNI eklentisinin (Calico, Cilium vb.) desteklemesi gerekir.

---

## 8. Operasyon ve Sorun Giderme

- **Service endpoint var mı?**
  ```bash
  kubectl get endpoints my-backend
  ```
- **Pod label doğru mu?**
  ```bash
  kubectl get pods --show-labels
  ```
- **Ingress controller ayakta mı?**
  ```bash
  kubectl get pods -n ingress-nginx
  ```
