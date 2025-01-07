function generateCalendar(month) {
    const year = 2025;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let startingDay = firstDay.getDay() - 1;
    if (startingDay === -1) startingDay = 6;
    
    const monthLength = lastDay.getDate();

    const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", 
                      "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
    document.getElementById('monthTitle').textContent = `${monthNames[month]} 2025`;

    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            
            if (i === 0 && j < startingDay) {
                cell.innerHTML = '<div class="day-number"></div>';
            } else if (date > monthLength) {
                cell.innerHTML = '<div class="day-number"></div>';
            } else {
                cell.innerHTML = `
                    <div class="day-number">${date}</div>
                    <textarea class="note-area" placeholder="Note..."></textarea>
                `;
                date++;
            }
            
            row.appendChild(cell);
        }
        
        calendarBody.appendChild(row);
        if (date > monthLength) {
            break;
        }
    }
}

async function savePDF() {
    const element = document.getElementById('calendarContainer');
    const options = {
        margin: 0,
        filename: `calendario_${document.getElementById('monthSelect').options[document.getElementById('monthSelect').selectedIndex].text}_2025.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    const textareas = element.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        if (!textarea.value) {
            textarea.style.display = 'none';
        }
    });

    try {
        await html2pdf().set(options).from(element).save();
    } catch (error) {
        console.error('Errore durante il salvataggio del PDF:', error);
        alert('Si è verificato un errore durante il salvataggio del PDF');
    }

    textareas.forEach(textarea => {
        textarea.style.display = '';
    });
}

document.getElementById('monthSelect').addEventListener('change', function() {
    generateCalendar(parseInt(this.value));
});

generateCalendar(0);