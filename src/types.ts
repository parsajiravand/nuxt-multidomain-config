import type { ComputedRef } from 'vue'

export interface ModuleOptions {
  /**
   * Directory containing domain configuration files
   * @default 'configs'
   */
  dir: string

  /**
   * Default configuration filename (fallback when no domain-specific config is found)
   * @default 'default.json'
   */
  default: string

  /**
   * Key to use for domain detection
   * - 'hostname': uses the full hostname (e.g., 'app.example.com')
   * - custom string: uses a custom header or query parameter
   * @default 'hostname'
   */
  key: 'hostname' | string

  /**
   * Enable file watching for development (auto-reload configs on change)
   * @default false
   */
  watch?: boolean
}

export interface DomainConfig {
  [key: string]: unknown
}

export interface MultiDomainState {
  domain: string | null
  config: DomainConfig
  isLoaded: boolean
}

export interface RuntimeMultiDomainConfig {
  dir: string
  default: string
  key: string
  watch?: boolean
}

export interface UseMultiDomainConfigReturn {
  domain: ComputedRef<string | null>
  config: ComputedRef<DomainConfig>
  isLoaded: ComputedRef<boolean>
  reload: () => Promise<void>
}
