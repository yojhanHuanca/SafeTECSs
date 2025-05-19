class AuthUI {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.submitBtn = document.querySelector('.btn');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initFloatingLabels();
    }

    setupEventListeners() {
        // Validación en tiempo real
        this.emailInput.addEventListener('input', this.validateEmail.bind(this));
        this.passwordInput.addEventListener('input', this.validatePassword.bind(this));
        
        // Toggle password
        document.querySelector('.toggle-pwd').addEventListener('click', this.togglePasswordVisibility.bind(this));
        
        // Submit del formulario
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    initFloatingLabels() {
        // Inicializar labels flotantes
        if (this.emailInput.value) {
            this.emailInput.dispatchEvent(new Event('input'));
        }
        if (this.passwordInput.value) {
            this.passwordInput.dispatchEvent(new Event('input'));
        }
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        
        if (!email) {
            this.showError(this.emailInput, 'El correo es requerido');
            return false;
        }
        
        if (!isValid) {
            this.showError(this.emailInput, 'Ingresa un correo válido');
            return false;
        }
        
        this.clearError(this.emailInput);
        return true;
    }

    validatePassword() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.showError(this.passwordInput, 'La contraseña es requerida');
            return false;
        }
        
        if (password.length < 8) {
            this.showError(this.passwordInput, 'Mínimo 8 caracteres');
            return false;
        }
        
        this.clearError(this.passwordInput);
        return true;
    }

    togglePasswordVisibility() {
        const isPassword = this.passwordInput.type === 'password';
        this.passwordInput.type = isPassword ? 'text' : 'password';
        this.querySelector('span').textContent = isPassword ? 'visibility' : 'visibility_off';
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        if (!isEmailValid || !isPasswordValid) return;
        
        try {
            this.setLoading(true);
            
            // Simular autenticación
            await this.authenticate({
                email: this.emailInput.value.trim(),
                password: this.passwordInput.value
            });
            
            // Redireccionar
            window.location.href = 'dashboard.html';
            
        } catch (error) {
            this.showToast(error.message, 'error');
        } finally {
            this.setLoading(false);
        }
    }

    async authenticate(credentials) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular error aleatorio (solo para demo)
                if (Math.random() > 0.9) {
                    reject(new Error('Error de conexión con el servidor'));
                } else {
                    resolve({ token: 'fake-jwt-token' });
                }
            }, 1500);
        });
    }

    setLoading(isLoading) {
        if (isLoading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showError(input, message) {
        const inputGroup = input.closest('.input-group');
        const errorElement = inputGroup.querySelector('.error-message') || this.createErrorElement(inputGroup);
        inputGroup.classList.add('error');
        errorElement.textContent = message;
    }

    createErrorElement(inputGroup) {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        inputGroup.appendChild(errorElement);
        return errorElement;
    }

    clearError(input) {
        const inputGroup = input.closest('.input-group');
        inputGroup.classList.remove('error');
        const errorElement = inputGroup.querySelector('.error-message');
        if (errorElement) errorElement.textContent = '';
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new AuthUI();
});