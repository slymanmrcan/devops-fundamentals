# Gerçek Hayat Senaryoları

## 1. Node.js Projesi Build & Test
Bir Node.js projesini her push işleminde test etmek için.

```yaml
name: Node.js CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x] # Farklı versiyonlarda test et

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
```

## 2. Docker Image Build & Push (Docker Hub)
Kodu Docker imajı haline getirip Docker Hub'a göndermek.

```yaml
name: Docker Image CI

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
        
    - name: Build and push
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: user/app:latest
```

## 3. SSH ile Sunucuya Deploy
Basit bir deployment senaryosu. Kodu sunucuya kopyalayıp restart atmak.
Bunun için `appleboy/ssh-action` çok popülerdir.

```yaml
name: Deploy to VPS

on:
  push:
    branches: [ "main" ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Deploy via SSH
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        port: 22
        script: |
          cd /var/www/my-app
          git pull origin main
          npm install
          pm2 restart app
```
