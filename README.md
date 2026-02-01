# Valutazione del Rischio Biologico

Questa Web App è uno strumento interattivo di supporto per la consultazione della normativa e la valutazione del rischio biologico negli ambienti di lavoro, sviluppata in conformità con il **D.Lgs 81/08 (Titolo X)**.

L'applicazione permette di accedere rapidamente alle classificazioni degli agenti biologici, calcolare il livello di rischio tramite matrice e consultare gli articoli di legge pertinenti.

🔗 **Live Demo:** [https://kastaldi.github.io](https://kastaldi.github.io)

## 🚀 Funzionalità Principali

*   **Consultazione Normativa**:
    *   Visualizzazione degli articoli del Titolo X del D.Lgs 81/08.
    *   Funzione di **filtro in tempo reale** per cercare parole chiave all'interno degli articoli.
*   **Database Agenti Biologici**:
    *   Elenco completo di agenti (Batteri, Virus, Parassiti, Funghi) caricati dinamicamente da file JSON.
    *   Visualizzazione della **Classificazione (Gruppo 1-4)** e disponibilità di vaccini.
    *   Ricerca istantanea per nome dell'agente.
*   **Matrice del Rischio**:
    *   Calcolatore interattivo basato sulla formula $R = P \times D$.
    *   Selezione visuale di **Probabilità** e **Gravità** per ottenere il livello di rischio.
*   **Interfaccia Utente**:
    *   Navigazione a schede (Tabs).
    *   **Dark Mode / Light Mode**: Cambio tema con salvataggio della preferenza utente (localStorage).
    *   Design responsive per dispositivi mobili.
*   **Risorse**:
    *   Generazione automatica di **QR Code** per il download della documentazione PDF.
    *   Sezione FAQ.

## 🛠️ Tecnologie Utilizzate

*   **HTML5 & CSS3**: Struttura semantica e layout responsive.
*   **JavaScript (ES6)**:
    *   Utilizzo del **Module Pattern** per incapsulare la logica applicativa (`App`).
    *   Gestione asincrona dei dati tramite `$.getJSON`.
*   **jQuery**: Manipolazione del DOM e gestione degli eventi.
*   **Librerie Esterne**:
    *   *FontAwesome* (Icone).
    *   *jQuery QRCode* (Generazione codici QR).

## 📂 Struttura del Progetto

*   `index.html`: Struttura principale e contenuti statici.
*   `js/script.js`: Logica dell'applicazione (gestione filtri, calcoli, temi).
*   `data/agenti_biologici.json`: Dataset contenente la lista degli agenti biologici.
*   `css/style.css`: Fogli di stile per il layout e i temi (chiaro/scuro).

## 📦 Installazione e Uso

Poiché si tratta di una web app statica, non è richiesta alcuna compilazione.

1.  Clona il repository:
    ```bash
    git clone https://github.com/kastaldi/kastaldi.github.io.git
    ```
2.  Apri il file `index.html` nel tuo browser.

---
*Progetto sviluppato per la gestione della sicurezza sul lavoro e la prevenzione del rischio biologico.*