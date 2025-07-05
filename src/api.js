import axios from 'axios';

const API_BASE_URL = 'https://openlibrary.org';

export async function fetchLibriPerCategoria(category, limit = 12, offset = 0) {
    const url = `${API_BASE_URL}/subjects/${encodeURIComponent(category)}.json?limit=${limit}&offset=${offset}`;
    const response = await axios.get(url);
    return response.data.works || [];
}

export async function fetchDescrizione(workKey) {
    const url = `${API_BASE_URL}${workKey}.json`;
    const response = await axios.get(url);
    const desc = response.data.description;
    if (!desc) return '';
    return typeof desc === 'string' ? desc : desc.value;
}