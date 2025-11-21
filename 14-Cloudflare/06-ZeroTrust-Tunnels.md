# Zero Trust & Cloudflare Tunnels

Geleneksel VPN teknolojilerinin yerini alan, daha güvenli ve modern erişim yöntemleridir.

---

## 1. Cloudflare Tunnel (Eski adıyla Argo Tunnel)

Yerel ağınızdaki (Localhost) veya güvenlik duvarı arkasındaki bir sunucuyu, **port açmadan** (Port Forwarding yapmadan) internete açmanızı sağlar.

### Nasıl Çalışır?
1.  Sunucunuza `cloudflared` adında küçük bir ajan (daemon) kurarsınız.
2.  Bu ajan, Cloudflare Edge sunucularına şifreli bir tünel açar (Outbound connection).
3.  Dışarıdan gelen istekler Cloudflare üzerinden tünelden geçerek sunucunuza ulaşır.

### Avantajları
*   **Güvenlik:** Firewall'da hiçbir portu (80, 443, 22) dışarı açmak zorunda kalmazsınız. Sunucunuzun IP adresi tamamen gizli kalır.
*   **Kolaylık:** Statik IP veya DDNS ile uğraşmanıza gerek kalmaz.
*   **Ücretsiz:** Cloudflare Tunnel tamamen ücretsizdir.

### Kullanım Örneği (Localhost'u İnternete Açmak)
```bash
# Mac/Linux kurulum
brew install cloudflare/cloudflare/cloudflared

# Giriş yap
cloudflared tunnel login

# Tünel oluştur
cloudflared tunnel create my-tunnel

# Trafiği yönlendir (localhost:8000'i my-app.example.com'a bağla)
cloudflared tunnel run --url localhost:8000 my-tunnel
```

---

## 2. Cloudflare Access (Zero Trust)

Şirket içi uygulamalarınıza (Jira, Grafana, SSH sunucuları vb.) erişimi kontrol etmek için VPN yerine kullanılır.

### Nasıl Çalışır?
Bir kullanıcı korunan bir uygulamaya girmek istediğinde (örn: `grafana.sirket.com`):
1.  Cloudflare araya girer ve bir giriş sayfası gösterir.
2.  Kullanıcı, belirlediğiniz yöntemle (Google Workspace, GitHub, Azure AD, veya E-posta kodu) giriş yapar.
3.  Eğer yetkisi varsa uygulamaya erişir.

### Neden VPN'den İyi?
*   **İstemci Yok:** Kullanıcının bilgisayarına VPN programı kurmasına gerek yoktur. Tarayıcı yeterlidir.
*   **Granüler Yetki:** "Stajyerler sadece Wiki'ye girebilsin, Yöneticiler her yere girebilsin" gibi kurallar yazabilirsiniz.
*   **Loglama:** Kimin, ne zaman, nereye girdiği detaylıca loglanır.

---

## 3. WARP

Bireysel kullanıcılar için optimize edilmiş, hızlı ve güvenli bir VPN'dir.
*   **WARP:** Trafiğinizi şifreler ve Cloudflare ağı üzerinden geçirerek hızlandırır.
*   **WARP+:** Cloudflare'in özel backbone hatlarını kullanarak trafiği en az sıkışık yoldan götürür.
*   **Zero Trust için WARP:** Şirket cihazlarına kurulduğunda, cihazın güvenli olup olmadığını (Antivirüs var mı? OS güncel mi?) kontrol eder ve buna göre şirket kaynaklarına erişim izni verir.
