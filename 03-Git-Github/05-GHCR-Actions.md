# GitHub Container Registry (GHCR) & Actions

## 1. GitHub Container Registry (GHCR)
GHCR, Docker konteyner imajlarını GitHub içinde barındırmanızı ve yönetmenizi sağlar.

### GHCR'a Giriş Yapma (Login)
`write:packages` ve `read:packages` yetkilerine sahip bir Personal Access Token (PAT) gereklidir.
```bash
export CR_PAT=TOKENINIZ
echo $CR_PAT | docker login ghcr.io -u KULLANICI_ADI --password-stdin
```

### İmajı Etiketleme (Tagging)
```bash
docker tag my-app:latest ghcr.io/kullaniciadi/my-app:latest
```

### İmajı Gönderme (Pushing)
```bash
docker push ghcr.io/kullaniciadi/my-app:latest
```

### İmajı Çekme (Pulling)
```bash
docker pull ghcr.io/kullaniciadi/my-app:latest
```

## 2. CI/CD İçin GitHub Actions
Derleme (build) ve gönderme (push) sürecini GitHub Actions kullanarak otomatikleştirin.

`.github/workflows/docker-publish.yml` dosyasını oluşturun:

```yaml
name: Docker Build & Publish

on:
  push:
    branches: [ "main" ]
    tags: [ 'v*.*.*' ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Depoyu çek (Checkout)
        uses: actions/checkout@v3

      - name: Container registry'e giriş yap
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Docker için metadata (tag, label) çıkar
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}

      - name: Docker imajını derle ve gönder (Build & Push)
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
```

Bu iş akışı şunları yapacaktır:
1. `main` branch'ine push yapıldığında veya `v` ile başlayan bir tag oluşturulduğunda tetiklenir.
2. Otomatik `GITHUB_TOKEN` kullanarak GHCR'a giriş yapar.
3. Docker imajını derler.
4. İmajı GHCR'a gönderir.
