# İleri Seviye Git (Advanced Git)

## 1. Stashing (Zulalama)
Çalışma kopyanızda yaptığınız değişiklikleri geçici olarak rafa kaldırın (stash), böylece başka bir şey üzerinde çalışabilir ve daha sonra geri gelip bunları tekrar uygulayabilirsiniz.

```bash
# Değişiklikleri zulala
git stash

# Zulaları listele
git stash list

# En son zulayı uygula ve listeden sil
git stash pop
```

## 2. Reset vs Revert

### Reset
Mevcut branch işaretçisini geriye taşır. Commit'ler zaten push'lanmışsa **tehlikelidir**.
```bash
# Soft: Değişiklikleri staging (hazırlama) alanında tutar
git reset --soft HEAD~1

# Hard: Değişiklikleri tamamen yok eder
git reset --hard HEAD~1
```

### Revert
Önceki bir commit'in değişikliklerini geri alan *yeni* bir commit oluşturur. Genel (public) tarihçe için güvenlidir.
```bash
git revert <commit-hash>
```

## 3. Rebase
Commit'leri başka bir temel ucun (base tip) üzerine yeniden uygular. Doğrusal bir tarihçe oluşturur.

```bash
# Özellik branch'ine geç
git checkout feature
# Main üzerine rebase et
git rebase main
```
> **Uyarı:** Başkalarının üzerinde çalıştığı genel branch'leri (main gibi) asla rebase etmeyin.

## 4. Cherry Pick
Mevcut commit'lerden bazılarının değişikliklerini seçip uygular.
```bash
git cherry-pick <commit-hash>
```

## 5. Tags (Etiketler)
Tarihçedeki belirli noktaları önemli olarak işaretlemek (örn: sürümler).
```bash
# Etiket oluştur
git tag v1.0.0

# Etiketleri push'la
git push origin --tags
```

## 6. İmzalı (Verified) Commit ve Tag'ler
Commit ve tag'lerin “Verified” görünmesi için GPG veya SSH imzası kullanılabilir.

### GPG ile İmza
1. GPG anahtarı oluştur veya mevcut anahtarı listele:  
   ```bash
   gpg --full-generate-key          # yeni anahtar
   gpg --list-secret-keys --keyid-format=long
   ```
2. Git'i imza anahtarıyla yapılandır:  
   ```bash
   git config --global user.signingkey <KEYID>
   git config --global commit.gpgsign true      # tüm commit'ler imzalı olsun
   ```
3. Public key'i GitHub’a ekle:  
   ```bash
   gpg --armor --export <KEYID>
   ```
   Çıktıyı GitHub > Settings > SSH and GPG keys > New GPG key'e yapıştır.
4. İmzalı commit/tag örneği:  
   ```bash
   git commit -S -m "İmzalı commit"
   git tag -s v1.0.0 -m "İmzalı tag"
   ```

### SSH ile İmza (GitHub destekler)
1. Yeni bir SSH anahtarı oluştur (ed25519 önerilir):  
   ```bash
   ssh-keygen -t ed25519 -C "email@example.com"
   ```
2. Public key'i GitHub > Settings > SSH and GPG keys > New SSH key (Signing key) olarak ekle.
3. Git yapılandır:  
   ```bash
   git config --global gpg.format ssh
   git config --global user.signingkey ~/.ssh/id_ed25519.pub
   git config --global commit.gpgsign true
   ```
4. İmzalı commit/tag:  
   ```bash
   git commit -S -m "SSH ile imzalı commit"
   git tag -s v1.1.0 -m "SSH ile imzalı tag"
   ```

### Notlar
- Kurumsal ortamda, hangi formatın (GPG/SSH) desteklendiğini kontrol edin.
- İmzalı commit'te “Verified” rozetinin çıkması için public key’in GitHub’a eklenmiş olması gerekir.
- `--global commit.gpgsign true` tüm commit’leri imzalar; istersen proje bazında ayarlayabilirsin.
