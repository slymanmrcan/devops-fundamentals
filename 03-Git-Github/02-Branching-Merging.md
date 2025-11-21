# Dallanma ve Birleştirme (Branching & Merging)

## 1. Branch (Dal) Nedir?
Bir branch, bağımsız bir geliştirme hattını temsil eder. Varsayılan branch genellikle `main` veya `master` olarak adlandırılır.

## 2. Branch Yönetimi

### Branch'leri Listeleme
```bash
git branch
```

### Branch Oluşturma
```bash
git branch feature-login
```

### Branch Değiştirme (Switch)
```bash
git checkout feature-login
# VEYA (yeni komut)
git switch feature-login
```

### Tek Komutla Oluştur ve Geç
```bash
git checkout -b feature-login
```

### Branch Silme
```bash
git branch -d feature-login
```

## 3. Birleştirme (Merging)
Merging, farklı branch'lerdeki çalışmaları birleştirmenin yoludur.

1. Birleştirme yapmak istediğiniz *hedef* branch'e geçin (genellikle `main`).
   ```bash
   git checkout main
   ```
2. Özellik (feature) branch'ini birleştirin.
   ```bash
   git merge feature-login
   ```

## 4. Merge Çakışmaları (Conflicts)
Çakışmalar, çelişen commit'lere sahip branch'leri birleştirdiğinizde ortaya çıkar ve Git, hangi değişikliklerin dahil edileceğine karar vermek için yardımınıza ihtiyaç duyar.

1. Git, dosyayı çakışmalı (conflicted) olarak işaretler.
2. Dosyayı açın ve çakışma işaretlerini bulun:
   ```text
   <<<<<<< HEAD
   main branch'indeki kod
   =======
   feature-login branch'indeki kod
   >>>>>>> feature-login
   ```
3. Çakışmayı çözmek için dosyayı düzenleyin (işaretleri kaldırın ve doğru kodu tutun).
4. Çözülen dosyayı ekleyin (add).
   ```bash
   git add dosya.txt
   ```
5. Birleştirmeyi commit edin.
   ```bash
   git commit -m "Merge çakışması çözüldü"
   ```
