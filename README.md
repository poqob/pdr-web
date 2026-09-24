# Bireyle Psikolojik Danışma - Danışman Adayları Portalı

Sakarya Üniversitesi Hendek Eğitim Fakültesi Rehberlik ve Psikolojik Danışmanlık lisans programı son sınıf öğrencilerinin "Bireyle Psikolojik Danışma" dersi kapsamında danışan kabulü ve bilgilendirme sayfasıdır.

---

## 🌿 Tasarım Özellikleri

- **Sakin ve Güven Veren Arayüz:** Yapay zeka klişesi renkli gradyanlar veya cıvıl cıvıl etiketler yerine; doğal keten/kemik zeminler, sakin adaçayı yeşili vurgular ve editoryal tipografi (Newsreader serif + Plus Jakarta Sans).
- **Hızlı ve Bağımlılıksız (Zero-Backend):** Tamamen statik HTML5, modern CSS3 ve saf Vanilla JavaScript. Herhangi bir derleyici, node modülü veya sunucu kütüphanesine ihtiyaç duymaz.
- **Doğrudan İletişim Aksiyonları:**
  - **Telefon Arama:** Telefon numarasına tıklandığında anında `tel:+90...` ile doğrudan arama başlatılır.
  - **E-posta Gönderme:** Mail bağlantısına tıklandığında `mailto:...` ile önceden biçimlendirilmiş danışma talep taslağı açılır.
  - **Tek Tıkla Kopyalama:** Numara veya e-posta yanındaki minimal kopyalama butonuyla panoya hızlıca aktarılabilir ve ekranda sade bir bilgilendirme bildirimi (toast) çıkar.
- **Duyarlı (Responsive):** Masaüstünde 2x2 dengeli profil ızgarası, mobil ekranlarda ergonomik ve tek sütunlu dokunmatik yerleşim.
- **Hafif Arama Çubuğu:** Danışman adı, süpervizör adı veya danışma kapsamına göre anlık canlı filtreleme.

---

## 🚀 Nasıl Çalıştırılır?

1. **Doğrudan Tarayıcıda Açma:**
   - Proje dizinindeki [`index.html`](file:///home/dag-midi-calculator/dev/web/psikoloji/index.html) dosyasına çift tıklayarak dilediğiniz tarayıcıda doğrudan açabilirsiniz.
   - Dosya sistemi kısıtlarına takılmaması için yerleşik veri koruması mevcuttur.

2. **Yerel Web Sunucusu ile Açma (Opsiyonel):**
   ```bash
   # Python ile:
   python3 -m http.server 8000

   # veya Node.js ile:
   npx serve .
   ```
   Ardından tarayıcınızda `http://localhost:8000` adresine gidin.

---

## 📂 Dosya Yapısı

```
psikoloji/
├── index.html              # Ana tek sayfa (Single Page) yapısı
├── style.css               # Sakin, editoryal, responsive stil kuralları
├── script.js               # Dinamik render, arama, kopyalama ve arama/mail aksiyonları
├── assets/
│   ├── profiles.json       # Adayların yapısal verisi (isim, süpervizör, tel, mail vb.)
│   ├── profiles.md         # Adayların metin dökümü
│   ├── sinem-isik.png      # Sinem Işık portresi
│   ├── zeynep-rana-filiz.png# Zeynep Rana Filiz portresi
│   ├── rumeysa-kiliclar.png# Rumeysa Kılıçlar portresi
│   └── edanur-kirca.png    # Edanur Kırca portresi
└── README.md
```

---

## 👥 Danışman Adayları

1. **Sinem Işık** (Süpervizör: Prof. Dr. Eyüp Çelik)
2. **Zeynep Rana Filiz** (Süpervizör: Prof. Dr. Eyüp Çelik)
3. **Rumeysa Kılıçlar** (Süpervizör: Doç. Dr. Betül Düşünceli)
4. **Edanur Kırca** (Süpervizör: Arş. Gör. Dr. Eda Biçener)
# pdr-web
