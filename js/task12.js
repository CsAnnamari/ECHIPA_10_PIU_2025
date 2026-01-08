// js/task12.js

document.addEventListener('DOMContentLoaded', () => {
    const chartContainer = document.getElementById('chart-display');
    const tableBody = document.getElementById('history-table-body');
    
    // Funcție pentru desenarea graficului și tabelului
    function renderReport() {
        // Găsim valoarea maximă pentru a scala graficul (ca să nu iasă din ecran)
        // Calculăm net-ul maxim pentru a seta înălțimea de 100%
        const maxNet = Math.max(...historyData.map(d => d.income - d.expense));

        historyData.forEach(item => {
            const net = item.income - item.expense;
            
            // 1. Adăugăm bara în grafic
            // Calculăm înălțimea relativă la maxim (ex: dacă net e 1000 și max e 2000, h = 50%)
            // Minim 5% înălțime ca să se vadă ceva chiar dacă e 0
            let heightPercent = (net / maxNet) * 100;
            if (heightPercent < 5) heightPercent = 5; 

            const barHTML = `
                <div class="bar-group">
                    <div class="bar" style="height: ${heightPercent}%; background-color: ${net >= 0 ? '#4a90e2' : '#e74c3c'};" title="${net} RON"></div>
                    <span class="bar-label">${item.month}</span>
                </div>
            `;
            chartContainer.innerHTML += barHTML;

            // 2. Adăugăm rând în tabel
            const row = `
                <tr style="border-bottom: 1px solid #eee; height: 40px;">
                    <td>${item.month}</td>
                    <td>${item.income}</td>
                    <td>${item.expense}</td>
                    <td style="color: ${net >= 0 ? 'green' : 'red'}; font-weight: bold;">${net > 0 ? '+' : ''}${net}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    renderReport();
});

// Funcție simulată de export (în afara DOMContentLoaded pentru a fi accesibilă de butonul onclick)
function exportReport(type) {
    alert(`Se generează raportul ${type}... Fișierul 'CashFlow_Raport.${type.toLowerCase()}' a fost descărcat.`);
}