<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/layout/NavbarLayout.vue'
import BtmNav from '@/layout/BtmNavLayout.vue'
const route = useRoute()
</script>

<template>
  <Navbar v-if="route.name !== 'login' && route.name !== 'register'"></Navbar>

  <main>
    <RouterView />
  </main>

  <BtmNav v-if="route.name !== 'login' && route.name !== 'register'"></BtmNav>
</template>

<style scoped></style>
