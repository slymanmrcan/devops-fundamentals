# Secrets & Variables Yönetimi

CI/CD süreçlerinde API anahtarları, şifreler veya sunucu IP adresleri gibi hassas verileri asla kodun içine (hardcoded) yazmamalıyız. GitHub bunun için **Secrets** ve **Variables** özelliklerini sunar.

## 1. Secrets (Gizli Değişkenler)
Şifrelenmiş verilerdir. Workflow loglarında görünmezler (*** olarak maskelenirler).

### Nasıl Eklenir?
1.  Repo -> Settings -> Secrets and variables -> Actions
2.  "New repository secret" butonuna tıklayın.
3.  İsim (örn: `DOCKER_PASSWORD`) ve değer girin.

### Nasıl Kullanılır?
YAML dosyasında `${{ secrets.SECRET_ADI }}` şeklinde erişilir.

```yaml
- name: Login to Docker Hub
  uses: docker/login-action@v2
  with:
    username: ${{ secrets.DOCKER_USERNAME }}
    password: ${{ secrets.DOCKER_PASSWORD }}
```

## 2. Variables (Değişkenler)
Şifrelenmemiş, düz metin verilerdir (örn: `API_URL`, `APP_ENV`). Loglarda açıkça görülebilir.

### Nasıl Eklenir?
1.  Repo -> Settings -> Secrets and variables -> Actions -> Variables sekmesi.
2.  "New repository variable" butonuna tıklayın.

### Nasıl Kullanılır?
YAML dosyasında `${{ vars.VARIABLE_ADI }}` şeklinde erişilir.

```yaml
- name: Print Environment
  run: echo "Deploying to ${{ vars.APP_ENV }}"
```

## 3. GITHUB_TOKEN
GitHub, her workflow çalıştırıldığında otomatik olarak bir `GITHUB_TOKEN` secret'ı oluşturur. Bu token ile repo üzerinde işlem yapabilirsiniz (örn: release oluşturmak, issue kapatmak).

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
