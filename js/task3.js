// js/task3.js

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('budget-list');

    // Iterăm prin categoriile din data.js
    currentMonthData.categories.forEach(cat => {
        // 1. Calcule
        const percent = Math.min((cat.spent / cat.budgeted) * 100, 100); // Max 100% pentru lățime
        const difference = cat.budgeted - cat.spent;
        const isOverBudget = difference < 0;

        // 2. Determinăm culoarea (Clasa CSS)
        let statusClass = 'status-ok';
        if (isOverBudget) {
            statusClass = 'status-danger'; // Roșu conform [cite: 733]
        } else if (percent > 80) {
            statusClass = 'status-warning'; // Galben
        }

        // 3. Creăm HTML-ul pentru card
        const card = document.createElement('div');
        card.className = 'category-card';

        card.innerHTML = `
            <div class="card-header">
                <span>${cat.icon} ${cat.name}</span>
                <span>${cat.spent} / ${cat.budgeted} RON</span>
            </div>
            
            <div class="progress-container">
                <div class="progress-bar ${statusClass}" style="width: ${percent}%"></div>
            </div>

            <div class="money-details" style="margin-top: 8px;">
                <span>Cheltuit: ${Math.round(percent)}%</span>
                <span style="${isOverBudget ? 'color:#e74c3c' : 'color:#2ecc71'}">
                    ${isOverBudget ? 'Depășire: ' : 'Rămas: '} 
                    ${Math.abs(difference)} RON
                </span>
            </div>
        `;

        // 4. Adăugăm în pagină
        listContainer.appendChild(card);
    });
});