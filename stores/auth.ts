import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
  phonenumber?: string
}

type RegisterForm = {
  first_name: string
  last_name: string
  email: string
  phone: string
  password: string
  password_confirmation: string
}

type LoginForm = {
  email: string
  password: string
  remember: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const expiresAt = ref<string | null>(null)
  const config = useRuntimeConfig()
  const baseUrl = config.public.API_URL

  async function register(form: RegisterForm) {
    const res = await fetch(`${baseUrl}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) throw new Error('Register failed')
  }

  async function login(form: LoginForm) {
    const res = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) throw new Error('Login failed')

    const data = await res.json()
    accessToken.value = data.access_token
    expiresAt.value = data.expires_at

    if (form.remember) {
      localStorage.setItem('accessToken', data.access_token)
      localStorage.setItem('expiresAt', data.expires_at)
    } else {
      sessionStorage.setItem('accessToken', data.access_token)
      sessionStorage.setItem('expiresAt', data.expires_at)
    }
  }

  async function fetchUser() {
    if (!accessToken.value) return

    try {
      const res = await fetch(`${baseUrl}/api/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.value}`,
        },
      })

      if (!res.ok) {
        logout()
        throw new Error('Failed to fetch user')
      }

      const data = await res.json()
      user.value = data
    } catch (error) {
      console.error('fetchUser error:', error)
    }
  }

  function logout() {
    user.value = null
    accessToken.value = null
    expiresAt.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('expiresAt')
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('expiresAt')
  }

  function loadFromStorage() {
    const storedToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken')
    const storedExpiry = sessionStorage.getItem('expiresAt') || localStorage.getItem('expiresAt')

    if (storedToken && storedExpiry && new Date(storedExpiry).getTime() > Date.now()) {
      accessToken.value = storedToken
      expiresAt.value = storedExpiry
      fetchUser()
    } else {
      logout()
    }
  }

  return {
    user,
    accessToken,
    expiresAt,
    register,
    login,
    fetchUser,
    logout,
    loadFromStorage,
  }
})
