document.addEventListener('DOMContentLoaded', () => {
    const amountEl = document.getElementById('tx-amount');
    const dateEl = document.getElementById('tx-date');
    const categoryEl = document.getElementById('tx-category');
    const splitEl = document.getElementById('tx-split');
    const splitContainer = document.getElementById('split-container');
    const splitAmount1 = document.getElementById('split-amount-1');
    const splitCategory1 = document.getElementById('split-category-1');
    const splitAmount2 = document.getElementById('split-amount-2');
    const splitCategory2 = document.getElementById('split-category-2');
    const splitHint = document.getElementById('split-hint');
    const descEl = document.getElementById('tx-desc');
    const btnSave = document.getElementById('btn-save-tx');
    const confirmation = document.getElementById('confirmation');

    // Init date
    const today = new Date().toISOString().split('T')[0];
    dateEl.value = today;

    // Populate categories
    function populateCategories(selectEl) {
        selectEl.innerHTML = '';
        (currentMonthData?.categories || []).forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.name;
            opt.textContent = cat.name;
            selectEl.appendChild(opt);
        });
    }
    populateCategories(categoryEl);
    populateCategories(splitCategory1);
    populateCategories(splitCategory2);

    // Split toggle
    splitEl.addEventListener('change', () => {
        splitContainer.style.display = splitEl.checked ? 'block' : 'none';
    });

    function validate() {
        const amount = parseFloat(amountEl.value);
        if (!amount || amount <= 0) { alert('Introdu suma tranzacției (> 0).'); return false; }
        if (!dateEl.value) { alert('Selectează data tranzacției.'); return false; }
        if (!categoryEl.value) { alert('Selectează categoria.'); return false; }
        if (splitEl.checked) {
            const a1 = parseFloat(splitAmount1.value) || 0;
            const a2 = parseFloat(splitAmount2.value) || 0;
            const totalSplit = parseFloat((a1 + a2).toFixed(2));
            const total = parseFloat(amount.toFixed(2));
            if (totalSplit !== total) {
                splitHint.style.color = '#e74c3c';
                alert('Suma părților trebuie să fie egală cu suma totală.');
                return false;
            }
            if (!splitCategory1.value || !splitCategory2.value) {
                alert('Selectează categoriile pentru părți.');
                return false;
            }
        }
        return true;
    }

    function updateSpentAllocations(allocations) {
        // allocations: [{category, amount}]
        (currentMonthData?.categories || []).forEach(cat => {
            const add = allocations.filter(a => a.category === cat.name).reduce((s, a) => s + a.amount, 0);
            cat.spent = (cat.spent || 0) + add;
        });
    }

    btnSave.addEventListener('click', () => {
        if (!validate()) return;
        const amount = parseFloat(amountEl.value);
        const date = dateEl.value;
        const desc = descEl.value.trim();

        let allocations = [];
        if (splitEl.checked) {
            allocations = [
                { category: splitCategory1.value, amount: parseFloat(splitAmount1.value) || 0 },
                { category: splitCategory2.value, amount: parseFloat(splitAmount2.value) || 0 }
            ];
        } else {
            allocations = [{ category: categoryEl.value, amount }];
        }

        const tx = {
            id: Date.now(),
            type: 'expense',
            amount,
            date,
            description: desc,
            allocations
        };
        transactionsData.push(tx);
        updateSpentAllocations(allocations);

        confirmation.style.display = 'block';
        confirmation.className = 'category-card';
        confirmation.style.backgroundColor = '#d4edda';
        confirmation.style.borderLeft = '4px solid #28a745';
        confirmation.innerHTML = `
            <h3 style="color: #155724; margin-top: 0;">✓ Tranzacție înregistrată!</h3>
            <p style="color: #155724;">
                Sumă: ${amount.toFixed(2)} RON<br>
                Data: ${new Date(date).toLocaleDateString('ro-RO')}<br>
                ${desc ? `Descriere: ${desc}<br>` : ''}
            </p>
            <div style="color:#155724;">
                ${allocations.map(a => `<div>- ${a.category}: ${a.amount.toFixed(2)} RON</div>`).join('')}
            </div>
        `;

        // Reset basic fields (keep categories for convenience)
        amountEl.value = '';
        descEl.value = '';
        splitEl.checked = false;
        splitContainer.style.display = 'none';
        splitAmount1.value = '';
        splitAmount2.value = '';
    });
});