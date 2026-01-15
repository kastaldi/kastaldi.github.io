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

    $("#tema").on("click", function () {
        $("body").toggleClass("dark-mode");
    });

});
