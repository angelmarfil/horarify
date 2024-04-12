<script setup lang="ts">
import ThemeController from '@/themes/ThemeController.vue'
</script>
<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <ThemeController></ThemeController>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost text-xl">Horarify</a>
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
