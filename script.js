function mostraSezione(id) {
    const sections = document.querySelectorAll('.section');
    const tabs = document.querySelectorAll('.tab');

    sections.forEach(s => s.classList.remove('active'));
    tabs.forEach(t => t.classList.remove('active'));

    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
}

$(document).ready(function () {

    $("#s1").on("click", function () {
        mostraSezione("intro");
    });

    $("#s2").on("click", function () {
        mostraSezione("normativa");
    });

    $("#s3").on("click", function () {
        mostraSezione("classificazione");
    });

    $("#s4").on("click", function () {
        mostraSezione("matrice");
    });

    $("#s5").on("click", function () {
        mostraSezione("pdf");
    });

    const html = document.querySelector('html');
    const tema = localStorage.getItem("tema");

    if (tema === "chiaro") temaChiaro();
    if (tema === "scuro") temaScuro();

    $("#light").on("click", function () {
        temaChiaro();
    });

    $("#dark").on("click", function () {
        temaScuro();
    });

    $("#auto").on("click", function () {
        temaAuto();
    });

    function temaAuto() {
        html.style.setProperty("color-scheme", "light dark");
        localStorage.removeItem("tema");
    }

    function temaChiaro() {
        html.style.setProperty("color-scheme", "light");
        localStorage.setItem("tema", "chiaro");
    }

    function temaScuro() {
        html.style.setProperty("color-scheme", "dark");
        localStorage.setItem("tema", "scuro");
    }

});
