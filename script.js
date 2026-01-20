// Modello archietturale: Module Pattern

const App = (function () {
    // Variabili private
    const tabMapping = {
        s1: 'introduzione',
        s2: 'normativa',
        s3: 'agenti',
        s4: 'matrice',
        s5: 'pdf'
    };

    // Funzione privata per mostrare la Sezione
    function mostraSezione(event) {
        const idSezione = tabMapping[event.target.id];

        $('.sezione').removeClass('attivo');
        $('.tab').removeClass('attivo');

        $('#' + idSezione).addClass('attivo');
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

    function calcolaRischio(gravita, probabilita) {
        if (gravita && probabilita) {
            const rischio = gravita * probabilita;
            alert("Il rischio calcolato è: " + rischio);
        }
    }
    // Funzione privata per l'inizializzazione
    function init() {
        let gravita;
        let probabilita;

        // Inizializza tema memorizzato in localStorage
        const tema = localStorage.getItem("tema");
        if (tema === "scuro") temaScuro();
        else temaChiaro();

        // Assegna event listener ai pulsanti della sidebar
        $(".tab").on("click", mostraSezione);

        // Assegna event listener ai pulsanti header
        $("#chiaro").on("click", temaChiaro);
        $("#scuro").on("click", temaScuro);

        //Assegna event listener alle celle della matrice
        $("#matrice .grav").on("click", function () {
            // alert($(this).attr("data-rischio"));
            gravita = ($(this).attr("data-rischio"));
            calcolaRischio(gravita, probabilita);
            $("#matrice .grav").removeClass("selezionato");
            $(this).addClass("selezionato");
        });

        $("#matrice .prob").on("click", function () {
            // alert($(this).attr("data-rischio"));
            probabilita = ($(this).attr("data-rischio"));
            $("#matrice .prob").removeClass("selezionato");
            $(this).addClass("selezionato");
            calcolaRischio(gravita, probabilita);
        });

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
