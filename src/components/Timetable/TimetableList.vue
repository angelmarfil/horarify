<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCreative, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'

import { onMounted, ref } from 'vue'

import TimetableItem from '@/components/Timetable/TimetableItem.vue'
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const store = useEventStore()

onMounted(async () => {
  await store.getEvents()
})

const { events, loading } = storeToRefs(store)

const currentDate = new Date()
const startDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() - 6
)
const endDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() + 7
)

const dates = ref<Date[]>([])

for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
  dates.value.push(new Date(d))
}
</script>
<template>
  <div v-if="loading" class="flex flex-col gap-y-4 h-[80vh] p-4 bg-base-100">
    <div class="flex justify-between">
      <span class="skeleton h-7 w-24"></span>
      <span class="skeleton h-7 w-24"></span>
    </div>

    <div class="skeleton px-4 py-2 rounded-2xl h-[80px]"></div>
    <div class="skeleton px-4 py-2 rounded-2xl h-[80px]"></div>
    <div class="skeleton px-4 py-2 rounded-2xl h-[80px]"></div>
  </div>

  <div v-else-if="events && events.length === 0" role="alert" class="alert my-[20vh]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="stroke-current shrink-0 w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <span>No hay eventos registrados</span>
  </div>

  <swiper
    v-else
    class="w-full h-full"
    :slides-per-view="1"
    :space-between="50"
    :grabCursor="true"
    :effect="'creative'"
    :pagination="{
      dynamicBullets: true
    }"
    :creativeEffect="{
      prev: {
        shadow: true,
        translate: ['-20%', 0, -1]
      },
      next: {
        translate: ['100%', 0, 0]
      }
    }"
    :modules="[EffectCreative, Pagination]"
  >
    <swiper-slide v-for="date in dates" :key="date.toString()">
      <TimetableItem :date="date"></TimetableItem>
    </swiper-slide>
  </swiper>
</template>
<style scoped></style>
