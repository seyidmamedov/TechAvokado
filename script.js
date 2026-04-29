// ============================================
// MƏHSUL BAZASI - Yeni məhsul əlavə etmək üçün bu massivi redaktə edin
// ============================================
const products = [
    // Noutbuklar
    {
        id: 1,
        name: "Asus Vivobook S-14",
        description: "Asus Vivobook S-14,Ultra 5 225-H, 32GB RAM, 512GB SSD. Peşəkarlar üçün mükəmməl seçim.",
        price: "1550",
        priceNum: 1550,
        category: "laptop",
        image: "AVOKADO/Asus-VivoBook-s14-S3407CA.png"
    },
    {
        id: 2,
        name: "Asus Tuf F-16",
        description: "Asus Tuf F-16, Intel Core i5-13450HX, 16GB RAM, 512GB SSD, RTX 5060 8GB qrafik kart.",
        price: "2050",
        priceNum: 2050,
        category: "laptop",
        image: "AVOKADO/asus-tuf-F16-FX608JM-RV002.png"
    },
    // Siçanlar
    {
        id: 3,
        name: "Ajazz 139 V2",
        description: "2.4GHz simsiz siçan, RGB işıqlandırma, uzun batareya ömrü.",
        price: "60",
        priceNum: 60    ,
        category: "mouse",
        image: "AVOKADO/ajazz-139-v2.png"
    },
    {
        id: 4,
        name: "Fantech WG11 Cruiser",
        description: "Oyun siçanı, optik düymələr, yüngül çəki.",
        price: "25",
        priceNum: 25,
        category: "mouse",
        image: "AVOKADO/fantech-wg11-cruiser.png"
    },
    // Klaviaturalar
    {
        id: 6,
        name: "Skylion K-68",
        description: "Mexaniki klaviatura, RGB işıqlandırma, Compact dizayn.",
        price: "50",
        priceNum: 50,
        category: "keyboard",
        image: "AVOKADO/skylion-k68.png"
    },
    // {
    //     id: 7,
    //     name: "Logitech MX Keys",
    //     description: "Simsiz klaviatura, arxa işıq, ağıllı işıqlandırma, çox cihaz dəstəyi.",
    //     price: "199",
    //     priceNum: 199,
    //     category: "keyboard",
    //     image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400"
    // },
    // {
    //     id: 8,
    //     name: "Razer BlackWidow V4",
    //     description: "Oyun mexaniki klaviatura, yaşıl düymələr, RGB işıqlandırma.",
    //     price: "329",
    //     priceNum: 329,
    //     category: "keyboard",
    //     image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400"
    // },
    
    // Monitorlar
    {
        id: 9,
        name: "Msi Mag 255-F",
        description: "24,5 inch oyun monitoru, 200Hz, 0.5ms, IPS panel, HDR.",
        price: "320",
        priceNum: 320,
        category: "monitor",
        image: "AVOKADO/msi-mag-255f-e20.png"
    },
    // {
    //     id: 10,
    //     name: "LG UltraGear 27\"",
    //     description: "27\" oyun monitoru, 144Hz, IPS panel, HDR10 dəstəyi.",
    //     price: "899",
    //     priceNum: 899,
    //     category: "monitor",
    //     image: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=400"
    // },
    // {
    //     id: 11,
    //     name: "Dell UltraSharp 27\"",
    //     description: "27\" 4K USB-C monitor, dəqiq rəng, hündürlük tənzimləməsi.",
    //     price: "1099",
    //     priceNum: 1099,
    //     category: "monitor",
    //     image: "https://images.unsplash.com/photo-1589743537526-88a2f52f0289?w=400"
    // },
    
    // // Qulaqlıqlar
    // {
    //     id: 12,
    //     name: "Sony WH-1000XM5",
    //     description: "Simsiz səs kəsən qulaqlıq, 30 saat batareya, premium səs.",
    //     price: "799",
    //     priceNum: 799,
    //     category: "headset",
    //     image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400"
    // },
    // {
    //     id: 13,
    //     name: "Logitech G Pro X",
    //     description: "Oyun qulaqlığı, 7.1 surround, Blue VO!CE mikrofon.",
    //     price: "299",
    //     priceNum: 299,
    //     category: "headset",
    //     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    // },
    // {
    //     id: 16,
    //     name: "Razer BlackShark V2",
    //     description: "Esports qulaqlığı, THX səs, passiv səs kəsilməsi.",
    //     price: "349",
    //     priceNum: 349,
    //     category: "headset",
    //     image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400"
    // },
    
    // // Aksessuarlar
    // {
    //     id: 17,
    //     name: "Webcam C920",
    //     description: "Full HD 1080p veb kamera, avto fokus, stereo mikrofon.",
    //     price: "149",
    //     priceNum: 149,
    //     category: "accessory",
    //     image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400"
    // },
    // {
    //     id: 18,
    //     name: "USB-C Hub 7-in-1",
    //     description: "Multiport adapter, HDMI, USB 3.0, SD card oxuyucu.",
    //     price: "89",
    //     priceNum: 89,
    //     category: "accessory",
    //     image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400"
    // },
    // {
    //     id: 19,
    //     name: "Laptop Stand Aluminum",
    //     description: "Ergonomic laptop stand, adjustable height, heat dissipation.",
    //     price: "79",
    //     priceNum: 79,
    //     category: "accessory",
    //     image: "https://images.unsplash.com/photo-1527864550417-7fd91d51a437?w=400"
    // },
    // {
    //     id: 20,
    //     name: "Wireless Charger Pad",
    //     description: "15W fast wireless charging, compatible with all Qi devices.",
    //     price: "59",
    //     priceNum: 59,
    //     category: "accessory",
    //     image: "https://images.unsplash.com/photo-1591290619762-c588e3f5a9d8?w=400"
    // }
];

// ============================================
// STATE MANAGEMENT
// ============================================
let cart = [];
let favorites = [];
let likedProducts = new Set();

// ============================================
// DOM ELEMENTS
// ============================================
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const cartCount = document.getElementById('cart-count');
const favCount = document.getElementById('fav-count');

// Modals
const cartModal = document.getElementById('cart-modal');
const favoritesModal = document.getElementById('favorites-modal');
const cartItems = document.getElementById('cart-items');
const favoritesItems = document.getElementById('favorites-items');
const cartTotalPrice = document.getElementById('cart-total-price');

// ============================================
// RENDER PRODUCTS FUNCTION
// ============================================
function renderProducts(productData) {
    productList.innerHTML = '';
    
    if (productData.length === 0) {
        productList.innerHTML = '<p style="text-align:center; grid-column: 1/-1; font-size: 18px; color: #64748b;">No products found!</p>';
        return;
    }
    
    productData.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const isLiked = likedProducts.has(product.id);
        const isInCart = cart.some(item => item.id === product.id);
        
        card.innerHTML = `
            <div class="card-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="heart-btn ${isLiked ? 'liked' : ''}" data-id="${product.id}">
                    ${isLiked ? '❤️' : '🤍'}
                </button>
                <button class="add-to-cart-btn ${isInCart ? 'added' : ''}" data-id="${product.id}">
                    ${isInCart ? '✓ Added to Cart' : '+ Add to Cart'}
                </button>
            </div>
            <div class="card-content">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <div class="info">
                    <span class="category">${product.category}</span>
                    <span class="price">${product.price} AZN</span>
                </div>
            </div>
        `;
        
        productList.appendChild(card);
    });
    
    // Add event listeners to buttons
    attachCardEventListeners();
}

// ============================================
// EVENT LISTENERS FOR CARDS
// ============================================
function attachCardEventListeners() {
    // Heart buttons
    document.querySelectorAll('.heart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            toggleLike(productId);
        });
    });
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            toggleCart(productId);
        });
    });
}

// ============================================
// LIKE SYSTEM
// ============================================
function toggleLike(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (likedProducts.has(productId)) {
        likedProducts.delete(productId);
        // Remove from favorites if there
        favorites = favorites.filter(f => f.id !== productId);
    } else {
        likedProducts.add(productId);
        favorites.push(product);
    }
    
    updateCounts();
    renderProducts(getFilteredProducts());
    updateFavoritesDisplay();
}

// ============================================
// CART SYSTEM
// ============================================
function toggleCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCounts();
    renderProducts(getFilteredProducts());
    updateCartDisplay();
}

// ============================================
// REMOVE FROM CART
// ============================================
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCounts();
    renderProducts(getFilteredProducts());
    updateCartDisplay();
}

// ============================================
// UPDATE COUNTS
// ============================================
function updateCounts() {
    cartCount.textContent = cart.length;
    favCount.textContent = favorites.length;
    
    if (cart.length === 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'inline';
    }
    
    if (favorites.length === 0) {
        favCount.style.display = 'none';
    } else {
        favCount.style.display = 'inline';
    }
}

// ============================================
// UPDATE CART DISPLAY
// ============================================
function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-message">Your cart is empty!</p>';
        cartTotalPrice.textContent = '0 AZN';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        total += item.priceNum;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="price">${item.price} AZN</span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    }).join('');
    
    cartTotalPrice.textContent = total + ' AZN';
}

// ============================================
// UPDATE FAVORITES DISPLAY
// ============================================
function updateFavoritesDisplay() {
    if (favorites.length === 0) {
        favoritesItems.innerHTML = '<p class="empty-message">No favorites yet!</p>';
        return;
    }
    
    favoritesItems.innerHTML = favorites.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span class="price">${item.price} AZN</span>
            </div>
            <button class="cart-item-remove" onclick="toggleLike(${item.id})">Remove</button>
        </div>
    `).join('');
}

// ============================================
// FILTER PRODUCTS
// ============================================
function getFilteredProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    
    return products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || product.category === category;
        
        return matchesSearch && matchesCategory;
    });
}

function filterProducts() {
    renderProducts(getFilteredProducts());
}

// ============================================
// MODAL HANDLERS
// ============================================
function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// ============================================
// NAVIGATION & MOBILE MENU
// ============================================
function initNavigation() {
    // Cart modal
    document.getElementById('nav-cart').addEventListener('click', (e) => {
        e.preventDefault();
        openModal(cartModal);
    });
    
    document.getElementById('close-cart').addEventListener('click', () => {
        closeModal(cartModal);
    });
    
    // Favorites modal
    document.getElementById('nav-favorites').addEventListener('click', (e) => {
        e.preventDefault();
        updateFavoritesDisplay();
        openModal(favoritesModal);
    });
    
    document.getElementById('close-favorites').addEventListener('click', () => {
        closeModal(favoritesModal);
    });
    
    // Close modals on outside click
    [cartModal, favoritesModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('nav a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Close mobile menu if open
            nav.classList.remove('show');
        });
    });
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Thank you for your order! Total: ' + cartTotalPrice.textContent);
            cart = [];
            updateCounts();
            updateCartDisplay();
            renderProducts(getFilteredProducts());
            closeModal(cartModal);
        } else {
            alert('Your cart is empty!');
        }
    });
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    initNavigation();
    
    // Search and filter listeners
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    
    // Keyboard escape to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(cartModal);
            closeModal(favoritesModal);
        }
    });
});