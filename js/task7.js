// js/task7.js

document.addEventListener('DOMContentLoaded', () => {
    const summaryContainer = document.getElementById('reconciliation-summary');
    const actionArea = document.getElementById('action-area');
    const btnSave = document.getElementById('btn-save');

    const totalSpent = currentMonthData.categories.reduce((acc, cat) => acc + cat.spent, 0);
    const balance = currentMonthData.totalIncome - totalSpent;

    summaryContainer.innerHTML = `
        <div class="money-details">
            <span>Venit Total:</span>
            <span>${currentMonthData.totalIncome} RON</span>
        </div>
        <div class="money-details">
            <span>Cheltuieli Totale:</span>
            <span>${totalSpent} RON</span>
        </div>
        <hr>
        <div class="big-number ${balance >= 0 ? 'status-ok-text' : 'status-danger-text'}" style="color: ${balance >= 0 ? '#2ecc71' : '#e74c3c'}">
            ${balance > 0 ? '+' : ''}${balance} RON
        </div>
        <p>Balanță Finală (Calculată)</p>
    `;

    if (balance > 0) {
        actionArea.style.display = 'block';

        btnSave.addEventListener('click', () => {
            const savingsGoal = "Vacanță Grecia";
            alert(`Succes! Suma de ${balance} RON a fost transferată către obiectivul '${savingsGoal}'. Luna este închisă.`);
            actionArea.innerHTML = `<p style="color: green; font-weight: bold;">✔ Lună reconciliată cu succes.</p>`;
        });
    } else {
        actionArea.style.display = 'block';
        actionArea.innerHTML = `<p style="color: #e74c3c;">Balanță negativă. Revizuiește cheltuielile!</p>`;
    }
});