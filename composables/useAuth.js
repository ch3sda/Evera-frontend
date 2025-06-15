import { useUserStore } from '@/stores/user'

export async function getCsrfToken() {
  const config = useRuntimeConfig()
  await $fetch(`${config.public.API_URL}/sanctum/csrf-cookie`, {
    credentials: 'include',
  })
}

export async function loginUser(email, password) {
  await getCsrfToken()
  const config = useRuntimeConfig()

  const response = await $fetch(`${config.public.API_URL}/api/login`, {
    method: 'POST',
    body: { email, password },
    credentials: 'include',
  })

  if (process.client && response.token) {
    localStorage.setItem('token', response.token)
  }

  return response
}


export async function registerUser(name, email, password) {
  await getCsrfToken()
  const config = useRuntimeConfig()

  const response = await $fetch(`${config.public.API_URL}/api/register`, {
    method: 'POST',
    credentials: 'include',
    body: {
      name,
      email,
      password,
      password_confirmation: password,
    },
  })

  if (process.client && response.token) {
    localStorage.setItem('token', response.token)
  }

  return response
}

export async function fetchUser() {
  const config = useRuntimeConfig()
  const userStore = useUserStore()

  if (process.client) {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        const user = await $fetch(`${config.public.API_URL}/api/user`, {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        userStore.setUser(user)
      } catch (error) {
        userStore.logout()
      }
    } else {
      userStore.logout()
    }
  }
}

export async function logoutUser() {
  const config = useRuntimeConfig()
  const token = localStorage.getItem('token')

  if (!token) {
    console.warn('No token found, skipping logout.')
    return
  }

  try {
    await $fetch(`${config.public.API_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error('Logout error:', error)
  }

  localStorage.removeItem('token')

  const userStore = useUserStore()
  userStore.logout()
}
