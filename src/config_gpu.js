export const API_BASE_URL = 
    process.env.NODE_ENV === 'production'
    ? 'http://35.185.133.19:8000'
    : 'http://127.0.0.1:8000';