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
        <div class="desc-text">
            <h3>Descrizione</h3>
            <p>${description}</p>
        </div>
        <div class="desc-cover"></div>
    `;
    bookDescription.style.display = 'flex';
    bookDescription.style.flexDirection = 'column';

    // Mobile: sposta la descrizione sotto il libro selezionato
    if (window.innerWidth <= 900) {
        const selected = document.querySelector('.book-item.selected');
        if (selected && selected.parentNode) {
            selected.parentNode.insertBefore(bookDescription, selected.nextSibling);
        }
    } else {
        const container = document.querySelector('.container');
        if (container && !container.contains(bookDescription)) {
            container.appendChild(bookDescription);
        }
    }
}

export function showCover(bookDescription, coverId) {
    const coverDiv = bookDescription.querySelector('.desc-cover');
    if (coverDiv) {
        coverDiv.innerHTML = coverId
            ? `<img src="https://covers.openlibrary.org/b/id/${coverId}-L.jpg" alt="Copertina libro" class="book-cover">`
            : '';
    }
}

