import './styles/style.css';
import {
    fetchBooksByCategory,
    fetchBooksByTitle,
    fetchDescription,
    fetchCoverId
} from './api';
import {
    resetResults,
    showInfo,
    renderBookList,
    showDescription,
    showCover
} from './ui';

document.addEventListener('DOMContentLoaded', () => {
    const categoryInput = document.getElementById('categoryInput');
    const searchBtn = document.getElementById('searchBtn');
    const bookList = document.getElementById('bookList');
    const bookDescription = document.getElementById('bookDescription');

    // Gestore click sul pulsante di ricerca
    searchBtn.addEventListener('click', async () => {
        const query = categoryInput.value.trim();
        resetResults(bookList, bookDescription);

        if (!query) {
            showInfo(bookList, 'Inserisci una categoria o un titolo');
            return;
        }

        try {
            // Prova la ricerca per categoria, ma gestisci eventuali errori di rete
            let books = [];
            try {
                books = await fetchBooksByCategory(query.toLowerCase());
            } catch {
                // Se la fetch fallisce (es. errore CORS), ignora e passa alla ricerca per titolo
                books = [];
            }

            if (books.length > 0) {
                renderBookList(bookList, books, showBookDescription);
                return;
            }

            // Se non trova nulla o errore, prova la ricerca per titolo
            books = await fetchBooksByTitle(query);
            if (books.length > 0) {
                renderBookList(bookList, books, showBookDescription);
                return;
            }

            showInfo(bookList, 'Nessun libro trovato');
        } catch (err) {
            showInfo(bookList, `Errore nella ricerca: ${err.message}`);
        }
    });

    // Permetti la ricerca anche premendo INVIO nell'input
    categoryInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchBtn.click();
        }
    });

    // Mostra descrizione e copertina del libro
    async function showBookDescription(workKey) {
        try {
            const description = await fetchDescription(workKey);
            showDescription(bookDescription, description);
        } catch {
            showInfo(bookDescription, 'Errore nel caricamento della descrizione.');
            bookDescription.style.display = 'flex';
        }

        try {
            const coverId = await fetchCoverId(workKey);
            showCover(bookDescription, coverId);
        } catch {
            // Nessuna azione se la copertina non è disponibile
        }
    }
});

