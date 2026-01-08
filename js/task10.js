// js/task10.js

document.addEventListener('DOMContentLoaded', () => {
    const incomesList = document.getElementById('incomes-list');
    const btnNewIncome = document.getElementById('btn-new-income');
    const btnCloseIncomes = document.getElementById('btn-close-incomes');
    const newIncomeForm = document.getElementById('new-income-form');
    const btnSaveIncome = document.getElementById('btn-save-income');
    const btnCancelIncome = document.getElementById('btn-cancel-income');
    const confirmationMessage = document.getElementById('confirmation-message');

    const incomeAmount = document.getElementById('income-amount');
    const incomeSource = document.getElementById('income-source');
    const incomeDate = document.getElementById('income-date');
    const incomeRecurrence = document.getElementById('income-recurrence');

    // Setăm data implicită la astăzi
    const today = new Date().toISOString().split('T')[0];
    incomeDate.value = today;

    // Încărcăm veniturile existente
    function loadIncomes() {
        incomesList.innerHTML = '';
        const incomes = incomesData || [];

        if (incomes.length === 0) {
            incomesList.innerHTML = '<p style="color: #999; font-style: italic;">Nu există venituri înregistrate încă.</p>';
            return;
        }

        incomes.forEach((income, index) => {
            const incomeItem = document.createElement('div');
            incomeItem.style.padding = '12px';
            incomeItem.style.borderRadius = '5px';
            incomeItem.style.backgroundColor = '#fff9c4';
            incomeItem.style.cursor = 'pointer';
            incomeItem.style.border = '1px solid #ffc107';
            incomeItem.style.transition = 'background-color 0.2s';
            
            incomeItem.onmouseenter = () => {
                incomeItem.style.backgroundColor = '#fff59d';
            };
            incomeItem.onmouseleave = () => {
                incomeItem.style.backgroundColor = '#fff9c4';
            };

            const recurrenceLabels = {
                'once': 'O singură dată',
                'weekly': 'Săptămânal',
                'monthly': 'Lunar',
                'yearly': 'Anual'
            };

            incomeItem.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                    <div style="font-weight: bold; font-size: 1.1rem;">${income.source}</div>
                    <div style="font-weight: bold; color: #2ecc71; font-size: 1.1rem;">${income.amount} RON</div>
                </div>
                <div style="font-size: 0.9em; color: #666; margin-bottom: 3px;">
                    Data: ${new Date(income.date).toLocaleDateString('ro-RO')}
                </div>
                <div style="font-size: 0.85em; color: #999;">
                    Recurență: ${recurrenceLabels[income.recurrence] || income.recurrence}
                </div>
            `;
            incomesList.appendChild(incomeItem);
        });
    }

    // Afișăm formularul pentru venit nou
    btnNewIncome.addEventListener('click', () => {
        newIncomeForm.style.display = 'block';
        // Resetăm câmpurile
        incomeAmount.value = '';
        incomeSource.value = '';
        incomeDate.value = today;
        incomeRecurrence.value = 'monthly';
    });

    // Închidem formularul
    btnCancelIncome.addEventListener('click', () => {
        newIncomeForm.style.display = 'none';
        // Resetăm câmpurile
        incomeAmount.value = '';
        incomeSource.value = '';
        incomeDate.value = today;
        incomeRecurrence.value = 'monthly';
    });

    // Salvare venit nou
    btnSaveIncome.addEventListener('click', () => {
        // Validare
        if (!incomeAmount.value || parseFloat(incomeAmount.value) <= 0) {
            alert('Te rugăm să introduci o sumă validă.');
            return;
        }
        if (!incomeSource.value.trim()) {
            alert('Te rugăm să introduci sursa venitului.');
            return;
        }
        if (!incomeDate.value) {
            alert('Te rugăm să selectezi data.');
            return;
        }

        // Creăm venitul nou
        const newIncome = {
            id: Date.now(),
            amount: parseFloat(incomeAmount.value),
            source: incomeSource.value.trim(),
            date: incomeDate.value,
            recurrence: incomeRecurrence.value
        };

        // Adăugăm la lista de venituri (simulare)
        if (!incomesData) {
            incomesData = [];
        }
        incomesData.push(newIncome);

        // Afișăm mesaj de confirmare
        const recurrenceLabels = {
            'once': 'O singură dată',
            'weekly': 'Săptămânal',
            'monthly': 'Lunar',
            'yearly': 'Anual'
        };

        confirmationMessage.style.display = 'block';
        confirmationMessage.className = 'category-card';
        confirmationMessage.style.backgroundColor = '#d4edda';
        confirmationMessage.style.borderLeft = '4px solid #28a745';
        confirmationMessage.innerHTML = `
            <h3 style="color: #155724; margin-top: 0;">✓ Venit salvat cu succes!</h3>
            <p style="color: #155724;">
                <strong>${newIncome.source}</strong><br>
                Sumă: ${newIncome.amount} RON<br>
                Data: ${new Date(newIncome.date).toLocaleDateString('ro-RO')}<br>
                Recurență: ${recurrenceLabels[newIncome.recurrence]}
            </p>
            <p style="color: #155724; font-size: 0.9em; margin-top: 10px;">
                <em>Venitul a fost sincronizat între parteneri.</em>
            </p>
        `;

        // Resetăm formularul
        incomeAmount.value = '';
        incomeSource.value = '';
        incomeDate.value = today;
        incomeRecurrence.value = 'monthly';
        newIncomeForm.style.display = 'none';

        // Reîncărcăm lista
        loadIncomes();
    });

    // Buton închidere
    btnCloseIncomes.addEventListener('click', () => {
        if (confirm('Ești sigur că vrei să închizi această secțiune?')) {
            window.location.href = 'index.html';
        }
    });

    // Inițializare
    loadIncomes();
});
