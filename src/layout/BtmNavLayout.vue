<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const isActive = (name: string) => {
  return router.currentRoute.value.name === name
}
</script>
<template>
  <div class="btm-nav z-50">
    <RouterLink :to="{ name: 'timetable' }" activeClass="active">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        :fill="isActive('timetable') ? 'currentColor' : 'none'"
        viewBox="0 0 24 24"
      >
        <path
          v-if="isActive('timetable')"
          fill-rule="evenodd"
          d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z"
          clip-rule="evenodd"
        />
        <path
          v-else
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
        />
      </svg>

      <span class="btm-nav-label">Horario</span>
    </RouterLink>
    <RouterLink :to="{ name: 'tasks' }" activeClass="active">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        :fill="isActive('tasks') ? 'currentColor' : 'none'"
        viewBox="0 0 24 24"
      >
        <path
          v-if="isActive('tasks')"
          fill-rule="evenodd"
          d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2a1 1 0 0 0-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.707 8.707a1 1 0 0 0-1.414-1.414L11 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
          clip-rule="evenodd"
        />

        <path
          v-else
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"
        />
      </svg>

      <span class="btm-nav-label">Tareas</span>
    </RouterLink>
    <RouterLink :to="{ name: 'config' }" activeClass="active">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        :fill="isActive('config') ? 'currentColor' : 'none'"
        viewBox="0 0 24 24"
      >
        <path
          v-if="isActive('config')"
          d="M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z"
        />

        <path
          v-else
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2"
          d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
        />
      </svg>

      <span class="btm-nav-label">Ajustes</span>
    </RouterLink>
  </div>
</template>
<style scoped></style>
