# CI/CD & GitOps Pratik Sınavları

GitHub Actions / Jenkins / ArgoCD gibi araçlara yönelik kısa denemeler. İki set, senaryo odaklı.

---

## 🚀 Örnek Set 1 (CI/CD)
1) **Secret Sızıntısı:** GitHub Actions loglarında secret görünmesin diye?  
   A) Secret'ı echo et  
   B) Masked secrets + gereksiz debug'u kapat ✅  
   C) Plain text  
   D) repo'ya yaz

2) **Cache:** Bağımlılık cache'i için doğru strateji?  
   A) Rastgele key  
   B) Lockfile checksum + restore-keys ✅  
   C) Tarih  
   D) Hiç kullanma

3) **Matrix Build:** Farklı Node sürümlerinde test için?  
   A) Ayrı workflow  
   B) `strategy.matrix.node: [16,18]` ✅  
   C) Tek job  
   D) Manuel çalıştır

4) **Self-Hosted Runner Güvenliği:**  
   A) Tüm repo'ya açık bırakmak  
   B) Etiket bazlı izin ve izole ortam, minimum token yetkisi ✅  
   C) Root olarak çalıştırmak  
   D) Logları kapatmak

5) **Artifact:** Build çıktısını başka job'da kullanmak için?  
   A) echo  
   B) `actions/upload-artifact` + download ✅  
   C) secrets  
   D) cache

6) **Branch Koruması:** Prod'a direkt push engeli?  
   A) Kapat  
   B) Branch protection + required checks ✅  
   C) Force push aç  
   D) Herkese write

7) **Deploy Adımı:** Başarısız test sonrası deploy'u engellemek için?  
   A) `if: always()`  
   B) `needs: test` ve default fail-fast ✅  
   C) Ayrı workflow  
   D) Manual trigger

8) **Jenkins Credentials:** En az riskli kullanım?  
   A) Pipeline içine gömmek  
   B) Jenkins Credentials Store + withCredentials ✅  
   C) SCM'ye yazmak  
   D) Env sabitlemek

---

## 🚀 Örnek Set 2 (GitOps / ArgoCD)
1) **Sync Policy:** Prod'da istenmeden silme olmasın, manuel onayla çekmek için?  
   A) auto prune  
   B) `syncPolicy: automated` + `selfHeal`  
   C) `syncPolicy: manual` (auto devrede değil) ✅  
   D) Force apply

2) **App of Apps Model:** Avantajı?  
   A) Repo sayısını artırır  
   B) Uygulamaları tek root manifest ile hiyerarşik yönetir ✅  
   C) RBAC'i bozar  
   D) Helm'i kapatır

3) **Health Check Customization:** CRD için ArgoCD health nasıl özelleştirilir?  
   A) Yapılamaz  
   B) Resource Customization/health.lua ile ✅  
   C) RBAC  
   D) Sync wave

4) **Drift Detection:** OutOfSync sürekli yanlış alarm veriyor. İlk kontrol?  
   A) Resource ignoreDifferences ayarı ✅  
   B) Repo public yap  
   C) RBAC kapat  
   D) Namespace sil

5) **Secrets Yönetimi:** GitOps repo'da secret nasıl tutulur?  
   A) Plain yaml  
   B) Sealed Secrets/SOPS veya External Secrets operatörü ✅  
   C) Base64  
   D) README'ye yaz

6) **Sync Waves & Hooks:** DB migration önce, app sonra koşsun?  
   A) Tek manifest  
   B) Sync waves (0->1) veya hooks (PreSync/PostSync) ✅  
   C) auto-prune kapat  
   D) Health kapat

7) **Rollback:** Yanlış versiyon deploy oldu, geri almak için?  
   A) Repo'yu sil  
   B) ArgoCD app history’den önceki revison’a rollback ✅  
   C) Sync policy kapat  
   D) kubectl delete

8) **Multi-Cluster Yönetimi:** Farklı cluster’lara aynı app’i GitOps ile dağıtmak için?  
   A) Tek context  
   B) ArgoCD Cluster Secrets ile target cluster kaydı + app destination cluster/namespace ✅  
   C) Helm values yok  
   D) Kubectl proxy
