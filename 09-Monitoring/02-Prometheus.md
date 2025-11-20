# Prometheus

Prometheus, açık kaynaklı bir sistem izleme ve uyarı (alerting) aracıdır. SoundCloud tarafından geliştirilmiştir.

## 1. Nasıl Çalışır? (Pull Model)
Prometheus, hedeflerden (targets) metrikleri belirli aralıklarla **çeker (pull)**.
Hedefler, metriklerini genellikle `/metrics` endpoint'inde sunar (exporter'lar aracılığıyla).

## 2. Temel Bileşenler
*   **Prometheus Server:** Metrikleri toplar ve zaman serisi veritabanında (TSDB) saklar.
*   **Exporters:** Uygulamaların veya sistemlerin metriklerini Prometheus'un anlayacağı formata çevirir (örn: Node Exporter, Postgres Exporter).
*   **Alertmanager:** Uyarları yönetir (e-posta, Slack vb. bildirim gönderir).
*   **PromQL:** Prometheus Query Language. Verileri sorgulamak için kullanılır.

## 3. Kurulum (Docker ile)

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
```

```bash
docker run -d \
    -p 9090:9090 \
    -v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus
```

## 4. PromQL Örnekleri

*   **CPU Kullanımı:**
    ```promql
    rate(node_cpu_seconds_total{mode="user"}[5m])
    ```
*   **HTTP İstek Sayısı:**
    ```promql
    http_requests_total
    ```
