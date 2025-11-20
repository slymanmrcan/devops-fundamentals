# AWS Lambda Nedir?

AWS Lambda, Amazon Web Services (AWS) tarafından sunulan, sunucu yönetimi gerektirmeyen (**Serverless**) bir bilgi işlem servisidir. Kısaca özetlemek gerekirse: **"Sunucuyla uğraşma, sadece kodunu çalıştır."**

## 1. Temel Özellikleri

Normalde bir kod çalıştırmak için bir sunucu (EC2 vb.) kiralar, işletim sistemi kurar, gerekli kütüphaneleri yükler ve kodunuzu çalıştırırsınız. Sunucu boş dursa bile parasını ödersiniz.

**Lambda'da ise:**
*   **Sunucu Yok (Serverless):** Altyapı yönetimi, yama (patch) geçme, işletim sistemi güncelleme gibi dertler yoktur.
*   **Kullandığın Kadar Öde:** Kodunuzun çalıştığı süre (milisaniye) ve tetiklenme sayısı kadar ücret ödersiniz. Kod çalışmıyorsa fatura 0'dır.
*   **Otomatik Ölçeklendirme (Auto-scaling):** Trafik artarsa AWS otomatik olarak kodunuzun binlerce kopyasını aynı anda çalıştırır. Trafik azalınca otomatik kapanır.

## 2. Neler Yapılır? (Kullanım Senaryoları)

Lambda "tetikleyici" (event-driven) mantığıyla çalışır. Yani "Şu olay gerçekleşince bu kodu çalıştır" prensibi geçerlidir.

### a. API Backend'i Oluşturma
*   **Senaryo:** Bir web sitesi veya mobil uygulama için backend yazmak.
*   **Akış:** Kullanıcı bir butona basar -> İstek **API Gateway**'e gelir -> API Gateway **Lambda**'yı tetikler -> Lambda işlemi yapar ve cevabı döner.
*   **Avantaj:** Sunucu yönetimi olmadan ölçeklenebilir bir API'niz olur.

### b. Dosya İşleme (S3 Tetikleyicisi)
*   **Senaryo:** Kullanıcıların yüklediği resimleri otomatik olarak küçültmek (thumbnail).
*   **Akış:** Kullanıcı **S3 Bucket**'ına resim yükler -> S3, **Lambda**'yı tetikler -> Lambda resmi işler ve kaydeder.

### c. Zamanlanmış Görevler (Cron Jobs)
*   **Senaryo:** Her gece veritabanı yedeği almak veya rapor göndermek.
*   **Akış:** **Amazon EventBridge** (eski adıyla CloudWatch Events) zamanı gelince **Lambda**'yı tetikler -> Lambda görevini yapar ve kapanır.
*   **Avantaj:** Sadece günde 1 kez çalışacak bir iş için 7/24 sunucu açık tutmanıza gerek kalmaz.

### d. Veri Tabanı Olayları
*   **Senaryo:** Yeni bir sipariş geldiğinde bildirim göndermek.
*   **Akış:** **DynamoDB** tablosuna yeni kayıt düşer -> DynamoDB Streams **Lambda**'yı tetikler -> Lambda müşteriye SMS/E-posta gönderir.

## 3. Basit Bir Örnek (Python)

Aşağıda, kendisine gönderilen isme "Merhaba" diyen basit bir Python Lambda fonksiyonu bulunmaktadır.

```python
import json

def lambda_handler(event, context):
    """
    AWS Lambda Handler Fonksiyonu
    
    Args:
        event (dict): Tetikleyiciden gelen veri (örn: API parametreleri)
        context (object): Çalışma ortamı bilgileri ve metadatalar
    """
    
    # Event içinden 'isim' parametresini al, yoksa 'Misafir' kullan
    isim = event.get('isim', 'Misafir')
    
    mesaj = f"Selam {isim}, Lambda dünyasına hoş geldin!"
    
    # API Gateway için uygun formatta dönüş
    return {
        'statusCode': 200,
        'body': json.dumps(mesaj)
    }
```

## Özet

Eğer uygulamanız sürekli (7/24) yüksek işlemci gücü gerektirmiyorsa, kesintili trafik alıyorsa veya sadece belirli olaylara tepki vermesi gerekiyorsa; **AWS Lambda** hem maliyet hem de operasyonel yük açısından mükemmel bir çözümdür.
