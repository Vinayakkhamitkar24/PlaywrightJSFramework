// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { on } = require('events');

module.exports = defineConfig({
  testDir: './tests',
  retries :1,
  workers :3,
  reporter: 'allure-playwright',
  
  timeout: 30 * 1000,

  expect:{
    timeout : 5000
  },

  projects :
  [
    {

      name : 'firefox',
      use: {
    
        browserName : 'firefox',
        headless : false,
        screenshot : 'only-on-failure',
        ignoreHTTPSErrors :true,
        permissions : ['geolocation'],
        trace : 'off',
        video: 'retain-on-failure'
        //...devices['iPhone 15 Pro Max']
        
      }
      
    },
    {
      name: 'chrome',
      use: {
    
        browserName : 'chromium',
        headless : false,
        screenshot : 'only-on-failure',
        trace : 'on',
        //...devices['iPhone 15 Pro Max']
      }
    }
  ],
  use: {
    
    browserName : 'chromium',
    headless : false,
    screenshot : 'only-on-failure',
    trace : 'on'
  },


});

