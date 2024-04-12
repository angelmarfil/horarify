<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/layout/NavbarLayout.vue'
import BtmNav from '@/layout/BtmNavLayout.vue'
</script>

<template>
  <Navbar></Navbar>

  <main>
    <RouterView />
  </main>

  <BtmNav></BtmNav>
</template>

<style scoped></style>
