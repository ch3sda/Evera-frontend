<template>
  <div class="h-full p-6">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Mange Event Category</h1>

      <!-- Filters -->
      <div class="sm:flex gap-4 space-y-4 sm:space-y-0 mb-4 w-auto">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative sm:w-1/4">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input v-model="searchQuery" type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search by Name" @input="filterCategories"/>
        </div>

        <!-- Modal toggle -->
        <button @click="openCreateModal" class="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="button">
          Create
        </button>
      </div>

      <!-- Categories Table -->
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead class="text-xs uppercase bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="px-4 py-2">Category ID</th>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Created At</th>
              <th class="px-4 py-2">Total Used</th>
              <th class="px-4 py-2">Currently Used</th>
              <th class="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cat in filteredCategories" :key="cat.id" class="bg-white border-b dark:bg-gray-800">
              <td class="px-4 py-2">{{ cat.id }}</td>
              <td class="px-4 py-2">{{ cat.name }}</td>
              <td class="px-4 py-2">{{ formatDate(cat.created_at) }}</td>
              <td class="px-4 py-2">{{ cat.total_used }}</td>
              <td class="px-4 py-2">{{ cat.currently_used }}</td>
              <td class="px-4 py-2 space-x-2">
                <button @click="openEditModal(cat)" class="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                  Edit
                </button>
                <button @click="openDeleteModal(cat.id)" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="filteredCategories.length === 0" class="bg-white dark:bg-gray-800">
              <td colspan="6" class="text-center py-4 text-gray-500 dark:text-gray-400">No categories found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Create Modal -->
      <div v-if="showCreateModal" class="fixed inset-0 z-50 flex justify-center items-center overflow-auto" @click.self="closeCreateModal">
        <div class="bg-white rounded-lg shadow p-6 max-w-md w-full dark:bg-gray-700">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Create Event Category</h3>
            <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Close create modal">
              ✕
            </button>
          </div>
          <form @submit.prevent="createCategory">
            <label for="create-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input v-model="newCategoryName" id="create-name" type="text" class="w-full p-2 mb-4 text-gray-900 rounded border border-gray-300 dark:bg-gray-600 dark:text-white dark:border-gray-500" placeholder="Category Name" required/>
            <button type="submit" class="w-full py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg">
              Create
            </button>
          </form>
        </div>
      </div>

      <!-- Edit Modal -->
      <div v-if="showEditModal" class="fixed inset-0 z-50 flex justify-center items-center overflow-auto" @click.self="closeEditModal">
        <div class="bg-white rounded-lg shadow p-6 max-w-md w-full dark:bg-gray-700">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Edit Event Category</h3>
            <button @click="closeEditModal" class="text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Close edit modal">
              ✕
            </button>
          </div>
          <form @submit.prevent="updateCategory">
            <label for="edit-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input v-model="editCategory.name" id="edit-name" type="text" class="w-full p-2 mb-4 text-gray-900 rounded border border-gray-300 dark:bg-gray-600 dark:text-white dark:border-gray-500" placeholder="Category Name" required/>
            <button type="submit"class="w-full py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-lg" >
              Update
            </button>
          </form>
        </div>
      </div>

      <!-- Delete Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex justify-center items-center overflow-auto" @click.self="closeDeleteModal" >
        <div class="bg-white rounded-lg shadow p-6 max-w-md w-full dark:bg-gray-700 text-center">
          <button @click="closeDeleteModal" class="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Close delete modal">
            ✕
          </button>
          <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor" stroke-width="2" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 11V6m0 8h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this Category?
          </h3>
          <button @click="confirmDelete" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
            Yes, I'm sure
          </button>
          <button @click="closeDeleteModal" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            No, cancel
          </button>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useAuthStore } from '@/stores/auth'

const toastRef = inject('toastRef')
const auth = useAuthStore()
const config = useRuntimeConfig()
const baseUrl = config.public.API_URL

// Reactive state
const categories = ref([])
const filteredCategories = ref([])
const searchQuery = ref('')

const newCategoryName = ref('')
const editCategory = ref({ id: null, name: '' })
const selectedCategoryId = ref(null)


const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

// Format date nicely
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString()
}

// Fetch categories from API
const fetchCategories = async () => {
  if (!auth.accessToken) return

  try {
    const { data, error } = await useFetch(`${baseUrl}/api/admin/categories`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
    if (error.value) throw new Error(error.value.message)
    categories.value = data.value || []
    filterCategories()
  } catch (err) {
    toastRef?.value?.showToast('error', 'Failed to load categories')
    console.error(err)
  }
}

// Filter categories based on search query
const filterCategories = () => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) {
    filteredCategories.value = [...categories.value]
  } else {
    filteredCategories.value = categories.value.filter((cat) =>
      cat.name.toLowerCase().includes(q)
    )
  }
}

// Create category
const createCategory = async () => {
  if (!auth.accessToken || !newCategoryName.value.trim()) return

  try {
    const { error } = await useFetch(`${baseUrl}/api/admin/categories`, {
      method: 'POST',
      body: { name: newCategoryName.value.trim() },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
    if (error.value) throw new Error(error.value.message)
    toastRef?.value?.showToast('success', 'Category created successfully.')
    newCategoryName.value = ''
    closeCreateModal()
    await fetchCategories()
  } catch (err) {
    toastRef?.value?.showToast('error', 'Category creation failed.')
    console.error(err)
  }
}

// Open and close modals
const openCreateModal = () => {
  newCategoryName.value = ''
  showCreateModal.value = true
}
const closeCreateModal = () => {
  showCreateModal.value = false
}

const openEditModal = (category) => {
  editCategory.value = { ...category }
  showEditModal.value = true
}
const closeEditModal = () => {
  showEditModal.value = false
}

const openDeleteModal = (id) => {
  selectedCategoryId.value = id
  showDeleteModal.value = true
}
const closeDeleteModal = () => {
  showDeleteModal.value = false
}

// Update category
const updateCategory = async () => {
  if (!auth.accessToken || !editCategory.value.name.trim()) return

  try {
    const { error } = await useFetch(`${baseUrl}/api/admin/categories/${editCategory.value.id}`, {
      method: 'PUT',
      body: { name: editCategory.value.name.trim() },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
    if (error.value) throw new Error(error.value.message)
    toastRef?.value?.showToast('success', 'Category updated successfully.')
    closeEditModal()
    await fetchCategories()
  } catch (err) {
    toastRef?.value?.showToast('error', 'Category update failed.')
    console.error(err)
  }
}

// Delete category
const confirmDelete = async () => {
  if (!auth.accessToken || !selectedCategoryId.value) return

  try {
    const { error } = await useFetch(`${baseUrl}/api/admin/categories/${selectedCategoryId.value}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
    if (error.value) throw new Error(error.value.message)
    toastRef?.value?.showToast('success', 'Category deleted successfully.')
    closeDeleteModal()
    await fetchCategories()
  } catch (err) {
    toastRef?.value?.showToast('error', 'Category deletion failed.')
    console.error(err)
  }
}

// Initial fetch
onMounted(() => {
  fetchCategories()
})
</script>
