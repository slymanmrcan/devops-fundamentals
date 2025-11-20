# 02 - Proje Yapısı ve Best Practices

Terraform projeleri büyüdükçe yönetimi zorlaşır. Standart bir dosya yapısı kullanmak hayat kurtarır.

## Standart Dosya Yapısı

```text
my-project/
├── main.tf       # Ana kaynaklar (Resources)
├── variables.tf  # Değişken tanımları (Input)
├── outputs.tf    # Çıktılar (Output)
├── versions.tf   # Provider ve Terraform versiyon kısıtlamaları
├── terraform.tfvars # Değişken değerleri (Git'e atılmaz!)
└── .gitignore    # Git tarafından yoksayılacaklar
```

### Dosya İçerikleri

**`variables.tf`**: Parametreleri tanımlar.
```hcl
variable "region" {
  description = "AWS Bölgesi"
  default     = "us-east-1"
  type        = string
}
```

**`terraform.tfvars`**: Değerleri atar.
```hcl
region = "eu-central-1"
```

**`outputs.tf`**: İşlem bitince ekrana basılacak veriler.
```hcl
output "server_ip" {
  value = aws_instance.web.public_ip
}
```

## Çoklu Ortam Yönetimi (Environments)

Prod ve Dev ortamlarını ayırmak için klasör yapısı veya Workspaces kullanılır. En temiz yöntem klasör yapısıdır:

```text
infrastructure/
├── modules/          # Tekrar kullanılabilir modüller
│   └── vpc/
│   └── ec2/
├── envs/
│   ├── dev/
│   │   ├── main.tf
│   │   └── terraform.tfvars
│   └── prod/
│       ├── main.tf
│       └── terraform.tfvars
```

## .gitignore
Terraform kullanırken şunları mutlaka `.gitignore` dosyasına ekleyin:

```text
.terraform/
*.tfstate
*.tfstate.backup
*.tfvars
.terraform.lock.hcl
```
