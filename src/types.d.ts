import type { ModuleOptions, UseMultiDomainConfigReturn } from './types'

declare module '@nuxt/schema' {
  interface NuxtConfig {
    multiDomainConfig?: ModuleOptions
  }

  interface NuxtOptions {
    multiDomainConfig?: ModuleOptions
  }

  interface RuntimeConfig {
    multiDomainConfig?: ModuleOptions
  }
}

declare module '#app' {
  interface NuxtApp {
    $multiDomainConfig: UseMultiDomainConfigReturn
  }
}

declare global {
  interface Window {
    $multiDomainConfig?: {
      domain: string
      config: any
      isLoaded: boolean
    }
  }
}

export { ModuleOptions, UseMultiDomainConfigReturn, DomainConfig, MultiDomainState } from './types'
