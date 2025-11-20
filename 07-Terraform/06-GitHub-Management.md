# 06 - GitHub Yönetimi (IaC for Git)

Terraform sadece sunucu kurmak için değildir. GitHub organizasyonunuzu, repolarınızı, takımlarınızı ve kurallarınızı da kod olarak yönetebilirsiniz.

## Provider Kurulumu

```hcl
terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }
}

provider "github" {
  token = "GITHUB_PAT_TOKEN" # Env variable olarak verilmeli
  owner = "sirket-organizasyonu"
}
```

## 1. Repository Oluşturma

```hcl
resource "github_repository" "backend_api" {
  name        = "backend-api"
  description = "Node.js Backend API"
  visibility  = "private"

  has_issues   = true
  has_projects = false
  has_wiki     = false

  allow_merge_commit = false
  allow_squash_merge = true
  allow_rebase_merge = false
}
```

## 2. Takım ve Üye Yönetimi

```hcl
# Takım Oluştur
resource "github_team" "developers" {
  name        = "developers"
  description = "Yazılım Ekibi"
  privacy     = "closed"
}

# Takıma Üye Ekle
resource "github_team_membership" "ahmet" {
  team_id  = github_team.developers.id
  username = "ahmet-dev"
  role     = "member"
}

# Takıma Repo Yetkisi Ver
resource "github_team_repository" "dev_access" {
  team_id    = github_team.developers.id
  repository = github_repository.backend_api.name
  permission = "push" # push, pull, admin, maintain, triage
}
```

## 3. Branch Koruması (Branch Protection)

"Main branch'e kimse doğrudan push atamasın, en az 1 review gereksin" kuralı:

```hcl
resource "github_branch_protection" "main" {
  repository_id = github_repository.backend_api.node_id
  pattern       = "main"

  required_pull_request_reviews {
    dismiss_stale_reviews      = true
    require_code_owner_reviews = true
    required_approving_review_count = 1
  }

  enforce_admins = true # Adminler bile kurala uymak zorunda
}
```
