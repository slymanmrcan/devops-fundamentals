# CI/CD & GitHub Actions Giriş

## 1. CI/CD Nedir?
**CI (Continuous Integration - Sürekli Entegrasyon):** Geliştiricilerin kod değişikliklerini sık sık (genellikle günde birkaç kez) ana depoya (repository) birleştirmesi sürecidir. Her birleştirme işlemi otomatik build ve test süreçleriyle doğrulanır.

**CD (Continuous Delivery/Deployment - Sürekli Teslimat/Dağıtım):**
*   **Continuous Delivery:** Kodun her an canlıya alınabilir durumda olmasıdır. Canlıya alma işlemi manuel bir onay ile yapılır.
*   **Continuous Deployment:** Kodun testleri geçtikten sonra otomatik olarak canlı ortama (production) alınmasıdır.

## 2. GitHub Actions Nedir?
GitHub Actions, GitHub deposu içinde yazılım geliştirme iş akışlarınızı (workflows) otomatikleştirmenizi sağlayan bir CI/CD platformudur. Kodunuzu build edebilir, test edebilir ve dağıtabilirsiniz.

## 3. Temel Kavramlar

### Workflow (İş Akışı)
Otomatikleştirilmiş bir süreçtir. Bir veya daha fazla `job`'dan oluşur. `.github/workflows` klasöründe YAML dosyası olarak tanımlanır.

### Event (Olay)
Workflow'u tetikleyen eylemdir. Örn: `push`, `pull_request`, `schedule` (zamanlanmış), `workflow_dispatch` (manuel).

### Job (İş)
Bir workflow içindeki adımlar grubudur. Varsayılan olarak job'lar paralel çalışır. Bir job'un diğerine bağımlı olması sağlanabilir (`needs`).

### Step (Adım)
Bir job içindeki tekil görevdir. Bir komut çalıştırabilir (`run`) veya bir action kullanabilir (`uses`).

### Action (Eylem)
Sık yapılan görevleri (örn: git checkout, docker login) tekrar tekrar yazmak yerine kullanılan hazır paketlerdir.
