<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" action="#">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white">OTP was sent to <span class="text-green-600 dark:text-green-500">
                lannchanvanny@gmail.com</span></h5>
            <div>
                <label for="comfirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP Code</label>
                <input type="comfirm-password" name="comfirm-password" id="comfirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div class="flex items-start">
                <div>
                    <a href="#" class="ms-auto text-sm text-green-700 hover:underline dark:text-yellow-500">Resend Code</a>
                </div>
            </div>
            <button type="submit" class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Verify</button>
        </form>
    </div>
  </div>
</template>
<script setup>
    import { onMounted } from 'vue';
    definePageMeta({
        layout: 'landing',
    })
    onMounted(() => {
    if (typeof window.initFlowbite === 'function') {
        window.initFlowbite();
    }
});
</script>