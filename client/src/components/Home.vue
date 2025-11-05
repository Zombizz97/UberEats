<template>
  <v-container class="py-6">
    <!-- Navbar catégories -->
    <v-sheet
      class="py-3 px-2 rounded-lg mb-6"
      color="surface"
      elevation="1"
    >
      <v-slide-group
        v-model="selectedCategory"
        show-arrows
      >
        <v-slide-group-item
          v-for="cat in categories"
          :key="cat"
          v-slot="{ isSelected, toggle }"
          :value="cat"
        >
          <v-chip
            class="ma-1"
            :color="isSelected ? 'primary' : undefined"
            :variant="isSelected ? 'flat' : 'tonal'"
            @click="toggle"
          >
            {{ cat }}
          </v-chip>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <!-- Carrousel restaurants mis en avant -->
    <v-card
      class="mb-6"
      color="surface"
      elevation="1"
    >
      <v-card-title class="text-h6">
        Populaires près de chez vous
      </v-card-title>
      <v-card-text>
        <v-carousel
          cycle
          height="300"
          hide-delimiter-background
          show-arrows="hover"
        >
          <v-carousel-item
            v-for="r in featuredFiltered"
            :key="r._id"
          >
            <v-card
              class="mx-2 cursor-pointer"
              color="surface"
              elevation="2"
              @click="goToRestaurant(r)"
            >
              <v-img
                :alt="r.name"
                cover
                height="180"
                :src="r.image"
              />
              <v-card-title class="py-2">
                {{ r.name }}
              </v-card-title>
              <v-card-subtitle class="d-flex align-center">
                <v-icon
                  class="me-1"
                  size="small"
                >
                  mdi-star
                </v-icon>
                {{ (r.rating || 0).toFixed(1) }}
                <span class="mx-2">•</span>
                {{ r.eta }}
                <span class="mx-2">•</span>
                {{ formatFee(r.deliveryFee) }}
              </v-card-subtitle>
              <v-card-text class="pt-1 text-truncate">
                {{ (r.categories || []).join(', ') }}
              </v-card-text>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-card-text>
    </v-card>

    <!-- Grille autres restaurants -->
    <v-card
      color="surface"
      elevation="1"
    >
      <v-card-title class="text-h6">
        Tous les restaurants
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="r in othersFiltered"
            :key="r._id"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <v-card
              class="h-100 cursor-pointer"
              color="surface"
              elevation="2"
              @click="goToRestaurant(r)"
            >
              <v-img
                :alt="r.name"
                cover
                height="140"
                :src="r.image"
              />
              <v-card-title class="py-2">
                {{ r.name }}
              </v-card-title>
              <v-card-subtitle class="d-flex align-center">
                <v-icon
                  class="me-1"
                  size="small"
                >
                  mdi-star
                </v-icon>
                {{ (r.rating || 0).toFixed(1) }}
                <span class="mx-2">•</span>
                {{ r.eta }}
                <span class="mx-2">•</span>
                {{ formatFee(r.deliveryFee) }}
              </v-card-subtitle>
              <v-card-text class="pt-1 text-truncate">
                {{ (r.categories || []).join(', ') }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { getRestaurants } from '@/services/api'

  const router = useRouter()

  const restaurants = ref([])
  const loading = ref(false)
  const error = ref(null)

  onMounted(async () => {
    loading.value = true
    try {
      restaurants.value = await getRestaurants()
    } catch (e) {
      error.value = e
      console.error(e)
    } finally {
      loading.value = false
    }
  })

  const categories = computed(() => {
    const set = new Set()
    for (const r of restaurants.value) {
      for (const c of (r.categories || [])) set.add(c)
    }
    return ['Tout', ...Array.from(set)]
  })

  const selectedCategory = ref('Tout')

  function matchesCategory (r) {
    return selectedCategory.value === 'Tout' || (r.categories || []).includes(selectedCategory.value)
  }

  const featuredFiltered = computed(() =>
    restaurants.value.filter(r => r.featured).filter(matchesCategory),
  )

  const othersFiltered = computed(() =>
    restaurants.value.filter(r => !r.featured).filter(matchesCategory),
  )

  function formatFee (fee) {
    if (!fee) return 'Livraison gratuite'
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(fee)
  }

  function goToRestaurant (r) {
    router.push(`/restaurants/${r._id}`)
  }
</script>

<style scoped>
.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.h-100 {
  height: 100%;
}
.cursor-pointer { cursor: pointer }
</style>
