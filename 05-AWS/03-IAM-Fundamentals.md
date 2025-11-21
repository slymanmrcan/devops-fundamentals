# AWS IAM – Kimlik ve Erişim Yönetimi (Identity and Access Management)

## 1. Hangi Sorunu Çözer?
Buluttan Önce: Fiziksel anahtarlarınız, VPN'leriniz ve LDAP sunucularınız vardı.
**IAM ile:** AWS kaynakları için **Kimlik Doğrulama (Authentication)** (Sen kimsin?) ve **Yetkilendirme (Authorization)** (Ne yapabilirsin?) süreçlerini yönetirsiniz. AWS'in "Güvenlik Bekçisi"dir.

## 2. Mimari ve Temel Bileşenler

### Mimari
*   **Global Servis:** IAM globaldir. Oluşturulan Kullanıcılar/Roller tüm bölgelerde (region) anında kullanılabilir.
*   **Root Hesabı:** Oluşturulan ilk kimliktir. Sınırsız yetkiye sahiptir. **Kullanmayın ve kilitleyin.**

### Temel Bileşenler
1.  **Users (Kullanıcılar):** Gerçek kişiler (örn: `alice`, `bob`) veya servis hesapları. Uzun süreli kimlik bilgilerine (şifre veya Erişim Anahtarı) sahiptirler.
2.  **Groups (Gruplar):** Kullanıcı koleksiyonları (örn: `Developers`, `Admins`). İzinleri kullanıcıya değil, gruba atayın.
3.  **Roles (Roller):** Geçici kimlikler. Şunlar tarafından kullanılır:
    *   AWS Servisleri (EC2, Lambda).
    *   Hesaplar arası (Cross-account) erişim.
    *   Federated kullanıcılar (Google/Okta girişi).
4.  **Policies (Politikalar):** İzinleri tanımlayan JSON belgeleri.
    *   **Managed Policies:** AWS tarafından oluşturulur (örn: `AdministratorAccess`).
    *   **Inline Policies:** Doğrudan bir kullanıcıya/role gömülür (Mümkünse kaçının).

## 3. Gerçek Dağıtım Senaryoları

### Senaryo A: EC2 Instance Profili
*   **Amaç:** EC2 üzerindeki bir uygulamanın, anahtarları kod içine gömmeden S3'e dosya yüklemesini sağlamak.
*   **Kurulum:** `S3FullAccess` yetkisine sahip bir IAM Rolü oluşturun. Bunu EC2 instance'ına atayın. Instance üzerindeki AWS SDK'sı geçici kimlik bilgilerini otomatik olarak alır.

### Senaryo B: Hesaplar Arası Erişim (Cross-Account Access)
*   **Amaç:** Dev hesabının, Prod hesabındaki S3 bucket'ından veri okuması gerekiyor.
*   **Kurulum:**
    1.  Prod Hesabı, Dev Hesabı ID'sine güvenen bir Rol (`DevAccessRole`) oluşturur.
    2.  Dev Hesabı Kullanıcısı `DevAccessRole` rolünü üstlenir (assume role).

### Senaryo C: Kimlik Federasyonu (SSO)
*   **Amaç:** Çalışanlar kurumsal Active Directory (AD) ile giriş yapsın.
*   **Kurulum:** AD gruplarını IAM Rolleri ile eşleştirmek için AWS IAM Identity Center (eski adıyla SSO) kullanın.

## 4. Güvenlik En İyi Uygulamaları
1.  **Root'u Kilitleyin:** Root erişim anahtarlarını silin. MFA'yı etkinleştirin. Sadece faturalandırma/hesap kurulumu için kullanın.
2.  **En Az Yetki (Least Privilege):** Sadece gereken izinleri verin (örn: `S3FullAccess` yerine `S3ReadOnly`).
3.  **MFA (Çok Faktörlü Kimlik Doğrulama):** Tüm insan kullanıcılar için MFA'yı zorunlu kılın.
4.  **Kimlik Bilgilerini Döndürün:** Erişim anahtarlarını her 90 günde bir değiştirin.
5.  **Anahtar Değil Rol Kullanın:** Uygulamalar için uzun süreli Erişim Anahtarları yerine IAM Rollerini tercih edin.

## 5. Maliyet Optimizasyonu
*   **IAM Ücretsizdir:** Kullanıcılar, Gruplar, Roller veya Politikalar için ücret ödemezsiniz.
*   **Dolaylı Maliyetler:** IAM kullanıcılarının oluşturduğu kaynaklar (EC2, S3) için ödeme yaparsınız.

## 6. Infrastructure as Code (Terraform)

```hcl
# 1. Kullanıcı Oluştur
resource "aws_iam_user" "dev_user" {
  name = "jdoe"
}

# 2. Politika Oluştur (En Az Yetki)
resource "aws_iam_policy" "s3_read_only" {
  name        = "S3ReadOnlyPolicy"
  description = "Belirli bir bucket için salt okunur erişim"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:GetObject", "s3:ListBucket"]
        Effect   = "Allow"
        Resource = ["arn:aws:s3:::my-app-bucket/*"]
      },
    ]
  })
}

# 3. Politikayı Kullanıcıya Ata
resource "aws_iam_user_policy_attachment" "attach" {
  user       = aws_iam_user.dev_user.name
  policy_arn = aws_iam_policy.s3_read_only.arn
}
```

## 7. AWS CLI Örnekleri

| İşlem | Komut |
| :--- | :--- |
| **Kullanıcı Oluştur** | `aws iam create-user --user-name jdoe` |
| **Erişim Anahtarı Oluştur** | `aws iam create-access-key --user-name jdoe` |
| **Kullanıcıları Listele** | `aws iam list-users` |
| **Mevcut Kimliği Gör** | `aws sts get-caller-identity` (Ben kimim?) |
| **Politika Ata** | `aws iam attach-user-policy --user-name jdoe --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess` |

## 8. Sık Karşılaşılan Sınav Soruları (SAA-C03 / DVA-C02)

**S1: EC2 üzerindeki bir uygulamanın DynamoDB'ye erişmesi gerekiyor. Kimlik bilgilerini yönetmenin en güvenli yolu nedir?**
*   A) Erişim Anahtarlarını `~/.aws/credentials` içine kaydetmek.
*   B) Anahtarları uygulama koduna gömmek.
*   C) Bir IAM Rolü oluşturup EC2 instance'ına atamak. ✅
*   D) Anahtarları özel bir S3 bucket'ında saklamak.
*   *Sebep: Roller, otomatik olarak değişen geçici kimlik bilgileri sağlar. Uzun süreli anahtarları asla instance üzerinde saklamayın.*

**S2: Bir kullanıcıya S3 erişimi vermek istiyorsunuz ancak belirli bir klasöre erişimi reddetmek istiyorsunuz. IAM bunu nasıl değerlendirir?**
*   A) Allow, Deny'ı ezer.
*   B) Deny, Allow'u ezer. ✅
*   C) En son eklenen politika kazanır.
*   D) Gruba bağlıdır.
*   *Sebep: Açık bir DENY (Reddetme) her zaman ALLOW (İzin Verme) kuralını geçersiz kılar.*

**S3: AWS hesabınıza geçici erişim ihtiyacı olan harici bir danışman için hangi IAM varlığı en uygundur?**
*   A) IAM Kullanıcısı
*   B) IAM Grubu
*   C) IAM Rolü ✅
*   D) Root Kullanıcısı
*   *Sebep: Roller geçici erişim içindir. Danışmana üstlenmesi (assume) için bir rol verebilirsiniz.*
