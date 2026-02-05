// Design Pattern: Module Pattern

const App = (function () {
    // Link al file PDF
    const linkPDF = "https://drive.google.com/file/d/1oLhzSX3zh7SjplPVdW9LI7hraIkqNtdR/view?usp=sharing";

    // Percorso del file JSON contenente gli agenti biologici
    const fileJSON = "data/agenti_biologici.json";

    // Funzione privata per mostrare il contenuto dei vari tag <sezione>
    function mostraSezione(event) {
        const idSezione = $(this).attr('data-sezione');

        $('.sezione').hide("slow");

        $('.dropdown-content').hide();
        $('#' + idSezione).show("slow")
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

    //Funzione privata per applicare il filtro sugli articoli della normativa
    function applicaFltNormativa() {
        const stringa = $('#strFltNormativa').val().toLowerCase();
        $("#normativa .scheda").each(function () {
            if ($(this).text().toLowerCase().includes(stringa)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
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

    // Funzione privata per il popolamento della tabella agenti biologici
    // a partire da un oggetto JSON
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
                    icona = '<i class="fa-solid fa-viruses"></i>';
                    break;
                case "Fungo":
                    icona = '<i class="fa-solid fa-atom"></i>';
                    break;
                default:
                    icona = '<i class="fa-solid fa-question"></i>';
                    break;
            }

            html += `<tr>
                        <td>${riga.Tipologia} ${icona}</td>
                        <td>${riga.Agente}</td>
                        <td>
                            <div class='boxGruppo gruppo${riga.Classificazione}'>${riga.Classificazione}</div>
                        </td>
                        <td class='vaccino'>${(riga.Vaccino ? "<i class='fa-solid fa-circle-check fa-lg'></i>" : "")} 
                        </td>
                    </tr>`;
        });

        if (html == '') {
            html = '<tr><td colspan="4">Nessun agente trovato.</td></tr>';
        }

        $tbody.html(html);
    }

    // Funzione privata per applicare il filtro sugli agenti
    function applicaFltAgenti(righeJSON) {
        let gruppo = $('.boxGruppo.selezionato').attr('data-gruppo');
        let matchGruppo;
        let stringa = $('#strFltAgente').val().toLowerCase();
        let filtrati = righeJSON.filter(riga => {
            let matchNome = riga.Agente.toLowerCase().includes(stringa);
            if (riga.Classificazione == gruppo || gruppo == undefined) {
                matchGruppo = true;
            } else {
                matchGruppo = false;
            }
            return matchNome && matchGruppo;
        });
        mostraAgenti(filtrati);
    }

    // Metodo per inizializzare l'app
    function init() {
        // Variabili per memorizzare la gravità e la probabilità nella matrice del rischio
        let gravita;
        let probabilita;

        // Variabile per memorizzare gli agenti caricati dal file JSON
        let datiJSON = [];

        // Inizializza tema colori memorizzato in localStorage
        // TODO: includere anche tema automatico e slide bottone
        const tema = localStorage.getItem("tema");

        switch (tema) {
            case "scuro":
                temaScuro();
                break;
            case "chiaro":
                temaChiaro();
                break;
            default:
                temaChiaro();
                break;
        }

        // Event listener per mostrare o nascondere il menu dropdown
        $('.dropbutton').on('click', function (event) {
            $('.dropdown-content').toggle();
        });

        // Event listener per nascondere il menu se si clicca in qualsiasi altro punto della pagina
        $(document).on('click', function (event) {
            if (!$(event.target).closest('.dropdown').length) {
                $('.dropdown-content').hide();
            }
        });

        // Event listener che chiama la funzione mostraSezione per mostrare la sezione
        // corrispondente al pulsante premuto
        $(".tab").on("click", mostraSezione);

        // Event listener che chiama la funzione temaChiaro o temaScuro
        // per cambiare il set di colori della pagina web
        $("#chiaro").on("click", temaChiaro);
        $("#scuro").on("click", temaScuro);

        // Event listener per mostrare il testo degli articoli 
        // della normativa con animazione quando l'utente fa click 
        // sul titolo dell'articolo
        $("#normativa .articolo").on("click", function () {
            $("#" + $(this).attr("id") + "testo").toggle("slow");
        });

        // Event listener per applicare il filtro sugli articoli della normativa
        $('#fltNormativa').on('click', function () { applicaFltNormativa(); });
        $('#strFltNormativa').on('input', function () { applicaFltNormativa(); });

        // Event listener per rimuovere il filtro e mostrare tutti gli articoli della normativa
        $('#cancFltNormativa').on('click', function () {
            $('#strFltNormativa').val('');
            $("#normativa .scheda").each(function () {
                $(this).show();
            });
            $("#normativa .testo").each(function () {
                $(this).hide();
            });
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

        //Event listener per i quattro gruppi degli agenti biologici
        $('.boxGruppo').on('click', function () {
            if ($(this).hasClass('selezionato')) {
                $(this).removeClass('selezionato');
            } else {
                $('.boxGruppo').removeClass('selezionato');
                $(this).addClass('selezionato');
            }
            applicaFltAgenti(datiJSON);
        });

        // Event listener per applicare il filtro sugli agenti biologici
        $('#fltAgente').on('click', function () { applicaFltAgenti(datiJSON); });
        $('#strFltAgente').on('input', function () { applicaFltAgenti(datiJSON); });

        // Event listener per chiudere la tastiera virtuale quando si preme il segno di spunta (invio) nei filtri
        $('#strFltAgente').on('keypress', function (event) {
            if (event.which === 13) {
                $(this).blur();
            }
        });

        $('#strFltNormativa').on('keypress', function (event) {
            if (event.which === 13) {
                $(this).blur();
            }
        });

        //Event listener per rimuovere il filtro e mostrare tutti gli agenti biologici
        $('#cancFltAgente').on('click', function () {
            $('#strFltAgente').val('');
            $('.boxGruppo').removeClass('selezionato');
            mostraAgenti(datiJSON);
        });

        // Event listener per la selezione della gravita e della probabilita della matrice
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

        // Genera il qrcode a partire dalla variable linkPDF
        $('#qrcode').qrcode({ width: 96, height: 96, text: linkPDF });

        //Aggancia al pulsante download la variabile con il link al file PDF
        $('.download a').attr('href', linkPDF);

        // Simula il click sulla prima tab per mostrare la sezione Normativa all'avvio
        $('#dd1').trigger('click');
    }

    // Interfaccia pubblica
    return {
        init: init
    };
})();

// Inizializza l'app web (assegnazione listener, etc.) solo quando 
// il DOM è completamente renderizzato per evitare che alcuni
// elementi non siano ancora presenti
$(document).ready(function () {
    App.init();
});
