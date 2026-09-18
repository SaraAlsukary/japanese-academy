
import axios from 'axios';

export const APIURL = axios.create({
    // baseURL: 'http://127.0.0.1:8000/api',
    baseURL: 'https://api.japaneseacademy.jp/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// إرفاق التوكن مع كل طلب تلقائياً
APIURL.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default APIURL;