import { readFileSync, existsSync, readdirSync } from 'fs'
import { join, extname, resolve } from 'pathe'
import type { DomainConfig } from './types'

interface ConfigLoaderOptions {
  dir: string
  default: string
}

class ConfigLoader {
  private configs: Map<string, DomainConfig> = new Map()
  private options: ConfigLoaderOptions
  private basePath: string

  constructor(options: ConfigLoaderOptions, basePath: string = process.cwd()) {
    this.options = options
    this.basePath = basePath
    this.loadAllConfigs()
  }

  private loadAllConfigs() {
    const configDir = resolve(this.basePath, this.options.dir)

    if (!existsSync(configDir)) {
      throw new Error(`Config directory not found: ${configDir}`)
    }

    const files = readdirSync(configDir)
    const configFiles = files.filter(file =>
      ['.json', '.yaml', '.yml', '.js', '.ts', '.mjs'].includes(extname(file))
    )

    for (const file of configFiles) {
      const configPath = join(configDir, file)
      const configName = file.replace(extname(file), '')

      try {
        const config = this.loadConfigFile(configPath)
        this.configs.set(configName, config)
      } catch (error) {
        console.warn(`Failed to load config ${configName}:`, error)
      }
    }

    // Ensure default config exists
    if (!this.configs.has(this.options.default.replace(extname(this.options.default), ''))) {
      throw new Error(`Default config file not found: ${this.options.default}`)
    }
  }

  private loadConfigFile(filePath: string): DomainConfig {
    const ext = extname(filePath)

    switch (ext) {
      case '.json':
        return JSON.parse(readFileSync(filePath, 'utf-8'))

      case '.yaml':
      case '.yml':
        // For YAML support, we'll need to add yaml dependency later
        throw new Error('YAML support not yet implemented')

      case '.js':
      case '.ts':
      case '.mjs':
        // For JS/TS configs, we could support dynamic imports
        // But for now, keep it simple
        throw new Error('JavaScript config files not yet implemented')

      default:
        throw new Error(`Unsupported config file type: ${ext}`)
    }
  }

  getConfigForDomain(domain: string): DomainConfig {
    // Try exact match first
    if (this.configs.has(domain)) {
      return this.configs.get(domain)!
    }

    // Try subdomain matching (e.g., 'app.example.com' -> 'example.com')
    const parts = domain.split('.')
    if (parts.length > 2) {
      const parentDomain = parts.slice(1).join('.')
      if (this.configs.has(parentDomain)) {
        return this.configs.get(parentDomain)!
      }
    }

    // Fallback to default
    return this.configs.get(this.options.default.replace(extname(this.options.default), ''))!
  }

  getAllDomains(): string[] {
    return Array.from(this.configs.keys())
  }

  reload() {
    this.configs.clear()
    this.loadAllConfigs()
  }
}

let configLoader: ConfigLoader | null = null

export function getConfigLoader(options: ConfigLoaderOptions, basePath?: string): ConfigLoader {
  if (!configLoader) {
    configLoader = new ConfigLoader(options, basePath)
  }
  return configLoader
}

export function getDomainConfig(domain: string, options: ConfigLoaderOptions, basePath?: string): DomainConfig {
  const loader = getConfigLoader(options, basePath)
  return loader.getConfigForDomain(domain)
}

export function reloadConfigs() {
  if (configLoader) {
    configLoader.reload()
  }
}
