function filterMatches() {
            const filterDate = document.getElementById('filter-date').value;
            const filterTeam = document.getElementById('filter-team').value.toLowerCase();
            const rows = document.querySelectorAll('#match-table-body tr');
            let matchFound = false;

            rows.forEach(row => {
                const date = row.cells[0].textContent;
                const match = row.cells[1].textContent.toLowerCase();
                const league = row.cells[2].textContent.toLowerCase();

                const dateMatch = !filterDate || date === filterDate;
                const teamMatch = match.includes(filterTeam) || league.includes(filterTeam);

                if (dateMatch && teamMatch) {
                    row.style.display = '';  // Show matching row
                    matchFound = true;
                } else {
                    row.style.display = 'none';  // Hide non-matching row
                }
            });

            const noMatchesDiv = document.getElementById('no-matches');
            // Display 'No Matches' message if no matches found
            if (matchFound) {
                noMatchesDiv.style.display = 'none';
            } else {
                noMatchesDiv.style.display = 'block';
            }
        }

        function sortTable(columnIndex) {
            const tableBody = document.getElementById('match-table-body');
            const rows = Array.from(tableBody.rows);

            rows.sort((a, b) => 
                a.cells[columnIndex].textContent.localeCompare(b.cells[columnIndex].textContent)
            );

            rows.forEach(row => tableBody.appendChild(row));
        }
