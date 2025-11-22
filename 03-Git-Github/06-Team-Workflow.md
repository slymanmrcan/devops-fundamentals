# Takım Çalışması Git Akışı (PR Odaklı, Adım Adım)

Bu rehber, çok katılımcılı projelerde düzenli PR süreci için uygulamalı adımları içerir. “main” korumalı, feature branch ile çalışma varsayımıyla hazırlanmıştır. Fork akışındaki farklar ayrıca belirtilir.

---

## 0) Repo Hazırlığı
```bash
git clone https://github.com/org/repo.git
cd repo
git remote -v             # origin doğrulaması
```
*Fork akışı:* Orijinali “upstream” olarak ekleyin: `git remote add upstream https://github.com/orjinal/repo.git`

## 1) Ana Dalı Güncelle
```bash
git checkout main
git fetch origin
git pull --rebase origin main
# Fork ise: git fetch upstream && git rebase upstream/main
```

## 2) Feature Branch Aç
```bash
git checkout -b feature/kisa-konu
# küçük, odaklı değişiklikler yap
git status
git add .
git commit -m "Kısa ve açıklayıcı mesaj"
```
*İpucu:* Küçük, tek amaçlı PR’lar daha hızlı review edilir.

## 3) Branch’i Güncel Tut
Çatışma riskini azaltmak için düzenli rebase/merge:
```bash
git fetch origin
git rebase origin/main        # lineer tarih (küçük ekipte tercih)
# çatışma çözüldüyse: git rebase --continue
```
Merge tercih ediliyorsa: `git merge origin/main`

## 4) Test ve Lint
CI’da patlamaması için lokal ön kontrol:
```bash
npm test        # örnek
make lint       # örnek
```
Test adımlarını PR açıklamasına yaz.

## 5) Push & PR Aç
```bash
git push -u origin feature/kisa-konu
```
GitHub’da PR oluştur, açıklamaya:
- Ne değişti? Neden?  
- Test adımları/çıktıları  
- SS/gif/log gerekirse

## 6) Code Review Döngüsü
Gelen yorumları düzelt:
```bash
# değişiklikleri yap
git add .
git commit -m "Fix: reviewer feedback"   # veya amend/rebase sonrası
git push                                  # rebase yaptıysan: git push --force-with-lease
```
*Branch protection:* Required checks/reviews tamamlanmalı.

## 7) Merge Stratejisi
- **Squash merge:** Tek commit, temiz tarih (genellikle tercih).  
- **Merge commit:** Ayrıntılı commit geçmişi korunur.  
- **Rebase merge:** Lineer tarih, küçük ekipte.
Çatışma varsa lokal çöz → push.

## 8) Temizlik
```bash
git checkout main
git pull --rebase origin main
git branch -d feature/kisa-konu
git push origin :feature/kisa-konu   # uzak branch sil
```

## 9) Hotfix / Prod Acil Durum
- `main` den `hotfix/konu` branch aç, küçük düzeltmeyi yap.  
- Hızlı test + PR + squash merge.  
- Gerekirse release branch’e cherry-pick.

## 10) Fork Akışı Kısa Özet
```bash
git remote add upstream https://github.com/orjinal/repo.git
git fetch upstream
git checkout main
git rebase upstream/main
git push origin main   # fork’unu güncel tut
```

### Hızlı Kontrol Listesi
- [ ] main’i rebase/merge ile güncelledim  
- [ ] Küçük, odaklı branch açtım  
- [ ] Test/lint çalıştırdım  
- [ ] PR açıklaması + test sonuçları eklendi  
- [ ] Review sonrası gerekiyorsa `--force-with-lease` ile güncelledim  
- [ ] Merge sonrası branch’leri sildim
