// js/task9.js

document.addEventListener('DOMContentLoaded', () => {
    const objectivesList = document.getElementById('objectives-list');
    const btnNewObjective = document.getElementById('btn-new-objective');
    const btnCloseObjectives = document.getElementById('btn-close-objectives');
    const newObjectiveForm = document.getElementById('new-objective-form');
    const btnSaveObjective = document.getElementById('btn-save-objective');
    const btnCancelObjective = document.getElementById('btn-cancel-objective');
    const confirmationMessage = document.getElementById('confirmation-message');

    const objectiveName = document.getElementById('objective-name');
    const targetDate = document.getElementById('target-date');
    const targetAmount = document.getElementById('target-amount');
    const monthlyAmount = document.getElementById('monthly-amount');
    const autoAllocation = document.getElementById('auto-allocation');

    // Încărcăm obiectivele existente
    function loadObjectives() {
        objectivesList.innerHTML = '';
        const objectives = objectivesData || [];

        if (objectives.length === 0) {
            objectivesList.innerHTML = '<p style="color: #999; font-style: italic;">Nu există obiective încă.</p>';
            return;
        }

        objectives.forEach((obj, index) => {
            const objectiveItem = document.createElement('div');
            objectiveItem.style.padding = '10px';
            objectiveItem.style.borderRadius = '5px';
            objectiveItem.style.backgroundColor = '#f5f5f5';
            objectiveItem.style.cursor = 'pointer';
            objectiveItem.style.border = '1px solid #ddd';
            objectiveItem.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 5px;">${obj.name}</div>
                <div style="font-size: 0.9em; color: #666;">
                    Țintă: ${obj.targetAmount} RON | Lunar: ${obj.monthlyAmount} RON
                </div>
                <div style="font-size: 0.85em; color: #999; margin-top: 3px;">
                    Data țintă: ${new Date(obj.targetDate).toLocaleDateString('ro-RO')}
                </div>
            `;
            objectivesList.appendChild(objectiveItem);
        });
    }

    // Afișăm formularul pentru obiectiv nou
    btnNewObjective.addEventListener('click', () => {
        newObjectiveForm.style.display = 'block';
        // Setăm data minimă la ziua de mâine
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        targetDate.min = tomorrow.toISOString().split('T')[0];
    });

    // Închidem formularul
    btnCancelObjective.addEventListener('click', () => {
        newObjectiveForm.style.display = 'none';
        // Resetăm câmpurile
        objectiveName.value = '';
        targetDate.value = '';
        targetAmount.value = '';
        monthlyAmount.value = '';
        autoAllocation.checked = false;
    });

    // Salvare obiectiv nou
    btnSaveObjective.addEventListener('click', () => {
        // Validare
        if (!objectiveName.value.trim()) {
            alert('Te rugăm să introduci denumirea obiectivului.');
            return;
        }
        if (!targetDate.value) {
            alert('Te rugăm să selectezi data țintă.');
            return;
        }
        if (!targetAmount.value || parseFloat(targetAmount.value) <= 0) {
            alert('Te rugăm să introduci o sumă țintă validă.');
            return;
        }
        if (!monthlyAmount.value || parseFloat(monthlyAmount.value) <= 0) {
            alert('Te rugăm să introduci o sumă lunară validă.');
            return;
        }

        // Creăm obiectivul nou
        const newObjective = {
            name: objectiveName.value.trim(),
            targetDate: targetDate.value,
            targetAmount: parseFloat(targetAmount.value),
            monthlyAmount: parseFloat(monthlyAmount.value),
            autoAllocation: autoAllocation.checked
        };

        // Adăugăm la lista de obiective (simulare)
        if (!objectivesData) {
            objectivesData = [];
        }
        objectivesData.push(newObjective);

        // Afișăm mesaj de confirmare
        confirmationMessage.style.display = 'block';
        confirmationMessage.className = 'category-card';
        confirmationMessage.style.backgroundColor = '#d4edda';
        confirmationMessage.style.borderLeft = '4px solid #28a745';
        confirmationMessage.innerHTML = `
            <h3 style="color: #155724; margin-top: 0;">✓ Obiectiv salvat cu succes!</h3>
            <p style="color: #155724;">
                <strong>${newObjective.name}</strong><br>
                Sumă țintă: ${newObjective.targetAmount} RON<br>
                Sumă lunară: ${newObjective.monthlyAmount} RON<br>
                Data țintă: ${new Date(newObjective.targetDate).toLocaleDateString('ro-RO')}<br>
                ${newObjective.autoAllocation ? '✓ Alocare automată activată' : '✗ Alocare automată dezactivată'}
            </p>
        `;

        // Resetăm formularul
        objectiveName.value = '';
        targetDate.value = '';
        targetAmount.value = '';
        monthlyAmount.value = '';
        autoAllocation.checked = false;
        newObjectiveForm.style.display = 'none';

        // Reîncărcăm lista
        loadObjectives();
    });

    // Buton închidere
    btnCloseObjectives.addEventListener('click', () => {
        if (confirm('Ești sigur că vrei să închizi această secțiune?')) {
            window.location.href = 'index.html';
        }
    });

    // Inițializare
    loadObjectives();
});
