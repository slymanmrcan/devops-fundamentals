# CI/CD Güvenlik ve Kalite Taramaları

CI/CD sadece kodu build edip deploy etmek değildir; aynı zamanda kodun kalitesini ve güvenliğini de otomatik olarak denetlemelidir. Buna **DevSecOps** denir.

İşte pipeline'ınıza ekleyebileceğiniz en popüler araçlar ve GitHub Actions örnekleri.

## 1. GitHub Advanced Security (CodeQL)
GitHub'ın kendi güvenlik tarama aracıdır. Kodunuzdaki SQL Injection, XSS gibi güvenlik açıklarını bulur.
*   **Maliyet:** Public repolar için ücretsizdir. Private repolar için Enterprise lisans gerektirir.

**Workflow Örneği (`.github/workflows/codeql.yml`):**
```yaml
name: "CodeQL Security Scan"

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      security-events: write # Raporu Security tabına yazmak için gerekli

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Initialize CodeQL
      uses: github/codeql-action/init@v2
      with:
        languages: 'javascript, python' # Projenizin dili

    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v2
```

## 2. SonarQube / SonarCloud (Kod Kalitesi)
Kodunuzdaki "Code Smell"leri, bugları ve güvenlik açıklarını bulur. Ayrıca "Test Coverage" (Test Kapsama) oranını da gösterir.
*   **SonarCloud:** Bulut versiyonu (Public repolar için ücretsiz).
*   **SonarQube:** Kendi sunucunuza kurabileceğiniz versiyon.

**Workflow Örneği:**
```yaml
name: SonarCloud Scan
on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened]
jobs:
  sonarcloud:
    name: SonarCloud
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # SonarCloud için tüm geçmiş gerekli
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

## 3. Trivy (Konteyner Güvenliği)
Docker imajlarınızdaki güvenlik açıklarını (CVE) tarar. "Bu imajda kritik bir açık var mı?" sorusunun cevabıdır.

**Workflow Örneği:**
```yaml
name: Docker Image Scan
on: [push]

jobs:
  build-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Docker Image
        run: docker build -t myapp:${{ github.sha }} .

      - name: Run Trivy Vulnerability Scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:${{ github.sha }}'
          format: 'table'
          exit-code: '1'        # Açık bulunursa pipeline'ı patlat (fail et)
          ignore-unfixed: true  # Henüz yaması olmayan açıkları görmezden gel
          severity: 'CRITICAL,HIGH'
```

## 4. MegaLinter (Her Şey İçin Linter)
Projenizdeki **tüm** dosyaları (JSON, YAML, Markdown, Python, JS, Dockerfile...) tarar ve format hatalarını bulur. Tek bir araçla 50+ linter çalıştırır.

**Workflow Örneği:**
```yaml
name: MegaLinter

on: [push, pull_request]

jobs:
  build:
    name: MegaLinter
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: MegaLinter
        uses: oxsecurity/megalinter@v7
        env:
          # Sadece hataları raporla, düzeltme yapma
          APPLY_FIXES: none
```

## 5. Markdown Link Checker (Dokümantasyon Taraması)
Dokümantasyonunuzdaki (README.md vb.) kırık linkleri (404 veren URL'leri) bulur.

**Workflow Örneği:**
```yaml
name: Check Markdown Links
on: [push]

jobs:
  markdown-link-check:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: gaurav-nelson/github-action-markdown-link-check@v1
```
