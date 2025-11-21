# Uzak Depolar (Remote Repositories) & GitHub

## 1. Uzak Depolarla Çalışmak

### Depoyu Klonlama (Cloning)
Uzak bir sunucudan (GitHub gibi) bir depoyu indirin.
```bash
git clone https://github.com/kullaniciadi/repo.git
```

### Uzak Depo Ekleme (Adding Remote)
Yerel bir depoyu uzak bir depoya bağlayın.
```bash
git remote add origin https://github.com/kullaniciadi/repo.git
```

### Uzak Depoları Doğrulama
```bash
git remote -v
```

## 2. Değişiklikleri Eşitleme (Syncing)

### Push (Gönderme)
Yerel branch commit'lerinizi uzak depoya yükleyin.
```bash
git push -u origin main
```

### Pull (Çekme)
Uzak depodaki değişiklikleri indirip yerel branch'inizle birleştirin.
```bash
git pull origin main
```

### Fetch (Getirme)
Başka bir depodan nesneleri ve referansları indirin (otomatik olarak birleştirmez).
```bash
git fetch origin
```

## 3. GitHub İş Akışı

### Forking (Çatallama)
Başkasının deposunun bir kopyasını kendi GitHub hesabınız altında oluşturmaktır.

### Pull Requests (PR)
Bir depoya değişiklik önermektir.
1. Repoyu Fork'layın.
2. Fork'unuzu klonlayın.
3. Bir özellik (feature) branch'i oluşturun.
4. Değişiklik yapın ve commit edin.
5. Fork'unuza push'layın.
6. GitHub üzerindeki orijinal depoda bir Pull Request açın.

### .gitignore
Git'in görmezden gelmesi gereken dosyaları (örn: build çıktıları, loglar, gizli anahtarlar) belirten dosyadır.
```text
# .gitignore örneği
node_modules/
.env
*.log
```
