// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    setDefaultDates();
    renderTable();
    updateSummary();
});

// Установка дат по умолчанию
function setDefaultDates() {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    document.getElementById('startDate').value = startOfMonth.toISOString().split('T')[0];
    document.getElementById('endDate').value = endOfMonth.toISOString().split('T')[0];
}

// Рендеринг таблицы
function renderTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    let currentCategory = '';
    
    tripwireData.forEach((item, index) => {
        if (item.category !== currentCategory) {
            currentCategory = item.category;
            const categoryRow = document.createElement('tr');
            categoryRow.className = 'metric-category';
            categoryRow.innerHTML = `
                <td colspan="8"><strong>${item.category}</strong></td>
            `;
            tbody.appendChild(categoryRow);
        }

        const row = document.createElement('tr');
        const completion = item.fact > 0 ? (item.fact / item.plan * 100).toFixed(1) : 0;
        const status = getStatus(completion, item.fact, item.benchmark);
        
        row.innerHTML = `
            <td></td>
            <td>${item.metric}</td>
            <td>${item.plan.toLocaleString()} ${item.unit}</td>
            <td><input type="number" class="input-cell" value="${item.fact}" 
                       onchange="updateFact(${index}, this.value)" placeholder="Введите факт"></td>
            <td><span class="benchmark">${item.benchmark.toLocaleString()} ${item.unit}</span></td>
            <td>${completion}%</td>
            <td>${status.html}</td>
            <td>${status.warning ? item.recommendations : '-'}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Обновление фактических данных
function updateFact(index, value) {
    tripwireData[index].fact = parseFloat(value) || 0;
    renderTable();
    updateSummary();
}

// Определение статуса показателя
function getStatus(completion, fact, benchmark) {
    if (fact === 0) {
        return {
            html: '<span class="status-warning">Нет данных</span>',
            warning: false
        };
    }
    
    if (completion >= 100) {
        return {
            html: '<span class="status-good">Выполнено</span>',
            warning: false
        };
    } else if (completion >= 80) {
        return {
            html: '<span class="status-warning">Требует внимания</span>',
            warning: true
        };
    } else {
        return {
            html: '<span class="status-danger">Критично</span>',
            warning: true
        };
    }
}

// Обновление сводки
function updateSummary() {
    const summaryGrid = document.getElementById('summaryGrid');
    const totalMetrics = tripwireData.length;
    const completedMetrics = tripwireData.filter(item => item.fact >= item.plan).length;
    const warningMetrics = tripwireData.filter(item => {
        const completion = item.fact > 0 ? (item.fact / item.plan * 100) : 0;
        return completion >= 80 && completion < 100;
    }).length;
    const criticalMetrics = tripwireData.filter(item => {
        const completion = item.fact > 0 ? (item.fact / item.plan * 100) : 0;
        return completion < 80;
    }).length;

    const avgCompletion = tripwireData.reduce((sum, item) => {
        return sum + (item.fact > 0 ? (item.fact / item.plan * 100) : 0);
    }, 0) / totalMetrics;

    summaryGrid.innerHTML = `
        <div class="summary-card">
            <h3>Общее выполнение</h3>
            <div class="summary-value">${avgCompletion.toFixed(1)}%</div>
            <p>Средний показатель</p>
        </div>
        <div class="summary-card">
            <h3>Выполнено</h3>
            <div class="summary-value" style="color: #28a745;">${completedMetrics}</div>
            <p>из ${totalMetrics} показателей</p>
        </div>
        <div class="summary-card">
            <h3>Требует внимания</h3>
            <div class="summary-value" style="color: #ffc107;">${warningMetrics}</div>
            <p>показателей</p>
        </div>
        <div class="summary-card">
            <h3>Критично</h3>
            <div class="summary-value" style="color: #dc3545;">${criticalMetrics}</div>
            <p>показателей</p>
        </div>
    `;
}

// Обновление данных
function updateData() {
    const period = document.getElementById('period').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // Здесь можно добавить логику загрузки данных по выбранному периоду
    console.log('Обновление данных для периода:', period, startDate, endDate);
    
    // Пока просто перерисовываем таблицу
    renderTable();
    updateSummary();
}

// Экспорт в CSV
function exportToCSV() {
    let csv = 'Категория,Показатель,План,Факт,Бенчмарк,Выполнение (%),Статус\n';
    
    tripwireData.forEach(item => {
        const completion = item.fact > 0 ? (item.fact / item.plan * 100).toFixed(1) : 0;
        const status = getStatus(completion, item.fact, item.benchmark);
        
        csv += `"${item.category}","${item.metric}",${item.plan},${item.fact},${item.benchmark},${completion},"${status.html.replace(/<[^>]*>/g, '')}"\n`;
    });
    
    downloadCSV(csv, 'tripwire_report.csv');
}

// Экспорт в Excel (симуляция)
function exportToExcel() {
    alert('Функция экспорта в Excel будет реализована в полной версии');
}

// Генерация отчета
function generateReport() {
    const report = generateDetailedReport();
    const blob = new Blob([report], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tripwire_detailed_report.html';
    a.click();
}

// Генерация детального отчета
function generateDetailedReport() {
    const date = new Date().toLocaleDateString('ru-RU');
    const period = document.getElementById('period').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    let report = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Отчет по трипваеру</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .section { margin-bottom: 20px; }
                .metric { margin-bottom: 10px; padding: 10px; border-left: 4px solid #ddd; }
                .good { border-left-color: #28a745; }
                .warning { border-left-color: #ffc107; }
                .danger { border-left-color: #dc3545; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Отчет по трипваеру</h1>
                <p>Период: ${period} (${startDate} - ${endDate})</p>
                <p>Дата формирования: ${date}</p>
            </div>
    `;
    
    // Группировка по категориям
    const categories = {};
    tripwireData.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });
    
    Object.keys(categories).forEach(category => {
        report += `<div class="section"><h2>${category}</h2>`;
        
        categories[category].forEach(item => {
            const completion = item.fact > 0 ? (item.fact / item.plan * 100).toFixed(1) : 0;
            const status = getStatus(completion, item.fact, item.benchmark);
            const statusClass = completion >= 100 ? 'good' : completion >= 80 ? 'warning' : 'danger';
            
            report += `
                <div class="metric ${statusClass}">
                    <h3>${item.metric}</h3>
                    <p><strong>План:</strong> ${item.plan.toLocaleString()} ${item.unit}</p>
                    <p><strong>Факт:</strong> ${item.fact.toLocaleString()} ${item.unit}</p>
                    <p><strong>Бенчмарк:</strong> ${item.benchmark.toLocaleString()} ${item.unit}</p>
                    <p><strong>Выполнение:</strong> ${completion}%</p>
                    <p><strong>Статус:</strong> ${status.html.replace(/<[^>]*>/g, '')}</p>
                    ${status.warning ? `<p><strong>Рекомендации:</strong> ${item.recommendations}</p>` : ''}
                </div>
            `;
        });
        
        report += '</div>';
    });
    
    report += '</body></html>';
    return report;
}

// Функция для скачивания CSV
function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

