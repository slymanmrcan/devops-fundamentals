# 05 - Modüller (Modules)

Modüller, Terraform kodunuzu fonksiyonlar gibi paketleyip tekrar kullanmanızı sağlar. "DRY" (Don't Repeat Yourself) prensibi için şarttır.

## Modül Yapısı

Bir modül aslında içinde `.tf` dosyaları olan herhangi bir klasördür.

Örnek: `modules/web-server/`
*   `main.tf`: Kaynakları oluşturur.
*   `variables.tf`: Dışarıdan parametre alır.
*   `outputs.tf`: Dışarıya bilgi verir.

### Modül Tanımlama (modules/web-server/main.tf)
```hcl
resource "aws_instance" "this" {
  ami           = var.ami_id
  instance_type = var.instance_type
  
  tags = {
    Name = var.server_name
  }
}
```

### Modülü Kullanma (Root main.tf)

```hcl
module "my_web_server" {
  source = "./modules/web-server" # Klasör yolu

  # Değişkenleri gönder
  ami_id        = "ami-12345678"
  instance_type = "t2.micro"
  server_name   = "Prod-Server"
}

module "my_dev_server" {
  source = "./modules/web-server"

  ami_id        = "ami-12345678"
  instance_type = "t2.nano" # Farklı parametre
  server_name   = "Dev-Server"
}
```

## Public Registry Modülleri

Tekerleği yeniden icat etmeye gerek yok. Topluluk tarafından yazılmış, AWS tarafından onaylanmış modülleri kullanabilirsiniz.

**Örnek: VPC Modülü**
Sıfırdan VPC yazmak yerine (04. dersteki gibi), hazır modül kullanmak daha güvenli ve hızlıdır.

```hcl
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "my-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
}
```
