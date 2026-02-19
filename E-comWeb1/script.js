// Sample product data
const products = [
    {
        id: 1,
        name: "Classic Leather Watch",
        category: "Accessories",
        price: 299,
        originalPrice: 399,
        rating: 4.8,
        reviews: 124,
        badge: "Best Seller",
        image: "product1.jpg"
    },
    {
        id: 2,
        name: "Minimalist Backpack",
        category: "Bags",
        price: 129,
        rating: 4.6,
        reviews: 89,
        badge: "New",
        image: "product2.jpg"
    },
    {
        id: 3,
        name: "Wireless Earbuds Pro",
        category: "Electronics",
        price: 199,
        originalPrice: 249,
        rating: 4.9,
        reviews: 256,
        badge: "Sale",
        image: "product3.jpg"
    },
    {
        id: 4,
        name: "Designer Sunglasses",
        category: "Accessories",
        price: 159,
        rating: 4.7,
        reviews: 143,
        image: "product4.jpg"
    },
    {
        id: 5,
        name: "Premium Sneakers",
        category: "Footwear",
        price: 189,
        originalPrice: 229,
        rating: 4.8,
        reviews: 198,
        badge: "Popular",
        image: "product5.jpg"
    },
    {
        id: 6,
        name: "Leather Wallet",
        category: "Accessories",
        price: 79,
        rating: 4.5,
        reviews: 76,
        image: "product6.jpg"
    }
];

// Cart management
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initMobileMenu();
    initCart();
    loadProducts();
    initNewsletter();
    initScrollAnimations();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

// Cart functionality
function initCart() {
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const overlay = document.getElementById('overlay');

    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    });

    closeCart.addEventListener('click', closeCartSidebar);
    overlay.addEventListener('click', closeCartSidebar);
}

function closeCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');

    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Load products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-actions">
                <button class="action-btn" onclick="addToWishlist(${product.id})" title="Add to wishlist">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                <button class="action-btn" onclick="quickView(${product.id})" title="Quick view">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>
            </div>
        </div>
        <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
                <span class="stars">${generateStars(product.rating)}</span>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <div class="product-price">
                <span class="price-current">$${product.price}</span>
                ${product.originalPrice ? `<span class="price-original">$${product.originalPrice}</span>` : ''}
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;

    return card;
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }

    if (hasHalfStar) {
        stars += '⯨';
    }

    return stars;
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showNotification('Product added to cart!');
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    const totalAmount = document.querySelector('.total-amount');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image"></div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: auto; color: #f44336;">
                            ×
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Product removed from cart');
}

// Add to wishlist
function addToWishlist(productId) {
    showNotification('Added to wishlist!');
}

// Quick view
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    showNotification(`Quick view: ${product.name}`);
}

// Newsletter
function initNewsletter() {
    const form = document.getElementById('newsletterForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        showNotification('Thanks for subscribing!');
        form.reset();
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #1a1a1a;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.feature-card, .product-card, .collection-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
