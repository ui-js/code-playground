module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // Uses the recommended rules for Typescript
    'plugin:@typescript-eslint/recommended',
    // Disable rules that conflict with prettier
    // See https://prettier.io/docs/en/integrating-with-linters.html
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        // "vars": "all",
        // "varsIgnorePattern": "^_",
        // "args": "after-used",
        argsIgnorePattern: '^_',
        // "ignoreRestSiblings": false
      },
    ],
  },
};
