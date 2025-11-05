import { createVuetify } from 'vuetify'
import 'vuetify/styles'
// Import global des Material Design Icons (font)
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const uberTheme = {
  dark: false,
  colors: {
    'background': '#f9f9f7',
    'surface': '#f7f7f5',
    'primary': '#222222',
    'on-primary': '#ffffff',
    'header': '#242424',
    'on-header': '#ffffff',
    'on-background': '#111111',
    'on-surface': '#111111',
  },
}

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'uber',
    themes: { uber: uberTheme },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  defaults: {
    VAppBar: { color: 'header', flat: true },
    VCard: { color: 'surface', elevation: 2, rounded: 'lg' },
    VBtn: { color: 'primary', variant: 'flat' },
    VTextField: { color: 'primary' },
  },
})
