/* 
    StageReady - Speaker Dashboard 
    JavaScript Logic for Tab Switching & Sidebar
*/

function switchTab(tabId) {
    const panes = document.querySelectorAll('.tab-pane-custom');
    panes.forEach(p => p.classList.remove('active'));
    
    const links = document.querySelectorAll('.nav-link-dash[data-tab]');
    links.forEach(l => l.classList.remove('active'));
    
    const targetPane = document.getElementById(tabId);
    if (targetPane) {
        targetPane.classList.add('active');
    }
    
    const targetLink = Array.from(links).find(l => l.dataset.tab === tabId);
    if (targetLink) {
        targetLink.classList.add('active');
    }
    
    const titleEl = document.getElementById('currentTabTitle');
    if (titleEl) {
        const title = targetLink?.dataset?.title || tabId.charAt(0).toUpperCase() + tabId.slice(1);
        titleEl.innerText = title;
    }
    
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
    const rehearsalStorageKey = 'stageReadyRehearsals';
    const settingsStorageKey = 'stageReadySettingsProfile';

    const rehearsalGoalEl = document.getElementById('rehearsalGoal');
    const rehearsalCountEl = document.getElementById('rehearsalCount');
    const rehearsalProgressEl = document.getElementById('rehearsalProgress');
    const rehearsalTbodyEl = document.getElementById('rehearsalTbody');
    const rehearsalSearchEl = document.getElementById('rehearsalSearch');
    const rehearsalEmptyStateEl = document.getElementById('rehearsalEmptyState');
    const exportRehearsalsBtn = document.getElementById('exportRehearsalsBtn');
    const rehearsalEntryForm = document.getElementById('rehearsalEntryForm');
    const rehearsalEntryModalEl = document.getElementById('rehearsalEntryModal');

    const parseDomRehearsals = () => {
        if (!rehearsalTbodyEl) return [];
        const rows = Array.from(rehearsalTbodyEl.querySelectorAll('tr'));
        return rows.map((row) => {
            const cells = row.querySelectorAll('td');
            const dateLabel = cells?.[0]?.innerText?.trim() || '';
            const durationLabel = cells?.[1]?.innerText?.trim() || '';
            const focus = cells?.[2]?.innerText?.trim() || '';
            const ratingLabel = cells?.[3]?.innerText?.trim() || '';
            const notes = cells?.[4]?.innerText?.trim() || '';
            return { dateLabel, durationLabel, focus, ratingLabel, notes };
        }).filter((e) => e.dateLabel || e.focus || e.notes);
    };

    const formatDateLabel = (isoDate) => {
        const date = new Date(`${isoDate}T00:00:00`);
        if (Number.isNaN(date.getTime())) return isoDate;
        return date.toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' });
    };

    const toCsv = (entries) => {
        const escape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
        const header = ['Date', 'Duration', 'Focus', 'Self rating', 'Notes'];
        const lines = entries.map((e) => [e.dateLabel, e.durationLabel, e.focus, e.ratingLabel, e.notes].map(escape).join(','));
        return [header.map(escape).join(','), ...lines].join('\n');
    };

    const loadRehearsals = () => {
        try {
            const raw = localStorage.getItem(rehearsalStorageKey);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return null;
            return parsed;
        } catch {
            return null;
        }
    };

    const saveRehearsals = (entries) => {
        try {
            localStorage.setItem(rehearsalStorageKey, JSON.stringify(entries));
        } catch {}
    };

    const getRehearsalGoal = () => {
        const goal = Number(rehearsalGoalEl?.innerText || 0);
        return Number.isFinite(goal) && goal > 0 ? goal : 15;
    };

    const updateRehearsalStats = (entries) => {
        if (!rehearsalCountEl || !rehearsalProgressEl) return;
        const count = entries.length;
        const goal = getRehearsalGoal();
        rehearsalCountEl.innerText = String(count);
        const pct = Math.max(0, Math.min(100, Math.round((count / goal) * 100)));
        rehearsalProgressEl.style.width = `${pct}%`;
    };

    const renderRehearsals = (entries, query = '') => {
        if (!rehearsalTbodyEl) return;
        const q = query.trim().toLowerCase();
        const filtered = q
            ? entries.filter((e) => `${e.dateLabel} ${e.durationLabel} ${e.focus} ${e.ratingLabel} ${e.notes}`.toLowerCase().includes(q))
            : entries;

        rehearsalTbodyEl.innerHTML = filtered.map((e, idx) => {
            const dateCellClass = idx === 0 ? 'fw-bold text-red' : 'text-secondary';
            const notes = e.notes ? e.notes : '';
            return `
                <tr>
                    <td class="${dateCellClass}">${e.dateLabel}</td>
                    <td>${e.durationLabel}</td>
                    <td>${e.focus}</td>
                    <td><span class="badge bg-secondary">${e.ratingLabel}</span></td>
                    <td class="text-secondary small">${notes}</td>
                    <td><button class="btn btn-sm btn-outline-secondary" type="button">Attach Video</button></td>
                </tr>
            `.trim();
        }).join('');

        if (rehearsalEmptyStateEl) {
            rehearsalEmptyStateEl.style.display = filtered.length === 0 ? 'block' : 'none';
        }
    };

    let rehearsals = loadRehearsals();
    if (!rehearsals) {
        rehearsals = parseDomRehearsals();
        saveRehearsals(rehearsals);
    } else {
        renderRehearsals(rehearsals);
    }
    updateRehearsalStats(rehearsals);

    if (rehearsalSearchEl) {
        rehearsalSearchEl.addEventListener('input', (e) => {
            const q = e.target.value || '';
            renderRehearsals(rehearsals, q);
        });
    }

    if (exportRehearsalsBtn) {
        exportRehearsalsBtn.addEventListener('click', () => {
            const csv = toCsv(rehearsals);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'rehearsal-log.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        });
    }

    if (rehearsalEntryForm) {
        rehearsalEntryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const date = document.getElementById('rehearsalDate')?.value || '';
            const duration = document.getElementById('rehearsalDuration')?.value || '';
            const focus = document.getElementById('rehearsalFocus')?.value || '';
            const rating = document.getElementById('rehearsalRating')?.value || '';
            const notes = document.getElementById('rehearsalNotes')?.value || '';

            if (!date || !duration || !focus || !rating) return;

            const entry = {
                dateLabel: formatDateLabel(date),
                durationLabel: `${duration} min`,
                focus,
                ratingLabel: `${rating}/5`,
                notes: notes.trim()
            };

            rehearsals = [entry, ...rehearsals];
            saveRehearsals(rehearsals);
            updateRehearsalStats(rehearsals);
            renderRehearsals(rehearsals, rehearsalSearchEl?.value || '');

            rehearsalEntryForm.reset();
            const durationEl = document.getElementById('rehearsalDuration');
            if (durationEl) durationEl.value = '18';

            if (rehearsalEntryModalEl && window.bootstrap?.Modal) {
                const instance = window.bootstrap.Modal.getInstance(rehearsalEntryModalEl) || new window.bootstrap.Modal(rehearsalEntryModalEl);
                instance.hide();
            }
        });
    }

    const settingsForm = document.getElementById('settingsForm');
    const settingsSavedAlert = document.getElementById('settingsSavedAlert');
    const settingsResetBtn = document.getElementById('settingsResetBtn');

    const readSettingsFromForm = () => ({
        name: document.getElementById('settingsName')?.value || '',
        email: document.getElementById('settingsEmail')?.value || '',
        talkTitle: document.getElementById('settingsTalkTitle')?.value || '',
        talkDate: document.getElementById('settingsTalkDate')?.value || '',
        timezone: document.getElementById('settingsTimezone')?.value || '',
        coach: document.getElementById('settingsCoach')?.value || '',
        notifySessions: !!document.getElementById('settingsNotifySessions')?.checked,
        notifyRehearsals: !!document.getElementById('settingsNotifyRehearsals')?.checked,
        notifyWeekly: !!document.getElementById('settingsNotifyWeekly')?.checked
    });

    const applySettingsToForm = (s) => {
        const setValue = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.value = value ?? '';
        };
        setValue('settingsName', s?.name);
        setValue('settingsEmail', s?.email);
        setValue('settingsTalkTitle', s?.talkTitle);
        setValue('settingsTalkDate', s?.talkDate);
        setValue('settingsTimezone', s?.timezone);
        setValue('settingsCoach', s?.coach);
        const setChecked = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.checked = !!value;
        };
        setChecked('settingsNotifySessions', s?.notifySessions);
        setChecked('settingsNotifyRehearsals', s?.notifyRehearsals);
        setChecked('settingsNotifyWeekly', s?.notifyWeekly);
    };

    const defaultSettings = settingsForm ? readSettingsFromForm() : null;

    const loadSettings = () => {
        try {
            const raw = localStorage.getItem(settingsStorageKey);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch {
            return null;
        }
    };

    const saveSettings = (settings) => {
        try {
            localStorage.setItem(settingsStorageKey, JSON.stringify(settings));
        } catch {}
    };

    const storedSettings = loadSettings();
    if (storedSettings) applySettingsToForm(storedSettings);

    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const payload = readSettingsFromForm();
            saveSettings(payload);
            if (settingsSavedAlert) {
                settingsSavedAlert.classList.remove('d-none');
                window.setTimeout(() => settingsSavedAlert.classList.add('d-none'), 1800);
            }
        });
    }

    if (settingsResetBtn && defaultSettings) {
        settingsResetBtn.addEventListener('click', () => {
            try {
                localStorage.removeItem(settingsStorageKey);
            } catch {}
            applySettingsToForm(defaultSettings);
            if (settingsSavedAlert) {
                settingsSavedAlert.classList.remove('d-none');
                settingsSavedAlert.innerText = 'Reset.';
                window.setTimeout(() => {
                    settingsSavedAlert.classList.add('d-none');
                    settingsSavedAlert.innerText = 'Saved.';
                }, 1800);
            }
        });
    }

    const dirLabel = document.getElementById('dirLabel');
    const updateDirLabel = () => {
        if (!dirLabel) return;
        dirLabel.innerText = document.documentElement.dir === 'rtl' ? 'RTL' : 'LTR';
    };
    updateDirLabel();
    const dirObserver = new MutationObserver(updateDirLabel);
    dirObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
});
