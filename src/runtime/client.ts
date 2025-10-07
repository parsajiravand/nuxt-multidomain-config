/// <reference path="../types.d.ts" />
import { getDomainConfig } from '../config-loader'
import type { RuntimeMultiDomainConfig, DomainConfig } from '../types'

// Use type assertion for window access
const getWindow = (): any => {
  return (globalThis as any).window
}

export default defineNuxtPlugin(() => {
  // This plugin runs on client-side only
  const config = useRuntimeConfig()
  const multiDomainConfig = config.multiDomainConfig as RuntimeMultiDomainConfig

  const win = getWindow()
  if (!multiDomainConfig || !win) return

  // Extract domain from window.location
  let domain: string

  if (multiDomainConfig.key === 'hostname') {
    domain = win.location.hostname
  } else {
    // For custom keys, we might need to check URL params or other sources
    // For now, fallback to hostname
    domain = win.location.hostname
  }

  // Get domain-specific config
  const domainConfig = getDomainConfig(domain, {
    dir: multiDomainConfig.dir,
    default: multiDomainConfig.default
  })

  // Store in global state for client-side access
  if (!win.$multiDomainConfig) {
    win.$multiDomainConfig = {
      domain,
      config: domainConfig,
      isLoaded: true
    }
  }
})
