// js/task8.js

document.addEventListener('DOMContentLoaded', () => {
    const notificationText = document.getElementById('notification-text');
    const childName = document.getElementById('child-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseDescription = document.getElementById('expense-description');
    const currentBalance = document.getElementById('current-balance');
    const shortDescription = document.getElementById('short-description');
    const btnApprove = document.getElementById('btn-approve');
    const btnReject = document.getElementById('btn-reject');
    const confirmationMessage = document.getElementById('confirmation-message');

    // Simulăm o cerere de cheltuială
    const expenseRequest = expenseRequestsData[0] || {
        childName: "Maria",
        amount: 30,
        description: "Cumpărare joc video",
        currentBalance: 150
    };

    // Actualizăm interfața cu datele cererii
    notificationText.textContent = `${expenseRequest.childName} dorește să cheltuie ${expenseRequest.amount} RON.`;
    childName.textContent = expenseRequest.childName;
    expenseAmount.textContent = `${expenseRequest.amount} RON`;
    expenseDescription.textContent = expenseRequest.description;
    currentBalance.textContent = `${expenseRequest.currentBalance} RON`;

    // Handler pentru aprobare
    btnApprove.addEventListener('click', () => {
        const shortDesc = shortDescription.value.trim();
        const newBalance = expenseRequest.currentBalance - expenseRequest.amount;
        
        if (newBalance < 0) {
            alert(`Atenție! Balanța ar deveni negativă (${newBalance} RON). Nu poți aproba această cheltuială.`);
            return;
        }

        confirmationMessage.style.display = 'block';
        confirmationMessage.className = 'category-card';
        confirmationMessage.style.backgroundColor = '#d4edda';
        confirmationMessage.style.borderLeft = '4px solid #28a745';
        confirmationMessage.innerHTML = `
            <h3 style="color: #155724; margin-top: 0;">✓ Cheltuiala a fost aprobată!</h3>
            <p style="color: #155724;">
                Suma de ${expenseRequest.amount} RON a fost dedusă din contul lui ${expenseRequest.childName}.<br>
                ${shortDesc ? `Notă: ${shortDesc}` : ''}
            </p>
            <p style="color: #155724; font-weight: bold;">
                Balanță nouă: ${newBalance} RON
            </p>
        `;

        // Dezactivăm butoanele
        btnApprove.disabled = true;
        btnReject.disabled = true;
        btnApprove.style.opacity = '0.5';
        btnReject.style.opacity = '0.5';
    });

    // Handler pentru respingere
    btnReject.addEventListener('click', () => {
        const shortDesc = shortDescription.value.trim();
        
        confirmationMessage.style.display = 'block';
        confirmationMessage.className = 'category-card';
        confirmationMessage.style.backgroundColor = '#f8d7da';
        confirmationMessage.style.borderLeft = '4px solid #dc3545';
        confirmationMessage.innerHTML = `
            <h3 style="color: #721c24; margin-top: 0;">✗ Cheltuiala a fost respinsă</h3>
            <p style="color: #721c24;">
                Cererea lui ${expenseRequest.childName} pentru ${expenseRequest.amount} RON a fost respinsă.<br>
                ${shortDesc ? `Motiv: ${shortDesc}` : ''}
            </p>
        `;

        // Dezactivăm butoanele
        btnApprove.disabled = true;
        btnReject.disabled = true;
        btnApprove.style.opacity = '0.5';
        btnReject.style.opacity = '0.5';
    });
});
