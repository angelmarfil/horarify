<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import router from '@/router'
import { useUserStore } from '@/stores/user'

const loginData = ref({
  email: '',
  password: ''
})

const userStore = useUserStore()
const response = ref(false)

const emailValidation = computed(() => {
  const email = loginData.value.email
  const emailRegex = new RegExp(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)
  return email.length > 0 && !emailRegex.test(email) ? 'El Email debe ser válido.' : ''
})

const isFormValid = computed(() => {
  const email = loginData.value.email
  const password = loginData.value.password

  return emailValidation.value.length == 0 && email.length > 0 && password.length > 0
})

async function submit() {
  if (loginData.value.email && loginData.value.password) {
    response.value = await userStore.login(loginData.value.email, loginData.value.password)
    if (response.value) {
      router.push({ name: 'timetable' })
    }
  }
}
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
        class="card-body items-center text-center gap-y-14 pt-4"
        method="post"
        @submit.prevent="submit"
      >
        <h2 class="card-title">Iniciar Sesión</h2>
        <label class="input input-bordered flex items-center gap-2 relative">
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
          <input type="text" class="grow" placeholder="Email" v-model.trim="loginData.email" />
          <span class="text-error absolute top-14">{{ emailValidation }}</span>
        </label>

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
            v-model.trim="loginData.password"
          />
        </label>
        <div class="card-actions">
          <button class="btn btn-primary" :disabled="!isFormValid">Ingresar</button>
        </div>

        <p class="text-sm">
          ¿No tiene una cuenta?
          <RouterLink :to="{ name: 'register' }" class="link link-hover text-primary"
            >Crea una.</RouterLink
          >
        </p>
        <p>Horarify © 2024</p>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
