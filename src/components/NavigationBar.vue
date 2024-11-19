<script setup lang="ts">
import { routeNames } from '@/router/routes'
import { Blocks } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { BellDot, MessagesSquare } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="w-full rounded-2xl bg-primary-800 px-8 py-6 flex justify-between">
    <div class="flex items-center gap-8">
      <div class="flex gap-2"><Blocks class="size-5" />PKTCG Tracker</div>
      <nav class="flex items-center gap-4">
        <RouterLink
          :to="{
            name: routeNames.Home,
          }"
          >Home</RouterLink
        >
        <RouterLink
          :to="{
            name: routeNames.Home,
          }"
          >Something</RouterLink
        >
        <RouterLink
          :to="{
            name: routeNames.Home,
          }"
          >Else</RouterLink
        >
      </nav>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex gap-2">
        <Button variant="ghost" class="size-10 p-0"><BellDot class="size-7" /></Button>
        <Button variant="ghost" class="size-10 px-0 py-0"><MessagesSquare class="size-7" /></Button>
      </div>
      <div class="flex items-center gap-1">
        <Avatar class="bg-primary-600">
          <!-- <AvatarImage></AvatarImage> -->
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <div>{{ userStore.user?.pseudo }}</div>
      </div>
    </div>
  </div>
</template>
