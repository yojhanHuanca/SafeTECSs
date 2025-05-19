class EmergencySystem {
    constructor() {
        this.panicButton = document.getElementById('panicButton');
        this.emergencyStatus = document.getElementById('emergencyStatus');
        this.emergencyInfo = document.getElementById('emergencyInfo');
        this.confirmationModal = document.getElementById('confirmationModal');
        this.cancelEmergencyBtn = document.getElementById('cancelEmergency');
        this.confirmEmergencyBtn = document.getElementById('confirmEmergency');
        this.userLocationElement = document.getElementById('userLocation');
        this.responseTimeElement = document.getElementById('responseTime');
        this.staffAlertedElement = document.getElementById('staffAlerted');
        
        this.pressTimer = null;
        this.emergencyActive = false;
        this.userLocation = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkGeolocationPermission();
    }

    setupEventListeners() {
        // Lógica para activación con presión prolongada
        this.panicButton.addEventListener('touchstart', this.startPressTimer.bind(this));
        this.panicButton.addEventListener('touchend', this.cancelPressTimer.bind(this));
        this.panicButton.addEventListener('mousedown', this.startPressTimer.bind(this));
        this.panicButton.addEventListener('mouseup', this.cancelPressTimer.bind(this));
        this.panicButton.addEventListener('mouseleave', this.cancelPressTimer.bind(this));
        
        // Modal de confirmación
        this.cancelEmergencyBtn.addEventListener('click', this.cancelEmergency.bind(this));
        this.confirmEmergencyBtn.addEventListener('click', this.activateEmergency.bind(this));
    }

    startPressTimer(e) {
        e.preventDefault();
        this.pressTimer = setTimeout(() => {
            this.showConfirmationModal();
        }, 3000); // 3 segundos
    }

    cancelPressTimer() {
        if (this.pressTimer) {
            clearTimeout(this.pressTimer);
            this.pressTimer = null;
        }
    }

    showConfirmationModal() {
        this.confirmationModal.classList.remove('hidden');
    }

    cancelEmergency() {
        this.confirmationModal.classList.add('hidden');
        this.showToast('Emergencia cancelada', 'warning');
    }

    async activateEmergency() {
        this.confirmationModal.classList.add('hidden');
        
        try {
            // Obtener ubicación actual
            await this.getCurrentLocation();
            
            // Mostrar información de emergencia
            this.emergencyStatus.classList.add('alert');
            this.emergencyStatus.innerHTML = `
                <div class="status-icon">
                    <span class="material-icons">warning</span>
                </div>
                <p>EMERGENCIA ACTIVADA</p>
            `;
            
            this.emergencyInfo.classList.remove('hidden');
            
            // Simular envío de alerta
            this.staffAlertedElement.textContent = "Personal de seguridad notificado";
            this.responseTimeElement.textContent = "Estimado: 2-5 minutos";
            
            // En producción, aquí se haría una llamada a la API
            await this.sendEmergencyAlert();
            
            this.showToast('¡Alerta de emergencia enviada!', 'success');
            
        } catch (error) {
            console.error('Error en emergencia:', error);
            this.showToast('Error al activar emergencia', 'error');
        }
    }

    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocalización no soportada'));
                return;
            }
            
            this.userLocationElement.textContent = "Obteniendo ubicación...";
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.userLocation = { latitude, longitude };
                    
                    // Simular reverse geocoding (en producción usarías una API como Google Maps)
                    this.userLocationElement.textContent = `Edificio B, Piso 3 (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
                    resolve();
                },
                (error) => {
                    console.error('Error obteniendo ubicación:', error);
                    this.userLocationElement.textContent = "Ubicación no disponible";
                    reject(error);
                },
                { 
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        });
    }

    async sendEmergencyAlert() {
        // Simular envío a la API
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Alerta enviada con ubicación:', this.userLocation);
                resolve();
            }, 1500);
        });
    }

    checkGeolocationPermission() {
        // Verificar permisos en dispositivos que lo soportan
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' })
                .then(permissionStatus => {
                    if (permissionStatus.state === 'denied') {
                        this.userLocationElement.textContent = "Activa permisos de ubicación";
                    }
                    permissionStatus.onchange = () => {
                        console.log('Permiso de ubicación cambiado:', permissionStatus.state);
                    };
                });
        }
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

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    new EmergencySystem();
});