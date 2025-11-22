# Monitoring & Observability Pratik Sınavları

Prometheus, Grafana, Alertmanager ve log/trace korelasyonu odaklı senaryolar. İki set, karışık zorluk.

---

## 📡 Örnek Set 1
1) **Prometheus Kardinalite:** Label patlamasını önlemek için hangisinden kaçınmalı?  
   A) `status_code`  
   B) `user_id` ✅  
   C) `instance`  
   D) `job`

2) **Histogram Kullanımı:** P95 latency için doğru fonksiyon?  
   A) `avg_over_time`  
   B) `histogram_quantile(0.95, sum by (le) (rate(bucket[5m])))` ✅  
   C) `sum(rate(...))`  
   D) `increase`

3) **Alert Fatigue:** Gürültüyü azaltmak için ilk adım?  
   A) Tüm alarmları kapatmak  
   B) Gruplama ve sustain/silence pencereleri ayarlamak, aksiyon alınabilir kriterler ✅  
   C) Severity'yi critical yapmak  
   D) Polling süresini kısaltmak

4) **Alertmanager Inhibit:** Critical varken warning'i bastırmak için?  
   A) repeat_interval=0  
   B) inhibit_rules ile severity=critical → warning aynı alertname ✅  
   C) Slack kanalını kapat  
   D) route sil

5) **Runbook:** En iyi pratik?  
   A) Alert açıklamasına `runbook_url` eklemek ✅  
   B) E-posta ile göndermek  
   C) PDF paylaşmak  
   D) Sadece log tutmak

6) **Blackbox Exporter:** HTTP 200 kontrolü nereden yapılır?  
   A) Hedef uygulamadan  
   B) Blackbox exporter probe HTTP/ICMP/TCP endpoint ✅  
   C) Alertmanager  
   D) Grafana paneli

7) **Grafana Alerting:** Notification policy ile ne yapılır?  
   A) Panel silme  
   B) Uyarıları hedef kanala yönlendirme, zamanlama/filtreleme ✅  
   C) Cache açma  
   D) Datasource şifrelemek

8) **Log-Korelasyon:** Mikroservis gecikmesini log + trace ile incelemek için ilk adım?  
   A) Plain text log  
   B) Structured JSON log + trace/correlation-id taşıma ✅  
   C) Logu kapatmak  
   D) Sadece metrics

---

## 📡 Örnek Set 2
1) **Prometheus HA:** İki Prometheus'un aynı alerti çift göndermesini önlemek için?  
   A) Alertmanager cluster/mesh deduplikasyonu ✅  
   B) Single instance  
   C) Pushgateway  
   D) Kardinaliteyi artırmak

2) **Remote Write Kullanımı:** Ne zaman tercih edilir?  
   A) Kısa süreli POC  
   B) Uzun vadeli saklama veya merkezi toplama gerektiğinde ✅  
   C) Lokal disk yeterliyse  
   D) Yalnızca tracing için

3) **Recording Rule Amaç:**  
   A) Logları sıkıştırmak  
   B) Sık sorulan veya ağır sorguları önceden hesaplayarak hızlandırmak ✅  
   C) Alert kapatmak  
   D) Kardinaliteyi artırmak

4) **Grafana Annotations:** Ne için kullanılır?  
   A) Alert susturma  
   B) Zaman çizelgesine deploy/incident gibi olay eklemek ✅  
   C) Dashboard silmek  
   D) Datasource eklemek

5) **Loki Maliyet:** Yüksek ingest ve retention için ilk önlem?  
   A) Indekslemeyi artır  
   B) Label sayısını düşür, gereksiz logu filtrele, daha uzun için arşiv/maliyet katmanı kullan ✅  
   C) Logu kapat  
   D) RAM'i artır

6) **Tempo/Tracing Sampling:** Neden yapılır?  
   A) Gecikme artırmak için  
   B) Maliyet ve hacmi kontrol etmek, kritik istekleri tutarken gürültüyü azaltmak ✅  
   C) Trace'i silmek  
   D) Logu kapatmak

7) **Alert Seviyeleri:** Availability SLO düşüyorsa hangi metrik öncelik?  
   A) Saturation  
   B) Error rate (5xx/failed requests) ✅  
   C) Disk inode  
   D) Log satırı

8) **Service Discovery:** Dinamik hedeflerde statik konfig yerine ne yapılır?  
   A) Tek tek IP yazmak  
   B) K8s/Consul/EC2 SD ve relabeling ✅  
   C) DNS kapatmak  
   D) IP'yi hardcode etmek
