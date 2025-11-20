# Monitoring & Observability Giriş

## 1. Neden İzleme (Monitoring) Gerekli?
Sistemlerimizin sağlığını, performansını ve güvenilirliğini anlamak için izleme şarttır.
*   **Proaktif Sorun Çözme:** Sorunlar kullanıcıyı etkilemeden tespit edilebilir.
*   **Kapasite Planlama:** Kaynak kullanım trendlerine göre gelecekteki ihtiyaçlar belirlenir.
*   **SLA Takibi:** Hizmet seviyesi anlaşmalarına uyulup uyulmadığı ölçülür.

## 2. Observability (Gözlemlenebilirlik) Nedir?
Sadece "sistem çalışıyor mu?" sorusuna değil, "sistem neden bu şekilde davranıyor?" sorusuna cevap verebilme yeteneğidir.
Üç temel sütunu vardır:
1.  **Metrics (Metrikler):** Sayısal veriler (CPU kullanımı, Request sayısı).
2.  **Logs (Loglar):** Olayların zaman damgalı kayıtları.
3.  **Traces (İzler):** Bir isteğin sistemdeki yolculuğu (mikroservisler arası geçişler).

## 3. Popüler Araçlar
*   **Prometheus:** Metrik toplama ve saklama.
*   **Grafana:** Veri görselleştirme.
*   **ELK Stack (Elasticsearch, Logstash, Kibana):** Log yönetimi.
*   **Jaeger:** Distributed Tracing.
