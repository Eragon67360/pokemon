<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import NavigationBar from './components/NavigationBar.vue'
import { computed } from 'vue'
import { routeNames } from './router/routes'
const route = useRoute()

const isNavbarVisible = computed(() => {
  if (route.name === routeNames.Auth.Login || route.name === routeNames.Auth.SignUp) {
    return false
  }
  return true
})
</script>

<template>
  <div class="h-screen w-screen bg-primary-900 flex flex-col items-center justify-center p-12">
    <Toaster position="bottom-center" />
    <NavigationBar v-if="isNavbarVisible" />
    <div class="mt-8 size-full">
      <RouterView />
    </div>
  </div>
</template>
