<template>
  <v-app-bar
    color="header"
    flat
  >
    <v-container class="d-flex align-center">
      <v-toolbar-title
        class="font-weight-bold"
        @click="router.push('/').catch(() => {})"
      >
        Uber Eats
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        color="surface"
        variant="tonal"
        @click="handleAuthButtonClick"
      >
        {{ isAuthenticated ? 'Déconnexion' : 'Connexion' }}
      </v-btn>
      <v-btn
        class="ml-2"
        color="surface"
        variant="tonal"
        @click="showCart = true"
      >
        <v-icon class="me-1">
          mdi-cart
        </v-icon>
        Panier<span v-if="count > 0">&nbsp;({{ count }})</span>
      </v-btn>
    </v-container>

    <v-dialog
      v-model="showCart"
      max-width="560"
    >
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Votre panier</span>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="showCart = false"
          />
        </v-card-title>
        <v-divider />
        <v-card-text>
          <div
            v-if="items.length === 0"
            class="text-medium-emphasis"
          >
            Votre panier est vide.
          </div>
          <v-list
            v-else
            lines="two"
          >
            <v-list-item
              v-for="it in items"
              :key="it.productId"
            >
              <template #prepend>
                <v-avatar
                  v-if="it.image"
                  rounded
                  size="48"
                >
                  <v-img
                    :alt="it.name"
                    cover
                    :src="it.image"
                  />
                </v-avatar>
              </template>
              <v-list-item-title>{{ it.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ formatPrice(it.price) }}</v-list-item-subtitle>
              <template #append>
                <div class="d-flex align-center">
                  <v-btn
                    icon="mdi-minus"
                    size="small"
                    variant="text"
                    @click.stop="decrement(it.productId)"
                  />
                  <span
                    class="mx-2"
                    style="min-width: 2rem; text-align: center"
                  >{{ it.quantity }}</span>
                  <v-btn
                    icon="mdi-plus"
                    size="small"
                    variant="text"
                    @click.stop="increment(it.productId)"
                  />
                  <v-btn
                    class="ml-2"
                    color="error"
                    icon="mdi-delete"
                    size="small"
                    variant="text"
                    @click.stop="remove(it.productId)"
                  />
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-divider />
        <v-card-actions class="d-flex justify-space-between">
          <div class="text-subtitle-1 font-weight-medium">
            Total: {{ formatPrice(total) }}
          </div>
          <div>
            <v-btn
              :disabled="items.length === 0"
              variant="tonal"
              @click="showCart = false"
            >
              Fermer
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCart } from '@/composables/useCart'

  const props = withDefaults(defineProps<{
    isAuthenticated?: boolean
  }>(), {
    isAuthenticated: false,
  })

  const emit = defineEmits<{
    (e: 'on-auth-button-click'): void
  }>()

  const router = useRouter()

  function handleAuthButtonClick () {
    if (props.isAuthenticated) {
      emit('on-auth-button-click')
    } else {
      router.push('/login').catch(() => {})
    }
  }

  const showCart = ref(false)
  const { items, count, total, increment, decrement, remove } = useCart()

  function formatPrice (price: number) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
  }
</script>
