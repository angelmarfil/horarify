import type { ITask } from '@/interfaces/ITask'
import { ref, type Ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const endpoint: string = import.meta.env.VITE_API_URL

export default class TaskService {
  private tasks: Ref<ITask[]>
  private token: string

  constructor() {
    this.tasks = ref([])
    this.token = this.token = `Bearer ${localStorage.getItem('token')}`.replace(/['"]+/g, '')
  }

  getTasks() {
    return this.tasks
  }

  async fetchTasks() {
    try {
      const response = await fetch(`${endpoint}/Task/getAll`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`.replace(/['"]+/g, '') }
      })
      const jsonResponse = await response.json()

      this.tasks.value = jsonResponse

      if (response.ok) {
        return this.tasks.value
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

  async createTask(newData: any) {
    try {
      const response = await fetch(`${endpoint}/Task/create`, {
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

  async isCompleted(id: number, value: boolean) {
    try {
      const response = await fetch(`${endpoint}/Task/isCompleted?id=${id}&isCompleted=${value}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${this.token}`.replace(/['"]+/g, '')
        }
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
