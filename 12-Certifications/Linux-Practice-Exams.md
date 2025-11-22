# Linux Certification Pratik Sınavları (Örnek Setler)

Bu sayfa LFCS/LFCE/LPIC benzeri sınavlara hazırlık için senaryo odaklı kısa denemeler içerir. Kolay/orta/zor ayrımı yok; pratik odaklıdır.

---

## 🐧 Örnek Set 1
1) **Paket Yöneticisi:** Debian/Ubuntu'da depoları güncellemek ve paket yükseltmek için iki adım?  
   A) `apt update` + `apt upgrade` ✅  
   B) `apt refresh` + `apt install`  
   C) `apt-get clean` + `apt-get install`  
   D) `apt list` + `apt upgrade`

2) **Service Durumu:** systemd ile nginx servis durumunu görmek için?  
   A) `service nginx check`  
   B) `systemctl status nginx` ✅  
   C) `systemctl show nginx --logs`  
   D) `nginx --status`

3) **Log İzleme:** Gerçek zamanlı log takip komutu?  
   A) `tail -f /var/log/syslog` ✅  
   B) `head /var/log/syslog`  
   C) `cat /var/log/syslog`  
   D) `watch syslog`

4) **Disk Kullanımı:** Dizin boyutlarını insan okunur göstermek için?  
   A) `du -sh *` ✅  
   B) `df -s`  
   C) `ls -lh`  
   D) `fdisk -l`

5) **İzinler:** 644 izni ne ifade eder?  
   A) Sahibine r/w, grup/diğerlerine r ✅  
   B) Herkese tam  
   C) Sadece çalıştırma  
   D) Sahip r, grup w

6) **Süreç Öldürme:** PID 123'ü nazikçe sonlandırma?  
   A) `kill -9 123`  
   B) `kill 123` (SIGTERM) ✅  
   C) `pkill -9`  
   D) `halt 123`

7) **SSH Anahtarı:** Varsayılan özel anahtar yolu?  
   A) `/etc/ssh/host_key`  
   B) `~/.ssh/id_rsa` ✅  
   C) `/root/.ssh/key.pub`  
   D) `/etc/ssh/id_rsa`

8) **Arşiv Açma:** `arsiv.tar.gz` nasıl açılır?  
   A) `tar -xzf arsiv.tar.gz` ✅  
   B) `tar -czf`  
   C) `gunzip`  
   D) `unzip`

---

## 🐧 Örnek Set 2
1) **Kullanıcı Ekleme:** Yeni kullanıcı + home dizini oluşturmak için?  
   A) `adduser kullanici` ✅  
   B) `useradd kullanici --no-create-home`  
   C) `mkuser`  
   D) `passwd kullanici`

2) **sudo Yetkisi:** Kullanıcıyı sudo grubuna eklemek için?  
   A) `usermod -aG sudo kullanici` ✅  
   B) `chmod sudo kullanici`  
   C) `groupadd sudo kullanici`  
   D) `sudo adduser sudo`

3) **Cron Görevleri:** Mevcut kullanıcının cronlarını görmek için?  
   A) `cron -l`  
   B) `crontab -l` ✅  
   C) `list cron`  
   D) `cron show`

4) **Ağ Dinleyen Portlar:** Dinleyen TCP/UDP portlarını PID ile görmek için?  
   A) `netstat -an`  
   B) `ss -tulpn` ✅  
   C) `lsof -c`  
   D) `ping`

5) **SELinux Modu:** Mevcut durumu öğrenmek için?  
   A) `selinux status`  
   B) `getenforce` ✅  
   C) `setenforce`  
   D) `semanage status`

6) **fstab Testi:** Yeni bir satırı fstab'a ekledin; hataları önceden yakalamak için?  
   A) `mount -a` ✅  
   B) `fstab --check`  
   C) `df -h`  
   D) `lsblk`

7) **Swap Kullanımı:** Hızlıca görmek için?  
   A) `df -h`  
   B) `free -h` ✅  
   C) `ls swap`  
   D) `vmstat --swap`

8) **Firewall (ufw):** 22 numaralı portu açmak için?  
   A) `ufw add 22`  
   B) `ufw allow 22/tcp` ✅  
   C) `iptables -A INPUT -p tcp --dport 22 -j DROP`  
   D) `ufw enable 22`

---

## 🐧 Örnek Set 3
1) **LVM Büyütme:** Ext4 dosya sistemli LV'yi çevrimiçi büyütmek için?  
   A) `lvreduce`  
   B) `lvextend -r -L +5G /dev/vg/lv` ✅  
   C) `pvremove`  
   D) `mkfs`  

2) **Disk IO İzleme:** Anlık IO ölçümü için pratik komut?  
   A) `iotop` (root gerektirir) ✅  
   B) `top`  
   C) `ps aux`  
   D) `df -i`

3) **tcpdump:** 443 portundaki trafiği yakalamak için?  
   A) `tcpdump 443`  
   B) `tcpdump -i any port 443` ✅  
   C) `tcpdump -p 443`  
   D) `tcpdump -x 443`

4) **systemd Override:** Servise özel override eklemek için en temiz yöntem?  
   A) Dosyayı elle `/etc/systemd/system/override.conf` yazmak  
   B) `systemctl edit servis` ✅  
   C) `systemctl override`  
   D) `systemctl patch`

5) **SSH Güvenliği:** Root login'i kapatmak için config satırı?  
   A) `PermitRootLogin yes`  
   B) `PermitRootLogin no` ✅  
   C) `AllowRoot yes`  
   D) `DenyRootLogin`

6) **Journal Sınırlandırma:** Maksimum disk kullanımını ayarlamak için?  
   A) `/etc/systemd/journald.conf` içinde `SystemMaxUse=` ✅  
   B) `journalctl --limit`  
   C) `journalctl --prune`  
   D) `syslog.conf`

7) **Korelasyon ID:** Logları ilişkilendirmek için en iyi pratik?  
   A) Rastgele print  
   B) Her isteğe ortak correlation/trace-id ekleyip logta taşımak ✅  
   C) Sadece PID yazmak  
   D) Tarih eklemek

8) **iptables Kalıcılık:** Kuralları kaydetmek için (Debian/Ubuntu)?  
   A) `iptables-save > /etc/iptables/rules.v4` ✅  
   B) `iptables persist`  
   C) `ufw save`  
   D) `netfilter keep`

---

## 🐧 Örnek Set 4
1) **Systemd Target:** Grafik arayüz açılışını metin konsoluna almak için?  
   A) `systemctl set-default multi-user.target` ✅  
   B) `systemctl set-default graphical.target`  
   C) `systemctl enable tty`  
   D) `systemctl disable gdm`

2) **Network Name Resolution:** /etc/resolv.conf kalıcı yönetimi (systemd-resolved aktifken) nasıl yapılır?  
   A) Dosyayı elle düzenlemek  
   B) `/etc/systemd/resolved.conf` içinde DNS ayarı ve symlink `/run/systemd/resolve/stub-resolv.conf` ✅  
   C) DNS'i hosts dosyasına yazmak  
   D) rc.local

3) **SSH Güvenliği:** Brute-force'u azaltmak için fail2ban hangi logu izler?  
   A) `/var/log/auth.log` veya `/var/log/secure` ✅  
   B) `/var/log/messages`  
   C) `/var/log/dmesg`  
   D) `/var/log/syslog.1`

4) **TCP Bağlantı Tablosu:** Established bağlantıları saymak için pratik komut?  
   A) `ss -tan state established | wc -l` ✅  
   B) `netstat -rn`  
   C) `ip addr`  
   D) `route -n`

5) **cgroups v2 Bellek Limiti:** Podman/Docker olmadan el ile sınırlamak için hangi dosya?  
   A) `memory.limit`  
   B) `memory.max` ✅  
   C) `mem.limit`  
   D) `cgroup.mem`

6) **Kernel Parametresi:** Geçici değişim ve kalıcı yazma farkı?  
   A) `sysctl -w key=value` geçici, `/etc/sysctl.conf` veya `/etc/sysctl.d/*.conf` kalıcı ✅  
   B) Her ikisi kalıcı  
   C) Her ikisi geçici  
   D) Yalnızca grub

7) **Disk SMART:** Sağlık durumunu hızlı görmek için?  
   A) `smartctl -H /dev/sdX` ✅  
   B) `fsck /dev/sdX`  
   C) `dd if=/dev/sdX`  
   D) `mount -o smart`

8) **Swap Kapama:** Geçici olarak swap'ı kapatmak için?  
   A) `swapoff -a` ✅  
   B) `swapon -a`  
   C) `sysctl swap=0`  
   D) `swap clear`

9) **NTP/Chrony:** Zaman senkronizasyon durumunu görmek için?  
   A) `chronyc sources` veya `chronyc tracking` ✅  
   B) `ntp show`  
   C) `date --sync`  
   D) `hwclock --status`

10) **Log Rotation:** logrotate ile günlük döndürme için yaygın direktif?  
    A) `rotate daily`  
    B) `daily` ✅  
    C) `perday`  
    D) `log_daily`

---

## 🐧 Örnek Set 5
1) **PAM Kilidi:** Belirli sayıda yanlış parola sonrası geçici kilit için hangi modül?  
   A) pam_env  
   B) pam_deny  
   C) pam_faillock ✅  
   D) pam_secure

2) **ACL Kullanımı:** Bir kullanıcıya dosyada ek okuma izni vermek için?  
   A) `chmod +r`  
   B) `setfacl -m u:kullanici:r dosya` ✅  
   C) `chown kullanici dosya`  
   D) `usermod -R`

3) **Taraflı (sticky) bit:** /tmp gibi dizinlerde amaç nedir?  
   A) Dosyaları sıkıştırmak  
   B) Kullanıcılar sadece kendi dosyasını silebilsin ✅  
   C) Çalıştırmayı hızlandırmak  
   D) Root kilitlemek

4) **AppArmor/SELinux Profil:** Uygulamayı kısıtlamak için hangi kavram kullanılır?  
   A) cgroup profile  
   B) MAC policy profilleri (AppArmor profile, SELinux context/booleans) ✅  
   C) PAM profile  
   D) sudoers list

5) **SSH Agent Forwarding Riski:** Ne zaman kaçınılmalı?  
   A) Lokal geliştirme  
   B) Güvenilmeyen hop sunucularında, anahtar çalınma riski nedeniyle ✅  
   C) Bastion kullanımında her zaman açılmalı  
   D) Aynı makina içinde

6) **Dizin Inode Dolması:** `df -i` yüksek, disk dolu değil. Ne yapılır?  
   A) Disk büyüt  
   B) Çok küçük dosyaları temizle, gerekiyorsa filesystem seçim/boyutlandırma ✅  
   C) Swap artır  
   D) RAM artır

7) **Sysstat/Sar:** Tarihçe sistem istatistiği almak için?  
   A) `iostat -t`  
   B) `sar -u 1 3` ve arşiv `/var/log/sysstat/` ✅  
   C) `top -H`  
   D) `free -sar`

8) **OverlayFS:** Konteyner imaj dosya sistemi hangi teknolojiye dayanır?  
   A) btrfs  
   B) overlay2 ✅  
   C) zfs  
   D) ext2

9) **iptables NAT:** Basit SNAT kuralı örneği?  
   A) `iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE` ✅  
   B) `iptables -A OUTPUT -j ACCEPT`  
   C) `iptables -t nat -A PREROUTING -j ACCEPT`  
   D) `iptables -A FORWARD -j DROP`

10) **RAID Durumu:** mdadm yazılım RAID durumunu görmek için?  
    A) `mdadm --status`  
    B) `cat /proc/mdstat` ✅  
    C) `raidstat`  
    D) `lsblk -r`
