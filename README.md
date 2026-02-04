# 🚀 Open Türkçe DevOps Roadmap

> Canlı demo: **https://slymanmrcan.github.io/devops-fundamentals/**
Hoş geldiniz! Bu proje, **DevOps** dünyasına adım atmak veya mevcut bilgilerini derinleştirmek isteyenler için hazırlanmış, tamamen Türkçe ve açık kaynaklı bir **Öğrenme Yol Haritasıdır (Roadmap)**.

Amacımız, karmaşık teknik konuları basitleştirerek, pratik örneklerle ve modern araçlarla donatılmış bir kaynak oluşturmaktır.
Destek verebilirsiniz
---

## 📚 İçerik Haritası

Bu dokümantasyon aşağıdaki ana başlıkları kapsamaktadır:

### 🐧 01. Linux
DevOps mühendisliğinin temeli.
- **Basic**: Komut satırı, izinler, dosya sistemi.
- **Intermediate**: Bash scriptleme, süreç yönetimi, ağ temelleri.
- **Advanced**: Sistem yönetimi, güvenlik, ileri seviye scriptleme.

### 🐳 02. Docker
Konteynerizasyon teknolojisine giriş.
- Docker mimarisi, imajlar, konteynerler ve temel komutlar.

### 🐙 03. Git & GitHub
Versiyon kontrolü ve işbirliği.
- **Temeller**: Init, add, commit, status.
- **Branching**: Dal yönetimi ve merge stratejileri.
- **GitHub**: Remote repolar, PR süreçleri.
- **Advanced**: Rebase, cherry-pick, stash.
- **CI/CD**: GHCR ve GitHub Actions ile otomasyon.

### ⚙️ 04. CI/CD
Sürekli entegrasyon ve teslimat.
- Workflow söz dizimi, ortam değişkenleri, gerçek dünya örnekleri.
- Güvenlik ve kalite taramaları, gizli anahtar yönetimi.

### ☁️ 05. AWS (Amazon Web Services)
Bulut bilişim temelleri.
- **EC2**: Sanal sunucular.
- **S3**: Depolama çözümleri.
- **IAM**: Kimlik ve erişim yönetimi.
- **VPC**: Sanal ağ yapılandırması.
- **Lambda**: Sunucusuz fonksiyonlar.

### ☸️ 06. Kubernetes
Konteyner orkestrasyonu.
- Deployment stratejileri, pod yönetimi ve ölçekleme.
- Servisler, ağ, ConfigMap/Secret yönetimi, Helm.

### 🏗️ 07. Terraform
Infrastructure as Code (IaC).
- Proje yapısı, state yönetimi, modüller.
- AWS ve GitHub yönetimi, ileri seviye akışlar, Cloudflare R2.

### 🌐 08. Network
Ağ temelleri ve güvenliği.
- OSI Modeli, TCP/IP, DNS, HTTP/HTTPS.
- Subnetting, Load Balancing, Firewallar.
- Sorun giderme araçları, protokoller.

### 📈 09. Monitoring
Gözlemlenebilirlik temelleri.
- Prometheus, Grafana, metrik/alerting.

### 🤖 10. Ansible
Yapılandırma yönetimi.
- Envanter, playbook temelleri.

### 🧭 11. Cloud Sözlüğü
Kavram ve servis eşleştirmeleri.
- AWS/Azure/GCP/OCI servis haritası.
- Compute, storage, database, network kavramları.

### 🎯 12. Sertifikasyonlar
Pratik sınav soruları.
- AWS, Linux, Kubernetes, Terraform, Monitoring, CI/CD & GitOps.

### 🧪 13. Interactive Quizzes
Tüm başlıklar için çoktan seçmeli testler.
- Tarayıcıdan çöz: [quiz.html?set=all](13-Interactive-Quizzes/quiz.html?set=all)

### ☁️ 14. Cloudflare
Cloudflare servisleri.
- DNS & SSL, güvenlik/WAF, performans & caching, Workers & Pages, Zero Trust & Tunnels.

---

## 🛠️ Nasıl Çalıştırılır?

Bu dokümantasyon **VitePress** ile yayınlanır.

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run docs:dev
   ```
3. Tarayıcıdan açın:
   `http://localhost:3000`

> Not: Quiz sayfaları `public/13-Interactive-Quizzes/` altında statik olarak servis edilir.

## 🚀 Deploy (GitHub Pages)

`main` branch’e yapılan her push, GitHub Actions ile otomatik olarak build alır ve `gh-pages` branch’ine deploy eder.

1. Repo Settings → Pages → Source: **GitHub Actions**
2. `main` branch’e push yapın.


---

## 🤝 Katkıda Bulunun

Bu proje yaşayan bir dokümandır. Eksik gördüğünüz, düzeltmek istediğiniz veya eklemek istediğiniz konular için lütfen **Pull Request (PR)** göndermekten çekinmeyin!

> "Bilgi paylaştıkça çoğalır."

---

<p align="center">
  Made with ❤️ by <b>Open Türkçe DevOps Community</b>
</p>
