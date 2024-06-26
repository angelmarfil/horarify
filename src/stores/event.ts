import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import EventService from '@/services/EventService'
import type { IEvent } from '@/interfaces/IEvent'

export const useEventStore = defineStore('event', () => {
  const service = ref(new EventService())
  const loading = ref(true)
  const manageDataModal = ref(false)
  const chooseDataModal = ref(false)

  //state
  const events: Ref<IEvent[]> = ref([])

  const currentEvents = computed(() => {
    const now = new Date()
    const currentDayOfWeek = now.getDay()
    return events.value.filter((event) => {
      return event.dayOfWeek === currentDayOfWeek
    })
  })

  //actions
  async function getEvents() {
    loading.value = true
    try {
      events.value = await service.value.fetchEvents()
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      loading.value = false
    }
  }

  async function createEvent(newData: any) {
    try {
      service.value = new EventService()
      await service.value.createEvent(newData)
      getEvents()
    } catch (error) {
      console.error('Error creating entity:', error)
    }
  }

  return {
    events,
    loading,
    manageDataModal,
    chooseDataModal,
    currentEvents,
    getEvents,
    createEvent
  }
})
