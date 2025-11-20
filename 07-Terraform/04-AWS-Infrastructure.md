# 04 - AWS Altyapı Örneği (VPC & EC2)

Gerçek dünyada bir sunucu (EC2) tek başına havada durmaz. Bir ağa (VPC), bir alt ağa (Subnet) ve güvenlik kurallarına (Security Group) ihtiyaç duyar.

İşte sıfırdan çalışan bir web sunucusu altyapısı:

## 1. VPC ve Ağ (Network)

```hcl
# VPC: Kendi özel ağımız
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "my-vpc"
  }
}

# Internet Gateway: Dış dünyaya çıkış kapısı
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}

# Subnet: Alt ağ (Public)
resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true # İçindeki sunuculara otomatik IP ver
}

# Route Table: Trafiği yönlendirme
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0" # Tüm trafik
    gateway_id = aws_internet_gateway.gw.id # Gateway'e gitsin
  }
}

# Route Table Association: Subnet ile tabloyu bağla
resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public_rt.id
}
```

## 2. Güvenlik (Security Group)

```hcl
resource "aws_security_group" "web_sg" {
  name        = "web-server-sg"
  description = "Allow HTTP and SSH"
  vpc_id      = aws_vpc.main.id

  # Inbound: Gelen Trafik
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Herkese açık
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound: Giden Trafik (Her şeye izin ver)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

## 3. Sunucu (EC2 Instance)

```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0" # Amazon Linux 2 (Region'a göre değişir!)
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  # Başlangıç Scripti (User Data)
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              echo "Merhaba Terraform!" > /var/www/html/index.html
              EOF

  tags = {
    Name = "Terraform-Web-Server"
  }
}
```
