// frontend/public/js/main.js

document.addEventListener("DOMContentLoaded", () => {
    
    // Confirmación antes de logout
    const logoutLink = document.querySelector('a[href="/auth/logout"]');
    if(logoutLink){
        logoutLink.addEventListener("click", (e) => {
            if(!confirm("¿Deseas cerrar sesión?")){
                e.preventDefault();
            }
        });
    }

    // Validaciones básicas de formularios
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            let valid = true;
            form.querySelectorAll("input[required]").forEach((input) => {
                if(!input.value.trim()){
                    alert(`El campo ${input.name} es obligatorio`);
                    input.focus();
                    valid = false;
                    e.preventDefault();
                    return false;
                }
            });
            return valid;
        });
    });

    // Tablas ordenables
    const tables = document.querySelectorAll("table");
    tables.forEach(table => {
        table.querySelectorAll("th").forEach((th, index) => {
            th.addEventListener("click", () => {
                sortTable(table, index);
            });
        });
    });

    function sortTable(table, col) {
        const rows = Array.from(table.tBodies[0].rows);
        const asc = !table.asc;
        rows.sort((a,b) => {
            const aText = a.cells[col].innerText.trim();
            const bText = b.cells[col].innerText.trim();
            return asc ? aText.localeCompare(bText, undefined, {numeric:true}) : bText.localeCompare(aText, undefined, {numeric:true});
        });
        rows.forEach(row => table.tBodies[0].appendChild(row));
        table.asc = asc;
    }
});
