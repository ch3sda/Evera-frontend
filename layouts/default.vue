<template>
    <div class="h-screen bg-white dark:bg-gray-900">
        <CommonNavbar />
        <div class="p-4">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <slot />
            </div>
        </div>

        <CommonBottomNavigation class="sm:hidden"/>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { fetchUser } from '@/composables/useAuth'
    await fetchUser()

    onMounted(() => {
    if (typeof window.initFlowbite === 'function') {
        window.initFlowbite();
    }
    });
</script>

