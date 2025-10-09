import { defineNuxtModule, createResolver, addPlugin, addServerPlugin } from '@nuxt/kit'
import { join } from 'pathe'
import type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-multidomain-config',
    configKey: 'multiDomainConfig',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },

  defaults: {
    dir: 'configs',
    default: 'default.json',
    key: 'hostname',
    watch: false
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add runtime config
    nuxt.options.runtimeConfig.multiDomainConfig = {
      dir: options.dir,
      default: options.default,
      key: options.key,
      watch: options.watch
    }

    // Add client plugin for CSR domain detection
    addPlugin(resolver.resolve('./runtime/client'))

    // Add nitro plugin for request handling
    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.plugins = nitroConfig.plugins || []
      nitroConfig.plugins.push(resolver.resolve('./runtime/nitro'))
    })

    // Add composables auto-import
    nuxt.hook('autoImports:extend', (autoImports) => {
      autoImports.push({
        from: '#build/nuxt-multidomain-config/runtime/composables',
        imports: ['useMultiDomainConfig']
      })
    })

    // Add types
    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: resolver.resolve('./types.d.ts') })
    })
  }
})
