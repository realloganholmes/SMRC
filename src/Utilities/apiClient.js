import { setLoading } from './loading';

export const apiFetch = async (url, options = {}, formData = false, load=true) => {
    const token = localStorage.getItem('token');

    const headers = formData ? {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    }
    :
    {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    try {
        setLoading(load ? true : false);

        const response = await fetch('https://smrc-be-fec2hkfsghffe6e6.eastus2-01.azurewebsites.net' + url, { ...options, headers });

        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/';
            return Promise.reject(new Error('Unauthorized - Redirecting to homepage'));
        }

        const data = await response.json();
        return response.ok ? data : Promise.reject(data);
    } catch (error) {
        console.error('API Fetch Error:', error);
        return Promise.reject(error);
    } finally {
        setLoading(false);
    }
};
