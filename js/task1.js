document.addEventListener('DOMContentLoaded', () => {
    const monthInput = document.getElementById('budget-month');
    const incomeEstimateInput = document.getElementById('income-estimate');
    const categoriesConfig = document.getElementById('categories-config');
    const btnAddCategory = document.getElementById('btn-add-category');
    const customCatName = document.getElementById('custom-cat-name');
    const customCatAmount = document.getElementById('custom-cat-amount');
    const totalAllocatedEl = document.getElementById('total-allocated');
    const balanceEl = document.getElementById('balance');
    const balanceText = document.getElementById('balance-text');
    const balanceBar = document.getElementById('balance-bar');
    const btnSaveBudget = document.getElementById('btn-save-budget');

    // Helpers
    function getCurrentMonthStr() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    }

    function renderCategoryInputs(catList) {
        categoriesConfig.innerHTML = '';
        const container = document.createElement('div');
        container.style.marginTop = '8px';

        catList.forEach((cat, idx) => {
            const row = document.createElement('div');
            row.className = 'money-details';
            row.innerHTML = `
                <span>${cat.name}</span>
                <input type="number" class="cat-amount" data-index="${idx}" min="0" step="0.01" value="${cat.budgeted || 0}"> RON
            `;
            container.appendChild(row);
        });

        categoriesConfig.appendChild(container);

        // Recompute on changes
        Array.from(document.querySelectorAll('.cat-amount')).forEach(input => {
            input.addEventListener('input', updateTotals);
        });
    }

    function updateTotals() {
        const income = parseFloat(incomeEstimateInput.value) || 0;
        const amounts = Array.from(document.querySelectorAll('.cat-amount')).map(i => parseFloat(i.value) || 0);
        const totalAllocated = amounts.reduce((s, v) => s + v, 0);
        const balance = income - totalAllocated;

        totalAllocatedEl.textContent = totalAllocated.toFixed(2);
        balanceEl.textContent = balance.toFixed(2);
        balanceText.style.color = balance >= 0 ? '#2ecc71' : '#e74c3c';
        balanceText.textContent = balance >= 0 ? 'Balanță pozitivă — ai economii.' : 'Atenție: balanță negativă!';

        // Balance bar
        const pct = income > 0 ? Math.min(100, Math.max(0, (totalAllocated / income) * 100)) : 0;
        balanceBar.style.width = `${pct}%`;
        balanceBar.className = `progress-bar ${balance >= 0 ? 'status-ok' : 'status-danger'}`;
    }

    function currentCategoriesTemplate() {
        // Use currentMonthData categories as base when no saved budget
        return (currentMonthData?.categories || []).map(c => ({ name: c.name, budgeted: c.budgeted }));
    }

    function loadForMonth(monthStr) {
        const saved = budgetsData[monthStr];
        const income = saved?.totalIncomeEstimate ?? currentMonthData.totalIncome ?? 0;
        incomeEstimateInput.value = Number(income);
        const cats = saved?.categories ? saved.categories.map(c => ({ name: c.name, budgeted: c.budgeted })) : currentCategoriesTemplate();
        renderCategoryInputs(cats);
        updateTotals();
    }

    // Add custom category
    btnAddCategory.addEventListener('click', () => {
        const name = customCatName.value.trim();
        const amount = parseFloat(customCatAmount.value);
        if (!name) { alert('Introdu denumirea categoriei.'); return; }
        if (!amount || amount < 0) { alert('Introdu o sumă validă pentru categorie.'); return; }

        const row = document.createElement('div');
        row.className = 'money-details';
        row.innerHTML = `
            <span>${name}</span>
            <input type="number" class="cat-amount" min="0" step="0.01" value="${amount.toFixed(2)}"> RON
        `;
        categoriesConfig.appendChild(row);
        row.querySelector('.cat-amount').addEventListener('input', updateTotals);
        customCatName.value = '';
        customCatAmount.value = '';
        updateTotals();
    });

    // Save budget
    btnSaveBudget.addEventListener('click', () => {
        const monthStr = monthInput.value || getCurrentMonthStr();
        const income = parseFloat(incomeEstimateInput.value);
        if (!income || income < 0) { alert('Introdu venitul total estimat (>= 0).'); return; }

        const catInputs = Array.from(categoriesConfig.querySelectorAll('.cat-amount'));
        const names = Array.from(categoriesConfig.querySelectorAll('.money-details span'));
        const categories = catInputs.map((inp, i) => ({ name: names[i].textContent, budgeted: parseFloat(inp.value) || 0 }));

        const totalAllocated = categories.reduce((s, c) => s + (c.budgeted || 0), 0);
        const balance = income - totalAllocated;
        if (balance < -0.01) {
            alert('Balanța este negativă. Ajustează sumele înainte de salvare.');
            return;
        }

        budgetsData[monthStr] = {
            totalIncomeEstimate: income,
            categories
        };

        alert(`Bugetul pentru ${monthStr} a fost salvat.`);
    });

    // Init defaults
    const defaultMonth = getCurrentMonthStr();
    monthInput.value = defaultMonth;
    loadForMonth(defaultMonth);

    monthInput.addEventListener('change', () => {
        const m = monthInput.value || getCurrentMonthStr();
        loadForMonth(m);
    });

    incomeEstimateInput.addEventListener('input', updateTotals);
});