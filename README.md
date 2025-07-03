# Owly Booksearch

Applicazione web per la ricerca di libri tramite [OpenLibrary](https://openlibrary.org/), sviluppata per Owly Education.

## Funzionalità

- Ricerca libri per **categoria** (es: fantasy, history, science).
- Ricerca libri per **titolo**.
- Visualizzazione elenco risultati.
- Visualizzazione dettagli libro: descrizione e copertina.
- Interfaccia responsive e moderna.

## Struttura del progetto

```
owly-booksearch/
└── index.html
│
├── dist/
│   └── bundle.js
│
├── src/
│   ├── api.js
│   ├── main.js
│   ├── ui.js
│   └── styles/
│       └── style.css
│
├── package.json
├── webpack.config.js
└── README.md
```

## Installazione

1. **Clona il repository**  
   ```
   git clone <repo-url>
   cd owly-booksearch
   ```

2. **Installa le dipendenze**  
   ```
   npm install
   ```

3. **Costruisci il progetto**  
   ```
   npm run build
   ```

4. **Avvia l’applicazione**  
   Apri `dist/index.html` con il browser.

## Dipendenze principali

- [axios](https://github.com/axios/axios)
- [lodash](https://lodash.com/)
- [webpack](https://webpack.js.org/)
- [babel](https://babeljs.io/)

## Note

- Non è necessario alcun backend: tutte le chiamate sono verso le API pubbliche di OpenLibrary.
- Il file `.env` non è obbligatorio, viene ignorato se assente.
- Il CSS può essere personalizzato in `src/styles/style.css`.

## Autore

Gianmarco Sabbatini aka TrisErmete

---

**Progetto realizzato per scopi didattici
