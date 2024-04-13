<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthService from '@/services/AuthService'
import type { IRegister } from '@/interfaces/IRegister'
import { useToast } from 'vue-toastification'
import router from '@/router'

const toast = useToast()

const registerData: Ref<IRegister> = ref({
  name: '',
  lastName: '',
  email: '',
  password: ''
})

const pwdConfirmation = ref('')

const authService = new AuthService()
const error = ref(false)

const onlyLetters = /^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ]+$/

const nameValidation = computed(() => {
  const name = registerData.value.name
  if (name.length > 0 && name.length > 20) {
    return 'El nombre puede tener 20 caracteres como máximo.'
  }

  if (name.length > 0 && !onlyLetters.test(name)) {
    return 'El nombre solo debe tener letras.'
  }

  return ''
})

const lastNameValidation = computed(() => {
  const lastName = registerData.value.lastName
  if (lastName.length > 0 && lastName.length > 20) {
    return 'El apellido puede tener 20 caracteres como máximo.'
  }

  if (lastName.length > 0 && !onlyLetters.test(lastName)) {
    return 'El apellido solo debe tener letras.'
  }

  return ''
})

const emailValidation = computed(() => {
  const email = registerData.value.email
  const emailRegex = new RegExp(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)
  return email.length > 0 && !emailRegex.test(email) ? 'El Email debe ser válido.' : ''
})

const passwordValidation = computed(() => {
  const password = registerData.value.password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/

  return !passwordRegex.test(password)
    ? 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter no alfanumérico. Además, debe tener al menos seis caracteres de longitud.'
    : ''
})

const pwdCValidation = computed(() => {
  const password = registerData.value.password
  return pwdConfirmation.value.length > 0 && pwdConfirmation.value !== password
    ? 'Las contraseñas no coinciden.'
    : ''
})

const isFormValid = computed(() => {
  return (
    nameValidation.value.length == 0 &&
    lastNameValidation.value.length == 0 &&
    emailValidation.value.length == 0 &&
    passwordValidation.value.length == 0 &&
    pwdConfirmation.value.length != 0 &&
    pwdCValidation.value.length == 0
  )
})

async function submit() {
  error.value = await authService.register(registerData)
  if (error.value) {
    toast.success('Registro exitoso, inicie sesión para continuar.', { timeout: 2000 })
    router.push({ name: 'timetable' })
  }
}

watch(
  () => registerData.value.password,
  (newValue) => {
    if (newValue === '') {
      pwdConfirmation.value = ''
    }
  }
)
</script>
<template>
  <div class="flex items-start justify-center h-screen">
    <div class="card w-full bg-base-100 m-4">
      <figure class="px-10 pt-10">
        <img
          src="/favicon/android-chrome-192x192.png"
          alt="Shoes"
          class="rounded-xl"
          width="100"
          height="100"
        />
      </figure>
      <form
        method="post"
        @submit.prevent="submit"
        class="card-body items-center text-center gap-y-4 pt-4"
      >
        <h2 class="card-title">Registro</h2>

        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
            />
          </svg>
          <input type="text" class="grow" placeholder="Nombre" v-model.trim="registerData.name" />
        </label>

        <span class="text-error text-sm">{{ nameValidation }}</span>

        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
            />
          </svg>
          <input
            type="text"
            class="grow"
            placeholder="Apellido"
            v-model.trim="registerData.lastName"
          />
        </label>

        <span class="text-error text-sm">{{ lastNameValidation }}</span>

        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
            />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
            />
          </svg>
          <input type="text" class="grow" placeholder="Email" v-model.trim="registerData.email" />
        </label>

        <span class="text-error text-sm">{{ emailValidation }}</span>

        <div class="tooltip tooltip-top" :data-tip="passwordValidation">
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-4 h-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              type="password"
              class="grow"
              placeholder="Contraseña"
              v-model.trim="registerData.password"
            />
          </label>
        </div>

        <label
          class="input input-bordered flex items-center gap-2"
          v-if="registerData.password.length > 0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            ref="input"
            type="password"
            class="grow"
            placeholder="Confirmar contraseña"
            v-model.trim="pwdConfirmation"
          />
        </label>

        <span v-if="registerData.password.length > 0" class="text-error text-sm">{{
          pwdCValidation
        }}</span>

        <div class="card-actions">
          <button class="btn btn-primary" :disabled="!isFormValid">Registrarse</button>
        </div>

        <p class="text-sm">
          ¿Ya tienes una cuenta?
          <RouterLink :to="{ name: 'login' }" class="link link-hover text-primary"
            >Ingresa aquí.</RouterLink
          >
        </p>
        <p class="mt-10">Horarify © 2024</p>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
