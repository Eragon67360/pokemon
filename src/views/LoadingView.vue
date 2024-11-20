<script setup lang="ts">
import ApiService, { type CardsApiProps, type CardProps } from '@/service/api.service'
import { onMounted, ref } from 'vue'

const isLoadingCards = ref<boolean>(false)
const apiData = ref<CardsApiProps>()
const cards = ref<CardProps[]>([])
const fetchCards = async () => {
  isLoadingCards.value = true

  await ApiService.card
    .getAll()
    .then((serverCards) => {
      apiData.value = serverCards
      cards.value = serverCards.data
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      isLoadingCards.value = false
    })
}
onMounted(() => {
  fetchCards()
})
</script>

<template>
  <template v-if="isLoadingCards">Loading content...</template>
  <template v-else-if="cards.length === 0">We were unable to retrieve content</template>
  <template v-else>
    <main>
      <h1>Amount of cards retrieved: {{ apiData?.totalCount }}</h1>
      <div v-for="(card, index) in cards" :key="card.id">{{ card.name }} {{ index }}</div>
    </main>
  </template>
</template>
