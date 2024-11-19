<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { routeNames } from '@/router/routes'
import ApiService from '@/service/api.service'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
const router = useRouter()
const logout = async () => {
  await ApiService.auth
    .logout()
    .then(() => {
      toast.success('Logged out')
      localStorage.removeItem('pokemonId')
      router.push({
        name: routeNames.Auth.Login,
      })
    })
    .catch((err) => {
      console.error(err)
    })
}
</script>

<template>
  <div class="size-full rounded-3xl bg-primary-800">
    <Button
      @click="logout"
      v-motion
      :initial="{ scale: 0.9 }"
      :enter="{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }"
      class="bg-white text-primary font-bold py-2 px-4 rounded hover:bg-gray-200 transition"
    >
      Get Started
    </Button>
  </div>
</template>
