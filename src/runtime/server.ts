import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  // This plugin runs on server-side only
  // The domain config is already attached to the event context by the nitro plugin
  // Here we can add any server-specific initialization if needed
})
