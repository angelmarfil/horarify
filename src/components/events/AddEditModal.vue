<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { useSubjectStore } from '@/stores/subject'
import { useTeacherStore } from '@/stores/teacher'
import { useClassTypeStore } from '@/stores/classType'
import { useBuildingStore } from '@/stores/building'
import { useClassroomStore } from '@/stores/classroom'
import { useToast } from 'vue-toastification'

const props = defineProps<{
  title: string
  entityData?: any
  isEditing: boolean
}>()

const emit = defineEmits(['close', 'updateList'])

const isOpen = ref(true)

const close = () => {
  isOpen.value = false
  emit('close')
}

const inputValue = ref(props.isEditing && props.entityData ? props.entityData.title : '')
const toast = useToast()

function useStoreBasedOnTitle(title: string) {
  switch (title) {
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
      throw new Error(`Store not found for title ${title}`)
  }
}

const store = useStoreBasedOnTitle(props.title)

async function handleSave() {
  try {
    if (props.isEditing && props.entityData) {
      await store.updateEntity(props.entityData.id, inputValue.value)
      close()
      emit('updateList')
    } else {
      await store.createEntity(inputValue.value)
      close()
      emit('updateList')
    }
  } catch (error) {
    toast.error('Ocurrió un error al procesar la solicitud.')
  }
}
</script>
<template>
  <dialog :class="['modal', { 'modal-open': isOpen }]">
    <div class="modal-box">
      <h3 class="font-bold text-lg text-center mb-4">{{ props.title }}</h3>
      <input
        type="text"
        v-model.trim="inputValue"
        placeholder="Introducir título"
        class="input input-bordered w-full max-w-xs"
      />

      <div class="modal-action">
        <form method="dialog" class="flex gap-x-2">
          <button @click="close" class="btn btn-error">Cancelar</button>
          <button @click="handleSave" class="btn btn-primary">Aceptar</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<style scoped></style>
