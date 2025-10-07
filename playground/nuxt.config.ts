export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['../src/module.ts'],

  multiDomainConfig: {
    dir: 'configs',
    default: 'default.json',
    key: 'hostname',
    watch: true
  }
})
