<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
import { Info } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center bg-primary/10">
    <div class="border rounded-2xl w-96 h-fit p-8 bg-background">
      <h1 class="text-xl w-full text-center">Sign up</h1>
      <h2 class="w-5/5 leading-tight text-muted-foreground text-center">
        Embark on a journey with us, track your pokemon TCG progress and much more...
      </h2>
      <div class="mt-4 w-full flex flex-col gap-2">
        <div>
          <Label for="email">Email</Label> <Input id="email" type="email" placeholder="E-Mail" />
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
          <Input id="pokemonid" placeholder="Pokemon TCG Identifier" />
        </div>
        <div><Label>Password</Label> <Input type="password" placeholder="Password" /></div>
      </div>
      <div class="mt-4 flex flex-col gap-2">
        <Button class="w-full">Create an account </Button>
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
