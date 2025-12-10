
// Du lieu san pham: moi san pham co id, ten, gia, danh muc, hinh, mo ta, giamGia
const products = [
    {
        id: 1,
        name: "Bó Hướng Dương Tinh Yêu",
        price: 420000,
        category: "hoa-tinh-yeu",
        image: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
        sale: true,
        rating: 4.7,
        ratingCount: 178,
        description: "Bó hoa hướng dương rực rỡ, thích hợp tặng người đặc biệt.",
        createdAt: "2025-12-01"
    },
    {
        id: 2,
        name: "Hộp Tim Hồng Kem",
        price: 650000,
        category: "hoa-tinh-yeu",
        image: "https://images.pexels.com/photos/1028725/pexels-photo-1028725.jpeg",
        sale: true,
        rating: 4.8,
        ratingCount: 81,
        description: "Hộp hoa tim hai tầng với tông hồng kem ngọt ngào.",
        createdAt: "2025-11-28"
    },
    {
        id: 3,
        name: "Cỏ Bốn Lá May Mắn",
        price: 350000,
        category: "chau-canh",
        image: "images/co4la_xanh.png",
        sale: false,
        rating: 4.9,
        ratingCount: 96,
        description: "Chậu cỏ bốn lá xanh mang lại may mắn, thích hợp để bàn.",
        createdAt: "2025-11-20"
    },
    {
        id: 4,
        name: "Giỏ Hoa Sinh Nhật Rực Rỡ",
        price: 550000,
        category: "hoa-sinh-nhat",
        image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg",
        sale: true,
        rating: 4.6,
        ratingCount: 132,
        description: "Giỏ hoa sinh nhật với nhiều loại hoa rực rỡ, tươi tắn.",
        createdAt: "2025-10-30"
    },
    {
        id: 5,
        name: "Lẵng Hoa Khai Trương Phát Tài",
        price: 980000,
        category: "hoa-khai-truong",
        image: "https://images.pexels.com/photos/4465976/pexels-photo-4465976.jpeg",
        sale: true,
        rating: 4.5,
        ratingCount: 73,
        description: "Lẵng hoa khai trương sang trọng, tông đỏ-vàng, mang ý nghĩa phát tài phát lộc.",
        createdAt: "2025-10-15"
    },
    {
        id: 6,
        name: "Vòng Hoa Giáng Sinh Ấm Áp",
        price: 620000,
        category: "hoa-giang-sinh",
        image: "https://images.pexels.com/photos/712321/pexels-photo-712321.jpeg",
        sale: true,
        rating: 4.8,
        ratingCount: 54,
        description: "Vòng hoa treo cửa Giáng sinh với nơ đỏ và lá thông xanh.",
        createdAt: "2025-11-30"
    },
    {
        id: 7,
        name: "Bình Hoa Hồng Xanh Đá",
        price: 730000,
        category: "hoa-trang-tri-phong",
        image: "https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg",
        sale: false,
        rating: 4.7,
        ratingCount: 61,
        description: "Bình hoa hồng xanh độc lạ, tạo điểm nhấn cho không gian phòng khách.",
        createdAt: "2025-09-20"
    },
    {
        id: 8,
        name: "Bó Hoa Tốt Nghiệp Tươi Vui",
        price: 480000,
        category: "hoa-tot-nghiep",
        image: "https://images.pexels.com/photos/2072165/pexels-photo-2072165.jpeg",
        sale: false,
        rating: 4.6,
        ratingCount: 42,
        description: "Bó hoa chúc mừng tốt nghiệp tông vàng cam rực rỡ.",
        createdAt: "2025-08-11"
    },
    {
        id: 9,
        name: "Chậu Xương Rồng Đá Sa Mạc",
        price: 260000,
        category: "hoa-xuong-rong-da",
        image: "https://images.pexels.com/photos/103006/pexels-photo-103006.jpeg",
        sale: false,
        rating: 4.4,
        ratingCount: 39,
        description: "Chậu xương rồng nhỏ gọn, dễ chăm sóc, thích hợp để bàn làm việc.",
        createdAt: "2025-07-05"
    },
    {
        id: 10,
        name: "Set Quà Tặng Hoa & Socola",
        price: 720000,
        category: "qua-tang",
        image: "https://images.pexels.com/photos/2072161/pexels-photo-2072161.jpeg",
        sale: true,
        rating: 4.9,
        ratingCount: 88,
        description: "Set quà gồm hoa tươi và socola cao cấp, phù hợp các dịp đặc biệt.",
        createdAt: "2025-11-05"
    }
];
