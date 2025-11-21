# Bulut Sözlüğü: Veritabanı (Database)

Veriyi yapısal olarak saklama ve sorgulama yöntemleri.

## 1. İlişkisel Veritabanları (RDBMS / SQL)
**AWS RDS, Azure SQL, Google Cloud SQL**

Tablolar, satırlar ve sütunlardan oluşur. Veriler birbirine sıkı sıkıya bağlıdır (İlişkisel).
- **Motorlar:** MySQL, PostgreSQL, Oracle, SQL Server.
- **Yönetilen Servis (Managed):** Bulut sağlayıcısı yedeklemeyi, güncellemeyi ve ölçeklemeyi sizin yerinize yapar. Siz sadece kullanırsınız.
- **Kullanım:** E-ticaret siteleri, Finans uygulamaları, Müşteri verileri.

## 2. NoSQL Veritabanları
**AWS DynamoDB, Azure Cosmos DB, Google Firestore**

Esnek şemaya sahiptir. Tablo yerine JSON benzeri dokümanlar veya Anahtar-Değer (Key-Value) çiftleri kullanılır.
- **Özellik:** Çok hızlıdır ve yatayda sınırsız büyüyebilir.
- **Kullanım:** Oyun skor tabloları, Sosyal medya akışları, Sepet verisi.

## 3. Bellek İçi Önbellek (In-Memory Caching)
**AWS ElastiCache, Azure Redis Cache**

Veriyi disk yerine RAM'de tutar. Milisaniyenin altında (mikrosaniye) yanıt verir.
- **Kullanım:** Çok sık sorulan sorguları (örn: "En çok satan ürünler") veritabanına gitmeden RAM'den hızlıca getirmek için.

## 4. Veritabanı Taşıma (Migration)
**AWS DMS, Azure Database Migration Service**

Kendi sunucunuzdaki (On-Premise) veritabanını buluta kesintisiz taşımak için kullanılan araçlardır.
- **Özellik:** Kaynak veritabanı çalışmaya devam ederken veriyi kopyalar, son andaki değişiklikleri de senkronize eder.
