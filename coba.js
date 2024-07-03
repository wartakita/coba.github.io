function searchTable() {
        var input, filter, table, tr, td, i, j, txtValue, noResults;
        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("matchTable").getElementsByTagName("tbody")[0];
        tr = table.getElementsByTagName("tr");
        noResults = document.getElementById("noResults");
        let matchFound = false;

        for (i = 0; i < tr.length; i++) {
            tr[i].style.display = "none"; // Hide all rows initially

            td = tr[i].getElementsByTagName("td");
            for (j = 0; j < td.length; j++) {
                if (td[j]) {
                    txtValue = td[j].textContent || td[j].innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = ""; // Show the row if match is found
                        matchFound = true;
                        break;
                    }
                }
            }
        }

        if (matchFound) {
            noResults.style.display = "none";
        } else {
            noResults.style.display = "block";
        }
    }

    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("matchTable");
        switching = true;
        dir = "asc"; 

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];

                if (dir == "asc") {
                    if (n === 0) { // Sort by date
                        if (compareDates(x.innerHTML, y.innerHTML) > 0) {
                            shouldSwitch = true;
                            break;
                        }
                    } else {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                } else if (dir == "desc") {
                    if (n === 0) { // Sort by date
                        if (compareDates(x.innerHTML, y.innerHTML) < 0) {
                            shouldSwitch = true;
                            break;
                        }
                    } else {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount ++; 
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    function compareDates(date1, date2) {
        // Convert date format from DD-MM-YYYY to YYYY-MM-DD
        let [day1, month1, year1] = date1.split('-');
        let [day2, month2, year2] = date2.split('-');
        let d1 = new Date(`${year1}-${month1}-${day1}`);
        let d2 = new Date(`${year2}-${month2}-${day2}`);
        return d1 - d2;
    }
