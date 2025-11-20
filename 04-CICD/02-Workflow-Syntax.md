# Workflow Sözdizimi (Syntax)

GitHub Actions workflowları YAML formatında yazılır. İşte temel bir yapı:

```yaml
name: My First Workflow

# Tetikleyiciler
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

# İşler
jobs:
  build-and-test:
    runs-on: ubuntu-latest # Çalışacağı sanal makine

    steps:
      # 1. Adım: Kodu çek
      - name: Checkout code
        uses: actions/checkout@v3

      # 2. Adım: Node.js kur
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      # 3. Adım: Bağımlılıkları yükle
      - name: Install dependencies
        run: npm install

      # 4. Adım: Testleri çalıştır
        run: npm test
```

## Önemli Anahtar Kelimeler

### `on`
Workflow'un ne zaman çalışacağını belirler.
*   `push`: Bir branch'e push yapıldığında.
*   `pull_request`: PR açıldığında veya güncellendiğinde.
*   `schedule`: Cron zamanlaması ile (örn: her gece).
    ```yaml
    on:
      schedule:
        - cron: '0 0 * * *' # Her gece yarısı
    ```

### `runs-on`
Job'un çalışacağı işletim sistemini belirler.
*   `ubuntu-latest`
*   `windows-latest`
*   `macos-latest`

### `uses`
Hazır bir action kullanmak için. Genellikle `owner/repo@version` formatındadır.

### `run`
Terminal komutu çalıştırmak için.
```yaml
- name: Print Hello
  run: echo "Hello World"
```

### `env`
Ortam değişkenleri tanımlamak için.
```yaml
env:
  NODE_ENV: production
```
