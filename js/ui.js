
// UI, loc san pham, giao dien, ngon ngu, modal, ho tro
let currentCategory = "all";
let currentSort = "newest";
let currentPage = 1;
const pageSize = 6;
let searchKeyword = "";
let currentTheme = "dark";
let currentSeason = "noel";
let currentLanguage = "en";
let notifyEnabled = false;

function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("hien");
}
function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("hien");
}

// loc & hien san pham
function getFilteredProducts() {
    let list = products.slice();

    if (currentCategory !== "all") {
        list = list.filter(p => p.category === currentCategory);
    }
    if (searchKeyword) {
        const kw = searchKeyword.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(kw) || p.description.toLowerCase().includes(kw));
    }
    if (currentSort === "price-asc") {
        list.sort((a,b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
        list.sort((a,b) => b.price - a.price);
    } else if (currentSort === "promo") {
        list = list.filter(p => p.sale);
    } else {
        list.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return list;
}

function renderProducts() {
    const grid = document.getElementById("product-grid");
    const pagEl = document.getElementById("pagination");
    if (!grid || !pagEl) return;

    const list = getFilteredProducts();
    const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * pageSize;
    const pageItems = list.slice(start, start + pageSize);

    if (pageItems.length === 0) {
        grid.innerHTML = '<p>Không tìm thấy sản phẩm phù hợp.</p>';
    } else {
        grid.innerHTML = pageItems.map(p => `
            <div class="product-card">
                <div class="product-img-wrap">
                    <img src="${p.image}" alt="${p.name}">
                    ${p.sale ? '<span class="product-sale-badge">SALE</span>' : ""}
                    <div class="product-heart"><i class="fas fa-heart"></i></div>
                </div>
                <div class="product-body">
                    <div class="product-name">${p.name}</div>
                    <div class="product-price">${p.price.toLocaleString("vi-VN")}đ</div>
                    <div class="product-desc">${p.description}</div>
                    <div class="product-actions">
                        <button class="btn-secondary" onclick="openDetailModal(${p.id})">Xem</button>
                        <button class="btn-primary btn-add-quick" onclick="addToCart(${p.id}, 1)">Thêm</button>
                    </div>
                </div>
            </div>
        `).join("");
    }

    let pagHtml = "";
    for (let i = 1; i <= totalPages; i++) {
        pagHtml += `<button ${i === currentPage ? 'class="active"' : ""} onclick="changePage(${i})">${i}</button>`;
    }
    pagEl.innerHTML = pagHtml;
}

function changePage(page) {
    currentPage = page;
    renderProducts();
}

function filterCategory(cat) {
    currentCategory = cat;
    currentPage = 1;
    const title = document.getElementById("category-title");
    if (title) {
        const item = document.querySelector('.category-list li[data-cat="'+cat+'"]');
        title.textContent = item ? item.textContent.trim() : "Tất Cả Sản Phẩm";
    }
    document.querySelectorAll(".category-list li").forEach(li => {
        li.classList.toggle("active", li.getAttribute("data-cat") === cat || (cat==="all" && li.getAttribute("data-cat")==="all"));
    });
    renderProducts();
}

function handleSort() {
    const select = document.getElementById("sort-select");
    currentSort = select ? select.value : "newest";
    currentPage = 1;
    renderProducts();
}

function handleSearch() {
    const input = document.getElementById("search-input");
    searchKeyword = input ? input.value : "";
    currentPage = 1;
    renderProducts();
}

function resetToHome() {
    currentCategory = "all";
    currentSort = "newest";
    searchKeyword = "";
    currentPage = 1;
    const input = document.getElementById("search-input");
    if (input) input.value = "";
    filterCategory("all");
    handleSort();
}

let detailProductId = null;
function openDetailModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    detailProductId = id;
    document.getElementById("detail-img").src = p.image;
    document.getElementById("detail-name").textContent = p.name;
    document.getElementById("detail-price").textContent = p.price.toLocaleString("vi-VN") + "đ";
    document.getElementById("detail-desc").textContent = p.description;
    document.getElementById("detail-qty").textContent = "1";
    openModal("detail-modal");
}
function adjustDetailQty(delta) {
    const span = document.getElementById("detail-qty");
    let value = parseInt(span.textContent || "1", 10);
    value += delta;
    if (value < 1) value = 1;
    span.textContent = value;
}
function addFromDetail() {
    const span = document.getElementById("detail-qty");
    const qty = parseInt(span.textContent || "1", 10);
    if (detailProductId != null) {
        addToCart(detailProductId, qty);
        closeModal("detail-modal");
    }
}

// Sidebar
function toggleSidebar() {
    const content = document.getElementById("sidebar-content");
    const arrow = document.getElementById("sidebar-arrow");
    if (!content || !arrow) return;
    content.classList.toggle("an");
    if (content.classList.contains("an")) {
        content.style.display = "none";
        arrow.style.transform = "rotate(-90deg)";
    } else {
        content.style.display = "block";
        arrow.style.transform = "rotate(0deg)";
    }
}

// Info cards
function toggleInfo(headerEl) {
    const card = headerEl.closest(".info-card");
    if (!card) return;
    card.classList.toggle("mo");
}

// Ho tro
function showSupport(type) {
    const title = document.getElementById("support-title");
    const content = document.getElementById("support-content");
    if (!title || !content) return;
    if (type === "hd") {
        title.textContent = "Hướng dẫn mua hàng";
        content.innerHTML = "Chọn sản phẩm bạn thích, thêm vào giỏ hàng và điền thông tin thanh toán.";
    } else if (type === "cs") {
        title.textContent = "Chính sách đổi trả";
        content.innerHTML = "Sản phẩm lỗi do Shop sẽ được đổi mới trong vòng 48h kể từ khi nhận.";
    } else {
        title.textContent = "Bảo mật thông tin";
        content.innerHTML = "Thông tin khách hàng được mã hóa và chỉ dùng cho việc giao hàng.";
    }
    openModal("support-popup");
}

// Social copy
function copySocialLink(e, link) {
    e.preventDefault();
    navigator.clipboard.writeText(link).then(() => {
        const icon = e.currentTarget.querySelector("i");
        if (!icon) return;
        const old = icon.className;
        icon.className = "fas fa-check";
        setTimeout(() => icon.className = old, 1200);
    });
}

// Fake call & chat
function fakeCall() {
    alert("Gọi nhanh đến hotline: 0909 888 777 (demo).");
}
function openChatPopup() {
    alert("Mở popup chat với admin (demo).");
}

// Cai dat: giao dien, chu de, ngon ngu
function loadSettingsFromStorage() {
    try {
        const saved = localStorage.getItem("fs_settings");
        if (!saved) return;
        const s = JSON.parse(saved);
        currentTheme = s.theme || "dark";
        currentSeason = s.season || "noel";
        currentLanguage = s.lang || "en";
        notifyEnabled = !!s.notify;
    } catch {
        // ignore
    }
}
function saveSettingsToStorage() {
    const s = {
        theme: currentTheme,
        season: currentSeason,
        lang: currentLanguage,
        notify: notifyEnabled
    };
    localStorage.setItem("fs_settings", JSON.stringify(s));
}
function applyTheme() {
    if (currentTheme === "light") {
        document.body.classList.add("theme-sang");
    } else {
        document.body.classList.remove("theme-sang");
    }
    const radios = document.querySelectorAll("input[name='theme']");
    radios.forEach(r => r.checked = (r.value === currentTheme));
}
function changeTheme(theme) {
    currentTheme = theme;
    applyTheme();
    saveSettingsToStorage();
}
function applySeason() {
    document.body.classList.remove("chu-de-noel", "chu-de-tet", "chu-de-valentine");
    if (currentSeason === "noel") document.body.classList.add("chu-de-noel");
    if (currentSeason === "tet") document.body.classList.add("chu-de-tet");
    if (currentSeason === "valentine") document.body.classList.add("chu-de-valentine");
    const select = document.getElementById("season-select");
    if (select) select.value = currentSeason;
}
function changeSeason(season) {
    currentSeason = season;
    applySeason();
    saveSettingsToStorage();
}
function applyLanguage() {
    const select = document.getElementById("lang-select");
    if (select) select.value = currentLanguage;
    // Demo: chi doi placeholder search
    const search = document.getElementById("search-input");
    if (!search) return;
    if (currentLanguage === "vi") {
        search.placeholder = "Tìm kiếm hoa hồng, lan, xương rồng...";
    } else if (currentLanguage === "zh") {
        search.placeholder = "搜索玫瑰、兰花、仙人掌...";
    } else if (currentLanguage === "ja") {
        search.placeholder = "バラ、ラン、サボテンを検索...";
    } else if (currentLanguage === "ko") {
        search.placeholder = "장미, 난, 선인장을 검색...";
    } else {
        search.placeholder = "Search roses, orchids, cactus...";
    }
}
function changeLanguage(lang) {
    currentLanguage = lang;
    applyLanguage();
    saveSettingsToStorage();
}
function toggleNotification(on) {
    notifyEnabled = on;
    saveSettingsToStorage();
    if (on) alert("Đã bật thông báo khuyến mãi (demo).");
}

// Back to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
function handleScroll() {
    const btn = document.getElementById("btn-back-top");
    if (!btn) return;
    if (window.scrollY > 300) {
        btn.classList.add("hien");
    } else {
        btn.classList.remove("hien");
    }
}

// Flash sale countdown demo (1 ngày)
function startCountdown() {
    const end = Date.now() + 24 * 60 * 60 * 1000;
    const el = document.getElementById("flash-countdown");
    function tick() {
        const now = Date.now();
        const diff = end - now;
        if (diff <= 0) {
            el.textContent = "Đã kết thúc";
            return;
        }
        const h = Math.floor(diff / (1000*60*60));
        const m = Math.floor(diff / (1000*60)) % 60;
        const s = Math.floor(diff / 1000) % 60;
        el.textContent = `Kết thúc sau: ${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
        requestAnimationFrame(tick);
    }
    tick();
}

// Khởi tạo
document.addEventListener("DOMContentLoaded", () => {
    loadCartFromStorage();
    loadOrdersFromStorage();
    loadUserFromStorage();
    loadSettingsFromStorage();

    applyTheme();
    applySeason();
    applyLanguage();
    updateAuthUI();
    renderCart();
    updateCartBadge();
    renderOrderHistory();
    filterCategory("all");
    startCountdown();

    // hien promo lan dau
    const promoShown = sessionStorage.getItem("fs_promo_shown");
    if (!promoShown) {
        openModal("promo-overlay");
        sessionStorage.setItem("fs_promo_shown", "1");
    }

    window.addEventListener("scroll", handleScroll);
});
