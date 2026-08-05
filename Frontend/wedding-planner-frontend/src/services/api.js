const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('authToken');
  const isFormData = options.body instanceof FormData;
  const headers = {
    // FormData sets its own multipart boundary; forcing JSON here would break uploads.
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {}),
  };

  if (token) {
    const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    headers['Authorization'] = authHeader;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('Unauthorized access');
      }
      throw data || { message: `Request failed with status ${response.status}` };
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

const api = {
  get: (endpoint, headers) => request(endpoint, { method: 'GET', headers }),
  post: (endpoint, body, headers) => request(endpoint, { method: 'POST', body: JSON.stringify(body), headers }),
  // For multipart/form-data uploads (e.g. image uploads) — body must be a FormData instance.
  postForm: (endpoint, formData, headers) => request(endpoint, { method: 'POST', body: formData, headers }),
  put: (endpoint, body, headers) => request(endpoint, { method: 'PUT', body: body ? JSON.stringify(body) : undefined, headers }),
  patch: (endpoint, body, headers) => request(endpoint, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined, headers }),
  delete: (endpoint, headers) => request(endpoint, { method: 'DELETE', headers }),
};

export default api;
