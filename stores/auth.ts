interface AuthForm {
  email: string
  password: string
  phone?: string
  remember?: boolean 
  first_name?: string
  last_name?: string
  password_confirmation?: string
}

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
  phonenumber?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)

  const config = useRuntimeConfig()

  const api = {
    post: (url: string, data?: any) =>
      $fetch(config.public.API_URL + url, {
        method: 'POST',
        body: data,
        credentials: 'include',
        headers: accessToken.value ? {
          Authorization: `Bearer ${accessToken.value}`,
        } : {},
      }),

    get: (url: string) =>
      $fetch(config.public.API_URL + url, {
        method: 'GET',
        credentials: 'include',
        headers: accessToken.value ? {
          Authorization: `Bearer ${accessToken.value}`,
        } : {},
      })
  }

  async function register(data: AuthForm) {
    await api.get('/sanctum/csrf-cookie')
    await api.post('/api/register', data)
  }

  async function login(data: AuthForm) {
    await api.get('/sanctum/csrf-cookie')
    const response = await api.post('/api/login', data) as {
      token?: string,
      user?: User
    }

    accessToken.value = response.token ?? null
    user.value = response.user ?? null

    if (data.remember && response.token) {
      localStorage.setItem('accessToken', response.token)
    }
  }

  async function logout() {
    await api.post('/api/logout')
    user.value = null
    accessToken.value = null
    localStorage.removeItem('accessToken')
  }

  async function fetchUser() {
    try {
      const response = await api.get('/api/user') as User
      user.value = response
    } catch (e) {
      console.error('fetchUser failed', e)
      user.value = null
      accessToken.value = null
      localStorage.removeItem('accessToken')
    }
  }

  function restoreAccessToken() {
    const token = localStorage.getItem('accessToken')
    if (token) {
      accessToken.value = token
    }
  }

  return {
    user,
    accessToken,
    register,
    login,
    logout,
    fetchUser,
    restoreAccessToken,
  }
})

