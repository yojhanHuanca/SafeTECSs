class Dashboard {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOverlay = document.getElementById('sidebarOverlay');
        this.menuBtn = document.getElementById('menuBtn');
        this.closeSidebarBtn = document.getElementById('closeSidebar');
        this.notificationsBtn = document.getElementById('notificationsBtn');
        this.logoutBtn = document.getElementById('logoutBtn');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserData();
        this.loadRecentAccess();
    }

    setupEventListeners() {
        // Toggle sidebar
        this.menuBtn.addEventListener('click', this.openSidebar.bind(this));
        this.closeSidebarBtn.addEventListener('click', this.closeSidebar.bind(this));
        this.sidebarOverlay.addEventListener('click', this.closeSidebar.bind(this));

        // Logout
        this.logoutBtn.addEventListener('click', this.handleLogout.bind(this));

        // Notifications
        this.notificationsBtn.addEventListener('click', this.showNotifications.bind(this));

        // Swipe to close sidebar
        this.setupSwipeGestures();
    }

    openSidebar() {
        this.sidebar.classList.add('open');
        this.sidebarOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closeSidebar() {
        this.sidebar.classList.remove('open');
        this.sidebarOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    setupSwipeGestures() {
        let touchStartX = 0;
        
        this.sidebar.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });

        this.sidebar.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) {
                this.closeSidebar();
            }
        }, { passive: true });
    }

    loadUserData() {
        // Simular carga de datos del usuario
        setTimeout(() => {
            document.getElementById('userName').textContent = 'María';
            document.getElementById('sidebarUserName').textContent = 'María González';
            document.getElementById('sidebarUserCode').textContent = 'ALUMNO-20230045';
        }, 300);
    }

    loadRecentAccess() {
        // Simular carga de accesos recientes
        setTimeout(() => {
            // En producción sería una llamada API
            console.log('Accesos recientes cargados');
        }, 500);
    }

    showNotifications() {
        // Simular notificaciones
        alert('Mostrando notificaciones...');
    }

    handleLogout() {
        // Simular logout
        if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
            localStorage.removeItem('authToken');
            window.location.href = 'login.html';
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});