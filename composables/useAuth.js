import { useUserStore } from '@/stores/user'

export async function getCsrfToken() {
  const config = useRuntimeConfig()
  await $fetch(`${config.public.apiBase}/sanctum/csrf-cookie`, {
    credentials: 'include',
  })
}

export async function loginUser(email, password) {
  await getCsrfToken()
  const config = useRuntimeConfig()

  return await $fetch(`${config.public.apiBase}/api/login`, {
    method: 'POST',
    body: { email, password },
    credentials: 'include',
  })
}

export async function registerUser(name, email, password) {
  await getCsrfToken()
  const config = useRuntimeConfig()

  return await $fetch(`${config.public.apiBase}/api/register`, {
    method: 'POST',
    credentials: 'include', // needed for cookies
    body: { name, email, password, password_confirmation: password },
    credentials: 'include',
  })
}

export async function fetchUser() {
  const config = useRuntimeConfig()
  const userStore = useUserStore()

  const { data, error } = await useFetch(`${config.public.apiBase}/api/user`, {
    credentials: 'include',
  })

  if (data.value) {
    userStore.setUser(data.value)
  } else {
    userStore.logout()
  }
}

export async function logoutUser() {
  const config = useRuntimeConfig()
  const token = localStorage.setItem('token', response.data.token)

  await $fetch(`${config.public.apiBase}/api/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const userStore = useUserStore()
  userStore.logout()
}

