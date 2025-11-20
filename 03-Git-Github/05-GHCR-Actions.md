# GitHub Container Registry (GHCR) & Actions

## 1. GitHub Container Registry (GHCR)
GHCR allows you to host and manage Docker container images within GitHub.

### Login to GHCR
You need a Personal Access Token (PAT) with `write:packages` and `read:packages` scopes.
```bash
export CR_PAT=YOUR_TOKEN
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
```

### Tagging an Image
```bash
docker tag my-app:latest ghcr.io/username/my-app:latest
```

### Pushing an Image
```bash
docker push ghcr.io/username/my-app:latest
```

### Pulling an Image
```bash
docker pull ghcr.io/username/my-app:latest
```

## 2. GitHub Actions for CI/CD
Automate the build and push process using GitHub Actions.

Create a file at `.github/workflows/docker-publish.yml`:

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
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Log in to the Container registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
```

This workflow will:
1. Trigger on push to `main` or tags starting with `v`.
2. Login to GHCR using the automatic `GITHUB_TOKEN`.
3. Build the Docker image.
4. Push the image to GHCR.
