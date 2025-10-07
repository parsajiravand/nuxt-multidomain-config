import type { ComputedRef } from 'vue'

// Define types locally to avoid circular imports
interface ModuleOptions {
  dir: string
  default: string
  key: 'hostname' | string
  watch?: boolean
}

interface DomainConfig {
  [key: string]: unknown
}

interface RuntimeMultiDomainConfig {
  dir: string
  default: string
  key: string
  watch?: boolean
}

interface UseMultiDomainConfigReturn {
  domain: ComputedRef<string | null>
  config: ComputedRef<DomainConfig>
  isLoaded: ComputedRef<boolean>
  reload: () => Promise<void>
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    multiDomainConfig?: ModuleOptions
  }

  interface NuxtOptions {
    multiDomainConfig?: ModuleOptions
  }

  interface RuntimeConfig {
    multiDomainConfig?: RuntimeMultiDomainConfig
  }
}

declare module '#app' {
  interface NuxtApp {
    $multiDomainConfig: UseMultiDomainConfigReturn
  }
}

// Extend the global Window interface
declare global {
  interface Window {
    $multiDomainConfig?: {
      domain: string
      config: DomainConfig
      isLoaded: boolean
    }
  }
}

declare global {
  function useRuntimeConfig(): { multiDomainConfig?: RuntimeMultiDomainConfig }
  function useRequestEvent(): { context: { multiDomainConfig?: { domain: string; config: any } } } | undefined
  function defineNuxtPlugin(fn: () => void): void
  function getHeader(event: any, name: string): string | undefined
  function getQuery(event: any): Record<string, any>
}
