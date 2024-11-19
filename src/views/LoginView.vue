<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RouterLink, useRouter } from 'vue-router'
import ApiService from '@/service/api.service'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const email = ref<string>('')
const password = ref<string>('')
// const pseudo = ref<string>('')
// const pokemonId = ref<string>('')
const error = ref<string | null>(null)
const router = useRouter()
const logIn = async () => {
  await ApiService.auth.login(email.value, password.value).then((serverUser) => {
    toast.success('Welcome ' + serverUser.user_metadata.display_name)
    error.value = null
    router.push({
      name: 'home',
    })
  })
}
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center bg-primary/10">
    <div class="border rounded-2xl w-96 h-fit p-8 bg-background">
      <h1 class="text-xl w-full text-center">Login</h1>
      <h2 class="w-5/5 leading-tight text-muted-foreground text-center">
        Embark on a journey with us, track your pokemon TCG progress and much more...
      </h2>
      <div class="mt-4 w-full flex flex-col gap-2">
        <div>
          <Label for="email">Email</Label>
          <Input v-model="email" id="email" type="email" placeholder="E-Mail" />
        </div>
        <div>
          <Label for="password">Password</Label>
          <Input v-model="password" form="password" type="password" placeholder="Password" />
        </div>
        <div class="w-fit ml-auto">
          <Button variant="link" class="p-0 ml-auto w-fit h-fit">Forgot password</Button>
        </div>
      </div>
      <div class="mt-4 flex flex-col gap-2">
        <Button @click="logIn" :disabled="!(email && password)" class="w-full">Log in </Button>
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
