
// Quan ly tai khoan
let currentUser = null;

function loadUserFromStorage() {
    try {
        const saved = localStorage.getItem("fs_user");
        currentUser = saved ? JSON.parse(saved) : null;
    } catch {
        currentUser = null;
    }
}

function saveUserToStorage() {
    if (currentUser) {
        localStorage.setItem("fs_user", JSON.stringify(currentUser));
    } else {
        localStorage.removeItem("fs_user");
    }
}

function updateAuthUI() {
    const authSection = document.getElementById("auth-section");
    if (!authSection) return;
    if (!currentUser) {
        authSection.innerHTML = '<button class="btn-outline" onclick="openModal(\\'auth-modal\\')">Đăng Nhập</button>';
        return;
    }
    const name = currentUser.name || "Facebook User";
    const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2);
    authSection.innerHTML = `
        <button class="avatar-chip" onclick="openModal('profile-modal')">
            <span class="avatar-round">${initials}</span>
            <span class="avatar-name">${name}</span>
        </button>
    `;
}

function handleLogin(e) {
    e.preventDefault();
    const id = document.getElementById("login-identifier").value.trim();
    const pass = document.getElementById("login-password").value.trim();
    if (!id || !pass) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }
    // Login demo
    currentUser = {
        name: "Facebook User",
        email: id.includes("@") ? id : "guest@example.com"
    };
    saveUserToStorage();
    updateAuthUI();
    document.getElementById("profile-name").textContent = currentUser.name;
    document.getElementById("profile-email").textContent = currentUser.email;
    closeModal("auth-modal");
    alert("Đăng nhập demo thành công.");
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const phone = document.getElementById("signup-phone").value.trim();
    const pass = document.getElementById("signup-password").value.trim();
    if (!name || !email || !phone || !pass) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }
    currentUser = { name, email, phone };
    saveUserToStorage();
    updateAuthUI();
    document.getElementById("profile-name").textContent = currentUser.name;
    document.getElementById("profile-email").textContent = currentUser.email;
    closeModal("signup-modal");
    alert("Đăng ký demo thành công.");
}

function loginWithProvider(provider) {
    if (provider === "google") {
        window.open("https://accounts.google.com/signin", "_blank");
    } else if (provider === "facebook") {
        window.open("https://www.facebook.com/login.php", "_blank");
    } else if (provider === "phone") {
        alert("Đăng nhập bằng SĐT demo.");
    }
    currentUser = {
        name: provider === "facebook" ? "Facebook User" : "Guest User",
        email: "guest@example.com"
    };
    saveUserToStorage();
    updateAuthUI();
    closeModal("auth-modal");
}

function switchAuth(target) {
    if (target === "signup") {
        closeModal("auth-modal");
        openModal("signup-modal");
    } else {
        closeModal("signup-modal");
        openModal("auth-modal");
    }
}

function logout() {
    if (!confirm("Đăng xuất khỏi tài khoản hiện tại?")) return;
    currentUser = null;
    saveUserToStorage();
    updateAuthUI();
    closeModal("profile-modal");
}

function updateAvatar(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById("user-avatar");
        if (img) img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}
