# Playbooks

Playbook'lar, Ansible'ın kalbidir. Yapılandırma, dağıtım ve orkestrasyon adımlarını tanımladığımız YAML dosyalarıdır.

## 1. Temel Yapı

```yaml
---
- name: Web Sunucusu Kurulumu
  hosts: webservers
  become: true # Root yetkisi al (sudo)

  tasks:
    - name: Nginx paketini yükle
      apt:
        name: nginx
        state: present
        update_cache: yes

    - name: Nginx servisini başlat ve enable et
      service:
        name: nginx
        state: started
        enabled: yes

    - name: Özel index.html dosyasını kopyala
      copy:
        src: index.html
        dest: /var/www/html/index.html
        mode: '0644'
      notify: Restart Nginx # Handler tetikle

  handlers:
    - name: Restart Nginx
      service:
        name: nginx
        state: restarted
```

## 2. Çalıştırma

```bash
ansible-playbook -i hosts setup-web.yml
```

## 3. Önemli Kavramlar
*   **Tasks:** Sırayla çalıştırılacak görevler.
*   **Modules:** Görevleri yerine getiren kod parçaları (apt, yum, copy, service, file, user...).
*   **Variables:** Değişkenler ({{ degisken_adi }}).
*   **Handlers:** Sadece tetiklendiğinde (notify) çalışan görevler (genellikle restart işlemleri için).
*   **Templates:** Jinja2 şablon motoru ile dinamik dosyalar oluşturma.
