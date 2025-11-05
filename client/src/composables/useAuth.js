import { computed, ref } from 'vue'
import { loginUser, logoutUser, registerUser } from '@/services/api'

const tokenRef = ref(localStorage.getItem('token') || '')
const userRef = ref(safeParse(localStorage.getItem('user')))
const loadingRef = ref(false)
const errorRef = ref(null)

function safeParse (str) {
  try {
    return str ? JSON.parse(str) : null
  } catch {
    return null
  }
}

function setAuth ({ token, user }) {
  tokenRef.value = token || ''
  userRef.value = user || null
  if (token) {
    localStorage.setItem('token', token)
  } else {
    localStorage.removeItem('token')
  }
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    localStorage.removeItem('user')
  }
}

function clearAuth () {
  setAuth({ token: '', user: null })
}

export function useAuth () {
  const isAuthenticated = computed(() => !!tokenRef.value)

  async function login (email, password) {
    errorRef.value = null
    loadingRef.value = true
    try {
      const res = await loginUser(email, password)
      setAuth({ token: res.token, user: res.user })
      return res
    } catch (error) {
      errorRef.value = error?.message || 'Erreur de connexion'
      throw error
    } finally {
      loadingRef.value = false
    }
  }

  async function register (username, email, password) {
    errorRef.value = null
    loadingRef.value = true
    try {
      const res = await registerUser(email, username, password)
      setAuth({ token: res.token, user: res.user })
      return res
    } catch (error) {
      errorRef.value = error?.message || 'Erreur d\'inscription'
      throw error
    } finally {
      loadingRef.value = false
    }
  }

  async function logout () {
    errorRef.value = null
    loadingRef.value = true
    try {
      const id = userRef.value?.id
      if (id) {
        try {
          await logoutUser(id)
        } catch {
          // non bloquant
        }
      }
    } finally {
      clearAuth()
      loadingRef.value = false
    }
  }

  return {
    // state
    token: tokenRef,
    user: userRef,
    isAuthenticated,
    loading: loadingRef,
    error: errorRef,
    // actions
    login,
    register,
    logout,
  }
}
