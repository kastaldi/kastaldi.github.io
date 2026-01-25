// Modello archietturale: Module Pattern

const App = (function () {
    // Link al file PDF
    const linkPDF = "https://kastaldi.github.io/il_rischio_biologico.pdf";

    // Percorso del file JSON contenente gli agenti biologici
    const fileJSON = "data/agenti_biologici.json";

    // Variabile privata per il mapping tra tab e sezioni
    const tabMapping = {
        s1: 'introduzione',
        s2: 'normativa',
        s3: 'agenti',
        s4: 'matrice',
        s5: 'pdf'
    };

    // Funzione privata per mostrare la Sezione
    function mostraSezione(pulsante) {
        const idSezione = tabMapping[pulsante.target.id];

        $('.sezione').hide("slow");
        $('.tab').removeClass('attivo');

        $('#' + idSezione).show("slow");
        $('#' + idSezione).css('display', 'flex');
        $(pulsante.target).addClass('attivo');
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
            $(".rischio1, .rischio2, .rischio3, rischio4").removeClass("selezionato");
            $("#m" + probabilita + gravita).addClass("selezionato");
            $("#rischio-calcolato").text(rischio);
        }
    }

    // Funzione privata per la visualizzazione nella tabella degli agenti biologici

    function mostraAgenti(righe) {
        let html;
        const $tbody = $('#jsonAgenti');
        $tbody.empty();

        righe.forEach(riga => {
            html += `<tr>
                         <td>${riga.Tipologia}</td>
                         <td>${riga.Agente}</td>
                         <td class='gruppo${riga.Classificazione}'>${riga.Classificazione}</td>
                         <td class='vaccino'>${(riga.Vaccino ? "<i class='fa-solid fa-circle-check' style='color: green;'></i>" : "")} 
                         </td>
                         </tr>`;
        });

        $tbody.html(html);
    }

    // Funzione privata per l'inizializzazione
    function init() {
        // Variabili per memorizzare la gravita e la robabilta nella matrice del rischio
        let gravita;
        let probabilita;

        // Variabile per memorizzare gli agenti caricati dal file JSON
        let datiJSON = [];

        // Inizializza tema memorizzato in localStorage
        const tema = localStorage.getItem("tema");
        if (tema === "scuro") temaScuro();
        else temaChiaro();

        // Assegna event listener ai pulsanti della sidebar
        // che chiama la funzione mostraSezione per mostrare la sezione
        // corrispondente al pulsante premuto
        $(".tab").on("click", mostraSezione);

        // Assegna event listener ai pulsanti del tema
        // che chiama la funziona temaChiaro o temaScuro
        // per cammbiare il set di colori della pagina web
        $("#chiaro").on("click", temaChiaro);
        $("#scuro").on("click", temaScuro);

        // Assegna event listener per mostrare il testo degli articoli 
        // della normativa con animazione quando l'utente fa click 
        // sul titolo dell'articolo
        $("#normativa .articolo").on("click", function () {
            $("#" + $(this).attr("id") + "testo").toggle("slow");
        });

        // Carica gli agenti biologici nella variabile datiJSON
        // e li visualizza nella tabella
        $.getJSON(fileJSON, function (dati) {
            datiJSON = dati;
            mostraAgenti(datiJSON);
        });

        // let table = new DataTable('#elencoAgenti');

        // Assegna event listener alla casella per filtrare gli agenti
        // e chiama la stessa funzione di manipolazione DOM
        $('#filtroAgente').on('click', function () {
            const stringa = $('#stringaFiltro').val().toLowerCase();

            const filtrati = datiJSON.filter(r =>
                // r.Tipologia.toLowerCase().includes(val) ||
                r.Agente.toLowerCase().includes(stringa)
            );

            mostraAgenti(filtrati);
        });

        $('#cancFiltroAgente').on('click', function () {
            $('#stringaFiltro').val('');
            mostraAgenti(datiJSON);
        });

        // Assegna event listener alle celle della gravita 
        // e della probabilita della matrice
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

        // Crea il qrcode in maniera dinamica
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
