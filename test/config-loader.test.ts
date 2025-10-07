import { describe, it, expect } from 'vitest'
import { getDomainConfig, reloadConfigs } from '../src/config-loader'

describe('Config Loader', () => {
  const options = {
    dir: 'playground/configs',
    default: 'default.json'
  }

  it('should load default config', () => {
    const config = getDomainConfig('unknown.com', options)
    expect(config.theme).toBe('light')
    expect(config.apiBase).toBe('https://api.myapp.com')
  })

  it('should load domain-specific config', () => {
    const config = getDomainConfig('client1.app.com', options)
    expect(config.theme).toBe('dark')
    expect(config.apiBase).toBe('https://api.client1.app.com')
  })

  it('should fallback to parent domain', () => {
    const config = getDomainConfig('sub.client1.app.com', options)
    expect(config.theme).toBe('dark')
    expect(config.apiBase).toBe('https://api.client1.app.com')
  })

  it('should reload configs', () => {
    // Initially load
    const config1 = getDomainConfig('client1.app.com', options)
    expect(config1.theme).toBe('dark')

    // Reload (in a real scenario, files might have changed)
    reloadConfigs()

    // Should still work
    const config2 = getDomainConfig('client1.app.com', options)
    expect(config2.theme).toBe('dark')
  })
})
