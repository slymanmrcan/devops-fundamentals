# Sertifikasyon Hazırlık Soruları

Bu bölüm, popüler DevOps sertifikasyon sınavlarına (AWS, Kubernetes, Terraform) hazırlanmanıza yardımcı olacak örnek soruları ve açıklamalı cevapları içerir.

---

## 1. AWS (Solutions Architect / Developer)

### Soru 1: S3 Veri Güvenliği
**Senaryo:** Şirketinizin S3 bucket'ındaki kritik verilerin yanlışlıkla silinmesini veya üzerine yazılmasını engellemek istiyorsunuz. En etkili ve hızlı çözüm nedir?
*   A) Bucket Policy ile herkesin erişimini kapatmak.
*   B) S3 Versioning'i (Sürümleme) etkinleştirmek. ✅
*   C) MFA Delete (Çok Faktörlü Silme) özelliğini açmak.
*   D) Verileri her gece başka bir Region'a kopyalamak.

> **Cevap B:** Versioning, bir dosyanın silinmesi veya değiştirilmesi durumunda eski kopyasını saklar. MFA Delete de iyidir ancak Versioning temel korumadır.

### Soru 2: EC2 Maliyet Optimizasyonu
**Senaryo:** Sadece mesai saatlerinde (09:00-18:00) çalışan bir test ortamınız var. Maliyeti en aza indirmek için hangi fiyatlandırma modelini seçmelisiniz?
*   A) On-Demand Instances (İsteğe Bağlı). ✅
*   B) Reserved Instances (Rezerve Edilmiş).
*   C) Spot Instances.
*   D) Dedicated Hosts.

> **Cevap A:** Günde sadece 9 saat çalışan ve kesintiye tahammülü olan (test) bir sistem için On-Demand mantıklıdır. Spot daha ucuzdur ama sunucu kapanabilir (testler yarım kalabilir). Reserved ise 7/24 kullanım içindir.

### Soru 3: VPC Güvenliği
**Senaryo:** Private Subnet'teki bir veritabanı sunucusunun, güncelleme indirmek için internete erişmesi gerekiyor. Ancak internetten kimse veritabanına erişememeli. Ne kullanmalısınız?
*   A) Internet Gateway (IGW).
*   B) NAT Gateway. ✅
*   C) Egress-Only Internet Gateway.
*   D) VPC Peering.

> **Cevap B:** NAT Gateway, özel ağdaki cihazların dışarı çıkmasına izin verir ama dışarıdan içeriye bağlantı kabul etmez.

---

## 2. Kubernetes (CKA / CKAD)

### Soru 4: Pod Sorun Giderme
**Senaryo:** Bir Pod `CrashLoopBackOff` hatası veriyor. Sorunun nedenini anlamak için hangi komutu kullanmalısınız?
*   A) `kubectl get pods`
*   B) `kubectl describe pod <pod-adı>`
*   C) `kubectl logs <pod-adı> --previous` ✅
*   D) `kubectl delete pod <pod-adı>`

> **Cevap C:** Pod sürekli çöküp yeniden başlıyorsa, `logs` komutu (özellikle `--previous` ile) uygulamanın neden öldüğünü (örn: kod hatası) gösterir. `describe` ise olayları (events) gösterir.

### Soru 5: Service Tipleri
**Senaryo:** Uygulamanızı internete açmak istiyorsunuz ve AWS üzerinde çalışıyorsunuz. Hangi Service tipini kullanmak en kolayıdır?
*   A) ClusterIP
*   B) NodePort
*   C) LoadBalancer ✅
*   D) ExternalName

> **Cevap C:** LoadBalancer tipi, bulut sağlayıcısının (AWS ALB/NLB) yük dengeleyicisini otomatik olarak oluşturur ve trafiği Pod'lara yönlendirir.

---

## 3. Terraform (Associate)

### Soru 6: State Yönetimi
**Senaryo:** Ekip arkadaşınızla aynı Terraform projesinde çalışıyorsunuz. `terraform apply` yaparken birbirinizin değişikliklerini ezmemek için ne yapmalısınız?
*   A) Herkes kendi bilgisayarında state tutmalı.
*   B) State dosyasını Git'e atmalı.
*   C) Remote State (S3 + DynamoDB Locking) kullanmalı. ✅
*   D) Her seferinde yeni klasör açmalı.

> **Cevap C:** Remote State (uzak durum), state dosyasını merkezi bir yerde tutar. DynamoDB kilitlemesi (locking) ise aynı anda iki kişinin yazmasını engeller.

### Soru 7: Plan vs Apply
**Senaryo:** `terraform plan` komutu ne yapar?
*   A) Altyapıyı oluşturur.
*   B) Altyapıyı siler.
*   C) Yapılacak değişikliklerin bir önizlemesini gösterir, hiçbir şeyi değiştirmez. ✅
*   D) Kodunuzdaki hataları düzeltir.

> **Cevap C:** Plan, "Eğer apply dersen şunlar olacak" diyen güvenli bir simülasyondur.

---

## 4. Git & DevOps

### Soru 8: Git Branching
**Senaryo:** `main` branch'inde canlıdaki kod var. Yeni bir özellik geliştirirken `main`'i bozmamak için ne yapmalısınız?
*   A) Doğrudan `main`'e commit atmalı.
*   B) Yeni bir `feature` branch'i açıp orada çalışmalı. ✅
*   C) Kodu Google Drive'a yedeklemeli.
*   D) Başka bir repo oluşturmalı.

> **Cevap B:** Feature branch, ana koddan izole bir çalışma alanı sağlar. İş bitince `main`'e merge edilir (birleştirilir).
