import { defineNuxtPlugin } from '#app'
import { getDomainConfig } from '../config-loader'

export default defineNuxtPlugin(() => {
  // This plugin runs on client-side only
  const config = useRuntimeConfig()
  const multiDomainConfig = config.multiDomainConfig as any

  if (!multiDomainConfig || typeof window === 'undefined') return

  // Extract domain from window.location
  let domain: string

  if (multiDomainConfig.key === 'hostname') {
    domain = window.location.hostname
  } else {
    // For custom keys, we might need to check URL params or other sources
    // For now, fallback to hostname
    domain = window.location.hostname
  }

  // Get domain-specific config
  const domainConfig = getDomainConfig(domain, {
    dir: multiDomainConfig.dir,
    default: multiDomainConfig.default
  })

  // Store in global state for client-side access
  if (!window.$multiDomainConfig) {
    window.$multiDomainConfig = {
      domain,
      config: domainConfig,
      isLoaded: true
    }
  }
})

// Extend window type
declare global {
  interface Window {
    $multiDomainConfig?: {
      domain: string
      config: any
      isLoaded: boolean
    }
  }
}
