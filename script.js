// Modello archietturale: Module Pattern

const App = (function () {
    // Variabili private
    const tabMapping = {
        s1: 'introduzione',
        s2: 'normativa',
        s3: 'classificazione',
        s4: 'matrice',
        s5: 'pdf'
    };

    // Funzione privata per mostrare la Sezione
    function mostraSezione(event) {
        const idSezione = tabMapping[event.target.id];

        $('.sezione').removeClass('attivo');
        $('.tab').removeClass('attivo');

        $('#'+idSezione).addClass('attivo');
        $(event.target).addClass('attivo');
    }

    // Funzioni private per tema
    function temaChiaro() {
        $("html").css("color-scheme", "light");
        localStorage.setItem("tema", "chiaro");
        $("#chiaro").hide();
        $("#scuro").show();
    }

    function temaScuro() {
        $("html").css("color-scheme", "dark");
        localStorage.setItem("tema", "scuro");
        $("#scuro").hide();
        $("#chiaro").show();
    }

    // Funzione privata per l'inizializzazione
    function init() {
        // Inizializza tema memorizzato in localStorage
        const tema = localStorage.getItem("tema");
        if (tema === "scuro") temaScuro();
        else temaChiaro();

        $(".tab").on("click" , mostraSezione);

        // Assegna event listener ai pulsanti tema
        $("#chiaro").on("click", temaChiaro);
        $("#scuro").on("click", temaScuro);

        //Crea il qrcode
        $('#qrcode').qrcode("https://kastaldi.github.io/il_rischio_biologico.pdf");

    }

    // Interfaccia pubblica
    return {
        init: init
    };
})();

// Inizializza l'app solo quando il DOM è completamente renderizzato
$(document).ready(function () {
    App.init();
});
