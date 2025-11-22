# Grafana

Grafana, çoklu veri kaynağı (Prometheus, Loki, Tempo, Influx, SQL…) ile dashboard, alerting ve paylaşım için kullanılan açık kaynak platformdur.

## 1. Temel Özellikler
* **Veri Kaynakları:** Aynı dashboard üzerinde çoklu kaynak; Prometheus için otomatik label tamamlama.
* **Görselleştirme:** Time series, stat, table, heatmap, candlestick, geomap, canvas.
* **Alerting:** Panel tabanlı veya unified alerting; contact point (Slack/Email/PagerDuty) ve notification policy hiyerarşisi.
* **Provisioning:** Kodla yönetim (YAML/JSON) için datasource, dashboard, alert provisioning.
* **Erişim & Paylaşım:** Folder bazlı izin, team/role yönetimi, link sharing, snapshot.

## 2. Kurulum (Docker ile)
```bash
docker run -d -p 3000:3000 --name=grafana grafana/grafana
# İlk giriş: admin / admin (değiştirin)
```

## 3. Prometheus ile Entegrasyon
1) Grafana'ya giriş → **Configuration > Data Sources**.  
2) **Add data source** → **Prometheus** seçin.  
3) URL: `http://localhost:9090` (Docker network'teyse `http://prometheus:9090`).  
4) **Save & Test**.

## 4. Dashboard Oluşturma ve İpuçları
* **Import:** Hazır paneller (örn. Node Exporter Full: ID 1860).  
* **Panel İpuçları:**
  * Latency için 50/95/99p; error rate; saturation (CPU/RAM/disk I/O) panelleri ekleyin.
  * Bir panel = tek mesaj; karmaşık grafikleri bölün, açıklama/annotation ekleyin.
  * Threshold ve unit'leri doğru tanımlayın; renk kodları tutarlı olsun.
* **Annotations:** Deploy, incident, feature flag değişikliği gibi olayları overlay olarak ekleyin.
* **Temalar:** Light/dark; panel repeat ile dinamizm; variables ile ortam/namespace filtreleri.

## 5. Alerting Pratikleri (Unified Alerting)
* **Notification Policy:** Servis/ortam bazlı hiyerarşi; kritikler için daha kısa repeat interval.
* **Temel metrik seti:** Availability (error rate), latency (p95/p99), saturation (CPU/mem), business KPI (sipariş sayısı vb.).
* **Silence:** Bakım veya planlı işler için süreli susturma; mutlaka süre kısıtlı olsun.
* **Labels:** `severity`, `service`, `env` gibi etiketlerle yönlendirilebilir uyarı.
* **Runbook:** Alert açıklamasına `runbook_url` ekleyin.

## 6. Provisioning Örneği (Datasource)
```yaml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
```

## 7. Loki/Log Entegrasyonu (Opsiyonel)
* **Loki:** Loglar için Prometheus benzeri model (label + indeks).  
* **Promtail/Vector/Fluent Bit:** Logları Loki'ye gönderir.  
* **Grafana Explore:** Aynı ekrandan metrik + log + trace korelasyonu (korelasyon ID ile).

## 8. Performans ve Güvenlik İpuçları
* **Folder/Permission:** Prod/stage dashboardlarını ayırın, folder-level izin verin.
* **Caching:** Panel interval ve max data points ayarlarıyla sorgu yükünü azaltın.
* **Secret Yönetimi:** API key'leri kısıtlı scope ve süreyle oluşturun; org ve user rollerini sıkı tutun.
* **Backup:** Provisioned dashboard JSON'larını repo'da tutmak versiyonlama için idealdir.
