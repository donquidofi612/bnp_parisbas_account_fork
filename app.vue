<template>
  <NuxtLayout :style="{ '--primary-rgb': bankData.primaryColor }">
    <NuxtLoadingIndicator />
    <!-- here -->
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import * as bankData from '@/data/financialData.js';
import Swal from 'sweetalert2';
const getImagePath = (imageName: any) => {
  const publicPath = import.meta.env.BASE_URL || '/nuxt/';
  return `${publicPath}${imageName}`;
}

onMounted(async () => {



});

useHead({
  title: 'BNP',
  // link: [{ rel: 'icon', type: 'image/png', href: getImagePath('images/brand-logos/favicon.ico') }]
})
</script>
<style>
.me-5 {
  margin-inline-end: 3rem !important;
}

:root {
  --primary-rgb: 255, 102, 0; /* Définit la couleur primaire en rouge */
}
</style>


<script lang="ts">
export default {
};
</script>