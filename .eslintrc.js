module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        // Uses the recommended rules for Typescript
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        // Disable rules that conflict with prettier
        // See https://prettier.io/docs/en/integrating-with-linters.html
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
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
