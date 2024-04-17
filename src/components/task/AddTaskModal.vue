<script setup lang="ts">
import { useTaskStore } from '@/stores/task'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const taskModel = ref({
  title: '',
  description: '',
  date: '',
  color: '#16A34A',
  reminderDate: null,
  reminderHour: null,
  isCompleted: false
})

const reminderActive = ref(false)

const taskStore = useTaskStore()
const { taskModal } = storeToRefs(taskStore)

const submitTask = () => {
  taskStore.createTask(taskModel.value)
  taskModal.value = false
}
</script>
<template>
  <dialog :class="['modal modal-bottom sm:modal-middle', { 'modal-open': taskModal }]">
    <div class="modal-box h-screen p-2">
      <form @submit.prevent="submitTask">
        <div class="flex justify-between items-center">
          <button type="button" class="btn btn-ghost" @click="taskModal = false">Cancelar</button>
          <h3 class="font-bold text-base">Tarea</h3>
          <button class="btn btn-ghost" type="submit">Añadir</button>
        </div>

        <input
          type="text"
          v-model.trim="taskModel.title"
          placeholder="Tarea"
          class="input input-bordered w-full bg-base-200"
        />
        <input
          type="text"
          v-model.trim="taskModel.description"
          placeholder="Descripción"
          class="input input-bordered w-full mt-4 bg-base-200"
        />

        <ul class="menu bg-base-200 w-full rounded-box mt-4">
          <li class="flex flex-row justify-between">
            <span class="pr-8">Fecha</span>
            <input type="date" v-model.trim="taskModel.date" class="bg-base-200 rounded-box" />
          </li>
          <li class="flex flex-row justify-between items-center">
            <span class="pr-8">Color</span>
            <input
              type="color"
              v-model="taskModel.color"
              value="#16A34A"
              class="block h-[40px] w-[35%] p-1"
            />
          </li>
          <li class="flex flex-row">
            <div class="form-control">
              <label class="label cursor-pointer w-[310px]">
                <span class="label-text">Recordatorio</span>
                <input type="checkbox" class="toggle" v-model="reminderActive" />
              </label>
            </div>
          </li>

          <li v-if="reminderActive" class="flex flex-row justify-between">
            <span class="pr-8">Fecha</span>
            <input
              type="date"
              v-model.trim="taskModel.reminderDate"
              class="bg-base-200 rounded-box"
            />
          </li>
          <li v-if="reminderActive" class="flex flex-row justify-between">
            <span class="pr-8">Hora</span>
            <input
              type="time"
              v-model.trim="taskModel.reminderHour"
              class="bg-base-200 rounded-box"
            />
          </li>
        </ul>
      </form>
    </div>
  </dialog>
</template>
<style scoped></style>
