const path = require('path')
const { i18n } = require('./next-i18next.config')
const env = process.env

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  env: {
    ROOT_URL: env.ROOT_URL,
    API_PORT: env.API_PORT,
    APP_PORT: env.APP_PORT,
    RECAPTCHA_KEY: env.RECAPTCHA_KEY,
    PUBLIC_KEY: env.PUBLIC_KEY,
  },
  i18n,
}
