<script setup lang="ts">
import { useEventStore } from '@/stores/event'
import DataListModal from '@/components/events/DataListModal.vue'
import { ref } from 'vue'
import type { IEventData } from '@/interfaces/IEventData'

const props = defineProps<{
  title: string
}>()

const menu = ref(['Materia', 'Tipo de clase', 'Edificio', 'Salón', 'Profesor'])

const eventStore = useEventStore()

const modalsVisibility = ref(menu.value.map(() => false))

const selectedData = ref<(IEventData | null)[]>(menu.value.map(() => null))

const openModal = (index: number) => {
  const visibilityArray = modalsVisibility.value
  if (visibilityArray) {
    visibilityArray[index] = true
  }
}

const closeModal = (index: number) => {
  const visibilityArray = modalsVisibility.value
  if (visibilityArray) {
    visibilityArray[index] = false
  }
}

const handleSelect = ({ index, data }: { index: number; data: IEventData | null }) => {
  selectedData.value[index] = data
  updateEventModel(index, data ? data.id : null)
}

const updateEventModel = (index: number, id: number | null) => {
  switch (index) {
    case 0:
      eventModel.value.subjectId = id
      break
    case 1:
      eventModel.value.classTypeId = id
      break
    case 2:
      eventModel.value.buildingId = id
      break
    case 3:
      eventModel.value.classroomId = id
      break
    case 4:
      eventModel.value.teacherId = id
      break
  }
}

const eventModel: any = ref({
  startTime: '',
  endTime: '',
  color: '',
  dayOfWeek: 0,
  subjectId: 0,
  classTypeId: null,
  buildingId: 0,
  classroomId: 0,
  teacherId: 0
})

const submitEvent = () => {
  eventStore.createEvent(eventModel.value)
}
</script>
<template>
  <dialog
    :class="['modal modal-bottom sm:modal-middle', { 'modal-open': eventStore.manageDataModal }]"
  >
    <div class="modal-box h-screen p-2">
      <form @submit.prevent="submitEvent">
        <div class="flex justify-between items-center">
          <button type="button" class="btn btn-ghost" @click="eventStore.manageDataModal = false">
            Cancelar
          </button>
          <h3 class="font-bold text-base">{{ props.title }}</h3>
          <button class="btn btn-ghost" type="submit">Añadir</button>
        </div>

        <ul class="menu bg-base-200 w-full rounded-box">
          <li v-for="(option, index) in menu" :key="option">
            <button type="button" @click="openModal(index)">
              <span v-if="selectedData[index] === null">{{ option }}</span>
              <span v-else>{{ selectedData[index]?.title }}</span>
              <svg
                class="absolute right-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </button>
          </li>
        </ul>

        <ul class="menu bg-base-200 w-full rounded-box mt-4">
          <li class="flex flex-row justify-between">
            <span class="pr-8">Inicio</span>
            <input
              v-model.trim="eventModel.startTime"
              type="time"
              class="bg-base-200 rounded-box"
            />
          </li>
          <li class="flex flex-row justify-between">
            <span class="pr-8">Fin</span>
            <input
              v-model.trim="eventModel.endTime"
              type="time"
              class="w-[30%] bg-base-200 rounded-box"
            />
          </li>
          <li class="flex flex-row justify-between">
            <span class="pr-8">Color</span>
            <input v-model="eventModel.color" type="color" value="#16A34A" class="w-[30%]" />
          </li>
          <li class="flex flex-row justify-between">
            <select v-model.number="eventModel.dayOfWeek" class="select w-full bg-base-200">
              <option disabled selected>Día</option>
              <option value="0">Domingo</option>
              <option value="1">Lunes</option>
              <option value="2">Martes</option>
              <option value="3">Miércoles</option>
              <option value="4">Jueves</option>
              <option value="5">Viernes</option>
              <option value="6">Sábado</option>
            </select>
          </li>
        </ul>
      </form>
    </div>
  </dialog>

  <div v-for="(option, index) in menu" :key="option">
    <DataListModal
      :title="option"
      :isOpen="modalsVisibility[index]"
      @close="closeModal(index)"
      :index="index"
      @select="handleSelect"
    ></DataListModal>
  </div>
</template>
<style scoped></style>
