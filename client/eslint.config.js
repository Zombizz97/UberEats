import pluginVue from 'eslint-plugin-vue'

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': ['error', { ignores: ['App', 'index', 'Login', 'Home', '[id]'] }],
    },
    languageOptions: {
      sourceType: 'module'
    }
  }
]
