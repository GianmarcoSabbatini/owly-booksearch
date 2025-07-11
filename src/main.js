import './styles/style.css';
import {
    fetchLibriPerCategoria,
    fetchDescrizione
} from './api';
import {
    renderLibriConPaginazione,
    mostraDescrizione
} from './ui';

let numeroPagina = 1;
let categoriaScelta = '';
const libriPerPagina = 6; // non so se 6 o 12

document.addEventListener('DOMContentLoaded', () => {
    const categoryInput = document.getElementById('categoryInput');
    const searchBtn = document.getElementById('searchBtn');
    const descLibro = document.getElementById('descLibro');

    let keyLibroSelezionato = null;
    let descrizioneLibroSelezionato = '';

    function clickLibro(book, books) {
        fetchDescrizione(book.key).then(description => {
            keyLibroSelezionato = book.key;
            descrizioneLibroSelezionato = `
                <h3>DESCRIZIONE</h3>
                <div class="desc-text">${description || 'Nessuna descrizione disponibile.'}</div>
                <div class="desc-cover">
                    ${book.cover_id ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg" alt="Copertina libro" class="book-cover">` : ''}
                </div>
            `;
            renderLibriConPaginazione(
                books,
                clickLibro,
                numeroPagina,
                books.length === libriPerPagina,
                keyLibroSelezionato,
                descrizioneLibroSelezionato
            );
            mostraDescrizione(descLibro, descrizioneLibroSelezionato);
        });
    }

    function loadBooks() {
        const offset = (numeroPagina - 1) * libriPerPagina;
        fetchLibriPerCategoria(categoriaScelta, libriPerPagina, offset).then(books => {
            renderLibriConPaginazione(
                books,
                clickLibro,
                numeroPagina,
            );
        });
    }

    searchBtn.addEventListener('click', () => {
        const searchTerm = categoryInput.value.trim();
        const messaggioErrore = document.getElementById('messaggioErrore');

        if (!searchTerm) {
            messaggioErrore.textContent = 'Ehi! Non hai scritto nulla nel box di ricerca!';
            messaggioErrore.style.display = 'block';

            categoryInput.classList.add('shake');
            setTimeout(() => {
                categoryInput.classList.remove('shake');
            }, 500);
            return;
        }

        messaggioErrore.style.display = 'none';
        categoriaScelta = searchTerm;
        numeroPagina = 1;
        loadBooks();
    });

    categoryInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchBtn.click();
        }
    });


    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('paginazione-btn')) {
            const page = parseInt(e.target.dataset.page, 10);
            if (!isNaN(page)) {
                numeroPagina = page;
                keyLibroSelezionato = null;
                descrizioneLibroSelezionato = '';
                loadBooks();
            }
        }
    });
});

