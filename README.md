# Valutazione del Rischio da Agenti Biologici

Questa web app è uno strumento interattivo di supporto per la valutazione del rischio biologico secondo il **D.Lgs 81/08 (Titolo X)**.

L'applicazione permette di elencare gli agenti biologici classificati per classi di rischio, calcolare il livello di rischio tramite la matrice del rischio e consultare gli articoli di legge della normativa vigente.

## 🚀 Funzionalità Principali

*   **Consultazione Normativa**:
    *   Visualizzazione degli articoli del Titolo X del D.Lgs 81/08.
    *   Ricerca in tempo reale di termini all'interno degli articoli.
*   **Database Agenti Biologici**:
    *   Elenco completo di agenti (Batteri, Virus, Parassiti, Funghi) caricati dinamicamente da file JSON.
    *   Visualizzazione della Classificazione (Gruppo 1-4) dell'agente e disponibilità di vaccini.
    *   Ricerca istantanea per nome dell'agente.
*   **Matrice del Rischio**:
    *   Selezione del grado di Probabilità e Gravità per calcolare il livello di rischio (R = P * D).
*   **Interfaccia Utente**:
    *   Navigazione a schede con menu a discesa (dropdown).
    *   Dark Mode / Light Mode: Cambio tema colori con salvataggio della preferenza utente (localStorage).
    *   Design responsive per dispositivi mobili.
    *   Generazione automatica di **QR Code** per il download della documentazione PDF su dispositivo mobile.

## 🛠️ Tecnologie Utilizzate

*   **HTML5 & CSS3**: Struttura semantica e layout responsive.
*   **JavaScript** e **jQuery**: Logica di business
*   **Librerie Esterne**:
    *   *jQuery*: Manipolazione del DOM e gestione degli eventi https://jquery.com/
    *   *FontAwesome*: Icone https://fontawesome.com/
    *   *jQuery QRCode*: Plugin per la generazione di codici QR https://github.com/jeromeetienne/jquery-qrcode

## 📂 File del Progetto

*   `index.html`: Struttura sematica (contenuto) della pagina web
*   `js/script.js`: Logica dell'applicazione (Javascript)
*   `data/agenti_biologici.json`: Dataset JSON con la lista degli agenti biologici.
*   `css/style.css`: Fogli di stile per il layout e per i temi (chiaro/scuro).

## 📦 Installazione ed Uso (deployment locale)

1.  Clonare il repository in una directory:
2.  
    ```bash
    git clone https://github.com/kastaldi/kastaldi.github.io.git
    ```
3. Verificare l'indirizzo della costante LinkPDF nel file `script.js`
   affinchè punti al file PDF corretto
   
5.  Aprire il file `index.html` nel browser oppure lanciare un
    web server locale dalla directory es:
    
    ```bash
    python -m http.server 5000
    ```
    e collegarsi con il browser a localhost es:
    
    ```bash
    http://localhost:5000
    ```
---
