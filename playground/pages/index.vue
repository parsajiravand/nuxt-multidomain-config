<template>
  <div class="container mx-auto p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8" :style="{ color: config.brand.colors.primary }">
        {{ config.brand.name }}
      </h1>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4">Domain Configuration</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-medium mb-2">Current Domain</h3>
            <p class="text-gray-600 dark:text-gray-300 font-mono">{{ domain || 'localhost' }}</p>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-2">Theme</h3>
            <span class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="config.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'">
              {{ config.theme }}
            </span>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-2">API Base</h3>
            <p class="text-gray-600 dark:text-gray-300 font-mono text-sm">{{ config.apiBase }}</p>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-2">Features</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="(enabled, feature) in config.features"
                    :key="feature"
                    class="px-2 py-1 rounded text-xs"
                    :class="enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                {{ feature }}: {{ enabled ? 'ON' : 'OFF' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Available Configurations</h2>
        <div class="overflow-x-auto">
          <table class="w-full table-auto">
            <thead>
              <tr class="border-b">
                <th class="text-left p-2">Domain</th>
                <th class="text-left p-2">Theme</th>
                <th class="text-left p-2">API Base</th>
                <th class="text-left p-2">Features</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="domainConfig in availableConfigs" :key="domainConfig.domain" class="border-b">
                <td class="p-2 font-mono text-sm">{{ domainConfig.domain }}</td>
                <td class="p-2">{{ domainConfig.config.theme }}</td>
                <td class="p-2 font-mono text-sm">{{ domainConfig.config.apiBase }}</td>
                <td class="p-2">
                  <div class="flex flex-wrap gap-1">
                    <span v-for="(enabled, feature) in domainConfig.config.features"
                          :key="feature"
                          class="px-1 py-0.5 rounded text-xs"
                          :class="enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      {{ feature }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { config, domain } = useMultiDomainConfig()

// This would be available in a real implementation
const availableConfigs = [
  { domain: 'default', config: { theme: 'light', apiBase: 'https://api.myapp.com', features: { chat: true, analytics: true, notifications: true } } },
  { domain: 'client1.app.com', config: { theme: 'dark', apiBase: 'https://api.client1.app.com', features: { chat: true, analytics: false, notifications: true } } },
  { domain: 'client2.app.com', config: { theme: 'light', apiBase: 'https://api.client2.app.com', features: { chat: false, analytics: true, notifications: true } } }
]
</script>
