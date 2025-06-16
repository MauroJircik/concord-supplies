export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  // Configuração das variáveis em tempo de execução
  runtimeConfig: {
    public: {
      // URL base da API backend, padrão para localhost:3001
      apiBase: process.env.API_BASE_URL || 'http://localhost:3001'
    }
  }

})

