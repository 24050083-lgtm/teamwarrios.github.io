
// Quan ly gio hang va dat hang
let cart = [];
let orders = [];

function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem("fs_cart");
        cart = saved ? JSON.parse(saved) : [];
    } catch {
        cart = [];
    }
}

function saveCartToStorage() {
    localStorage.setItem("fs_cart", JSON.stringify(cart));
}

function loadOrdersFromStorage() {
    try {
        const saved = localStorage.getItem("fs_orders");
        orders = saved ? JSON.parse(saved) : [];
    } catch {
        orders = [];
    }
}

function saveOrdersToStorage() {
    localStorage.setItem("fs_orders", JSON.stringify(orders));
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity
        });
    }
    saveCartToStorage();
    renderCart();
    updateCartBadge();
}

function removeCartItem(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    renderCart();
    updateCartBadge();
}

function changeCartQty(index, delta) {
    const item = cart[index];
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) cart.splice(index, 1);
    saveCartToStorage();
    renderCart();
    updateCartBadge();
}

function calcCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function renderCart() {
    const tbody = document.getElementById("cart-body");
    const totalEl = document.getElementById("cart-total");
    if (!tbody || !totalEl) return;

    if (cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:8px 0;">Giỏ hàng đang trống.</td></tr>';
        totalEl.textContent = "0đ";
        return;
    }
    tbody.innerHTML = cart.map((item, index) => `
        <tr>
            <td><img src="${item.image}" alt=""></td>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString("vi-VN")}đ</td>
            <td>
                <button onclick="changeCartQty(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeCartQty(${index}, 1)">+</button>
            </td>
            <td><button onclick="removeCartItem(${index})">×</button></td>
        </tr>
    `).join("");

    totalEl.textContent = calcCartTotal().toLocaleString("vi-VN") + "đ";
}

function updateCartBadge() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
    badge.textContent = totalQty;
}

function applyVoucher() {
    const input = document.getElementById("voucher-input");
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    let discount = 0;
    if (code === "NOEL2025") discount = 5;
    else if (code === "FLOWER10") discount = 10;

    const total = calcCartTotal();
    const totalEl = document.getElementById("cart-total");
    if (!totalEl) return;

    if (discount > 0) {
        const newTotal = Math.round(total * (1 - discount / 100));
        totalEl.textContent = newTotal.toLocaleString("vi-VN") + "đ";
        alert(`Đã áp dụng mã ${code}. Giảm ${discount}%`);
    } else {
        totalEl.textContent = total.toLocaleString("vi-VN") + "đ";
        alert("Mã không hợp lệ.");
    }
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống.");
        return;
    }
    openModal("checkout-modal");
}

function processCheckout(e) {
    e.preventDefault();
    const name = document.getElementById("checkout-name").value.trim();
    const phone = document.getElementById("checkout-phone").value.trim();
    const address = document.getElementById("checkout-address").value.trim();
    if (!name || !phone || !address) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }
    const total = calcCartTotal();
    const id = Date.now();
    const now = new Date();
    const order = {
        id,
        name,
        phone,
        address,
        total,
        items: cart.map(i => ({ ...i })),
        createdAt: now.toLocaleString("vi-VN")
    };
    orders.unshift(order);
    saveOrdersToStorage();

    cart = [];
    saveCartToStorage();
    renderCart();
    updateCartBadge();
    renderOrderHistory();

    closeModal("checkout-modal");
    closeModal("cart-modal");
    alert("Đặt hàng thành công!");
}

function renderOrderHistory() {
    const wrap = document.getElementById("order-history-list");
    if (!wrap) return;
    if (orders.length === 0) {
        wrap.innerHTML = '<p style="text-align:center">Chưa có đơn hàng nào.</p>';
        return;
    }
    wrap.innerHTML = orders.map(o => `
        <div class="order-card">
            <div><strong>Đơn hàng #${o.id}</strong> (${o.createdAt})</div>
            <div>Khách: ${o.name} - ${o.phone}</div>
            <div>Địa chỉ: ${o.address}</div>
            <div>Tổng: ${o.total.toLocaleString("vi-VN")}đ</div>
            <ul>
                ${o.items.map(i => `<li>- ${i.name} x${i.quantity}</li>`).join("")}
            </ul>
        </div>
    `).join("");
}
