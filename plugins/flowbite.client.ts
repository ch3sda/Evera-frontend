import 'flowbite/dist/flowbite.min.js';

export default defineNuxtPlugin(() => {
  if (process.client) {

    console.log('Flowbite is loaded');
  }
});