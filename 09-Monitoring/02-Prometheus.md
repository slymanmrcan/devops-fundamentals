# Prometheus

Prometheus, açık kaynaklı metrik toplama ve uyarı (alerting) aracıdır. Pull modelle çalışır, yüksek kardinaliteyi azaltmayı ve sade konfigürasyonu hedefler.

## 1. Mimari ve Çalışma Mantığı (Pull Model)
* **Prometheus Server:** Hedeflerden belirli aralıklarla veriyi çeker, TSDB'de saklar.
* **Service Discovery:** K8s, Consul, EC2, statik liste vb. ile hedefleri bulur. Etiketler (labels) sorgu/uyarı için temel taş.
* **Exporters:** `/metrics` endpoint'i sunar (Node Exporter, cAdvisor, Postgres/MySQL, Blackbox, HAProxy, Nginx, Redis vb.).
* **Alertmanager:** Uyarı rotalama, gruplaştırma, susturma (silence) ve bildirim (Slack, e-posta, PagerDuty).
* **Remote Write/Read:** Uzun süreli saklama veya merkezi toplama (Cortex/Thanos/Mimir/VictoriaMetrics).

## 2. Temel Konfigürasyon (prometheus.yml)
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 30s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ["localhost:9090"]

  # Örnek: Kubernetes service discovery (pull)
  - job_name: kubernetes-pods
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: "true"
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        target_label: __address__
        regex: (.+)

rule_files:
  - alerts/*.yaml
  - recording/*.yaml
```

## 3. Alertmanager Örneği (temel)
```yaml
global:
  resolve_timeout: 5m
route:
  receiver: "slack-notify"
  group_by: ["alertname", "cluster", "service"]
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 3h
receivers:
  - name: "slack-notify"
    slack_configs:
      - api_url: https://hooks.slack.com/services/XXX/YYY/ZZZ
        channel: "#alerts"
        send_resolved: true
inhibit_rules:
  - source_matchers: [severity="critical"]
    target_matchers: [severity="warning"]
    equal: ["alertname", "cluster", "service"]
```

## 4. PromQL Örnekleri (Pratik)
* **CPU kullanım oranı (user+system) node bazında:**
  ```promql
  sum by (instance) (rate(node_cpu_seconds_total{mode=~"user|system"}[5m]))
  / ignoring(mode) group_left sum by (instance) (rate(node_cpu_seconds_total[5m]))
  ```
* **HTTP hata oranı (5xx) / toplam:**
  ```promql
  (
    sum(rate(http_requests_total{status=~"5.."}[5m]))
  )
  /
  sum(rate(http_requests_total[5m]))
  ```
* **95p gecikme (histogram):**
  ```promql
  histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))
  ```
* **Kardinaliteyi düşürülmüş container CPU:**
  ```promql
  sum by (namespace, pod) (rate(container_cpu_usage_seconds_total{container!=""}[5m]))
  ```

## 5. Kayıt Kuralları (Recording Rules)
* Sık kullanılan veya pahalı sorguları önceden hesaplayıp hızlı hale getirir.
* Örnek:
  ```yaml
  groups:
    - name: http.rules
      rules:
        - record: job:http_request_errors_rate5m
          expr: |
            sum(rate(http_requests_total{status=~"5.."}[5m])) by (job)
            / sum(rate(http_requests_total[5m])) by (job)
  ```

## 6. En İyi Pratikler
* **Label hijyeni:** user_id, request_id gibi yüksek kardinalite etiketlerden kaçın; path yerine yol pattern'i kullan.
* **Scrape interval:** 15s genelde yeterli; kısa interval TSDB boyutunu artırır.
* **Retention ve depolama:** Yerel saklama 15-30 gün; uzun saklama için Thanos/Cortex/Mimir veya VM remote write.
* **HA & Sharding:** İki Prometheus (federated/HA) + Alertmanager mesh. Büyük ortamda sharding + rule/alert deduplikasyonu.
* **Blackbox / Synthetic:** Kullanıcı gözünden dış ölçüm; DNS/HTTP/TCP probe ekleyin.
* **Runbook linkleri:** Alert annotation içine `runbook_url` ekleyin.
* **Rate ve increase:** Sayaçlar (counter) için `rate()`/`increase()`, gauge için `avg`, histogram için `histogram_quantile`.

## 7. Prometheus Ekosistemi
* **Exporter Kataloğu:** node_exporter, cadvisor, kube-state-metrics, postgres/redis/mongo exporters, blackbox.
* **Tracing/OTel:** Uygulama metriklerinde OpenTelemetry SDK/collector kullanıp Prometheus formatına export.
* **Push Gateway:** Kısa ömürlü batch işler için; kalıcı servisler için önerilmez.

## 8. Hızlı Docker Compose Örneği (Prometheus + Alertmanager)
```yaml
version: "3"
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports: ["9090:9090"]
  alertmanager:
    image: prom/alertmanager
    volumes:
      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml
    ports: ["9093:9093"]
```
