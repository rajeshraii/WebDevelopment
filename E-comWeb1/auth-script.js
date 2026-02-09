// Form switching
function showLoginForm() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
}

function showRegisterForm() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}

// Password visibility toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
}

// Password strength checker
document.addEventListener('DOMContentLoaded', function() {
    const registerPassword = document.getElementById('registerPassword');
    
    if (registerPassword) {
        registerPassword.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
});

function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar');
    
    if (!strengthBar) return;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    // Update strength bar
    strengthBar.className = 'strength-bar';
    
    if (strength <= 2) {
        strengthBar.classList.add('weak');
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Login form handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const submitBtn = event.target.querySelector('.btn-submit');
    
    // Clear previous errors
    clearErrors();
    
    // Validation
    let hasError = false;
    
    if (!validateEmail(email)) {
        showError('loginEmail', 'Please enter a valid email address');
        hasError = true;
    }
    
    if (password.length < 6) {
        showError('loginPassword', 'Password must be at least 6 characters');
        hasError = true;
    }
    
    if (hasError) return;
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        
        // For demo purposes - show success and redirect
        showNotification('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1500);
}

// Register form handler
function handleRegister(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    const submitBtn = event.target.querySelector('.btn-submit');
    
    // Clear previous errors
    clearErrors();
    
    // Validation
    let hasError = false;
    
    if (firstName.trim().length < 2) {
        showError('firstName', 'First name must be at least 2 characters');
        hasError = true;
    }
    
    if (lastName.trim().length < 2) {
        showError('lastName', 'Last name must be at least 2 characters');
        hasError = true;
    }
    
    if (!validateEmail(email)) {
        showError('registerEmail', 'Please enter a valid email address');
        hasError = true;
    }
    
    if (password.length < 8) {
        showError('registerPassword', 'Password must be at least 8 characters');
        hasError = true;
    }
    
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        hasError = true;
    }
    
    if (!agreeTerms) {
        showNotification('Please agree to the Terms & Conditions', 'error');
        hasError = true;
    }
    
    if (hasError) return;
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        
        // For demo purposes - show success
        showNotification('Account created successfully! Please sign in.', 'success');
        
        setTimeout(() => {
            showLoginForm();
        }, 1500);
    }, 1500);
}

// Error handling
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const wrapper = input.closest('.input-wrapper');
    
    wrapper.classList.add('error');
    
    // Create or update error message
    let errorMsg = wrapper.nextElementSibling;
    
    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        wrapper.parentNode.insertBefore(errorMsg, wrapper.nextSibling);
    }
    
    errorMsg.textContent = message;
    errorMsg.classList.add('show');
}

function clearErrors() {
    document.querySelectorAll('.input-wrapper.error').forEach(wrapper => {
        wrapper.classList.remove('error');
    });
    
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.classList.remove('show');
    });
}

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
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
        font-family: 'Work Sans', sans-serif;
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

// Input focus effects
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.input-wrapper')?.classList.remove('error');
        });
    });
});

// Social login handlers (demo)
document.addEventListener('DOMContentLoaded', function() {
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            showNotification(`${provider} authentication coming soon!`, 'info');
        });
    });
});
