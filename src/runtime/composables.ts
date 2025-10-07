import { computed } from 'vue'
import type { UseMultiDomainConfigReturn } from '../types'

export const useMultiDomainConfig = (): UseMultiDomainConfigReturn => {
  const config = useRuntimeConfig()
  const multiDomainConfig = config.multiDomainConfig as any

  // Server-side: get from SSR context
  if (process.server) {
    const event = useRequestEvent()
    const ssrConfig = event?.context?.multiDomainConfig

    if (ssrConfig) {
      return {
        domain: computed(() => ssrConfig.domain),
        config: computed(() => ssrConfig.config),
        isLoaded: computed(() => true),
        reload: async () => {
          // Server-side reload not implemented yet
          console.warn('Server-side config reload not implemented')
        }
      }
    }
  }

  // Client-side: get from window or fetch
  if (process.client && typeof window !== 'undefined') {
    // First try to get from window (set by client plugin)
    if (window.$multiDomainConfig) {
      return {
        domain: computed(() => window.$multiDomainConfig!.domain),
        config: computed(() => window.$multiDomainConfig!.config),
        isLoaded: computed(() => window.$multiDomainConfig!.isLoaded),
        reload: async () => {
          // Client-side reload - could fetch from API
          console.warn('Client-side config reload not implemented')
        }
      }
    }

    // Fallback: detect domain client-side
    const domain = window.location.hostname
    const domainConfig = getDomainConfig(domain, {
      dir: multiDomainConfig.dir,
      default: multiDomainConfig.default
    })

    return {
      domain: computed(() => domain),
      config: computed(() => domainConfig),
      isLoaded: computed(() => true),
      reload: async () => {
        // Client-side reload not implemented yet
        console.warn('Client-side config reload not implemented')
      }
    }
  }

  // Fallback for SSR without context
  return {
    domain: computed(() => null),
    config: computed(() => ({})),
    isLoaded: computed(() => false),
    reload: async () => {}
  }
}

// Import the config loader for client-side fallback
import { getDomainConfig } from '../config-loader'
