const API_BASE = '/api'

async function jsonFetch (url, options = {}) {
  const headers = {}
  if (options.headers) {
    Object.assign(headers, options.headers)
  }

  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token')
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  // eslint-disable-next-line no-undef
  const res = await fetch(url, { ...options, headers })
  if (!res.ok) {
    // Tente d'extraire un message JSON sinon fallback texte
    let message = `HTTP ${res.status}`
    try {
      const data = await res.json()
      message = data?.message ?? JSON.stringify(data)
    } catch {
      try {
        message = await res.text()
      } catch {
        // noop
      }
    }
    throw new Error(message)
  }
  // Si pas de contenu
  if (res.status === 204) {
    return null
  }
  return res.json()
}

export function getRestaurants () {
  return jsonFetch(`${API_BASE}/restaurants`)
}

export function getRestaurantById (id) {
  return jsonFetch(`${API_BASE}/restaurants/${id}`)
}

export function getProductsByRestaurant (restaurantId) {
  return jsonFetch(`${API_BASE}/restaurants/${restaurantId}/products`)
}

export function loginUser (email, password) {
  return jsonFetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

export function registerUser (email, username, password) {
  return jsonFetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  })
}

export function logoutUser (userId) {
  return jsonFetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  })
}
