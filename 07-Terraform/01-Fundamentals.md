# Terraform: Infrastructure as Code for DevOps

## 1. Introduction
**Terraform** is an open-source Infrastructure as Code (IaC) tool that lets you define both cloud and on-prem resources in human-readable configuration files that you can version, reuse, and share.

### Why Terraform?
- **Declarative**: You say *what* you want, not *how* to do it.
- **Cloud Agnostic**: Supports AWS, Azure, GCP, Kubernetes, and 1000+ others.
- **Stateful**: Tracks resource state to detect drift and plan changes safely.

---

## 2. Core Concepts

### Providers
Plugins that allow Terraform to interact with cloud APIs.
```hcl
provider "aws" {
  region = "us-east-1"
}
```

### Resources
The most important element. Defines a piece of infrastructure.
```hcl
resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t3.micro"
  
  tags = {
    Name = "HelloWorld"
  }
}
```
*Format*: `resource "type" "local_name"`

### Data Sources
Read-only fetches of existing infrastructure.
```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
}
```

---

## 3. State Management
Terraform stores the ID and metadata of resources in a file called **State** (`terraform.tfstate`).

### Local State (Default)
Stored on your laptop.
- **Risk**: If you lose the file, you lose control of the infra.
- **Risk**: No locking (two people can overwrite each other).

### Remote State (Production Standard)
Store state in a shared backend like S3, with locking via DynamoDB.

```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state-prod"
    key            = "app/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks" # Prevents concurrent writes
    encrypt        = true
  }
}
```
> **Best Practice**: NEVER commit `terraform.tfstate` to Git. Add it to `.gitignore`.

---

## 4. Modules
Modules are containers for multiple resources that are used together. They allow you to **DRY** (Don't Repeat Yourself).

### Using a Module
```hcl
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "my-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
}
```

---

## 5. Workspaces
Workspaces allow you to manage multiple environments (dev, staging, prod) with the **same configuration code**.

```bash
terraform workspace new dev
terraform workspace select dev
# Now all resources are created in "dev" state
```

**Tip**: In your code, use `${terraform.workspace}` to switch logic:
```hcl
count = terraform.workspace == "prod" ? 3 : 1
```

---

## 6. Complete AWS Example
A real-world example deploying a web server with security groups.

```hcl
# main.tf

provider "aws" {
  region = "us-east-1"
}

# 1. Create Security Group
resource "aws_security_group" "allow_http" {
  name        = "allow_http"
  description = "Allow HTTP inbound traffic"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 2. Create EC2 Instance
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0" # Amazon Linux 2
  instance_type = "t2.micro"
  security_groups = [aws_security_group.allow_http.name]

  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup python -m SimpleHTTPServer 80 &
              EOF

  tags = {
    Name = "WebServer-${terraform.workspace}"
  }
}

# 3. Output the IP
output "public_ip" {
  value = aws_instance.web.public_ip
}
```

---

## 7. Real CI/CD Integration
Automating Terraform with GitHub Actions.

### Workflow: `terraform.yml`
```yaml
name: "Terraform"

on:
  push:
    branches: [ "main" ]
  pull_request:

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v2

    - name: Terraform Init
      run: terraform init
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

    - name: Terraform Format
      run: terraform fmt -check

    - name: Terraform Plan
      run: terraform plan -input=false
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

    - name: Terraform Apply
      if: github.ref == 'refs/heads/main' && github.event_name == 'push'
      run: terraform apply -auto-approve -input=false
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### Workflow Explanation
1.  **`fmt -check`**: Fails if code isn't formatted correctly.
2.  **`plan`**: Runs on Pull Requests to show what *would* change.
3.  **`apply`**: Only runs when code is merged to `main`.
