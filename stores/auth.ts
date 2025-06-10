interface AuthForm {
  email: string
  password: string
  phone?: string // ⬅ Add this
  first_name?: string
  last_name?: string
  password_confirmation?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref<string | null>(null)

  const config = useRuntimeConfig()

  const api = {
    post: (url: string, data?: any) =>
      $fetch(config.public.API_URL + url, {
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    get: (url: string) =>
      $fetch(config.public.API_URL + url, {
        method: 'GET',
        credentials: 'include',
      }),
  }

  async function register(data: AuthForm) {
    await api.get('/sanctum/csrf-cookie') // ⬅ CSRF first
    await api.post('/api/register', data)
  }

  async function login(data: AuthForm) {
    await api.get('/sanctum/csrf-cookie') // ⬅ CSRF first
    const response = await api.post('/api/login', data) as { data?: { access_token?: string, user?: any } }
    accessToken.value = response.data?.access_token ?? null
    user.value = response.data?.user ?? null
  }

  async function logout() {
    await api.post('/api/logout')
    user.value = null
    accessToken.value = null
  }

  async function fetchUser() {
    try {
      const response = await api.get('/api/user') as { data: any }
      user.value = response.data
    } catch {
      user.value = null
    }
  }

  return { user, accessToken, register, login, logout, fetchUser }
})
