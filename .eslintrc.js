module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',

  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    '@typescript-eslint/no-inferrable-types': 'off',
  },
  plugins: ['@typescript-eslint'],
};
