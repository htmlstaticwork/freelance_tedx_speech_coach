/* 
    StageReady - TEDx Coach Website 
    Main JavaScript (Frontend logic)
*/

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initCountdown();
    initAOS(); /* For subtle micro-animations */
    initMobileMenuAutoClose();
    initDashboardSidebarAutoClose();
});

/**
 * Theme Toggle Functionality
 */
function initTheme() {
    const toggleButtons = [
        document.getElementById('theme-toggle'),
        document.getElementById('theme-toggle-mobile'),
        ...document.querySelectorAll('[data-theme-toggle]')
    ].filter(Boolean);
    const uniqueToggleButtons = Array.from(new Set(toggleButtons));
    if (uniqueToggleButtons.length === 0) return;
    
    // Check saved theme or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    uniqueToggleButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            updateThemeIcon();
        });
    });
    
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcons = [
        ...document.querySelectorAll('#theme-toggle i'),
        ...document.querySelectorAll('#theme-toggle-mobile i'),
        ...document.querySelectorAll('[data-theme-toggle] i')
    ];
    if (themeIcons.length === 0) return;

    if (document.body.classList.contains('dark-theme')) {
        themeIcons.forEach((icon) => {
            icon.classList.remove('bi-moon-fill');
            icon.classList.add('bi-sun-fill');
        });
    } else {
        themeIcons.forEach((icon) => {
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-fill');
        });
    }
}

/**
 * RTL Toggle Functionality
 */
function initRTL() {
    const toggleButtons = [
        document.getElementById('rtl-toggle'),
        document.getElementById('rtl-toggle-mobile'),
        ...document.querySelectorAll('[data-rtl-toggle]')
    ].filter(Boolean);
    const uniqueToggleButtons = Array.from(new Set(toggleButtons));
    if (uniqueToggleButtons.length === 0) return;
    
    // Check saved RTL or default to ltr
    const currentDir = localStorage.getItem('dir') || 'ltr';
    setDirection(currentDir);
    
    uniqueToggleButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const newDir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl';
            setDirection(newDir);
        });
    });
}

function setDirection(dir) {
    document.documentElement.dir = dir;
    localStorage.setItem('dir', dir);
    
    const bootstrapRTL = document.getElementById('bootstrap-rtl');
    if (bootstrapRTL) {
        bootstrapRTL.disabled = (dir !== 'rtl');
    }
}

/**
 * Countdown Timer for Home 1
 */
function initCountdown() {
    const countdownEl = document.getElementById('countdown-timer');
    if (!countdownEl) return;
    
    // Target: 90 days from now
    const targetDate = new Date().getTime() + (90 * 24 * 60 * 60 * 1000);
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        countdownEl.innerHTML = `${days}d:${hours}h:${minutes}m:${seconds}s`;
        
        if (difference < 0) {
            clearInterval(timerInterval);
            countdownEl.innerHTML = "STAGE READY?";
        }
    };
    
    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

/**
 * Micro-animations initializing
 */
function initAOS() {
    // Basic Intersection Observer for fade-in effects
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

function initMobileMenuAutoClose() {
    const offcanvasEl = document.getElementById('mobileMenu');
    if (!offcanvasEl) return;

    const Offcanvas = window.bootstrap?.Offcanvas;
    if (!Offcanvas) return;

    const getInstance = () => Offcanvas.getInstance(offcanvasEl) || new Offcanvas(offcanvasEl);
    const hide = () => {
        try {
            getInstance().hide();
        } catch {}
    };

    offcanvasEl.addEventListener('click', (e) => {
        const interactive = e.target.closest('a, button');
        if (!interactive) return;
        if (interactive.matches('[data-bs-toggle="offcanvas"]')) return;

        const tag = interactive.tagName.toLowerCase();
        if (tag === 'a') {
            const href = (interactive.getAttribute('href') || '').trim();
            if (!href) return;
            if (href.toLowerCase().startsWith('javascript:')) return;
            hide();
            return;
        }

        hide();
    });
}

function initDashboardSidebarAutoClose() {
    const sidebar = document.getElementById('dashboardSidebar');
    if (!sidebar) return;

    const isMobile = () => window.matchMedia('(max-width: 1100px)').matches;
    const hide = () => sidebar.classList.remove('show');

    document.addEventListener('click', (e) => {
        if (!isMobile()) return;
        if (!sidebar.classList.contains('show')) return;
        const target = e.target;
        if (target.closest('#dashboardSidebar')) return;
        if (target.closest('.dashboard-hamburger')) return;
        hide();
    }, true);

    sidebar.addEventListener('click', (e) => {
        if (!isMobile()) return;
        if (!sidebar.classList.contains('show')) return;
        const interactive = e.target.closest('a, button, .nav-link-dash');
        if (!interactive) return;
        window.setTimeout(hide, 0);
    });

    window.addEventListener('resize', () => {
        if (!isMobile()) hide();
    });
}
