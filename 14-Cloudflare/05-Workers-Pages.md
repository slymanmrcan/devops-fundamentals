# Cloudflare Workers & Pages

Cloudflare sadece bir CDN değil, aynı zamanda güçlü bir "Serverless" (Sunucusuz) uygulama geliştirme platformudur.

---

## 1. Cloudflare Workers

Workers, kodunuzu (JavaScript, Rust, C++) Cloudflare'in dünya genelindeki sunucularında (Edge) çalıştırmanızı sağlar. AWS Lambda'ya benzer ama "Cold Start" (ilk açılış yavaşlığı) sorunu yoktur ve çok daha hızlıdır.

### Ne İçin Kullanılır?
*   **HTTP İsteklerini Değiştirme:** Gelen isteğin header'larını, içeriğini veya yönlendirmesini değiştirmek.
*   **A/B Testleri:** Kullanıcıları rastgele farklı sayfalara yönlendirmek.
*   **Geo-Redirect:** Kullanıcının ülkesine göre farklı içeriğe yönlendirmek (Örn: Almanya'dan gireni `de.example.com`'a at).
*   **Basit API'ler:** Veritabanına bağlanıp JSON yanıt dönen hafif servisler.

### Örnek Worker Kodu (Hello World)
```javascript
export default {
  async fetch(request, env, ctx) {
    return new Response('Merhaba Dünya! Ben Cloudflare Edge üzerindeyim.', {
      headers: { 'content-type': 'text/plain;charset=UTF-8' },
    });
  },
};
```

### KV (Key-Value) Storage
Workers için ultra hızlı, global bir veritabanıdır. Redis'e benzer. Veriler tüm dünyaya replike edilir.

---

## 2. Cloudflare Pages

Statik web sitelerinizi (React, Vue, Angular, Hugo, Gatsby, Next.js) barındırmak için en modern çözümdür. Netlify ve Vercel'in doğrudan rakibidir.

### Özellikleri
*   **Git Entegrasyonu:** GitHub veya GitLab hesabınızı bağlarsınız. `main` branch'ine her `push` yaptığınızda Pages otomatik olarak sitenizi derler (build) ve yayınlar.
*   **Preview Deployments:** Pull Request açtığınızda, o değişikliğe özel geçici bir URL oluşturur. Takım arkadaşlarınız canlıya almadan önce değişikliği görebilir.
*   **Sınırsız Bant Genişliği:** Trafik kotası yoktur.
*   **Ücretsiz:** Kişisel ve ticari projeler için cömert bir ücretsiz planı vardır.

### Nasıl Kullanılır?
1.  Cloudflare Dashboard -> Pages -> Create Project.
2.  GitHub hesabını bağla ve repoyu seç.
3.  Build ayarlarını gir (Örn: Framework: React, Build Command: `npm run build`, Output Dir: `build`).
4.  **Save and Deploy!**

---

## 3. R2 (Object Storage)

AWS S3 alternatifi dosya depolama hizmetidir.
*   **En Büyük Farkı:** **Egress (Veri Çıkış) Ücreti YOKTUR.** AWS S3'te dosyayı indirdikçe para ödersiniz, R2'de ödemezsiniz.
*   **S3 Uyumluluğu:** S3 API'sini destekler, yani mevcut araçlarınızla (AWS CLI, boto3 vb.) R2'yu kullanabilirsiniz.
