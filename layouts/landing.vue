
<template>
  <div class=" dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
    <CommonGuestNavbar />
    <div class="h-full lg:py-8 py-14">
     <slot />
    </div>
    <CommonFooterSection />
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