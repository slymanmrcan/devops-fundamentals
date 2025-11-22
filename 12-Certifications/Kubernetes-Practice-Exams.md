# Kubernetes Certification Pratik Sınavları (CKA/CKAD tarzı)

İki set halinde senaryo odaklı denemeler. Kolay/orta/zor ayrımı yok; gerçek hayata yakın kısa sorular.

---

## ☸️ Örnek Set 1
1) **CrashLoopBackOff:** Pod her yeniden başlatmada çöküyor. İlk bakış?  
   A) `kubectl get pods`  
   B) `kubectl logs <pod> --previous` ✅  
   C) `kubectl get events`  
   D) `kubectl delete pod`

2) **Image Pull:** Private registry'den image çekilemiyor. Çözüm?  
   A) Pod'a secret environment  
   B) ImagePullSecret oluşturup ServiceAccount'a bağlamak ✅  
   C) Registry'yi public yapmak  
   D) kube-proxy restart

3) **Node Affinity:** Pod'un belirli etikete sahip node'larda koşması için?  
   A) tolerations  
   B) nodeSelector veya nodeAffinity ✅  
   C) taint eklemek  
   D) topologySpreadConstraints

4) **Network Policy:** Sadece aynı namespace içindeki `app=api` podlarına 80/TCP erişim izni?  
   A) Egress policy  
   B) Ingress policy, podSelector `app=api`, namespaceSelector yok, port 80 ✅  
   C) ServiceAccount  
   D) HPA

5) **PVC Bağımlılığı:** Pod Pending, reason: `Unschedulable - no persistent volumes available`.  
   A) PV reclaim policy  
   B) PV yok veya StorageClass provisioning başarısız ✅  
   C) HPA limiti  
   D) Pod priority

6) **Liveness vs Readiness:** Uygulama geç açılıyor, trafik erken gidiyor. Çözüm?  
   A) Liveness kapat  
   B) Readiness probunu artır, initialDelaySeconds ayarla ✅  
   C) Limits'i kaldır  
   D) HPA metriklerini sil

7) **DaemonSet Güncelleme:** Log agent'ı tüm nodlarda yeni versiyonla rolling yapmak için?  
   A) Deployment kullan  
   B) DaemonSet image'ı değiştir, updateStrategy RollingUpdate ✅  
   C) StatefulSet  
   D) Job

8) **Service Erişimi:** Pod kendi servisini çözmüyor. İlk bakış?  
   A) CoreDNS podları, kube-proxy, namespace DNS (svc.namespace.svc.cluster.local) ✅  
   B) Ingress kuralı  
   C) RBAC  
   D) HPA

---

## ☸️ Örnek Set 2
1) **Ingress 404:** Ingress var, response 404. Olası ilk kontrol?  
   A) NodePort  
   B) Ingress controller pod/log ve backend service/port eşleşmesi ✅  
   C) PV boyutu  
   D) HPA hedefi

2) **StatefulSet Headless Service:** Neden kullanılır?  
   A) Load balance için  
   B) Pod'lara stabil DNS (pod-0.svc) sağlamak için ✅  
   C) Log toplamak için  
   D) Secrets yönetimi

3) **kubectl exec başarısız:** "container not found" hatası.  
   A) Image pull hatası  
   B) Pod'da sidecar var, container adı belirtilmeli (`-c`) ✅  
   C) kubelet down  
   D) API kapalı

4) **Job Takibi:** Tek seferlik batch işin başarısını nereden görürsün?  
   A) `kubectl get deploy`  
   B) `kubectl get jobs -w` ve pod logları ✅  
   C) Ingress  
   D) HPA

5) **Pod Priority & Preemption:** Kritik servisin planlanması için?  
   A) `priorityClassName` tanımlayıp yüksek değer vermek ✅  
   B) Limits'i kaldırmak  
   C) Taint eklemek  
   D) NetworkPolicy

6) **Node Drain:** Node'u bakım için boşaltırken?  
   A) `kubectl cordon` + `kubectl drain --ignore-daemonsets --delete-emptydir-data` ✅  
   B) `kubectl stop node`  
   C) `kubectl delete node`  
   D) `kubectl reboot`

7) **Resource Limits:** Pod OOMKilled oluyor. İlk iyileştirme?  
   A) Liveness kapat  
   B) Limit ve request'i uygun artır, JVM/uygulama heap ayarlarını gözden geçir ✅  
   C) HPA eklemek  
   D) Pod'u silmek

8) **kubectl auth can-i:** RBAC testinde `no` sonucu alındı.  
   A) Role/ClusterRole + RoleBinding/ClusterRoleBinding'i ilgili ServiceAccount'a eklemek ✅  
   B) kubeconfig silmek  
   C) API versiyonunu düşürmek  
   D) Namespace silmek
