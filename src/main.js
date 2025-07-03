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

    searchBtn.addEventListener('click', async () => {
        const query = categoryInput.value.trim();
        resetResults(bookList, bookDescription);

        if (!query) {
            showInfo(bookList, 'Inserisci una categoria o un titolo');
            return;
        }

        try {
            let books = [];
            try {
                books = await fetchBooksByCategory(query.toLowerCase());
            } catch {
                books = [];
            }

            if (books.length > 0) {
                renderBookList(bookList, books, showBookDescription);
                return;
            }

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

    categoryInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchBtn.click();
        }
    });

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
        }
    }
});

