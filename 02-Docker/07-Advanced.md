# İleri Seviye Docker (Advanced)

## 1. Docker Context (Remote Docker)
Kendi bilgisayarınızdaki Docker CLI'ı kullanarak, uzaktaki bir sunucudaki (SSH ile erişilen) Docker Daemon'ı yönetebilirsiniz.

### Nasıl Yapılır?
1.  **Context Oluştur:**
    ```bash
    docker context create remote-server --docker "host=ssh://user@192.168.1.100"
    ```
    *(SSH anahtarınızın ayarlı olması gerekir)*

2.  **Context'i Seç:**
    ```bash
    docker context use remote-server
    ```

3.  **Test Et:**
    ```bash
    docker ps
    ```
    Artık bu komut, yerel makinenizi değil, uzaktaki sunucuyu listeler!

4.  **Geri Dön:**
    ```bash
    docker context use default
    ```

## 2. Docker Daemon Konfigürasyonu (`daemon.json`)
Docker'ın davranışlarını `/etc/docker/daemon.json` dosyası ile değiştirebilirsiniz.

Örnekler:
*   **Log Rotasyonu:** Konteyner loglarının diski doldurmasını engellemek.
    ```json
    {
      "log-driver": "json-file",
      "log-opts": {
        "max-size": "10m",
        "max-file": "3"
      }
    }
    ```
*   **Insecure Registry:** HTTPS olmayan bir registry'e bağlanmak için.
    ```json
    {
      "insecure-registries" : ["myregistry.local:5000"]
    }
    ```

## 3. Güvenlik (Security)

### Rootless Docker
Docker daemon'ı root yetkisi olmadan çalıştırmak, güvenlik risklerini azaltır. Saldırgan konteynerden kaçsa bile (container breakout), sunucuda root yetkisi kazanamaz.

### Resource Limits (Kaynak Sınırlama)
Bir konteynerin tüm sunucuyu kilitlemesini engellemek için CPU ve RAM limiti koyun.

```bash
docker run -d --memory="512m" --cpus="1.0" nginx
```
*   `--memory`: Maksimum RAM kullanımı.
*   `--cpus`: Maksimum CPU çekirdeği kullanımı.

### Read-Only Filesystem
Konteynerin dosya sistemine yazmasını engelleyin (Sadece volume'lere yazabilir).
```bash
docker run --read-only nginx
```
