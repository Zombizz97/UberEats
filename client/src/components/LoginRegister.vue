<template>
  <v-container
    class="py-12"
    max-width="480"
  >
    <v-card
      class="pa-6"
      elevation="2"
      rounded="lg"
    >
      <v-tabs
        v-model="tab"
        fixed-tabs
      >
        <v-tab value="login">
          Se connecter
        </v-tab>
        <v-tab value="signup">
          S'inscrire
        </v-tab>
      </v-tabs>

      <v-window
        v-model="tab"
        class="mt-4"
      >
        <v-window-item value="login">
          <v-form @submit.prevent="submitLogin">
            <v-text-field
              v-model="login.email"
              autocomplete="email"
              label="Email"
              prepend-inner-icon="mdi-email-outline"
              :rules="[rules.required, rules.email]"
              type="email"
              :disabled="loading"
            />
            <v-text-field
              v-model="login.password"
              autocomplete="current-password"
              label="Mot de passe"
              prepend-inner-icon="mdi-lock-outline"
              :rules="[rules.required, rules.min(6)]"
              type="password"
              :disabled="loading"
            />
            <v-btn
              block
              color="header"
              :disabled="!canSubmitLogin || loading"
              :loading="loading"
              type="submit"
            >
              Connexion
            </v-btn>
            <v-alert
              v-if="error"
              class="mt-3"
              color="error"
              density="comfortable"
              variant="tonal"
            >
              {{ error }}
            </v-alert>
          </v-form>
        </v-window-item>

        <v-window-item value="signup">
          <v-form @submit.prevent="submitSignup">
            <v-text-field
              v-model="signup.name"
              autocomplete="name"
              label="Nom"
              prepend-inner-icon="mdi-account-outline"
              :rules="[rules.required]"
              :disabled="loading"
            />
            <v-text-field
              v-model="signup.email"
              autocomplete="email"
              label="Email"
              prepend-inner-icon="mdi-email-outline"
              :rules="[rules.required, rules.email]"
              type="email"
              :disabled="loading"
            />
            <v-text-field
              v-model="signup.password"
              autocomplete="new-password"
              label="Mot de passe"
              prepend-inner-icon="mdi-lock-outline"
              :rules="[rules.required, rules.min(6)]"
              type="password"
              :disabled="loading"
            />
            <v-btn
              block
              color="header"
              :disabled="!canSubmitSignup || loading"
              :loading="loading"
              type="submit"
            >
              Inscription
            </v-btn>
            <v-alert
              v-if="error"
              class="mt-3"
              color="error"
              density="comfortable"
              variant="tonal"
            >
              {{ error }}
            </v-alert>
          </v-form>
        </v-window-item>
      </v-window>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuth } from '@/composables/useAuth'

  type Tab = 'login' | 'signup'

  const router = useRouter()
  const auth = useAuth()

  const tab = ref<Tab>('login')

  const login = ref({ email: '', password: '' })
  const signup = ref({ name: '', email: '', password: '' })

  const rules = {
    required: (v: string) => !!v || 'Requis',
    email: (v: string) => /.+@.+\..+/.test(v) || 'Email invalide',
    min: (n: number) => (v: string) => (v?.length >= n) || `Minimum ${n} caractères`,
  }

  const loading = computed(() => auth.loading.value)
  const error = computed(() => auth.error.value as unknown as string | null)
  const isAuthenticated = computed(() => auth.isAuthenticated.value)

  const canSubmitLogin = computed(() =>
    !!login.value.email
    && !!login.value.password
    && /.+@.+\..+/.test(login.value.email)
    && login.value.password.length >= 6,
  )

  const canSubmitSignup = computed(() =>
    !!signup.value.name
    && !!signup.value.email
    && !!signup.value.password
    && /.+@.+\..+/.test(signup.value.email)
    && signup.value.password.length >= 6,
  )

  async function submitLogin () {
    if (!canSubmitLogin.value || loading.value) return
    try {
      await auth.login(login.value.email, login.value.password)
      login.value = { email: '', password: '' }
      router.push('/').catch(() => {})
    } catch {
      // l'erreur est déjà gérée dans le composable
    }
  }

  async function submitSignup () {
    if (!canSubmitSignup.value || loading.value) return
    try {
      // L'API attend username, on mappe depuis le champ name
      await auth.register(signup.value.name, signup.value.email, signup.value.password)
      signup.value = { name: '', email: '', password: '' }
      router.push('/').catch(() => {})
    } catch {
      // l'erreur est déjà gérée dans le composable
    }
  }

  onMounted(() => {
    if (isAuthenticated.value) {
      router.replace('/').catch(() => {})
    }
  })
</script>
