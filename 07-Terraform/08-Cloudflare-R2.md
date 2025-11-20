# 02 - Cloudflare R2 (S3 Alternatifi)

Cloudflare R2, AWS S3 ile uyumlu (S3-Compatible) çalışan, ancak **Egress (Veri Çıkış) ücreti almayan** bir nesne depolama servisidir. Terraform ile AWS Provider'ını kullanarak R2'yu yönetebilirsiniz.

## Neden R2?
*   **Maliyet:** Veri çıkış ücreti (Egress fee) yoktur. Sadece depolama ve işlem başına ödeme yaparsınız.
*   **Uyumluluk:** S3 API'sini destekler, yani S3 için yazılmış araçların çoğu R2 ile çalışır.
*   **Performans:** Cloudflare'in global CDN ağı üzerinde çalışır.

## Terraform ile R2 Kurulumu

R2, S3 uyumlu olduğu için Terraform'un `aws` provider'ını kullanacağız ancak `endpoints` ayarını Cloudflare'e yönlendireceğiz.

### 1. Provider Ayarları

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "auto" # R2 globaldir, region 'auto' olmalıdır
  
  # Cloudflare API Token bilgileri
  access_key = "CLOUDFLARE_ACCESS_KEY_ID"
  secret_key = "CLOUDFLARE_SECRET_ACCESS_KEY"
  
  skip_credentials_validation = true
  skip_region_validation      = true
  skip_requesting_account_id  = true

  endpoints {
    # Account ID'nizi buraya yazın
    s3 = "https://<ACCOUNT_ID>.r2.cloudflarestorage.com"
  }
}
```

### 2. Bucket Oluşturma

```hcl
resource "aws_s3_bucket" "my_r2_bucket" {
  bucket = "benim-guzel-bucketim" # Global olarak benzersiz olmalı
}

# Bucket Public Erişim Ayarı (Opsiyonel)
# R2'da varsayılan olarak bucket'lar private'tır.
```

### 3. Dosya Yükleme

```hcl
resource "aws_s3_object" "example_file" {
  bucket = aws_s3_bucket.my_r2_bucket.id
  key    = "resimler/logo.png"
  source = "./assets/logo.png"
  
  # Content-Type belirtmek önemlidir, yoksa tarayıcılar dosyayı indirir
  content_type = "image/png"
}
```

## Önemli Notlar
1.  **Account ID:** Cloudflare Dashboard'da R2 sayfasının sağ tarafında "Account ID"nizi bulabilirsiniz.
2.  **API Token:** R2 sayfasında "Manage R2 API Tokens" diyerek "Edit Admin" yetkisine sahip bir token oluşturun. Size `Access Key ID` ve `Secret Access Key` verecektir.
3.  **Region:** R2'da region kavramı yoktur (Global), ancak Terraform AWS provider'ı bir region beklediği için `auto` veya `us-east-1` girilir ve validasyon kapatılır (`skip_region_validation`).

## S3 vs R2 Karşılaştırması

| Özellik | AWS S3 | Cloudflare R2 |
| :--- | :--- | :--- |
| **Depolama Ücreti** | Standart ($0.023/GB) | $0.015/GB |
| **Egress (Çıkış) Ücreti** | Pahalı ($0.09/GB) | **Ücretsiz** |
| **API İstek Ücreti** | Var | Var (Genelde daha ucuz) |
| **Tiering (Katmanlama)** | Var (Glacier vb.) | Sınırlı |
| **Entegrasyon** | AWS servisleriyle tam uyumlu | Cloudflare Workers ile tam uyumlu |
