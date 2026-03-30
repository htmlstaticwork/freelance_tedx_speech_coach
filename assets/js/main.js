/* 
    StageReady - TEDx Coach Website 
    Main JavaScript (Frontend logic)
*/

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initCountdown();
    initAOS(); /* For subtle micro-animations */
});

/**
 * Theme Toggle Functionality
 */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    // Check saved theme or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        updateThemeIcon();
    });
    
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('#theme-toggle i');
    if (!themeIcon) return;
    
    if (document.body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('bi-moon-fill');
        themeIcon.classList.add('bi-sun-fill');
    } else {
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-fill');
    }
}

/**
 * RTL Toggle Functionality
 */
function initRTL() {
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    if (!rtlToggleBtn) return;
    
    // Check saved RTL or default to ltr
    const currentDir = localStorage.getItem('dir') || 'ltr';
    setDirection(currentDir);
    
    rtlToggleBtn.addEventListener('click', () => {
        const newDir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl';
        setDirection(newDir);
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
