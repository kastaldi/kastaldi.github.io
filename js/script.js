// Modello archietturale: Module Pattern

const App = (function () {
    // Link al file PDF
    const linkPDF = "https://kastaldi.github.io/il_rischio_biologico.pdf";

    // Variabile privata per il mapping tra tab e sezioni
    const tabMapping = {
        s1: 'introduzione',
        s2: 'normativa',
        s3: 'agenti',
        s4: 'matrice',
        s5: 'pdf'
    };

    // Funzione privata per mostrare la Sezione
    function mostraSezione(res) {
        const idSezione = tabMapping[res.target.id];

        // $('.sezione').removeClass('attivo');
        //$('.tab').removeClass('attivo');

        // $('#' + idSezione).addClass('attivo');
        // $(event.target).addClass('attivo');

        $('.sezione').hide("slow");
        $('.tab').removeClass('attivo');

        $('#' + idSezione).show("slow");
        $('#' + idSezione).css('display', 'flex');
        $(res.target).addClass('attivo');
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

    // Funzione privata per il calcolo del rischio
    function calcolaRischio(gravita, probabilita) {
        if (gravita && probabilita) {
            const rischio = gravita * probabilita;
            $(".r0, .r1, .r2, .r3").removeClass("selezionato");
            $("#m" + probabilita + gravita).addClass("selezionato");
            $("#rischio-calcolato").text(rischio);
        }
    }

    // Funzione privata per il caricamento del JSON degli agenti biologici
    // e la visualizzazione nella tabella

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

        // Assegna event listener ai pulsanti del tema
        $("#chiaro").on("click", temaChiaro);
        $("#scuro").on("click", temaScuro);

        // Assegna event listener per mostrare gli articoli della normativa con animazione
        $("#normativa .articolo").on("click", function () {
            $("#" + $(this).attr("id") + "testo").toggle("slow");
        });

        // Carica gli agenti biologici nella tabella
        $.getJSON('data/agenti_biologici.json', function (res) {
            let html;
            dati = res;
            const $tbody = $('#json_agenti');
            $tbody.empty();

            dati.forEach(riga => {
                html+=("<tr><td>"+riga.Tipologia +
                       "</td><td>" + riga.Agente + 
                       "</td><td class='g" + riga.Classificazione + "'>"+riga.Classificazione+
                       "</td><td>"+riga.Vaccino+"</td></tr>");
            });

            $tbody.html(html);
        });

        //Assegna event listener alle celle gravita e probabilita della matrice
        $("#matrice .grav").on("click", function () {
            gravita = ($(this).attr("data-rischio"));
            $("#matrice .grav").removeClass("selezionato");
            $(this).addClass("selezionato");
            calcolaRischio(gravita, probabilita);
        });

        $("#matrice .prob").on("click", function () {
            probabilita = ($(this).attr("data-rischio"));
            $("#matrice .prob").removeClass("selezionato");
            $(this).addClass("selezionato");
            calcolaRischio(gravita, probabilita);
        });

        //Crea il qrcode
        $('#qrcode').qrcode({ width: 96, height: 96, text: linkPDF });
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
