<script setup lang="ts">
import type { IEvent } from '@/interfaces/IEvent'

const props = defineProps<{ date: Date; events: IEvent[] }>()

const getDayOfWeek = (date: Date) => {
  const options: any = { weekday: 'long' }
  const dayOfWeek = date.toLocaleDateString('es-ES', options)
  return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
}

const formatDate = (date: Date) => {
  const options: any = { day: 'numeric', month: 'long' }
  return date.toLocaleDateString('es-ES', options)
}

const eventsOnDate = props.events.filter((event) => {
  const eventDayOfWeek = event.dayOfWeek // Assuming 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const currentDayOfWeek = props.date.getDay() // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  return eventDayOfWeek === currentDayOfWeek
})
</script>
<template>
  <div class="flex flex-col gap-y-4 h-[80vh] p-4 bg-base-100">
    <div class="flex justify-between">
      <span class="text-xl font-medium">{{ getDayOfWeek(props.date) }}</span>
      <span class="text-xl font-medium">{{ formatDate(props.date) }}</span>
    </div>

    <div
      v-for="event in eventsOnDate"
      :key="event.id"
      class="flex shadow-md px-4 py-2 items-center justify-between bg-[#16A34A] text-white rounded-2xl h-[80px]"
    >
      <div class="flex flex-col items-center">
        <span class="text-sm">{{ event.startTime }}</span>
        <span class="text-sm">{{ event.endTime }}</span>
      </div>
      <div class="flex flex-col">
        <h2 class="text-pretty text-sm font-semibold">{{ event.subject.title }}</h2>
        <p class="text-xs">
          {{ event.building.title }}, {{ event.classroom.title }}, y {{ event.teacher.title }}
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
