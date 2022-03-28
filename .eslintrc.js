module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: [],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'space-before-function-paren': 'off',
      'vue/multi-word-component-names': 'off'
    },
    parserOptions: {
      sourceType: 'module'
    },
    parser: "babel-eslint",
  }