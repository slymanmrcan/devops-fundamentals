# İleri Seviye Komut Parametreleri (Cheat Sheet)

Temel komutları biliyorsunuz (`ls`, `grep`, `ps` vb.), ancak bu komutların gerçek gücü parametrelerinde (flags) saklıdır. İşte DevOps mülakatlarında ve günlük hayatta hayat kurtaran o parametreler.

## 1. `ls` (List)
Sadece `ls -l` yetmez.
*   `ls -lah`: Gizli dosyalar dahil (-a), insan okunabilir boyutta (-h), detaylı liste (-l).
*   `ls -lt`: Tarihe göre sırala (en yeni en üstte). Log dosyalarına bakarken çok işe yarar.
*   `ls -lS`: Boyuta göre sırala (en büyük en üstte). Disk dolduğunda suçluyu bulmak için.
*   `ls -R`: Alt klasörleri de listele (Recursive).

## 2. `grep` (Global Regular Expression Print)
Bir dosya içinde samanlıkta iğne aramak.
*   `grep -i "error" log.txt`: Büyük/küçük harf duyarsız ara (Case-insensitive).
*   `grep -r "config" /etc/`: Bir klasördeki **tüm dosyalarda** ara (Recursive).
*   `grep -v "info" log.txt`: "info" geçen satırları **hariç tut** (Invert match).
*   `grep -n "error" log.txt`: Satır numaralarını göster.
*   `grep -A 5 -B 5 "Exception" log.txt`: Hatayı bul, **öncesindeki (Before)** 5 ve **sonrasındaki (After)** 5 satırı da göster. Bağlamı görmek için muazzamdır.

## 3. `find`
Dosya bulmanın şahı.
*   `find . -name "*.log"`: Uzantısı .log olan dosyaları bul.
*   `find /var -size +100M`: Boyutu 100MB'dan büyük dosyaları bul.
*   `find . -mtime -1`: Son 24 saatte değiştirilmiş dosyaları bul.
*   `find . -name "*.tmp" -delete`: Bulduğu dosyaları direkt sil (Dikkat!).
*   `find . -name "*.sh" -exec chmod +x {} \;`: Bulduğu her dosyaya `chmod +x` uygula.

## 4. `ps` & `top` (Process)
*   `ps aux`: Sistemdeki **tüm** süreçleri detaylı gör.
*   `ps aux | grep nginx`: Nginx süreçlerini bul.
*   `ps -ef --forest`: Süreçleri ağaç yapısında (kim kimi başlattı) gör.
*   `top -o %MEM`: Bellek kullanımına göre sırala.
*   `top -o %CPU`: İşlemci kullanımına göre sırala.

## 5. `tar` (Archive)
Ezberlemesi zor ama gereklidir.
*   `tar -czvf backup.tar.gz /var/www`: **C**reate, g**Z**ip, **V**erbose, **F**ile. Klasörü sıkıştır.
*   `tar -xzvf backup.tar.gz`: **X**tract. Arşivi aç.
*   `tar -tf backup.tar.gz`: Arşivi açmadan içindekileri listele (**T**est/List).

## 6. `netstat` / `ss` (Network)
*   `ss -tulpn`:
    *   **t**: TCP
    *   **u**: UDP
    *   **l**: Listening (Dinleyenler)
    *   **p**: Process (Hangi program kullanıyor?)
    *   **n**: Numeric (DNS çözme, IP göster)
    *   *Özet:* Hangi portu hangi uygulama kullanıyor?

## 7. `curl`
*   `curl -I https://google.com`: Sadece Header'ları çek (Site ayakta mı?).
*   `curl -L https://google.com`: Yönlendirmeleri (Redirect) takip et.
*   `curl -v https://google.com`: Verbose mod (Request/Response detaylarını gör).
*   `curl -O https://example.com/file.zip`: Dosyayı indir ve aynı isimle kaydet.

## 8. `history`
*   `history | grep docker`: Geçmişte yazdığın docker komutlarını bul.
*   `!123`: 123 numaralı komutu tekrar çalıştır.
*   `!!`: Son komutu tekrar çalıştır (Genelde `sudo !!` olarak unutulan sudo için kullanılır).
