const { defineConfig } = require("cypress")

module.exports = defineConfig({

  e2e: {

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl: 'https://qastoredesafio.lojaintegrada.com.br',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 8000
  },

  env: {
    api: 'https://qastoredesafio.lojaintegrada.com.br'
  }

})
