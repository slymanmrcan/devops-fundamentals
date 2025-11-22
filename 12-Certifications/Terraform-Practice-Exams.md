# Terraform Certification Pratik Sınavları (Associate/Pro tarzı)

İki set halinde senaryo tabanlı sorular. State, module, backend, güvenlik ve politika konularını kapsar.

---

## 🪢 Örnek Set 1
1) **State Paylaşımı:** Ekip halinde aynı projede state çakışmasını önlemek için?  
   A) Lokal state  
   B) State'i Git'e koymak  
   C) Remote backend + locking (S3 + DynamoDB) ✅  
   D) Herkes farklı workspace

2) **Plan/Apply Ayrımı:** CI'da plan, onay sonrası prod apply nasıl yapılır?  
   A) Tek job  
   B) Plan çıktısını artifact yap, manuel onay sonrası `terraform apply plan.out` ✅  
   C) apply --auto-approve  
   D) Tümünü localde çalıştır

3) **Module Versiyonlama:** Harici modülü sabitlemek için?  
   A) Branch adı  
   B) Tag/versiyon referansı ve `~>` gibi constraint ✅  
   C) master  
   D) Lokal path

4) **Sensitive Veri:** tfvars içinde şifre var, çıktıların logda görünmesini engellemek için?  
   A) plain text bırak  
   B) `sensitive = true` output veya var kullan, CI log redaction ✅  
   C) Terraform Cloud kapat  
   D) .gitignore kaldır

5) **Drift Tespiti:** Kaynak dışarıdan değişti. Ne yapmalı?  
   A) `terraform import`  
   B) `terraform state rm`  
   C) `terraform plan` drift'i gösterir, gerekiyorsa taint/apply ✅  
   D) .terraform klasörünü sil

6) **Count vs for_each:** Unique key'lere göre resource oluşturmak için en uygun?  
   A) count  
   B) for_each ✅  
   C) dynamic block  
   D) locals

7) **Provider Sürümü:** Uyumsuz sürüm hatasını önlemek için?  
   A) Provider'ı sabitlemeyin  
   B) `required_providers` ile versiyon constraint ekleyin ✅  
   C) Kendi binary'nizi yazın  
   D) Random çalıştırın

8) **State Temizleme:** Silinen kaynağın state'te kalmasını çözmek için?  
   A) `terraform state rm <address>` ✅  
   B) rm -rf  
   C) import  
   D) apply

---

## 🪢 Örnek Set 2
1) **Workspace Kullanımı:** Çoklu ortam (dev/stage/prod) için uygun mu?  
   A) Evet, state izolasyonu sağlar, ancak farklı konfig için ayrı klasör/repo da düşünülebilir ✅  
   B) Tek workspace yeter  
   C) Workspace loglama içindir  
   D) Production'da kullanılamaz

2) **Policy as Code:** Prod'da her resource'a tag zorunlu olsun. Terraform'da nasıl?  
   A) Elle bakılır  
   B) Sentinel/OPA (TFC/TFE veya Conftest) ile policy ✅  
   C) CI logu  
   D) Telefon

3) **Backend Değiştirme:** Lokal state'ten S3 remote'a geçerken veri kaybı olmadan?  
   A) .tfstate'i sil  
   B) `terraform init -migrate-state` ✅  
   C) apply  
   D) rm -rf .terraform

4) **Resource Taint:** Bir kaynağı yeniden yaratmaya zorlamak için?  
   A) `terraform taint <address>` ✅  
   B) import  
   C) state rm  
   D) fmt

5) **Sıralı Bağımlılık:** İki kaynağın oluşturma sırası manuel nasıl verilir?  
   A) depends_on ✅  
   B) count  
   C) local  
   D) output

6) **Parallelism:** Apply sırasında API limitine takılmamak için?  
   A) `-parallelism` bayrağını düşürmek ✅  
   B) Daha çok worker  
   C) Tüm modülleri sil  
   D) fmt

7) **Backend Şifreleme:** S3 backend'de state güvenliği için?  
   A) Public bucket  
   B) SSE-KMS veya SSE-S3 + bucket policy ile erişim kısıtla ✅  
   C) Şifresiz bırak  
   D) .gitignore'a ekle

8) **TF Vars Aşama:** Ortam bazlı değişken dosyası yüklemek için?  
   A) `terraform apply -var-file=prod.tfvars` ✅  
   B) `terraform load prod`  
   C) `terraform use prod`  
   D) `terraform import prod`
