type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const BASE_URL = 'https://api.dominionwellness.com'; // TODO: update to real URL

async function request<T>(
  method: HttpMethod,
  endpoint: string,
  body?: unknown,
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as { message?: string };
    throw new Error(err.message ?? `HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  get:    <T>(endpoint: string, token?: string) =>
    request<T>('GET', endpoint, undefined, token),
  post:   <T>(endpoint: string, body: unknown, token?: string) =>
    request<T>('POST', endpoint, body, token),
  put:    <T>(endpoint: string, body: unknown, token?: string) =>
    request<T>('PUT', endpoint, body, token),
  patch:  <T>(endpoint: string, body: unknown, token?: string) =>
    request<T>('PATCH', endpoint, body, token),
  delete: <T>(endpoint: string, token?: string) =>
    request<T>('DELETE', endpoint, undefined, token),
};

export default api;
