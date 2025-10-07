# Nuxt Multi-Domain Config

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Domain-based configuration management for Nuxt applications. Perfect for SaaS, white-label, or multi-tenant platforms.

## ✨ Features

- 🚀 **Zero rebuilds** - One build for all domains
- 🔄 **SSR & CSR support** - Works during server-side rendering and client-side hydration
- 📁 **Multiple formats** - JSON, YAML, JS config files
- 🎯 **Auto-detection** - Detects domain from `useRequestURL()` or `window.location`
- 🔧 **Runtime config** - Access configs anywhere in your app
- 📡 **Live reload** - Optional API for config updates
- 🛠️ **TypeScript** - Full type safety and intellisense

## 📦 Installation

```bash
npm i nuxt-multidomain-config
```

## 🚀 Quick Start

### 1. Add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['nuxt-multidomain-config'],

  multiDomainConfig: {
    dir: 'configs',        // folder containing configs
    default: 'default.json', // fallback config
    key: 'hostname'        // domain detection method
  }
})
```

### 2. Create Configuration Files

```
📁 configs/
├── 📄 default.json
├── 📄 client1.app.com.json
└── 📄 client2.app.com.json
```

**configs/default.json:**
```json
{
  "theme": "light",
  "apiBase": "https://api.myapp.com",
  "logo": "/logos/default.png",
  "features": {
    "chat": true,
    "analytics": true
  }
}
```

**configs/client1.app.com.json:**
```json
{
  "theme": "dark",
  "apiBase": "https://api.client1.app.com",
  "logo": "/logos/client1.png",
  "features": {
    "chat": true,
    "analytics": false
  }
}
```

### 3. Use in Your App

```vue
<template>
  <div :class="config.theme === 'dark' ? 'dark' : ''">
    <img :src="config.logo" :alt="config.brand.name" />

    <h1 :style="{ color: config.brand.colors.primary }">
      {{ config.brand.name }}
    </h1>

    <div v-if="config.features.chat">
      <!-- Chat component -->
    </div>
  </div>
</template>

<script setup>
const { config, domain } = useMultiDomainConfig()

console.log('Current domain:', domain.value) // 'client1.app.com'
console.log('API base:', config.value.apiBase) // 'https://api.client1.app.com'
</script>
```

## 📚 API Reference

### Module Options

```ts
interface ModuleOptions {
  dir: string        // Config directory (default: 'configs')
  default: string    // Default config file (default: 'default.json')
  key: string        // Domain detection key (default: 'hostname')
  watch?: boolean    // Enable file watching (default: false)
}
```

### `useMultiDomainConfig()`

```ts
const { config, domain, isLoaded, reload } = useMultiDomainConfig()

// Reactive config object
config.value // { theme: 'dark', apiBase: '...', ... }

// Current domain
domain.value // 'client1.app.com'

// Loading state
isLoaded.value // true

// Manual reload (client-side)
await reload()
```

## 🛠️ Advanced Usage

### Custom Domain Detection

```ts
// Use custom header instead of hostname
export default defineNuxtConfig({
  modules: ['nuxt-multidomain-config'],

  multiDomainConfig: {
    dir: 'configs',
    default: 'default.json',
    key: 'x-tenant-id' // Custom header
  }
})
```

### Live Config Reload

Add an API endpoint for live config updates:

```ts
// server/api/config/reload.post.ts
import { reloadConfigs } from 'nuxt-multidomain-config/server'

export default defineEventHandler(() => reloadConfigs())
```

Then call it from your admin panel:

```ts
const response = await $fetch('/api/config/reload', {
  method: 'POST'
})
```

### TypeScript Support

```ts
interface MyDomainConfig {
  theme: 'light' | 'dark'
  apiBase: string
  features: {
    chat: boolean
    analytics: boolean
  }
}

const { config } = useMultiDomainConfig<MyDomainConfig>()
// config.value is now typed!
```

## 🎯 Use Cases

- **SaaS Platforms** - Different configs per customer
- **White-label Apps** - Brand-specific theming
- **Multi-region Deployments** - Region-specific settings
- **A/B Testing** - Domain-based feature flags
- **Enterprise Clients** - Custom integrations

## 🔧 Configuration Formats

### JSON (default)
```json
{
  "theme": "dark",
  "apiBase": "https://api.example.com"
}
```

### YAML (planned)
```yaml
theme: dark
apiBase: https://api.example.com
```

### JavaScript (planned)
```js
export default {
  theme: 'dark',
  apiBase: process.env.API_BASE
}
```

## 🚦 Domain Matching

1. **Exact match**: `app.example.com` → `app.example.com.json`
2. **Subdomain fallback**: `app.example.com` → `example.com.json`
3. **Default fallback**: `unknown.com` → `default.json`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[MIT License](./LICENSE)

---

Made with ❤️ for the Nuxt ecosystem

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-multidomain-config/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-multidomain-config

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-multidomain-config.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-multidomain-config

[license-src]: https://img.shields.io/npm/l/nuxt-multidomain-config.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-multidomain-config

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
