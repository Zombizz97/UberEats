<template>
  <v-app>
    <v-main>
      <app-header
        :is-authenticated="isAuthenticated"
        @on-auth-button-click="onAuthButtonClick"
      />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import { computed } from 'vue'
  import { useAuth } from '@/composables/useAuth'

  const auth = useAuth()
  const isAuthenticated = computed(() => auth.isAuthenticated.value)

  async function onAuthButtonClick () {
    await auth.logout()
  }
</script>
