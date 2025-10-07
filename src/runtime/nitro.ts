/// <reference path="../types.d.ts" />
import { defineNitroPlugin } from 'nitropack/runtime'
import { getDomainConfig } from '../config-loader'
import type { RuntimeMultiDomainConfig } from '../types'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    const config = useRuntimeConfig()
    const multiDomainConfig = config.multiDomainConfig as RuntimeMultiDomainConfig

    if (!multiDomainConfig) return

    // Extract domain from request
    let domain: string

    if (multiDomainConfig.key === 'hostname') {
      const host = getHeader(event, 'host') || 'localhost'
      // Remove port if present
      domain = host.split(':')[0]
    } else {
      // Custom key from headers or query params
      domain = getHeader(event, multiDomainConfig.key) ||
               getQuery(event)[multiDomainConfig.key] as string ||
               'localhost'
    }

    // Get domain-specific config
    const domainConfig = getDomainConfig(domain, {
      dir: multiDomainConfig.dir,
      default: multiDomainConfig.default
    })

    // Attach to event context
    event.context.multiDomainConfig = {
      domain,
      config: domainConfig
    }
  })
})
