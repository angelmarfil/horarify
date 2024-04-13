import type { IRegister } from '@/interfaces/IRegister'
import { ref, type Ref } from 'vue'
import { useToast } from 'vue-toastification'


const toast = useToast()


const endpoint: string = import.meta.env.VITE_API_URL


export default class AuthService {
  private token: Ref<string>


  constructor() {
    this.token = ref('')
  }


  getToken(): Ref<string> {
    return this.token
  }


  async login(email: string, password: string): Promise<boolean> {
    if (!email || !password) {
      return false
    }


    const formData = { email, password }


    try {
      const response = await fetch(endpoint + '/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })


      const jsonResponse = await response.json()


      if (response.ok) {
        this.token = jsonResponse.token
        toast.success('Se ha iniciado sesión', { timeout: 1500 })
        return jsonResponse
      } else {
        console.error(response)
        toast.error(jsonResponse.title)
        return false
      }
    } catch (error) {
      console.error(error)
      toast.error(
        '¡Ups! Parece que hubo un problema al conectar con el servidor. Por favor, inténtelo de nuevo más tarde.'
      )
      return false
    }
  }


  async register(register: Ref<IRegister>) {
    try {
      const response = await fetch(endpoint + '/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(register.value)
      })


      const jsonResponse = await response.json()
      if (response.ok) {
        toast.success(jsonResponse.title)
        return jsonResponse
      } else {
        console.error(jsonResponse)
        toast.error(jsonResponse.title)
      }
    } catch (error) {
      console.error(error)
      toast.error(
        '¡Ups! Parece que hubo un problema al conectar con el servidor. Por favor, inténtelo de nuevo más tarde.'
      )
      return false
    }
  }
}
