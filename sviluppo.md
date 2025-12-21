Sessione 1 – Setup iniziale
Attività svolte:

Creazione del progetto React tramite Vite.

Pulizia della struttura iniziale.

Creazione dei componenti base:

App.jsx

SearchBar.jsx

BookGrid.jsx

BookCard.jsx


Sessione 2 – Ricerca base
Attività svolte

Implementazione della chiamata API verso OpenLibrary.

Elaborazione dei dati ricevuti:

Titolo

Autore

Copertina

Anno di pubblicazione

Visualizzazione dei risultati in una griglia responsive.

Criticità

Alcuni libri non avevano autore → gestito con il fallback “Autore sconosciuto”.

Sessione 3 – Componenti UI
Attività svolte:

Definizione dello stile base della griglia dei libri.

Creazione della card libro con:

Titolo

Autore

Anno

Link ai dettagli

Miglioramento della leggibilità e della spaziatura generale.

Criticità

Layout non uniforme con titoli molto lunghi.
Soluzione: allineamento centrale del testo e limiti di larghezza.

Sessione 4 – Pannello filtri
Attività svolte

Implementazione di un pannello filtri avanzati con i seguenti campi:

Autore

Anno

Genere

Lingua

Collegamento dei filtri alla query API.

Criticità

Il pannello risultava troppo grezzo
,la prima versione rimaneva sempre visibile.

Soluzione

Riscrittura completa del pannello filtri.

Aggiunta di un’animazione slide-down tramite:

max-height

opacity

transform

Introduzione del toggle “🎛️ Filtri avanzati”.

Sessione 5 – Loader e libri casuali
Attività svolte

Implementazione di un loader animato (spinner CSS).

Gestione dello stato loading per tutte le chiamate API.

Caricamento automatico di libri casuali al primo avvio dell’app.

Criticità

Il loader non veniva visualizzato.
Causa: mancava setLoading(true) in una funzione.

Soluzione: aggiunta di finally e controllo corretto del ternario nel JSX.

Sessione 6 – Rifiniture e bugfix
Attività svolte

Sistemata la spaziatura del pannello filtri.

Migliorata l’animazione di apertura e chiusura.

Pulizia del CSS e rimozione di duplicazioni.

Ottimizzata la responsività su dispositivi mobili.

Criticità

Il pannello filtri manteneva padding anche da chiuso.
Soluzione: padding: 0 nello stato chiuso e padding: 20px solo nello stato .open.

Mockup e modifiche
Mockup iniziale

Layout minimale con barra di ricerca e griglia libri.

Assenza del pannello filtri.

Evoluzione del design

Introduzione del pannello filtri avanzati.

Aggiunta di animazioni slide-down.

Inserimento del loader.

Caricamento di libri casuali per evitare una homepage vuota.

Miglioramento estetico delle card con hover 3D.

🔄 Decisioni cambiate in corso d’opera

Filtri sempre visibili → pannello a scomparsa
Per mantenere l’interfaccia più pulita.

Ricerca solo da barra → ricerca combinata barra + filtri
Per offrire maggiore flessibilità all’utente.

Homepage vuota → libri casuali
Per migliorare l’esperienza al primo accesso.

Stile minimale → stile moderno con ombre e animazioni
Per un aspetto più professionale.
