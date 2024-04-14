import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import EventService from '@/services/EventService'
import type { IEvent } from '@/interfaces/IEvent'

export const useEventStore = defineStore('event', () => {
  const service = ref()
  const loading = ref(false)
  const manageDataModal = ref(false)
  const chooseDataModal = ref(false)

  //state
  const events: Ref<IEvent[]> = ref([])

  //actions
  async function getEvents() {
    try {
      service.value = new EventService()
      events.value = await service.value.fetchEvents()
      return true
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = true
    }
  }

  return { events, loading, manageDataModal, chooseDataModal, getEvents }
})
