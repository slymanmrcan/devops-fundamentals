# 03 - State (Durum) Yönetimi

Terraform, oluşturduğu kaynakların kimliklerini ve özelliklerini `terraform.tfstate` adlı bir dosyada tutar. Bu dosya Terraform'un beynidir.

## State Nedir?
Terraform her çalıştığında:
1.  Kodunuzu okur.
2.  State dosyasını okur.
3.  Gerçek dünyadaki (Cloud) durumu kontrol eder.
4.  Aradaki farkı bulup sadece gerekeni yapar.

## Local vs Remote State

### Local State (Varsayılan)
State dosyası kendi bilgisayarınızda saklanır.
*   **Risk:** Bilgisayarınız bozulursa altyapıyı yönetemezsiniz.
*   **Risk:** Ekip arkadaşınızla aynı anda çalışamazsınız.

### Remote State (Önerilen)
State dosyası ortak bir yerde (S3, GCS, Terraform Cloud) saklanır.

**S3 Backend Örneği:**

```hcl
# versions.tf
terraform {
  backend "s3" {
    bucket         = "my-company-terraform-state"
    key            = "prod/app.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks" # Kilitleme için (Aynı anda çalışmayı önler)
    encrypt        = true
  }
}
```

## State Komutları

Bazen state dosyasına manuel müdahale gerekir.

*   `terraform state list`: Takip edilen kaynakları listeler.
*   `terraform state show <resource>`: Bir kaynağın detaylarını gösterir.
*   `terraform state mv <old> <new>`: Bir kaynağın adını değiştirdiyseniz, silip yeniden kurmaması için state içinde adını günceller.
*   `terraform state rm <resource>`: Kaynağı silmeden Terraform takibinden çıkarır.
*   `terraform import <resource> <id>`: Terraform ile oluşturulmamış bir kaynağı Terraform yönetimine alır.
