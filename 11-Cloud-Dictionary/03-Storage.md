# Bulut Sözlüğü: Depolama (Storage)

Verilerinizi nerede ve nasıl sakladığınız, maliyet ve performans için kritiktir.

## 1. Nesne Depolama (Object Storage)
**AWS S3, Azure Blob, Google Cloud Storage**

Dosyaları (resim, video, log, yedek) saklamak için sınırsız bir "kova" (bucket) gibidir. Klasör yapısı yoktur (flat structure), her dosyanın bir URL'i vardır.
- **Özellik:** Çok ucuzdur, sınırsız büyüyebilir.
- **Kullanım:** Web sitesi resimleri, Netflix videoları, Veritabanı yedekleri.
- **Not:** İşletim sistemi kurulamaz, sadece dosya atılır.

## 2. Blok Depolama (Block Storage)
**AWS EBS, Azure Disk, Google Persistent Disk**

Sanal sunucunuza (VM) taktığınız "Sanal Harddisk"tir.
- **Özellik:** Yüksek performanslıdır (IOPS). İşletim sistemi buraya kurulur.
- **Kullanım:** Veritabanı dosyaları, Uygulama sunucusu diski.
- **Not:** Genellikle sadece tek bir sunucuya takılabilir.

## 3. Dosya Depolama (File Storage)
**AWS EFS, Azure Files, Google Filestore**

Ağ üzerinden paylaşılan klasörlerdir (NFS/SMB). Birden fazla sunucu aynı anda okuyup yazabilir.
- **Kullanım:** Ortak doküman havuzu, birden fazla web sunucusunun aynı içerik klasörünü görmesi.

## 4. Arşiv Depolama (Archive Storage)
**AWS Glacier, Azure Archive**

Çok nadir erişilen veriler içindir.
- **Özellik:** Depolama maliyeti aşırı düşüktür, ancak veriyi geri çağırmak saatler sürebilir ve işlem ücreti vardır.
- **Kullanım:** Yasal zorunluluk nedeniyle 5 yıl saklanması gereken loglar.
