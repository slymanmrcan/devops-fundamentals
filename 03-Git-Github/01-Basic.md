# Git Temelleri - Başlangıç

## 1. Git Nedir?
Git, herhangi bir dosya kümesindeki değişiklikleri izleyen dağıtık bir sürüm kontrol sistemidir. Genellikle yazılım geliştirme sırasında kaynak kodu üzerinde işbirliği yapan programcılar arasındaki çalışmayı koordine etmek için kullanılır.

## 2. Yapılandırma (Configuration)
Başlamadan önce, tüm yerel depolarınız (repository) için kullanıcı bilgilerinizi yapılandırın.

```bash
git config --global user.name "Adınız Soyadınız"
git config --global user.email "email@adresiniz.com"
```

Yapılandırmanızı kontrol edin:
```bash
git config --list
```

## 3. Başlatma (Initialization)
Proje klasörünüzde yeni bir Git deposu başlatın.

```bash
mkdir projem
cd projem
git init
```

## 4. Üç Durum (The Three States)
Git'te dosyalarınızın bulunabileceği üç ana durum vardır:
1. **Modified (Değiştirilmiş):** Dosyayı değiştirdiniz ancak henüz veritabanına işlemediniz (commit etmediniz).
2. **Staged (Hazırlanmış):** Değiştirilmiş bir dosyayı, bir sonraki commit anlık görüntüsüne (snapshot) dahil etmek üzere işaretlediniz.
3. **Committed (İşlenmiş):** Veriler yerel veritabanınızda güvenli bir şekilde saklandı.

## 5. Temel Komutlar

### Durumu Kontrol Etme (Status)
Hangi dosyaların hazırlandığını (staged), değiştirildiğini veya izlenmediğini (untracked) görün.
```bash
git status
```

### Dosya Ekleme (Staging)
Dosyaları hazırlama alanına (staging area) ekleyin.
```bash
# Belirli bir dosyayı ekle
git add dosya.txt

# Mevcut dizindeki tüm dosyaları ekle
git add .
```

### İşleme (Committing)
Değişiklikleri depoya kaydedin.
```bash
git commit -m "İlk commit"
```

### Geçmişi Görüntüleme (History)
Commit geçmişini gösterin.
```bash
git log

# Özet görünüm
git log --oneline
```

### Farkları Görme (Diff)
Henüz hazırlanmamış (staged olmamış) değişiklikleri görün.
```bash
git diff
```
