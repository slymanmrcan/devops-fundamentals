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

---

## Takım Çalışması: PR Akışı (Sıralı)
Çok katılımcılı projede önerilen adımlar:

1) **Güncel kodu çek:**  
   ```bash
   git checkout main
   git fetch origin
   git pull --rebase origin main
   ```
2) **Branch aç ve çalış:**  
   ```bash
   git checkout -b feature/konu
   # değişikliklerini yap
   git add .
   git commit -m "Özet mesaj"
   ```
3) **Branch'i güncel tut:** (Çatışma riskini azaltır)  
   ```bash
   git fetch origin
   git rebase origin/main   # büyük ekipte rebase tercih edilir; istersen merge de kullanabilirsin
   ```
4) **Push ve PR aç:**  
   ```bash
   git push -u origin feature/konu
   ```
   GitHub’da PR oluştur, açıklamaya test adımlarını ekle.
5) **Code review & test:** Branch protection/required checks varsa testler geçmeli. Review sonrası düzeltmeleri push et (rebase yaptıysan `git push --force-with-lease`).
6) **Merge stratejisi:**  
   * Squash merge: Tek commit isterken.  
   * Merge commit: Tarihçe korunacaksa.  
   * Rebase merge: Lineer tarih için küçük ekiplerde.  
   Çakışma olursa lokal çözüp yeniden push et.
7) **Temizlik:** Merge sonrası branch’i sil, lokalde de temizle:  
   ```bash
   git checkout main
   git pull --rebase origin main
   git branch -d feature/konu
   git push origin :feature/konu
   ```

İpuçları:
- PR’ı küçük ve odaklı tut; açıklamaya test sonucu/log/ekran görüntüsü koy.  
- `.gitignore` ile gereksiz dosyaları dışarıda bırak.  
- Büyük ekipte `CODEOWNERS` ve branch protection (review + test) kullan.  
- `git fetch` + `git rebase origin/main` ile PR’ını güncel tutmak, “merge conflict” yükünü azaltır.
