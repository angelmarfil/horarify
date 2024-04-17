<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/stores/task'
import { storeToRefs } from 'pinia'

const props = defineProps<{ date: Date }>()

const store = useTaskStore()
const { tasks } = storeToRefs(store)

const getDayOfWeek = (date: Date) => {
  const options: any = { weekday: 'long' }
  const dayOfWeek = date.toLocaleDateString('es-ES', options)
  return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
}

const formatDate = (date: Date) => {
  const options: any = { day: 'numeric', month: 'long' }
  return date.toLocaleDateString('es-ES', options)
}

const tasksOnDate = computed(() => {
  return tasks.value.filter((task) => {
    const taskDayOfWeek = new Date(task.date).getDay() + 1
    const currentDayOfWeek = props.date.getDay()
    return taskDayOfWeek === currentDayOfWeek
  })
})
</script>
<template>
  <div class="flex flex-col gap-y-4 h-[80vh] p-4 bg-base-100">
    <div class="flex justify-between">
      <span class="text-xl font-medium">{{ getDayOfWeek(props.date) }}</span>
      <span class="text-xl font-medium">{{ formatDate(props.date) }}</span>
    </div>

    <div
      v-for="task in tasksOnDate"
      :key="task.id"
      :style="{ backgroundColor: task.color }"
      :class="[
        'flex shadow-md px-4 py-2 items-center justify-between bg-[#16A34A] text-white rounded-2xl h-[80px]',
        {}
      ]"
    >
      <div class="flex flex-col">
        <h2 class="text-pretty text-sm font-semibold">{{ task.title }}</h2>
        <p class="text-xs">{{ task.description }}</p>
      </div>
      <input type="checkbox" class="checkbox bg-base-300" />
    </div>
  </div>
</template>
