<script setup>
    import { onMounted } from 'vue';
    definePageMeta({
        layout: 'landing',
        head: {
            title: 'Welcome - Evera',
            meta: [
                { name: 'description', content: 'Home page description' },
                { name: 'keywords', content: 'home, vue, nuxt' },
            ],
        },
    })
    onMounted(() => {
    if (typeof window.initFlowbite === 'function') {
        window.initFlowbite();
    }
});
</script>

<template>
    <div>
        <CommonHeroSection />
    </div>
</template> 