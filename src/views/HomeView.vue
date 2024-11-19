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
  <div class="min-h-screen bg-primary text-white flex flex-col items-center justify-center">
    <header class="w-full p-4 bg-primary-dark shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-3xl font-bold">Pokemon TCG Pocket Tracker</h1>
        <nav>
          <ul class="flex space-x-4">
            <li><a href="#" class="hover:underline">Home</a></li>
            <li><a href="#" class="hover:underline">Login</a></li>
            <li><a href="#" class="hover:underline">Register</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto p-4">
      <section class="text-center">
        <h2 class="text-2xl font-semibold mb-4">Welcome to your Pokemon TCG Tracker!</h2>
        <p class="mb-8">Track your collection, manage your decks, and explore new strategies.</p>
        <div class="min-h-screen bg-primary text-white flex flex-col items-center justify-center">
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
      </section>
    </main>

    <footer class="w-full p-4 bg-primary-dark text-center">
      <p>&copy; 2023 Pokemon TCG Pocket Tracker</p>
    </footer>
  </div>
</template>
