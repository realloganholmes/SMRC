export const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    try {
        const response = await fetch(url, { ...options, headers });

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
    }
};
