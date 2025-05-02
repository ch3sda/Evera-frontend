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

  return await $fetch(`${config.public.apiBase}/login`, {
    method: 'POST',
    body: { email, password },
    credentials: 'include',
  })
}

export async function registerUser(name, email, password) {
  await getCsrfToken()
  const config = useRuntimeConfig()

  return await $fetch(`${config.public.apiBase}/register`, {
    method: 'POST',
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
  await $fetch(`${config.public.apiBase}/logout`, {
    method: 'POST',
    credentials: 'include',
  })

  const userStore = useUserStore()
  userStore.logout()
}
