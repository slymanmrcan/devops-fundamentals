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
