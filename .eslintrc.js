module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    // typescript config
    '@nuxtjs/eslint-config-typescript'
  ],
  // add your custom rules here
  rules: {
    "no-console": "off",
  }
}
