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
  <swiper
    v-if="loading"
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
      <TimetableItem :date="date" :events="events"></TimetableItem>
    </swiper-slide>
  </swiper>
  <div v-else class="flex flex-col gap-y-4 h-[80vh] p-4 bg-base-100">
    <div class="flex justify-between">
      <span class="skeleton h-7 w-24"></span>
      <span class="skeleton h-7 w-24"></span>
    </div>

    <div class="skeleton px-4 py-2 rounded-2xl h-[80px]"></div>
    <div class="skeleton px-4 py-2 rounded-2xl h-[80px]"></div>
    <div class="skeleton px-4 py-2 rounded-2xl h-[80px]"></div>
  </div>
</template>
<style scoped></style>
