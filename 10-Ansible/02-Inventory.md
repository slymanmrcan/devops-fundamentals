# Inventory & Configuration

## 1. Inventory Dosyası
Ansible'ın hangi sunuculara bağlanacağını belirttiğimiz dosyadır. Genellikle `/etc/ansible/hosts` veya proje dizininde `hosts` adıyla saklanır.

### INI Formatı
```ini
[webservers]
192.168.1.10
192.168.1.11

[dbservers]
db1.example.com

[all:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=~/.ssh/id_rsa
```

### YAML Formatı
```yaml
all:
  children:
    webservers:
      hosts:
        192.168.1.10:
        192.168.1.11:
    dbservers:
      hosts:
        db1.example.com:
  vars:
    ansible_user: ubuntu
```

## 2. Ad-Hoc Komutlar
Playbook yazmadan hızlıca tek bir komut çalıştırmak için kullanılır.

```bash
# Tüm sunuculara ping at
ansible all -m ping -i hosts

# Web sunucularında uptime kontrolü yap
ansible webservers -a "uptime" -i hosts

# Tüm sunuculara nginx kur
ansible all -m apt -a "name=nginx state=present" --become -i hosts
```
