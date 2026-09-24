/**
 * Bireyle Psikolojik Danışma - Danışman Adayları Portalı
 * Hafif, bağımlılıksız, sıfır backend Vanilla JavaScript.
 */

// Yerel (file://) protokolünde CORS engeline takılmamak ve anında açılmak için
// assets/profiles.json ile birebir eşleşen güvenli yerleşik veri:
const DEFAULT_PROFILES = [
  {
    slug: "sinem-isik",
    name: "Sinem Işık",
    title: "Psikolojik Danışman Adayı",
    supervisor: "Prof. Dr. Eyüp Çelik",
    service: "Bireyle Psikolojik Danışma",
    format: "Ücretsiz danışma hizmeti",
    description: "Kendinizi daha iyi tanımak, yaşadığınız zorlukları anlamlandırmak ve duygu, düşünce ve davranışlarınızı keşfetmek için Bireyle Psikolojik Danışma dersim kapsamında Prof. Dr. Eyüp Çelik süpervizörlüğünde vermiş olduğum ÜCRETSİZ danışma desteğinden yararlanabilirsiniz.",
    phone: "0545 350 29 60",
    email: "sinem.isik2@ogr.sakarya.edu.tr",
    image: "assets/sinem-isik.png"
  },
  {
    slug: "zeynep-rana-filiz",
    name: "Zeynep Rana Filiz",
    title: "Psikolojik Danışman Adayı",
    supervisor: "Prof. Dr. Eyüp Çelik",
    service: "Bireyle Psikolojik Danışma",
    format: "Ücretsiz danışma hizmeti",
    description: "Kendinizi daha iyi tanımak, yaşadığınız zorlukları anlamlandırmak ve duygu, düşünce ve davranışlarınızı farketmek için Bireyle Psikolojik Danışma dersim kapsamında Prof. Dr. Eyüp ÇELİK süpervizörlüğünde ücretsiz danışma desteği vermekteyim.",
    phone: "0551 184 67 15",
    email: "rana.filiz@ogr.sakarya.edu.tr",
    image: "assets/zeynep-rana-filiz.png"
  },
  {
    slug: "rumeysa-kiliclar",
    name: "Rumeysa Kılıçlar",
    title: "Psikolojik Danışman Adayı",
    supervisor: "Doç. Dr. Betül Düşünceli",
    service: "Bireyle Psikolojik Danışma",
    format: "Ücretsiz danışma hizmeti",
    description: "Bireyle Psikolojik Danışma dersi kapsamında Doç. Dr. Betül Düşünceli süpervizörlüğünde ücretsiz yüz yüze veya online psikolojik danışma hizmeti vermekteyim.",
    phone: "0551 037 27 77",
    email: "rumeysa.kiliclar@ogr.sakarya.edu.tr",
    image: "assets/rumeysa-kiliclar.png"
  },
  {
    slug: "edanur-kirca",
    name: "Edanur Kırca",
    title: "Psikolojik Danışman Adayı",
    supervisor: "Arş. Gör. Dr. Eda Biçener",
    service: "Bireyle Psikolojik Danışma",
    format: "Ücretsiz danışma hizmeti",
    description: "Sakarya Üniversitesi Rehberlik ve Psikolojik Danışmanlık lisans programı Bireyle Psikolojik Danışma dersi kapsamında Arş. Gör. Dr. Eda Biçener süpervizörlüğünde ücretsiz, yüz yüze, ortalama 7 seans psikolojik danışma hizmeti vermekteyim.",
    phone: "0543 787 2063",
    email: "edanur.kirca@ogr.sakarya.edu.tr",
    location: "Sakarya Üniversitesi, Hendek Eğitim Fakültesi",
    image: "assets/edanur-kirca.png"
  }
];

// Telefon numarasını tel: formatına dönüştürücü (örn. "0545 350 29 60" -> "+905453502960")
function formatTelUri(phoneStr) {
  const digits = phoneStr.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    return "+9" + digits;
  }
  if (!digits.startsWith("90")) {
    return "+90" + digits;
  }
  return "+" + digits;
}

// Mail konu başlığı ile mailto linki
function formatMailtoUri(email, name) {
  const subject = encodeURIComponent(`Bireyle Psikolojik Danışma Randevu Talebi - ${name}`);
  const body = encodeURIComponent(
    `Merhaba ${name},\n\nBireyle Psikolojik Danışma uygulamaları kapsamında danışma desteği almak için sizinle iletişime geçmek istiyorum.\n\nUygun seans gün ve saatleri hakkında bilgilendirebilirseniz sevinirim.\n\nİyi çalışmalar.`
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

// Güvenli HTML kaçış fonksiyonu
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

let allProfiles = [...DEFAULT_PROFILES];

// DOM Elementleri
const gridEl = document.getElementById("profiles-grid");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search");
const emptyStateEl = document.getElementById("empty-state");
const resetFilterBtn = document.getElementById("reset-filter-btn");
const toastEl = document.getElementById("toast");
const toastMessageEl = document.getElementById("toast-message");

let toastTimeout = null;

// Toast Bildirimi Göster
function showToast(message) {
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  toastMessageEl.textContent = message;
  toastEl.classList.add("show");
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2500);
}

// Panoya Kopyalama İşlevi
async function copyToClipboard(text, label) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }
    showToast(`${label} panoya kopyalandı`);
  } catch (err) {
    showToast(`${text}`);
  }
}

// Profil Kartını Oluşturma
function createProfileCard(profile) {
  const card = document.createElement("article");
  card.className = "profile-card";
  card.setAttribute("data-name", profile.name.toLowerCase());
  card.setAttribute("data-supervisor", profile.supervisor.toLowerCase());

  const telUri = formatTelUri(profile.phone);
  const mailUri = formatMailtoUri(profile.email, profile.name);
  const imgSrc = profile.image || `assets/${profile.slug}.png`;

  card.innerHTML = `
    <div class="card-hero">
      <img 
        src="${escapeHtml(imgSrc)}" 
        alt="${escapeHtml(profile.name)} - Psikolojik Danışman Adayı" 
        class="card-portrait"
        loading="lazy"
        onerror="this.style.display='none'"
      >
    </div>
    
    <div class="card-body">
      <div class="card-header-info">
        <h3 class="candidate-name">${escapeHtml(profile.name)}</h3>
        <p class="candidate-title">${escapeHtml(profile.title || "Psikolojik Danışman Adayı")}</p>
      </div>

      <div class="meta-box">
        <div class="meta-row">
          <span class="meta-label">Süpervizör:</span>
          <span class="meta-value supervisor">${escapeHtml(profile.supervisor)}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Kapsam:</span>
          <span class="meta-value">${escapeHtml(profile.format || profile.service)}</span>
        </div>
        ${profile.location ? `
        <div class="location-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>${escapeHtml(profile.location)}</span>
        </div>
        ` : ""}
      </div>

      <p class="card-description">
        ${escapeHtml(profile.description)}
      </p>

      <div class="card-actions">
        <!-- Telefon Arama & Kopyalama -->
        <div class="action-row">
          <a 
            href="${telUri}" 
            class="action-btn btn-phone" 
            title="${escapeHtml(profile.name)} kişisini ara (${escapeHtml(profile.phone)})"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span class="btn-text">Ara: ${escapeHtml(profile.phone)}</span>
          </a>
          <button 
            type="button" 
            class="copy-btn copy-phone" 
            data-copy="${escapeHtml(profile.phone)}" 
            title="Numarayı Kopyala" 
            aria-label="${escapeHtml(profile.name)} telefon numarasını kopyala"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        </div>

        <!-- E-posta Gönderme & Kopyalama -->
        <div class="action-row">
          <a 
            href="${mailUri}" 
            class="action-btn btn-email" 
            title="${escapeHtml(profile.name)} adresine e-posta gönder"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span class="btn-text">${escapeHtml(profile.email)}</span>
          </a>
          <button 
            type="button" 
            class="copy-btn copy-email" 
            data-copy="${escapeHtml(profile.email)}" 
            title="E-postayı Kopyala" 
            aria-label="${escapeHtml(profile.name)} e-posta adresini kopyala"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Kopyalama Buton Olayları
  const copyPhoneBtn = card.querySelector(".copy-phone");
  copyPhoneBtn.addEventListener("click", () => {
    copyToClipboard(profile.phone, "Telefon numarası");
  });

  const copyEmailBtn = card.querySelector(".copy-email");
  copyEmailBtn.addEventListener("click", () => {
    copyToClipboard(profile.email, "E-posta adresi");
  });

  return card;
}

// Profilleri Grid'e Basma
function renderProfiles(profiles) {
  gridEl.innerHTML = "";

  if (profiles.length === 0) {
    emptyStateEl.style.display = "block";
    gridEl.style.display = "none";
  } else {
    emptyStateEl.style.display = "none";
    gridEl.style.display = "grid";
    profiles.forEach((profile) => {
      const card = createProfileCard(profile);
      gridEl.appendChild(card);
    });
  }
}

// Arama & Filtreleme Mantığı
function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();

  if (query.length > 0) {
    clearSearchBtn.style.display = "flex";
  } else {
    clearSearchBtn.style.display = "none";
  }

  const filtered = allProfiles.filter((p) => {
    const matchName = p.name.toLowerCase().includes(query);
    const matchSupervisor = p.supervisor.toLowerCase().includes(query);
    const matchFormat = (p.format || "").toLowerCase().includes(query);
    const matchDesc = (p.description || "").toLowerCase().includes(query);
    return matchName || matchSupervisor || matchFormat || matchDesc;
  });

  renderProfiles(filtered);
}

// Temizle Butonu
clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  handleSearch();
});

// Sıfırla Butonu
resetFilterBtn.addEventListener("click", () => {
  searchInput.value = "";
  handleSearch();
});

// Arama Input Olayı
searchInput.addEventListener("input", handleSearch);

// JSON Yükleme Denemesi (assets/profiles.json üzerinden)
async function init() {
  try {
    const res = await fetch("assets/profiles.json");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        allProfiles = data.map((item) => ({
          ...item,
          image: `assets/${item.slug}.png`
        }));
      }
    }
  } catch (e) {
    // Yerel dosya sistemi (file://) veya CORS hatasında varsayılan veriyi korur
    console.info("Yerleşik profil verisi kullanılıyor.");
  }

  renderProfiles(allProfiles);
}

// Başlat
document.addEventListener("DOMContentLoaded", init);
