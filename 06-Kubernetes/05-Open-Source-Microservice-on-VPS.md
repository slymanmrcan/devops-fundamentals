# Free Tier VPS ile Açık Kaynak Mikroservis Çalıştırma (K3s)

Bu bölüm, birkaç ücretsiz/ucuz VPS ile **kendi Kubernetes cluster'ını kurup** açık kaynak bir mikroservisi yayınlamayı anlatır. Basit, çalışır ve gerçek dünyaya yakın bir akış.

---

## 1. Mimari (Minimum)

- **1 Control Plane**: API server ve yönetim işleri.
- **1 Worker**: Uygulama pod'ları.
- Dilersen 1 node ile de başlatabilirsin (hem control-plane hem worker).

Önerilen minimum:
- 2 VPS, Ubuntu 22.04
- 1 vCPU, 1-2 GB RAM

---

## 2. Ağ ve Portlar

Aşağıdaki portlar açık olmalı:

- **22/tcp**: SSH
- **6443/tcp**: Kubernetes API (worker -> control-plane)
- **8472/udp**: Flannel VXLAN (node'lar arası pod ağı)
- **80/443/tcp**: Ingress için dış trafik
- **30000-32767/tcp**: NodePort (opsiyonel)

---

## 3. Control Plane Kurulumu (K3s)

Control-plane node'da:

```bash
curl -sfL https://get.k3s.io | sh -
```

Kontrol:
```bash
sudo kubectl get nodes
```

Worker'lar için token:
```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

---

## 4. Worker Node Ekleme

Worker node'da:

```bash
curl -sfL https://get.k3s.io | \
  K3S_URL=https://<CONTROL_PLANE_IP>:6443 \
  K3S_TOKEN=<NODE_TOKEN> \
  sh -
```

Control-plane üzerinde:
```bash
sudo kubectl get nodes
```

---

## 5. Mikroservis Deploy Etme (Açık Kaynak)

Örnek mikroservis: **podinfo** (hafif, eğitim için ideal).

Aşağıdaki dosyayı `podinfo.yaml` olarak kaydet:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: demo
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: podinfo
  namespace: demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: podinfo
  template:
    metadata:
      labels:
        app: podinfo
    spec:
      containers:
      - name: podinfo
        image: ghcr.io/stefanprodan/podinfo:6.6.1
        ports:
        - containerPort: 9898
        resources:
          requests:
            cpu: "50m"
            memory: "64Mi"
          limits:
            cpu: "250m"
            memory: "256Mi"
---
apiVersion: v1
kind: Service
metadata:
  name: podinfo
  namespace: demo
spec:
  selector:
    app: podinfo
  ports:
  - port: 80
    targetPort: 9898
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: podinfo-ingress
  namespace: demo
spec:
  rules:
  - host: demo.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: podinfo
            port:
              number: 80
```

Uygula:
```bash
kubectl apply -f podinfo.yaml
```

Kontrol:
```bash
kubectl get pods -n demo
kubectl get svc -n demo
kubectl get ingress -n demo
```

---

## 6. Erişim (Domain/Hosts)

- Domain'in yoksa kendi bilgisayarında `/etc/hosts` içine ekleyebilirsin:
  ```
  <WORKER_PUBLIC_IP> demo.example.com
  ```
- Ingress çalışmıyorsa hızlı test için NodePort kullan:
  ```bash
  kubectl -n demo patch svc podinfo -p '{"spec":{"type":"NodePort"}}'
  kubectl -n demo get svc podinfo
  ```

---

## 7. Güncelleme ve Ölçekleme

Yeni versiyon:
```bash
kubectl -n demo set image deploy/podinfo podinfo=ghcr.io/stefanprodan/podinfo:6.7.0
```

Ölçekleme:
```bash
kubectl -n demo scale deploy/podinfo --replicas=4
```

Rollback:
```bash
kubectl -n demo rollout undo deploy/podinfo
```

---

## 8. Sık Problemler

- **Ingress yok**: K3s varsayılan olarak Traefik kurar. Eğer kaldırdıysan tekrar yükle.
- **ImagePullBackOff**: İmaj adı/tag yanlış veya registry erişimi yok.
- **Pod Pending**: Node'da kaynak yok ya da CNI sorunu.

Hızlı kontrol:
```bash
kubectl -n demo describe pod <pod-adi>
kubectl -n demo logs <pod-adi>
```

---

## 9. Notlar ve Gerçekçi Beklenti

- Free tier VPS'ler düşük kaynaklıdır; çok servisli büyük demo'lar zorlar.
- Daha ağır mikroservis örnekleri için daha fazla RAM/CPU gerekir.
- Bu akış, gerçek prod değil ama öğrenme ve PoC için idealdir.
