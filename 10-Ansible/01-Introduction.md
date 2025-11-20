# Ansible Giriş

## 1. Ansible Nedir?
Ansible, açık kaynaklı bir otomasyon aracıdır. Yapılandırma yönetimi (configuration management), uygulama dağıtımı (application deployment) ve görev otomasyonu için kullanılır.
Red Hat tarafından geliştirilmektedir.

## 2. Neden Ansible?
*   **Agentless (Ajan gerektirmez):** Hedef sunuculara herhangi bir yazılım kurmanız gerekmez. SSH üzerinden çalışır.
*   **Basit (YAML):** Playbook'lar YAML formatında yazılır, okunması ve yazılması kolaydır.
*   **Idempotent:** Bir işlemi kaç kez çalıştırırsanız çalıştırın, sonuç değişmez. (Örn: "Apache kur" derseniz, zaten kuruluysa tekrar kurmaya çalışmaz).

## 3. Nasıl Çalışır?
1.  **Control Node:** Ansible'ın kurulu olduğu makine.
2.  **Managed Nodes:** Yönetilen sunucular.
3.  **Inventory:** Yönetilen sunucuların listesi.
4.  **Playbook:** Yapılacak işlerin listesi.

## 4. Kurulum

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install ansible

# MacOS
brew install ansible
```
