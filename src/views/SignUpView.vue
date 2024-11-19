<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import ApiService from '@/service/api.service'
import { Info } from 'lucide-vue-next'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { toast } from 'vue-sonner'

const email = ref<string>('')
const password = ref<string>('')
const pseudo = ref<string>('')
const pokemonId = ref<string>('')
const error = ref<string | null>(null)
// const router = useRouter()
const signUp = async () => {
  await ApiService.auth
    .signUp(email.value, password.value, pseudo.value)
    .then(async (serverUser) => {
      if (serverUser) {
        await ApiService.auth
          .addUserToDB(serverUser?.id, pseudo.value, pokemonId.value)
          .then(() => {
            toast.success('Account successfully created')
            error.value = null
            // await ApiService.auth.login(email.value, password.v)
          })
      }
    })
}
</script>

<template>
  <div class="size-full flex items-center justify-center">
    <div class="rounded-2xl w-96 h-fit p-8 bg-primary-800">
      <h1 class="text-xl w-full text-center">Sign up</h1>
      <h2 class="w-5/5 leading-tight text-muted-foreground text-center">
        Embark on a journey with us, track your pokemon TCG progress and much more...
      </h2>
      <div class="mt-4 w-full flex flex-col gap-2">
        <div>
          <Label for="pseudo">Pseudo</Label>
          <Input v-model="pseudo" id="pseudo" type="text" placeholder="Your pseudo" />
        </div>
        <div>
          <Label for="email">Email</Label>
          <Input v-model="email" id="email" type="email" placeholder="E-Mail" />
        </div>
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <Label for="pokemonid">Pokemon TCG ID</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger><Info class="size-4" /></TooltipTrigger>
                <TooltipContent>If you make a mistake, you may change it later</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input v-model="pokemonId" id="pokemonid" placeholder="Pokemon TCG Identifier" />
        </div>
        <div>
          <Label>Password</Label>
          <Input v-model="password" type="password" placeholder="Password" />
        </div>
      </div>
      <div class="mt-4 flex flex-col gap-2">
        <Button
          @click="signUp"
          :disabled="!(!!email && !!password && !!pokemonId)"
          class="w-full bg-primary-700 hover:bg-primary-600"
          >Create an account
        </Button>
        <span
          >Already have an account ?
          <RouterLink
            :to="{
              name: 'login',
            }"
            class="text-primary"
            >Log in</RouterLink
          >
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
