export function resetResults(bookList, bookDescription) {
    bookList.innerHTML = '';
    bookDescription.innerHTML = '';
    bookDescription.style.display = 'none';
}

export function showInfo(bookList, message) {
    bookList.innerHTML = `<div class="info-box">${message}</div>`;
}

export function renderBookList(bookList, books, onBookClick) {
    bookList.innerHTML = '';
    books.forEach(book => {
        const item = document.createElement('div');
        item.className = 'book-item';
        item.innerHTML = `
            <h4>${book.title}</h4>
            <br>
            <h5>Autori: ${book.authors.map(a => a.name).join(', ')}</h5>
        `;
        item.addEventListener('click', () => {
            document.querySelectorAll('.book-item').forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
            onBookClick(book.key);
        });
        bookList.appendChild(item);
    });
}

export function showDescription(bookDescription, description) {
    bookDescription.innerHTML = `
        <div><h3>Descrizione</h3>
        <p>${description}</p></div>
    `;
    bookDescription.style.display = 'flex';
}

export function showCover(bookDescription, coverId) {
    if (coverId) {
        const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
        const imgHtml = `<img src="${coverUrl}" alt="Copertina libro" class="book-cover" style="max-width:50%;display:block;margin:1em 0 1em 1em;">`;
        bookDescription.innerHTML += imgHtml;
    }
}