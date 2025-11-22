# Verified Commit/Tag Rehberi (GPG ve SSH İmza)

GitHub’daki “Verified” rozetini almak için commit/tag imzalama adımlarının ayrıntılı özeti. Kurumsal repo/policy’lerinizi kontrol etmeyi unutmayın.

---

## Seçim: GPG mi SSH mi?
- **GPG:** Klasik, yaygın; e-posta eşleştirmesine dikkat edin.
- **SSH:** Daha basit; mevcut SSH anahtarınızı imza için de kullanırsınız.

Her iki yolda da public key’i GitHub’a eklemek zorundasınız.

---

## 1) GPG ile İmzalı Commit/Tag
### Anahtar Oluştur / Listele
```bash
gpg --full-generate-key                       # yoksa oluştur
gpg --list-secret-keys --keyid-format=long    # KEYID burada
```

### Git Konfigürasyonu
```bash
git config --global user.signingkey <KEYID>
git config --global commit.gpgsign true   # tüm commitleri imzala (istersen proje bazında yap)
```

### Public Key’i GitHub’a Ekle
```bash
gpg --armor --export <KEYID>
```
Çıktıyı GitHub > Settings > SSH and GPG keys > **New GPG key** alanına yapıştır.

### İmzalı Commit / Tag
```bash
git commit -S -m "İmzalı commit"
git tag -s v1.0.0 -m "İmzalı tag"
git push origin main --tags
```

### Yaygın Hatalar (GPG)
- **“gpg failed to sign the data”:** gpg-agent çalışmıyorsa `gpgconf --kill gpg-agent`; macOS’ta pinentry sorunlarını kontrol et.
- **E-posta uyuşmazlığı:** GPG anahtarındaki e-posta, GitHub hesabındaki e-postayla eşleşmeli (veya doğrulanmış alternate e-posta).

---

## 2) SSH ile İmzalı Commit/Tag
### SSH Anahtarı (ed25519 önerilir)
```bash
ssh-keygen -t ed25519 -C "email@example.com"
```

### Public Key’i GitHub’a “Signing key” olarak ekle
GitHub > Settings > SSH and GPG keys > **New SSH key** (Key type: Signing key). `id_ed25519.pub` içeriğini ekle.

### Git Konfigürasyonu
```bash
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
```

### İmzalı Commit / Tag
```bash
git commit -S -m "SSH ile imzalı commit"
git tag -s v1.1.0 -m "SSH ile imzalı tag"
git push origin main --tags
```

### Yaygın Hatalar (SSH)
- **“cannot find public ssh key”:** `user.signingkey` yolu hatalı; `.pub` dosyasına işaret ettiğinden emin ol.
- **Yetki hatası:** Signing key olarak eklediğiniz public key’in aynı private anahtarla eşleştiğini kontrol edin (`ssh -i ~/.ssh/id_ed25519 git@github.com` ile test edebilirsiniz).

---

## 3) Proje Bazlı Ayar (Opsiyonel)
Global yerine repo içinde ayarlamak için:
```bash
git config user.signingkey <KEYID veya ~/.ssh/id_ed25519.pub>
git config commit.gpgsign true
```

---

## 4) Doğrulama
```bash
git log --show-signature -1
```
GitHub’da PR veya commit sayfasında “Verified” rozeti görünmelidir.

---

## 5) İpuçları
- CI/CD’de imza gerekiyorsa: runner’da anahtarları güvenli saklayın (örn. secrets + `gpg --import` veya SSH key injection).  
- `--force-with-lease` kullanın (rebase sonrası push).  
- Tag’ları da imzalayın (release güvenilirliği).
