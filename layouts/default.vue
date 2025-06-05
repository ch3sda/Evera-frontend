<template>
    <div class="h-screen bg-white dark:bg-gray-900">
        <div class=" bg-white dark:bg-gray-900">
            <slot />
        </div>
        <CommonBottomNavigation />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFlowbite } from '~/composables/useFlowbite';

  // initialize components based on data attribute selectors
  onMounted(() => {
      useFlowbite(() => {
          initFlowbite();
      })
  })
</script>
