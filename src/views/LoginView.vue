<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { routeNames } from '@/router/routes'
import ApiService from '@/service/api.service'
import { useUserStore } from '@/stores/user'
import { LoaderCircle } from 'lucide-vue-next'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const email = ref<string>('')
const password = ref<string>('')
// const pseudo = ref<string>('')
// const pokemonId = ref<string>('')
const error = ref<string | null>(null)
const isLoading = ref<boolean>(false)
const router = useRouter()
const userStore = useUserStore()
const logIn = async () => {
  if (!(email.value && password.value)) return
  isLoading.value = true
  await ApiService.auth.login(email.value, password.value).then(async (serverUser) => {
    toast.success('Welcome ' + serverUser.user_metadata.display_name)
    error.value = null
    await ApiService.user.getUserById(serverUser.id).then((serverUser) => {
      if (serverUser) {
        localStorage.setItem('pokemonId', serverUser?.pokemon_id)
        userStore.setUser(serverUser)
      }
      isLoading.value = false
      router.push({
        name: routeNames.Home,
      })
    })
  })
}
</script>

<template>
  <div class="size-full flex items-center justify-center">
    <div class="rounded-2xl w-96 h-fit p-8 bg-primary-800">
      <h1 class="text-xl w-full text-center">Login</h1>
      <h2 class="w-5/5 leading-tight text-muted-foreground text-center">
        Embark on a journey with us, track your pokemon TCG progress and much more...
      </h2>
      <div class="mt-4 w-full flex flex-col gap-2">
        <div>
          <Label for="email">Email</Label>
          <Input
            v-on:keyup.enter="logIn"
            v-model="email"
            id="email"
            type="email"
            placeholder="E-Mail"
          />
        </div>
        <div>
          <Label for="password">Password</Label>
          <Input
            v-on:keyup.enter="logIn"
            v-model="password"
            form="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div class="w-fit ml-auto">
          <Button variant="link" class="p-0 ml-auto w-fit h-fit">Forgot password</Button>
        </div>
      </div>
      <div class="mt-4 flex flex-col gap-2">
        <Button
          @click="logIn"
          :disabled="!(email && password) || isLoading"
          class="w-full flex items-center gap-2 bg-primary-700 hover:bg-primary-600"
          ><LoaderCircle v-if="isLoading" class="size-4 animate-spin" />Log in
        </Button>
        <span
          >Don't have an account ?
          <RouterLink
            :to="{
              name: 'signup',
            }"
            class="text-primary"
            >Create one</RouterLink
          >
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
