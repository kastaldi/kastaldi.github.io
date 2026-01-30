// Design Pattern: Module Pattern

const App = (function () {
    // Link al file PDF
    const linkPDF = "https://drive.google.com/file/d/1oLhzSX3zh7SjplPVdW9LI7hraIkqNtdR/view?usp=sharing";

    // Percorso del file JSON contenente gli agenti biologici
    const fileJSON = "data/agenti_biologici.json";

    // Variabile privata per il mapping tra tab e sezioni
    const tabMapping = {
        s1: 'normativa',
        s2: 'faq',
        s3: 'agenti',
        s4: 'matrice',
        s5: 'pdf'
    };

    // Funzione privata per mostrare la Sezione
    function mostraSezione(event) {
        // Usa currentTarget per prendere l'ID del pulsante .tab
        const target = event.currentTarget;
        const idSezione = tabMapping[target.id];

        $('.sezione').hide("slow");

        $('.dropdown-content').hide();
        $('#' + idSezione).show("slow");
        $('#' + idSezione).css('display', 'flex');
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
            $(".rischio1, .rischio2, .rischio3, .rischio4").removeClass("selezionato");
            $("#m" + probabilita + gravita).addClass("selezionato");
            $("#rischio-calcolato").text(rischio);
        }
    }

    // Funzione privata per la visualizzazione nella tabella degli agenti biologici
    function mostraAgenti(righeJSON) {
        let html = '';
        let icona;
        const $tbody = $('#jsonAgenti');
        $tbody.empty();

        righeJSON.forEach(riga => {
            switch (riga.Tipologia) {
                case "Batterio":
                    icona = '<i class="fa-solid fa-bacteria"></i>';
                    break;
                case "Parassita":
                    icona = '<i class="fa-solid fa-bug"></i>';
                    break;
                case "Virus":
                    icona = '<i class="fa-solid fa-viruses"></i>'
                    break;
                case "Fungo":
                    icona = '<i class="fa-solid fa-atom"></i>'
                    break;
                default:
                    icona = '<i class="fa-solid fa-question"></i>'
                    break;
            }

            html += `<tr>
                        <td>${riga.Tipologia}<br>${icona}</td>
                        <td>${riga.Agente}</td>
                        <td class='gruppo${riga.Classificazione}'>${riga.Classificazione}</td>
                        <td class='vaccino'>${(riga.Vaccino ? "<i class='fa-solid fa-circle-check'></i>" : "")} 
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

        // Gestione menu dropdown al click
        $('.dropbutton').on('click', function (event) {
            $('.dropdown-content').toggle();
            // Evita che il click si propaghi al document e chiuda subito il menu
            event.stopPropagation();
        });

        // Nasconde il menu se si clicca in qualsiasi altro punto della pagina
        $(document).on('click', function (event) {
            if (!$(event.target).closest('.dropdown').length) {
                $('.dropdown-content').hide();
            }
        });

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
        }).fail(function () {
            console.error("Errore nel caricamento del file JSON.");
            $('#jsonAgenti').html("<tr><td colspan='4'>Impossibile caricare i dati degli agenti.</td></tr>");
        });

        // Funzione per applicare il filtro (definita qui per riutilizzo)
        function applicaFiltro() {
            const stringa = $('#stringaFiltro').val().toLowerCase();
            const filtrati = datiJSON.filter(r =>
                r.Agente.toLowerCase().includes(stringa)
            );
            mostraAgenti(filtrati);
        }

        // Assegna event listener sia al click del pulsante 
        // che all'input nella digitazione
        $('#filtroAgente').on('click', applicaFiltro);
        $('#stringaFiltro').on('input', applicaFiltro);

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

        //Aggancia al pulsante download il link al file PDF
        $('.download a').attr('href', linkPDF);

        // Simula il click sulla prima tab per mostrare la sezione Normativa all'avvio
        $('#s1').trigger('click');
    }

    // Interfaccia pubblica
    return {
        init: init
    };
})();

// Inizializza l'app web (assegnazione listener, etc.) solo quando 
// il DOM è completamente renderizzato
$(document).ready(function () {
    App.init();
});
