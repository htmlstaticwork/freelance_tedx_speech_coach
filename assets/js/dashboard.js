/* 
    StageReady - Speaker Dashboard 
    JavaScript Logic for Tab Switching & Sidebar
*/

function switchTab(tabId) {
    // Hide all tab panes
    const panes = document.querySelectorAll('.tab-pane-custom');
    panes.forEach(p => p.classList.remove('active'));
    
    // Deactivate all nav links
    const links = document.querySelectorAll('.nav-link-dash');
    links.forEach(l => l.classList.remove('active'));
    
    // Show target pane
    const targetPane = document.getElementById(tabId);
    if (targetPane) {
        targetPane.classList.add('active');
    }
    
    // Activate target link
    const targetLink = Array.from(links).find(l => l.innerText.toLowerCase().includes(tabId.toLowerCase()));
    if (targetLink) {
        targetLink.classList.add('active');
    }
    
    // Update header title
    const titleEl = document.getElementById('currentTabTitle');
    if (titleEl) {
        titleEl.innerText = tabId.charAt(0).toUpperCase() + tabId.slice(1);
    }
    
    // Close sidebar on mobile
    if (window.innerWidth <= 1100) {
        const sidebar = document.getElementById('dashboardSidebar');
        if (sidebar) sidebar.classList.remove('show');
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('dashboardSidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}

/**
 * Handle Dashboard-specific UI Toggles
 */
document.addEventListener('DOMContentLoaded', () => {
    // Override main.js theme toggle for dashboard specific needs if any
    // For now, main.js handles it globally.
    
    // Add Rehearsal Log Logic
    const addEntryBtn = document.getElementById('addEntryBtn');
    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', () => {
             // Logic to show modal or add row to table
        });
    }
});
