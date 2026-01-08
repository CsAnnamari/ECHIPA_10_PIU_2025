document.addEventListener('DOMContentLoaded', () => {
    const chartContainer = document.getElementById('chart-display');
    const tableBody = document.getElementById('history-table-body');
    const periodSelect = document.getElementById('period-select');
    const chartTitle = document.getElementById('chart-title');

    function renderReport(dataToRender) {
        chartContainer.innerHTML = '';
        tableBody.innerHTML = '';

        const maxNet = Math.max(...dataToRender.map(d => Math.abs(d.income - d.expense))) || 1;

        dataToRender.forEach(item => {
            const net = item.income - item.expense;

            let heightPercent = (Math.abs(net) / maxNet) * 100;
            if (heightPercent < 5) heightPercent = 5;

            const barHTML = `
                <div class="bar-group">
                    <div class="bar" style="height: ${heightPercent}%; background-color: ${net >= 0 ? '#4a90e2' : '#e74c3c'};" title="${net} RON"></div>
                    <span class="bar-label">${item.month}</span>
                </div>
            `;
            chartContainer.innerHTML += barHTML;

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

    function updateView() {
        const monthsToShow = parseInt(periodSelect.value);
        chartTitle.textContent = `Evoluție (Ultimele ${monthsToShow} Luni)`;
        const filteredData = historyData.slice(-monthsToShow);
        renderReport(filteredData);
    }

    periodSelect.addEventListener('change', updateView);
    updateView();
});

function exportReport(type) {
    alert(`Se generează raportul ${type}... Fișierul a fost descărcat.`);
}