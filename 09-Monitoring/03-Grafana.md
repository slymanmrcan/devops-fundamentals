# Grafana

Grafana, verilerinizi nerede saklarsanız saklayın (Prometheus, InfluxDB, SQL vb.), onları sorgulamanızı, görselleştirmenizi ve anlamanızı sağlayan açık kaynaklı bir platformdur.

## 1. Özellikleri
*   **Çoklu Veri Kaynağı:** Aynı dashboard üzerinde farklı kaynaklardan veri gösterebilir.
*   **Zengin Görselleştirme:** Grafikler, tablolar, ısı haritaları (heatmaps).
*   **Uyarılar:** Görsel üzerinden direkt alarm kurma.
*   **Eklenti Desteği:** Topluluk tarafından geliştirilen yüzlerce panel ve veri kaynağı.

## 2. Kurulum (Docker ile)

```bash
docker run -d -p 3000:3000 --name=grafana grafana/grafana
```
Tarayıcıda `http://localhost:3000` adresine gidin (Kullanıcı/Şifre: admin/admin).

## 3. Prometheus ile Entegrasyon
1.  Grafana'ya giriş yapın.
2.  **Configuration > Data Sources** menüsüne gidin.
3.  "Add data source" butonuna tıklayın ve **Prometheus**'u seçin.
4.  URL kısmına Prometheus adresini girin (örn: `http://localhost:9090` veya Docker network içindeyse `http://prometheus:9090`).
5.  "Save & Test" deyin.

## 4. Dashboard Oluşturma
*   **Import:** Grafana.com üzerinde binlerce hazır dashboard vardır. ID'sini kopyalayıp import edebilirsiniz (Örn: Node Exporter Full için ID: 1860).
*   **Custom:** "Add Panel" diyerek kendi PromQL sorgularınızı yazıp grafiğe dökebilirsiniz.
