// next.config.mjs
import nextI18NextConfig from './next-i18next.config.js'

export default {
  i18n: nextI18NextConfig.i18n,
  reactStrictMode: true,
  swcMinify: true,
}
