# Services & Networking

Kubernetes'te Pod'lar geçicidir (ephemeral). Bir Pod öldüğünde IP adresi değişir. Service'ler, Pod'lara sabit bir IP ve DNS ismi sağlayarak bu sorunu çözer.

## 1. Service Tipleri

### ClusterIP (Varsayılan)
Sadece cluster içinden erişilebilir.
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
Her node üzerinde belirli bir portu (30000-32767) dışarı açar.
```yaml
type: NodePort
```

### LoadBalancer
Cloud provider'ın (AWS, Azure, Google) Load Balancer'ını kullanarak dışarıdan erişim sağlar.
```yaml
type: LoadBalancer
```

## 2. Ingress
HTTP ve HTTPS trafiğini cluster içindeki Service'lere yönlendiren kurallar bütünüdür. Genellikle bir Ingress Controller (örn: Nginx) gerektirir.

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
