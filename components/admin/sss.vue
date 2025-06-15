
<template>
  <div class="h-full p-6">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Crud Event Category</h2>

    <!-- Filters -->

    <div class="sm:flex gap-4 space-y-4 sm:space-y-0 mb-4 w-auto">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative sm:w-1/4">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search by Name " required />
      </div> 
      

<!-- Modal toggle -->
<button data-modal-target="create-crud-modal" data-modal-toggle="create-crud-modal" class="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="button">
  Create
</button>

<!-- Main modal -->
<div id="create-crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Create Event Category
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="create-crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input  v-model="newCategoryName" type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Category Name" required>
                    </div>
                </div>
                <button  @click.prevent="createCategory"  type="submit" class="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Create
                </button>
            </form>
        </div>
    </div>
</div> 
     
    </div>
    <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-700 dark:text-gray-300">
      <thead class="text-xs uppercase bg-gray-100 dark:bg-gray-700">
        <tr >
            <th class="px-4 py-2">Category ID</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Create At</th>
            <th class="px-4 py-2">Total Used</th>
            <th class="px-4 py-2">Currenlt Used</th>
            <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
  <tbody >
    <tr v-for="cat in categories" :key="cat.id" class="bg-white border-b dark:bg-gray-800">
    <td class="px-4 py-2">{{ cat.id }}</td>
    <td class="px-4 py-2">{{ cat.name }}</td>
    <td class="px-4 py-2">{{ cat.created_at }}</td>
    <td class="px-4 py-2">{{ cat.total_used }}</td>
    <td class="px-4 py-2">{{ cat.currently_used }}</td>
      <td class="px-4 py-2 space-x-2">        
        <button  data-modal-target="edit-crud-modal" data-modal-toggle="edit-crud-modal" @click="openEditModal(cat)" class="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Edit</button>
        <button data-modal-target="delete-crud-modal" data-modal-toggle="delete-crud-modal" @click="openDeleteModal(cat.id)"  class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>      
      </td> 
    </tr>
  </tbody>

    </table>
    </div>
    <!-- Edit modal -->
    <div id="edit-crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Edit Event Category
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="edit-crud-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input   v-model="editCategory.name"  type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Category Name" required>
                        </div>
                    </div>
                    <button @click.prevent="updateCategory" type="submit" class="text-white inline-flex items-center bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                        Edit
                    </button>
                </form>
            </div>
        </div>
    </div> 

    <!-- Delete -->
    <div @click.prevent="confirmDelete" id="delete-crud-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="delete-crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this Category?</h3>
                    <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                        Yes, I'm sure
                    </button>
                    <button data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { inject } from 'vue'

const toastRef = inject('toastRef')
const auth = useAuthStore()
import { initModals } from 'flowbite'
const categories = ref([])
const newCategoryName = ref('')
const editCategory = ref({ id: null, name: '' })
const selectedCategoryId = ref(null)

const config = useRuntimeConfig()
const baseUrl = config.public.API_URL

// Fetch categories
const fetchCategories = async () => {
  if (!auth.accessToken) return

  try {
    const { data, error } = await useFetch(`${baseUrl}/api/admin/categories`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
    if (error.value) throw new Error(error.value.message)
    categories.value = data.value
  } catch (err) {
    toastRef?.value?.showToast('error', 'Failed to load categories')
    console.error(err)
  }
}

// Create
const createCategory = async () => {
  if (!auth.accessToken) return

  try {
    const { error } = await useFetch(`${baseUrl}/api/admin/categories`, {
      method: 'POST',
      body: { name: newCategoryName.value },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
    if (error.value) throw new Error(error.value.message)
    toastRef?.value?.showToast('success', 'Category created successfully.')
    newCategoryName.value = ''
    document.getElementById('create-crud-modal').classList.add('hidden')
    fetchCategories()
  } catch (err) {
    toastRef?.value?.showToast('error', 'Category creation failed.')
    console.error(err)
  }
}

// Edit
const openEditModal = (category) => {
  editCategory.value = { ...category }
  document.getElementById('edit-crud-modal').classList.remove('hidden')
}

const updateCategory = async () => {
  if (!auth.accessToken) return

  try {
    const { error } = await useFetch(`${baseUrl}/api/admin/categories/${editCategory.value.id}`, {
      method: 'PUT',
      body: { name: editCategory.value.name },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
    if (error.value) throw new Error(error.value.message)
    toastRef?.value?.showToast('success', 'Category updated successfully.')
    document.getElementById('edit-crud-modal').classList.add('hidden')
    fetchCategories()
  } catch (err) {
    toastRef?.value?.showToast('error', 'Category update failed.')
    console.error(err)
  }
}

// Delete
const openDeleteModal = (id) => {
  selectedCategoryId.value = id
  document.getElementById('delete-crud-modal').classList.remove('hidden')
}

const confirmDelete = async () => {
  if (!auth.accessToken) return

  try {
    const { error } = await useFetch(`${baseUrl}/api/admin/categories/${selectedCategoryId.value}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
    if (error.value) throw new Error(error.value.message)
    toastRef?.value?.showToast('success', 'Category deleted successfully.')
    document.getElementById('delete-crud-modal').classList.add('hidden')
    fetchCategories()
  } catch (err) {
    toastRef?.value?.showToast('error', 'Category deletion failed.')
    console.error(err)
  }
}

// Initial load
onMounted(() => {
  initModals()
  fetchCategories()
})
</script>
