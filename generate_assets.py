import os
from PIL import Image, ImageDraw, ImageFont

# ==============================================================================
# 1. FAVICON SVG OLUŞTURMA (Modern, Vektörel Retina)
# ==============================================================================
svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="favGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2c5e4d"/>
      <stop offset="100%" stop-color="#1b3c31"/>
    </linearGradient>
  </defs>
  <!-- Yumuşak Yuvarlak Kare Taban -->
  <rect width="64" height="64" rx="16" fill="url(#favGrad)"/>
  
  <!-- Psikoloji Sembolü Ψ (Psi) -->
  <g fill="none" stroke="#fcfaf6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Dikey Gövde -->
    <line x1="32" y1="12" x2="32" y2="52"/>
    <!-- Ψ Kanatları / Kavis -->
    <path d="M17 24 C17 40, 47 40, 47 24"/>
    <!-- Kaide Çizgisi -->
    <line x1="22" y1="52" x2="42" y2="52" stroke-width="3.5"/>
  </g>
  <!-- Üst Tomurcuk / Dinginlik Vurgusu -->
  <circle cx="32" cy="12" r="2.8" fill="#dfbe82"/>
</svg>'''

with open("favicon.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)

print("favicon.svg başarıyla oluşturuldu.")

# ==============================================================================
# 2. PNG FAVICON'LAR OLUŞTURMA (32x32, 180x180, 192x192)
# ==============================================================================
def generate_png_favicon(size, filename):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    corner = int(size * 0.25)
    draw.rounded_rectangle([0, 0, size, size], radius=corner, fill="#234d3f")
    
    scale = size / 64.0
    stroke_w = max(2, int(4.0 * scale))
    
    # Dikey gövde
    x_mid = int(32 * scale)
    draw.line([(x_mid, int(13 * scale)), (x_mid, int(52 * scale))], fill="#fcfaf6", width=stroke_w)
    
    # Taban çizgisi
    draw.line([(int(22 * scale), int(52 * scale)), (int(42 * scale), int(52 * scale))], fill="#fcfaf6", width=max(1, int(3.5 * scale)))
    
    # Kavis
    arc_box = [int(17 * scale), int(15 * scale), int(47 * scale), int(45 * scale)]
    draw.arc(arc_box, start=0, end=180, fill="#fcfaf6", width=stroke_w)
    
    # Tepe noktası
    dot_r = max(2, int(2.8 * scale))
    draw.ellipse([x_mid - dot_r, int(13 * scale) - dot_r, x_mid + dot_r, int(13 * scale) + dot_r], fill="#dfbe82")
    
    img.save(filename, "PNG", optimize=True)
    print(f"{filename} oluşturuldu ({size}x{size}).")

generate_png_favicon(32, "favicon-32x32.png")
generate_png_favicon(180, "apple-touch-icon.png")
generate_png_favicon(192, "favicon.png")

# ==============================================================================
# 3. WHATSAPP & SOSYAL MEDYA OPEN GRAPH BANNER (1200x630)
# ==============================================================================
def generate_og_image():
    W, H = 1200, 630
    og = Image.new("RGB", (W, H), "#f9f8f6")
    draw = ImageDraw.Draw(og)
    
    # Üst ve Alt Şık Çerçeve Çizgisi
    draw.rectangle([0, 0, W, 10], fill="#234d3f")
    draw.rectangle([0, H - 10, W, H], fill="#234d3f")
    
    # İç Kart Çerçevesi
    draw.rounded_rectangle([35, 35, W - 35, H - 35], radius=20, fill="#ffffff", outline="#e6e3dc", width=1)
    
    # Yazı Tipleri (Noto Sans & Noto Serif - Tam Türkçe desteği)
    font_serif_bold = ImageFont.truetype("/usr/share/fonts/google-noto/NotoSerif-Bold.ttf", 46)
    font_sans_bold = ImageFont.truetype("/usr/share/fonts/google-noto/NotoSans-Bold.ttf", 22)
    font_sans_semibold = ImageFont.truetype("/usr/share/fonts/google-noto/NotoSans-SemiBold.ttf", 18)
    font_sans_regular = ImageFont.truetype("/usr/share/fonts/google-noto/NotoSans-Regular.ttf", 19)
    font_meta = ImageFont.truetype("/usr/share/fonts/google-noto/NotoSans-SemiBold.ttf", 14)
    font_small = ImageFont.truetype("/usr/share/fonts/google-noto/NotoSans-Regular.ttf", 15)

    # 1. Üst Kurumsal Etiket
    draw.text((75, 75), "SAKARYA ÜNİVERSİTESİ  •  HENDEK EĞİTİM FAKÜLTESİ", fill="#234d3f", font=font_meta)
    draw.text((75, 100), "REHBERLİK VE PSİKOLOJİK DANIŞMANLIK LİSANS PROGRAMI", fill="#6e7681", font=font_meta)
    
    # 2. Ana Başlık
    draw.text((75, 140), "Bireyle Psikolojik Danışma", fill="#1d2125", font=font_serif_bold)
    
    # 3. Alt Başlık
    draw.text((75, 205), "Akademik Süpervizyon Eşliğinde Ücretsiz Danışma Desteği", fill="#234d3f", font=font_sans_bold)
    
    # 4. Açıklama Paragrafı
    desc = [
        "Kendinizi daha iyi tanımak, yaşadığınız zorlukları anlamlandırmak",
        "ve duygu, düşünce ve davranışlarınızı keşfetmek için son sınıf",
        "psikolojik danışman adaylarımızla doğrudan iletişime geçebilirsiniz."
    ]
    y_pos = 250
    for line in desc:
        draw.text((75, y_pos), line, fill="#444a51", font=font_sans_regular)
        y_pos += 28
        
    # 5. Güven Rozetleri (Hafif arka planlı rozetler)
    badges = [
        "Tamamen Ücretsiz",
        "Uzman Süpervizör Gözetimi",
        "Etik ve Danışan Gizliliği"
    ]
    bx = 75
    by = 360
    for b in badges:
        # Mini kutucuk
        draw.rounded_rectangle([bx, by, bx + 195, by + 36], radius=8, fill="#eaf1ed", outline="#d1e3d9", width=1)
        draw.text((bx + 14, by + 8), b, fill="#234d3f", font=font_small)
        bx += 205

    # 6. İletişim & Lokasyon Bilgisi
    draw.line([(75, 425), (690, 425)], fill="#e6e3dc", width=1)
    draw.text((75, 445), "İletişim: Telefonla arama veya doğrudan e-posta ile başvuru", fill="#1d2125", font=font_sans_semibold)
    draw.text((75, 478), "Konum: Sakarya Üniversitesi Hendek Eğitim Fakültesi / Yüz Yüze ve Online", fill="#6e7681", font=font_small)
    draw.text((75, 510), "Kapsam: 4 Danışman Adayı  •  Haftalık Düzenli Seanslar", fill="#234d3f", font=font_small)

    # 7. Sağ Tarafta 4 Danışmanın Zarif Portre Kartları (2x2)
    candidates = [
        ("assets/sinem-isik.png", "Sinem Işık", 740, 75),
        ("assets/zeynep-rana-filiz.png", "Zeynep Rana Filiz", 945, 75),
        ("assets/rumeysa-kiliclar.png", "Rumeysa Kılıçlar", 740, 315),
        ("assets/edanur-kirca.png", "Edanur Kırca", 945, 315),
    ]
    
    card_w, card_h = 180, 185
    for img_path, name, x, y in candidates:
        # Portre kabin arka planı
        draw.rounded_rectangle([x, y, x + card_w, y + card_h], radius=14, fill="#f2efe9", outline="#e6e3dc", width=1)
        if os.path.exists(img_path):
            try:
                p_img = Image.open(img_path).convert("RGBA")
                # Boyutlandır
                p_img.thumbnail((card_w - 16, card_h - 16), Image.Resampling.LANCZOS)
                # Ortala
                px = x + (card_w - p_img.width) // 2
                py = y + (card_h - p_img.height) // 2
                og.paste(p_img, (px, py), p_img)
            except Exception as e:
                print(f"Resim hatası {img_path}: {e}")
        
        # Aday Adı (Kartın altına şık metin)
        draw.text((x + 10, y + card_h + 8), name, fill="#1d2125", font=font_sans_semibold)
        draw.text((x + 10, y + card_h + 30), "Psikolojik Danışman Adayı", fill="#6e7681", font=ImageFont.truetype("/usr/share/fonts/google-noto/NotoSans-Regular.ttf", 12))

    og.save("og-image.png", "PNG", optimize=True)
    print("og-image.png (1200x630) kusursuz Türkçe karakterlerle oluşturuldu.")

generate_og_image()
