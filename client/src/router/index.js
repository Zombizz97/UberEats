/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    // eslint-disable-next-line no-undef
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      // eslint-disable-next-line no-undef
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      // eslint-disable-next-line no-undef
      console.log('Reloading page to fix dynamic import error')
      // eslint-disable-next-line no-undef
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      // eslint-disable-next-line no-undef
      location.assign(to.fullPath)
    }
  } else {
    // eslint-disable-next-line no-undef
    console.error(err)
  }
})

router.isReady().then(() => {
  // eslint-disable-next-line no-undef
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
