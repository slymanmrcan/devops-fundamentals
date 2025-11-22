# Monitoring & Observability Giriş

## 1. Neden İzleme (Monitoring) Gerekli?
Sistemlerimizin sağlığını, performansını ve güvenilirliğini anlamak için izleme şarttır.
* **Proaktif Sorun Çözme:** Sorunlar kullanıcıyı etkilemeden tespit edilir, MTTR düşer.
* **Kapasite Planlama:** Trend analiziyle ölçek ve maliyet kararları yapılır.
* **SLA/SLO Takibi:** Hedeflediğimiz güvenilirlik seviyesine uyum ölçülür.
* **Kök Neden Analizi:** Sorun oluştuğunda hızlı RCA için veri elde edilir.

## 2. Observability (Gözlemlenebilirlik) Nedir?
"Sistem neden böyle davranıyor?" sorusuna cevap verebilme yeteneğidir. Üç temel sütun:
1. **Metrics (Metrikler):** Sayısal zaman serileri (CPU, request sayısı, latency). Uyarı ve trend için uygundur.
2. **Logs (Loglar):** Olayların zaman damgalı kayıtları. Detaylı bağlam ve hata ayıklama sağlar.
3. **Traces (İzler):** Bir isteğin sistemdeki yolculuğu (mikroservisler arası geçişler). P99 gecikme, nerenin yavaş olduğunu gösterir.

Ek olarak sık kullanılan kavramlar:
* **Golden Signals:** Latency, Traffic, Errors, Saturation (L-T-E-S) dört kritik metrik seti.
* **SLI/SLO/SLA:**
  * **SLI:** Ölçtüğümüz değer (örn. başarı oranı, 95p latency).
  * **SLO:** Hedef (örn. 30 günde %99.9 başarı).
  * **SLA:** Resmî sözleşme/ceza içeren anlaşma; SLO üstüne kurulur.
* **Error Budget:** 1 - SLO. Tükendikçe riskli değişiklikler yavaşlatılır.

## 3. İzleme Mimari Prensipleri
* **Pull model tercih:** Hedeflerin keşfi ve güvenlik için (Prometheus). Push için gateway/remote write kullanılabilir.
* **Servis Keşfi:** K8s, EC2, Consul vb. ile dinamik hedefler; statik hedefleri en aza indir.
* **Düşük Kardinalite:** Label patlamasından kaçın; user_id, request_id gibi değerleri label yapma.
* **Sampling ve Retention:** Kısa retention sıcak depoda, uzun arşiv soğuk depoda (remote write/long-term store).
* **Runbook/Playbook:** Her alarm için çözüm adımları ve sahiplik (owner) belli olmalı.
* **Aşamalı Uyarı:** Dev/stage prod kadar hassas olmasın; gürültüyü (alert fatigue) azalt.

## 4. Popüler Araçlar (Kapsam)
* **Prometheus:** Metrik toplama ve saklama, uyarı üretimi.
* **Grafana:** Veri görselleştirme, dashboard ve alerting.
* **Loki / ELK (Elasticsearch, Logstash, Kibana):** Log toplama ve sorgulama.
* **Tempo / Jaeger:** Distributed tracing (OTel uyumlu).
* **Blackbox Exporter / Synthetic:** Dıştan ölçüm, HTTP/TCP/ICMP probe.

## 5. İzleme Olgunluğu İçin Yol Haritası (Kısa)
1. **Temel Metrikler:** CPU, bellek, disk, ağ (node exporter).
2. **Uygulama Metrikleri:** HTTP istek sayısı/latency/error oranları (otel/SDK veya library).
3. **Tracing:** Servisler arası gecikme ve hataların izi.
4. **Log Standardizasyonu:** Structured JSON + korelasyon ID.
5. **Alerting ve Runbook:** Gürültüsüz, aksiyon alınabilir uyarılar.
6. **Capacity & Cost:** Kaynak ve maliyet optimizasyonu dashboardları.
