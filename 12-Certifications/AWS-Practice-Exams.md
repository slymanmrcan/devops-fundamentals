# AWS Certification Pratik Sınavları (Örnek Setler)

Bu sayfa, AWS Solutions Architect / Developer sınavlarına benzer kısa deneme setleri içerir. Her set bağımsızdır; kolay/orta/zor ayrımı yok, senaryo odaklıdır.

---

## 📘 Örnek Set 1
1) **S3 Güvenliği:** Yanlış silme/overwrite riskini azaltmak için en hızlı adım nedir?  
   A) Bucket Policy ile deny  
   B) Versioning açmak ✅  
   C) MFA Delete  
   D) Replication  
   > Versioning temel koruma sağlar; MFA Delete ek sertleşme sağlar ama hızlı çözüm versioning'dir.

2) **EC2 Maliyet:** Haftada birkaç saat çalışan test ortamı için en uygun fiyat modeli?  
   A) Reserved  
   B) Spot (kesinti riski)  
   C) On-Demand ✅  
   D) Dedicated Host  
   > Kısa süreli ve kesintiye duyarlı değilse On-Demand basit/uygun.

3) **VPC Çıkışı:** Private subnet'teki veri tabanı internete update için çıkacak, inbound kapalı kalacak.  
   A) IGW  
   B) NAT Gateway ✅  
   C) Egress-Only IGW  
   D) VPC Peering  
   > NATGW dışa çıkışı sağlar, içeri bağlantı yoktur.

4) **RDS Yüksek Erişilebilirlik:** Planlı/ plansız kesintide otomatik failover için?  
   A) Single-AZ  
   B) Multi-AZ ✅  
   C) Read Replica  
   D) Snapshot  

5) **SQS + Lambda:** İş yükü artınca Lambda throttling oluyor. İlk iyileştirme?  
   A) Visibility timeout düşür  
   B) Batch size ayarla, eşzamanlılık limitini artır ✅  
   C) FIFO kuyruğu yap  
   D) Dead-letter'ı kapat  

6) **IAM En Az Yetki:** Uygulama sadece S3'e yazacak. En doğru yaklaşım?  
   A) AdministratorAccess  
   B) Inline policy ile sadece PutObject ✅  
   C) PowerUserAccess  
   D) root key  

7) **CloudFront + S3:** Origin'i gizlemek için?  
   A) Bucket public yap  
   B) Origin Access Control/Identity kullan ✅  
   C) Signed URL kapat  
   D) Versioning aç  

8) **EKS Node Güncelleme:** Downtime'sız geçiş için?  
   A) Node grubunu sil  
   B) Yeni node grubu aç, cordon/drain ile taşı, eskisini kaldır ✅  
   C) Master'ı restart et  
   D) ASG'yi kapat  

---

## 📗 Örnek Set 2
1) **Auto Scaling Sağlık Kontrolü:** ELB health check failure oranı yüksek. İlk bakış?  
   A) Launch template  
   B) Health check path/timeout + SG izinleri ✅  
   C) IAM role  
   D) AZ sayısı  

2) **EFS Performansı:** I/O tavan yaptı. Ne yapılır?  
   A) Throughput mode'u Provisioned'a çekmek ✅  
   B) EBS'e geçirmek  
   C) SG değiştirmek  
   D) DNS TTL düşürmek  

3) **DynamoDB Okuma Ölçeği:** Ani artışta throttling var.  
   A) On-demand moda geçirmek veya RCU artırmak + GSI WCU ayarı ✅  
   B) TTL açmak  
   C) Stream kapatmak  
   D) Parti gönderimini durdurmak  

4) **API Gateway + Lambda Soğuk Başlangıç:** Gecikmeyi azaltmak için?  
   A) Cache kapat  
   B) Provisioned Concurrency ✅  
   C) Timeout'u kısalt  
   D) IAM role değiştir  

5) **S3 Event Processing:** Aynı objeye çift işlem olmaması isteniyor.  
   A) SNS publish  
   B) SQS FIFO kuyruğu kullan, deduplication ✅  
   C) Lambda concurrency'i 1 yap  
   D) Lifecycle policy  

6) **RDS Şifre Yönetimi:** Şifre döndürme (rotation) otomasyonu?  
   A) EC2 user data  
   B) Secrets Manager rotation ile Lambda ✅  
   C) Param Store SecureString  
   D) .env  

7) **VPC Peering:** İki VPC'de CIDR çakışması yok, ancak DNS çözümü için?  
   A) Route 53 Resolver inbound/outbound endpoint + rule paylaşımı ✅  
   B) IGW  
   C) NATGW  
   D) Direct Connect  

8) **Kinesis vs SQS:** Sıra ve tekrar oynatma gerekir, multi consumer.  
   A) SQS Standard  
   B) SQS FIFO  
   C) Kinesis Data Streams ✅  
   D) SNS  

---

## 📙 Örnek Set 3
1) **CloudWatch Log Maliyeti:** Yüksek ingest ve saklama. İlk adımlar?  
   A) Retention'ı kısalt, filter pattern ile gereksiz logu azalt, sıkıştırılmış export/archivle ✅  
   B) Daha çok logla  
   C) Hiç tutma  
   D) Metric filter kapat  

2) **ALB WebSocket:** Destekler mi, yapılandırma?  
   A) Desteklemez  
   B) ALB destekler, target group HTTP/HTTPS, idle timeout ayarı önemli ✅  
   C) Sadece NLB  
   D) CloudFront zorunlu  

3) **S3 CRR (Cross-Region Replication):** Ne kopyalanmaz?  
   A) Yeni objeler ✅ (veya versioning kapalıysa)  
   B) Mevcut eski objeler otomatik kopyalanmaz  
   C) Object metadata  
   D) Object ACL  
   > CRR yeni yazılan objeleri kopyalar; mevcut objeler için batch copy gerekir.

4) **Aurora Serverless v2 Kullanım Alanı:**  
   A) Stabil 7/24 yüksek trafik  
   B) Dalgalı/öngörülemez yük, hızlı scale-up/down ✅  
   C) Multi-master şart  
   D) Single-AZ gereklidir  

5) **IAM Policy'de Kısıtlama:** S3 sadece belli prefix'e yazsın.  
   A) Resource: "*"  
   B) Resource: "arn:aws:s3:::bucket/prefix/*" ✅  
   C) Principal "*"  
   D) Condition yok  

6) **Step Functions vs SQS:** Çok adımlı orkestrasyon, hata tekrar denemesi ve dallanma.  
   A) SQS + cron  
   B) Step Functions ✅  
   C) SNS  
   D) EventBridge Rule  

7) **CloudFront Signed URL/ Cookie Kullanımı:**  
   A) Public içerik  
   B) Özel içerik erişimini yetkilendirme ✅  
   C) Origin cache'i kapatmak  
   D) 304 cache  

8) **ECS Fargate Güvenlik:** Konteyner'lar arası yalıtım ve en az yetki?  
   A) HostNetwork  
   B) Task Role ve SG kullan, awsvpc mode ✅  
   C) root user ile çalıştır  
   D) IAM full access  

---

## 📕 Örnek Set 4
1) **Direct Connect Yedeklilik:** Tek bağlantı var, SLA riski.  
   A) BGP kapat  
   B) İkinci bağlantı + farklı cihaz/yer; failover için VPN yedeği ✅  
   C) Route tablosunu sil  
   D) MTU düşür  

2) **WAF Koruması:** Basit bot/SQLi engelleme.  
   A) SG kuralı  
   B) AWS WAF managed rule set + rate limiting ✅  
   C) Shield Advanced kapat  
   D) S3 policy  

3) **Multi-Account Governance:** Standart kurallar/guardrail.  
   A) Manuel SG  
   B) AWS Organizations + SCP + IAM Identity Center, Config Conformance Packs ✅  
   C) Hepsini tek hesapta topla  
   D) IAM user aç  

4) **EBS Anlık Yedek:** Prod veritabanı için RPO düşük istiyor.  
   A) El ile snapshot  
   B) Data Lifecycle Manager veya Backup ile otomatik snapshot politikası ✅  
   C) S3'e kopyala  
   D) EBS'i paylaştır  

5) **Redshift Maliyet:** Nadiren kullanılan cluster.  
   A) RA3 + pause/resume veya serverless kullan ✅  
   B) DC2 cluster  
   C) Her zaman açık tut  
   D) Snapshot kapat  

6) **Glue ETL Performansı:** Küçük job'lar için maliyet ve hız.  
   A) Büyük DPU seç  
   B) Glue 4.0 DPU ve job bookmark + pushdown predicate ✅  
   C) Logları kapat  
   D) Worker sayısını 1'e düşür  

7) **Athena Sorgu Maliyeti:** Maliyet çok.  
   A) Partitioning + compression (Parquet/ORC) + doğru S3 dizinleme ✅  
   B) CSV'de kal  
   C) CTAS kapat  
   D) Tüm dosyaları tek klasöre koy  

8) **EventBridge vs SNS:** Olay yönlendirme/filtreleme ve SaaS entegrasyonu.  
   A) Sadece SNS  
   B) EventBridge event bus + pattern matching ✅  
   C) SQS  
   D) Route 53  
