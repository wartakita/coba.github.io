document.addEventListener('DOMContentLoaded', () => {
    const savedDate = localStorage.getItem('filterDate');
    const savedTeam = localStorage.getItem('filterTeam');
    const savedSortColumn = localStorage.getItem('sortColumn');
    const savedSortDirection = localStorage.getItem('sortDirection');

    if (savedDate) {
        document.getElementById('filter-date').value = savedDate;
    }
    if (savedTeam) {
        document.getElementById('filter-team').value = savedTeam;
    }
    filterMatches();

    if (savedSortColumn !== null && savedSortDirection !== null) {
        sortTable(parseInt(savedSortColumn), savedSortDirection === 'desc');
    }
});

function parseDate(dateStr) {
    const parts = dateStr.split('-');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

function filterMatches() {
    const filterDate = document.getElementById('filter-date').value;
    const filterTeam = document.getElementById('filter-team').value.toLowerCase();
    const tableBody = document.getElementById('match-table-body');
    const rows = tableBody.getElementsByTagName('tr');
    let matchFound = false;

    localStorage.setItem('filterDate', filterDate);
    localStorage.setItem('filterTeam', filterTeam);

    for (let i = 0; i < rows.length; i++) {
        const dateCell = rows[i].getElementsByTagName('td')[0];
        const matchCell = rows[i].getElementsByTagName('td')[1];
        const leagueCell = rows[i].getElementsByTagName('td')[2];

        const matchDate = dateCell.textContent || dateCell.innerText;
        const match = matchCell.textContent.toLowerCase() || matchCell.innerText.toLowerCase();
        const league = leagueCell.textContent.toLowerCase() || leagueCell.innerText.toLowerCase();

        const matchDateObj = parseDate(matchDate);
        const filterDateObj = filterDate ? new Date(filterDate) : null;

        if ((filterDate === "" || matchDateObj.toISOString().slice(0, 10) === filterDate) &&
            (filterTeam === "" || match.includes(filterTeam) || league.includes(filterTeam))) {
            rows[i].style.display = "";
            matchFound = true;
        } else {
            rows[i].style.display = "none";
        }
    }

    const noMatches = document.getElementById('no-matches');
    if (matchFound) {
        noMatches.style.display = "none";
    } else {
        noMatches.style.display = "block";
    }
}

function sortTable(columnIndex, isDescending = false) {
    const table = document.querySelector("tbody");
    const rows = Array.from(table.rows);
    const isDateColumn = columnIndex === 0;
    const isTimeColumn = columnIndex === 3;

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].innerText;
        const cellB = rowB.cells[columnIndex].innerText;

        let comparison = 0;
        if (isDateColumn) {
            comparison = parseDate(cellA) - parseDate(cellB);
        } else if (isTimeColumn) {
            comparison = cellA.localeCompare(cellB);
        } else {
            comparison = cellA.localeCompare(cellB);
        }

        return isDescending ? -comparison : comparison;
    });

    rows.forEach(row => table.appendChild(row));

    localStorage.setItem('sortColumn', columnIndex);
    localStorage.setItem('sortDirection', isDescending ? 'desc' : 'asc');
}

function openMatchLink(cell) {
    const link = cell.querySelector('a');
    if (link) {
        window.open(link.href, '_blank');
    }
}
