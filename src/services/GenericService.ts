import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()

export default class EntityService<T> {
  private entity: Ref<T>
  private entities: Ref<T[]>
  private token: string | null
  private endpoint: string

  constructor(entityPath: string) {
    this.entity = ref({}) as Ref<T>
    this.entities = ref([]) as Ref<T[]>
    this.token = localStorage.getItem('token')
    this.endpoint = `${import.meta.env.VITE_API_URL}/${entityPath}`
  }

  private async fetchData(url: string, options: Record<string, any> = {}): Promise<any> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: { ...options.headers, Authorization: `Bearer ${this.token}`.replace(/['"]+/g, '') }
      })

      if (response.status === 401) {
        localStorage.removeItem('token')
        if (router && router.push) {
          router.push('/login')
        } else {
          console.error('El enrutador no está definido')
        }
        toast.info('Su sesión ha expirado. Por favor, inicie sesión nuevamente.', { timeout: 5000 })
      }

      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private async modifyData(url: string, options: Record<string, any> = {}): Promise<any> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: { ...options.headers, Authorization: `Bearer ${this.token}`.replace(/['"]+/g, '') }
      })
      const jsonResponse = await response.json()

      if (response.ok) {
        toast.success(jsonResponse.title, { timeout: 1500 })
        return jsonResponse.title
      } else {
        console.error(response)
        toast.error(jsonResponse.title)
      }
    } catch (error) {
      console.error(error)
      toast.error('Error de conexión con el servidor, intentelo mas tarde')
      throw error
    }
  }

  getEntity() {
    return this.entity
  }

  getEntities() {
    return this.entities
  }

  async fetchEntities() {
    try {
      const data = await this.fetchData(`${this.endpoint}/getAll`)
      if (data && data.length > 0) {
        this.entities.value = data
        return data
      } else {
        return []
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async fetchEntity(id: string) {
    try {
      const data = await this.fetchData(`${this.endpoint}/${id}`)
      this.entity.value = data
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async createEntity(data: any) {
    await this.modifyData(`${this.endpoint}/create?title=${data}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  async updateEntity(id: number, data: any) {
    return await this.modifyData(`${this.endpoint}/update?id=${id}&title=${data}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  async deleteEntity(id: number) {
    try {
      return await this.modifyData(`${this.endpoint}/delete?id=${id}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
