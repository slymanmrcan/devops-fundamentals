# 01 - Terraform'a Giriş

Terraform, altyapınızı (sunucular, veritabanları, ağlar) kod olarak tanımlamanızı sağlayan (**Infrastructure as Code - IaC**) açık kaynaklı bir araçtır.

## Neden Terraform?
1.  **Declarative (Bildirimsel):** "Nasıl" yapılacağını değil, "Ne" istediğinizi yazarsınız.
2.  **Cloud Agnostic:** AWS, Azure, Google Cloud, Kubernetes, GitHub, Cloudflare ve binlerce diğer servisi tek bir dille yönetebilirsiniz.
3.  **State (Durum) Yönetimi:** Mevcut altyapının durumunu takip eder, sadece değişen kısımları günceller.

## Temel Kavramlar

### 1. Provider (Sağlayıcı)
Terraform'un dış servislerle konuşmasını sağlayan eklentilerdir.
```hcl
provider "aws" {
  region = "us-east-1"
}
```

### 2. Resource (Kaynak)
Oluşturmak istediğiniz altyapı parçasıdır (EC2, S3 Bucket, GitHub Repo vb.).
```hcl
resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"
}
```
*Format:* `resource "TÜR" "İSİM"`

### 3. Data Source (Veri Kaynağı)
Mevcut bir kaynağın bilgisini okumak için kullanılır (Read-Only).
```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
}
```

## Nasıl Çalışır?
1.  **Write:** `.tf` dosyalarına kodunuzu yazarsınız.
2.  **Init:** `terraform init` ile gerekli provider'ları indirirsiniz.
3.  **Plan:** `terraform plan` ile ne yapılacağını görürsünüz (Dry Run).
4.  **Apply:** `terraform apply` ile değişiklikleri uygularsınız.
