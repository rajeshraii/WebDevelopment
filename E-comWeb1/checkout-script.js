// Card number formatting
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.querySelector('input[placeholder="Card number"]');
    const expiryInput = document.querySelector('input[placeholder="MM / YY"]');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            if (value.length >= 2) {
                e.target.value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
            }
        });
    }
});

// Payment method toggle
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const cardDetails = document.getElementById('cardDetails');
        if (this.value === 'card') {
            cardDetails.style.display = 'block';
        } else {
            cardDetails.style.display = 'none';
        }
    });
});

// Promo code
document.querySelector('.btn-apply')?.addEventListener('click', function() {
    const promoInput = document.querySelector('.promo-code input');
    const promoCode = promoInput.value.trim().toUpperCase();
    
    if (promoCode === 'LUXE10') {
        showNotification('Promo code applied! 10% discount', 'success');
        updateTotals(0.9); // 10% discount
    } else if (promoCode) {
        showNotification('Invalid promo code', 'error');
    }
});

// Update totals
function updateTotals(discountMultiplier = 1) {
    const subtotal = 488.00;
    const shipping = 5.00;
    const discountedSubtotal = subtotal * discountMultiplier;
    const tax = discountedSubtotal * 0.08; // 8% tax
    const total = discountedSubtotal + shipping + tax;
    
    document.querySelectorAll('.total-row')[0].querySelector('span:last-child').textContent = `$${discountedSubtotal.toFixed(2)}`;
    document.querySelectorAll('.total-row')[2].querySelector('span:last-child').textContent = `$${tax.toFixed(2)}`;
    document.querySelector('.total-row.final span:last-child').textContent = `$${total.toFixed(2)}`;
}

// Form validation
document.querySelector('.btn-primary')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Simple validation
    const requiredFields = document.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--error)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--border)';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Show loading
    this.classList.add('loading');
    this.textContent = 'Processing...';
    
    // Simulate order processing
    setTimeout(() => {
        showNotification('Order placed successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        info: '#2196f3',
        warning: '#ff9800'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
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
