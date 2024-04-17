<script setup lang="ts">
import { ref, defineEmits, type Ref } from 'vue'
import { useSubjectStore } from '@/stores/subject'
import { useTeacherStore } from '@/stores/teacher'
import { useClassTypeStore } from '@/stores/classType'
import { useBuildingStore } from '@/stores/building'
import { useClassroomStore } from '@/stores/classroom'
import { onMounted } from 'vue'
import AddEditModal from '@/components/events/AddEditModal.vue'
import type { IEventData } from '@/interfaces/IEventData'
import { MENU } from '@/components/events/menu'

const props = defineProps<{
  title: string
  isOpen: boolean
  index: number
}>()

const emit = defineEmits(['close', 'select'])

const selectData = (entity: IEventData | null) => {
  emit('select', { index: props.index, data: entity ? entity : null })
  emit('close')
}

const store = (() => {
  switch (props.title) {
    case 'Materia':
      return useSubjectStore()
    case 'Tipo de clase':
      return useClassTypeStore()
    case 'Edificio':
      return useBuildingStore()
    case 'Salón':
      return useClassroomStore()
    case 'Profesor':
      return useTeacherStore()
    default:
      throw new Error(`Store for title "${props.title}" not found`)
  }
})()

onMounted(async () => {
  await store.getData()
})

const modalIndex: any = ref(null)
const isEditing: Ref<boolean> = ref(false)
const entityId: Ref<number> = ref(0)

const openModal = (index: number, editing: boolean, id: number) => {
  modalIndex.value = index
  isEditing.value = editing
  entityId.value = id
}

const closeModal = () => {
  emit('close')
}

const updateList = async () => {
  await store.getData()
}
</script>
<template>
  <dialog :class="['modal modal-bottom sm:modal-middle', { 'modal-open': isOpen }]">
    <div class="modal-box h-screen p-2">
      <div class="flex justify-between items-center">
        <form method="dialog">
          <button class="btn btn-ghost" @click="closeModal">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m15 19-7-7 7-7"
              />
            </svg>
          </button>
        </form>
        <h3 class="font-bold text-base">{{ props.title }}</h3>
        <button class="btn btn-ghost" @click="openModal(index, false, 0)">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </button>
      </div>
      <ul class="menu bg-base-200 w-full rounded-box mb-4">
        <li><button @click="selectData(null)">Ninguno</button></li>
      </ul>

      <ul v-if="store.data?.length > 0" class="menu bg-base-200 w-full rounded-box">
        <li v-for="entity in store.data" :key="entity?.id" class="flex flex-row justify-between">
          <button @click="selectData(entity)" class="flex items-center" v-if="entity">
            <span class="w-[100%]"> {{ entity.title }}</span>
          </button>

          <div class="dropdown dropdown-hover dropdown-bottom dropdown-end p-0">
            <div tabindex="0" role="button" class="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <ul tabindex="0" class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
              <li>
                <!-- Editar -->
                <button @click="openModal(index, true, entity.id)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
              </li>
              <li>
                <!-- Borrar -->
                <button @click="store.deleteEntity(entity.id)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <div v-else>
        <div role="alert" class="alert">
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
          <div class="flex flex-col">
            <span class="uppercase text-sm font-medium">La lista está vacía</span>
            <span class="text-sm">Pulsa en "+" para añadir un nuevo elemento</span>
          </div>
        </div>
      </div>
    </div>
  </dialog>

  <AddEditModal
    v-if="modalIndex !== null"
    :title="MENU[modalIndex]"
    :isEditing="isEditing"
    :entityId="entityId"
    :entityData="store.data.find((entity) => entity?.id === entityId) || null"
    @close="modalIndex = null"
    @update-list="updateList"
  ></AddEditModal>
</template>
<style scoped></style>
