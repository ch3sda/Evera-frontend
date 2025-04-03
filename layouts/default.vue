<template>
    <div class="h-screen bg-white dark:bg-gray-900">
        <div class=" bg-white dark:bg-gray-900">
            <slot />
        </div>
        <CommonBottomNavigation />
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';

    // Initialize Flowbite components when the page is mounted
    onMounted(() => {
    if (typeof window.initFlowbite === 'function') {
        window.initFlowbite();
    }
    });
</script>

