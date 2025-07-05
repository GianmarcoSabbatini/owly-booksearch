export function resetResults(bookList, descLibro) {
    bookList.innerHTML = '';
    descLibro.innerHTML = '';
    descLibro.style.display = 'none';
}

export function showInfo(bookList, message) {
    bookList.innerHTML = `<div class="info-box">${message}</div>`;
}

export function mostraDescrizione(descLibro, htmlDescrizione) {
    descLibro.innerHTML = htmlDescrizione;
    descLibro.style.display = 'flex';
}

export function renderLibriConPaginazione(
    books,
    clickLibro,
    numeroPagina,
    paginaSeguente,
    selectedKey = null,
    htmlDescrizione = ''
) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    const list = document.createElement('div');
    list.className = 'book-list';

    books.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book-item';
        if (book.key === selectedKey) div.classList.add('selected');
        div.setAttribute('tabindex', '0');
        div.setAttribute('role', 'button');
        div.setAttribute('aria-pressed', book.key === selectedKey ? 'true' : 'false');
        div.setAttribute('aria-label', `Apri dettagli di ${book.title}`);
        div.innerHTML = `
            <strong>${book.title}</strong>
            <div class="book-authors">
                ${book.authors && book.authors.length === 1 ? 'Autore: ' : 'Autori: '}
                ${(book.authors || []).map(a => a.name).join(', ')}
            </div>
        `;
        div.addEventListener('click', () => clickLibro(book, books));
        div.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') clickLibro(book, books);
        });
        list.appendChild(div);

        // in mobile descrizione appena sotto il libro
        if (book.key === selectedKey) {
            const descDiv = document.createElement('div');
            descDiv.className = 'mobile-description';
            descDiv.innerHTML = htmlDescrizione;
            list.appendChild(descDiv);
        }
    });
    bookList.appendChild(list);

    // pagoinazione
    const paginazione = document.createElement('nav');
    paginazione.className = 'paginazione';
    paginazione.setAttribute('aria-label', 'Navigazione pagine');
    if (numeroPagina > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'paginazione-btn';
        prevBtn.dataset.page = numeroPagina - 1;
        prevBtn.textContent = 'Precedente';
        prevBtn.setAttribute('aria-label', 'Pagina precedente');
        paginazione.appendChild(prevBtn);
    }
    const pageSpan = document.createElement('span');
    pageSpan.textContent = ` Pagina ${numeroPagina} `;
    paginazione.appendChild(pageSpan);
    if (paginaSeguente) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'paginazione-btn';
        nextBtn.dataset.page = numeroPagina + 1;
        nextBtn.textContent = 'Successiva';
        nextBtn.setAttribute('aria-label', 'Pagina successiva');
        paginazione.appendChild(nextBtn);
    }
    bookList.appendChild(paginazione);
}

