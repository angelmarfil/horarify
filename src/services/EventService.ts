import type { IEvent } from '@/interfaces/IEvent'
import { ref, type Ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const endpoint: string = import.meta.env.VITE_API_URL

export default class EventService {
  private events: Ref<IEvent[]>
  private token: string | null

  constructor() {
    this.events = ref([])
    this.token = localStorage.getItem('token')
  }

  getEvents() {
    return this.events
  }

  async fetchEvents() {
    try {
      const response = await fetch(`${endpoint}/Event/getAll`, {
        headers: { Authorization: `Bearer ${this.token}`.replace(/['"]+/g, '') }
      })
      const jsonResponse = await response.json()

      this.events.value = jsonResponse

      if (response.ok) {
        return this.events.value
      } else {
        console.error(response)
        toast.error(jsonResponse.title, { timeout: 5000 })
      }
    } catch (error) {
      console.error(error)
      toast.error(
        '¡Ups! Parece que hubo un problema al conectar con el servidor. Por favor, inténtelo de nuevo más tarde.'
      )
      return []
    }
  }

  async createEvent(newData: any) {
    try {
      const response = await fetch(`${endpoint}/Event/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`.replace(/['"]+/g, '')
        },
        body: JSON.stringify(newData)
      })
      const jsonResponse = await response.json()

      if (response.ok) {
        toast.success(jsonResponse.title, { timeout: 1500 })
        return jsonResponse
      } else {
        console.error(response)
        toast.error(jsonResponse.title, { timeout: 10000 })
      }
    } catch (error) {
      console.error(error)
      toast.error(
        '¡Ups! Parece que hubo un problema al conectar con el servidor. Por favor, inténtelo de nuevo más tarde.'
      )
    }
  }
}
