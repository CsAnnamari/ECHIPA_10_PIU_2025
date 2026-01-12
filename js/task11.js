document.addEventListener('DOMContentLoaded', () => {
    const monthEl = document.getElementById('alert-month');
    const categoryEl = document.getElementById('alert-category');
    const thresholdEl = document.getElementById('alert-threshold');
    const btnSave = document.getElementById('btn-save-alert');
    const alertsList = document.getElementById('alerts-list');
    const btnCheck = document.getElementById('btn-check-alerts');
    const notificationsPanel = document.getElementById('notifications-panel');

    // localStorage helpers
    const STORAGE_KEY = 'alertsData';
    function readAlerts() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    }
    function writeAlerts(obj) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    }

    function getCurrentMonthKey() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    }

    function populateCategories() {
        categoryEl.innerHTML = '';
        (currentMonthData?.categories || []).forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.name;
            opt.textContent = cat.name;
            categoryEl.appendChild(opt);
        });
    }

    function renderAlertsList(monthKey) {
        const store = readAlerts();
        const alerts = store[monthKey] || [];
        alertsList.innerHTML = alerts.length
            ? alerts.map(a => `• ${a.category}: prag ${a.threshold}%`).join('<br>')
            : 'Nu există alerte setate pentru luna selectată.';
    }

    function getBudget(categoryName) {
        const cat = (currentMonthData?.categories || []).find(c => c.name === categoryName);
        return cat ? (cat.budgeted || 0) : 0;
    }
    function getSpent(categoryName) {
        const cat = (currentMonthData?.categories || []).find(c => c.name === categoryName);
        return cat ? (cat.spent || 0) : 0;
    }

    function checkAlerts(monthKey) {
        notificationsPanel.innerHTML = '';
        const store = readAlerts();
        const alerts = store[monthKey] || [];
        if (!alerts.length) {
            notificationsPanel.innerHTML = '<p style="color:#999;">Nu sunt alerte configurate pentru această lună.</p>';
            return;
        }

        alerts.forEach(a => {
            const budget = getBudget(a.category);
            const spent = getSpent(a.category);
            if (budget <= 0) return; // avoid div by zero
            const pct = (spent / budget) * 100;
            if (pct >= a.threshold) {
                const card = document.createElement('div');
                card.className = 'category-card';
                card.style.backgroundColor = '#fff3cd';
                card.style.borderLeft = '4px solid #ffc107';
                card.innerHTML = `
                    <h3 style="color:#856404; margin-top:0;">⚠ Alertă prag depășit</h3>
                    <p style="color:#856404;">
                        Categoria <strong>${a.category}</strong> a atins ${Math.round(pct)}% din bugetul lunar (prag: ${a.threshold}%).
                    </p>
                `;
                notificationsPanel.appendChild(card);
            }
        });

        if (!notificationsPanel.innerHTML) {
            notificationsPanel.innerHTML = '<p style="color:#2ecc71;">Nu există alerte depășite momentan.</p>';
        }
    }

    // Save alert
    btnSave.addEventListener('click', () => {
        const monthKey = monthEl.value || getCurrentMonthKey();
        const category = categoryEl.value;
        const threshold = parseInt(thresholdEl.value, 10);
        if (!category) { alert('Selectează categoria.'); return; }
        if (!threshold || threshold < 10 || threshold > 100) { alert('Pragul trebuie să fie între 10% și 100%.'); return; }
        const store = readAlerts();
        if (!store[monthKey]) store[monthKey] = [];
        const idx = store[monthKey].findIndex(x => x.category === category);
        const obj = { category, threshold };
        if (idx >= 0) store[monthKey][idx] = obj; else store[monthKey].push(obj);
        writeAlerts(store);
        renderAlertsList(monthKey);
        alert(`Alertă salvată pentru ${category} la ${threshold}% în ${monthKey}.`);
    });

    // Check alerts button
    btnCheck.addEventListener('click', () => {
        const monthKey = monthEl.value || getCurrentMonthKey();
        checkAlerts(monthKey);
    });

    // Init
    const monthKey = getCurrentMonthKey();
    monthEl.value = monthKey;
    populateCategories();
    renderAlertsList(monthKey);
    checkAlerts(monthKey);
});