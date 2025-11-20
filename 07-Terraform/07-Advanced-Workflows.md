# 07 - İleri Seviye Teknikler (Advanced Workflows)

Terraform'da ustalaşmak için döngüler, dinamik bloklar ve yaşam döngüsü kurallarını bilmek gerekir.

## 1. Döngüler (`for_each` ve `count`)

### `count`
Basit tekrarlar için kullanılır.
```hcl
resource "aws_instance" "server" {
  count = 3 # 3 tane oluştur
  
  tags = {
    Name = "Server-${count.index}" # Server-0, Server-1, Server-2
  }
}
```

### `for_each`
Liste veya Map üzerinde dönmek için kullanılır (Daha güvenlidir).

```hcl
variable "users" {
  type    = set(string)
  default = ["ahmet", "mehmet", "ayse"]
}

resource "aws_iam_user" "user" {
  for_each = var.users
  name     = each.value
}
```

## 2. Dinamik Bloklar (`dynamic`)
İç içe geçmiş tekrarlı blokları (örn: Security Group kuralları) oluşturmak için kullanılır.

```hcl
variable "ingress_ports" {
  default = [80, 443, 22, 8080]
}

resource "aws_security_group" "web" {
  name = "web-sg"

  # Her port için tek tek ingress yazmak yerine:
  dynamic "ingress" {
    for_each = var.ingress_ports
    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}
```

## 3. Yaşam Döngüsü (`lifecycle`)

Terraform'un oluşturma/silme davranışını değiştirir.

```hcl
resource "aws_instance" "critical" {
  # ...

  lifecycle {
    # 1. Silinmesini engelle (Kazara silmelere karşı)
    prevent_destroy = true

    # 2. Önce yenisini oluştur, sonra eskisini sil (Kesintisiz geçiş)
    create_before_destroy = true

    # 3. Sadece belirli değişiklikleri yoksay
    ignore_changes = [tags]
  }
}
```

## 4. Workspaces (Çalışma Alanları)
Aynı kod ile birden fazla ortam (dev, prod) yönetmek.

```bash
terraform workspace new dev
terraform workspace new prod
terraform workspace select dev
```

Kod içinde kullanımı:
```hcl
resource "aws_instance" "web" {
  instance_type = terraform.workspace == "prod" ? "t3.large" : "t3.micro"
}
```
