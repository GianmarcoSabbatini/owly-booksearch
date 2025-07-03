import axios from 'axios';
import get from 'lodash/get';

// Fetch libri per categoria
export async function fetchBooksByCategory(category) {
    const url = `https://openlibrary.org/subjects/${category}.json`;
    const response = await axios.get(url);
    return get(response, 'data.works', []);
}

// Fetch libri per titolo
export async function fetchBooksByTitle(title) {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;
    const response = await axios.get(url);
    return get(response, 'data.docs', []).map(doc => ({
        title: doc.title,
        authors: (doc.author_name || []).map(name => ({ name })),
        key: doc.key
    }));
}

// Fetch descrizione libro
export async function fetchDescription(workKey) {
    const url = `https://openlibrary.org${workKey}.json`;
    const response = await axios.get(url);
    const desc = get(response.data, 'description', 'Nessuna descrizione disponibile');
    return typeof desc === 'string' ? desc : desc.value;
}

// Fetch copertina libro
export async function fetchCoverId(workKey) {
    const url = `https://openlibrary.org${workKey}.json`;
    const response = await axios.get(url);
    return get(response.data, 'covers[0]', null);
}