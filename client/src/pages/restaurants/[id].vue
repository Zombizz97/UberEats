<template>
  <v-container class="py-6">
    <v-card
      v-if="restaurant"
      class="mb-6"
    >
      <v-img
        :alt="restaurant.name"
        cover
        height="220"
        :src="restaurant.image"
      />
      <v-card-title class="text-h5">
        {{ restaurant.name }}
      </v-card-title>
      <v-card-subtitle class="d-flex align-center">
        <v-icon
          class="me-1"
          size="small"
        >
          mdi-star
        </v-icon>
        {{ (restaurant.rating || 0).toFixed(1) }}
        <span class="mx-2">•</span>
        {{ restaurant.eta }}
        <span class="mx-2">•</span>
        {{ formatFee(restaurant.deliveryFee) }}
      </v-card-subtitle>
      <v-card-text>
        {{ (restaurant.categories || []).join(', ') }}
      </v-card-text>
    </v-card>

    <div v-else>
      <v-alert
        type="warning"
        variant="tonal"
      >
        Ce restaurant n'existe pas.
      </v-alert>
    </div>

    <v-row v-if="restaurant">
      <v-col
        v-for="p in products"
        :key="p._id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-card class="h-100 d-flex flex-column">
          <v-img
            :alt="p.name"
            cover
            height="160"
            :src="p.image"
          />
          <v-card-title class="py-2">
            {{ p.name }}
          </v-card-title>
          <v-card-text class="flex-grow-1">
            <div class="text-body-2 mb-2">
              {{ p.description }}
            </div>
            <div class="text-subtitle-2 font-weight-medium">
              {{ formatPrice(p.price) }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="addToCart(p)"
            >
              <v-icon start>
                mdi-cart-plus
              </v-icon>
              Ajouter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getRestaurantById, getProductsByRestaurant } from '@/services/api'
import { useCart } from '@/composables/useCart'

const route = useRoute()
const restaurant = ref(null)
const products = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  const id = route.params.id
  loading.value = true
  try {
    restaurant.value = await getRestaurantById(id)
    products.value = await getProductsByRestaurant(id)
  } catch (e) {
    error.value = e
    // eslint-disable-next-line no-undef
    console.error(e)
  } finally {
    loading.value = false
  }
})

const { addItem } = useCart()
function addToCart (p) {
  if (!restaurant.value) return
  addItem({
    restaurantId: restaurant.value._id,
    productId: p._id,
    name: p.name,
    price: p.price,
    image: p.image,
  }, 1)
}

function formatFee (fee) {
  if (!fee) return 'Livraison gratuite'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(fee)
}
function formatPrice (price) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}
</script>

<style scoped>
.h-100 { height: 100%; }
</style>
