const config = require('@learn-languages/eslint-common');

module.exports = {
  ...config,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:vitest/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [...config.plugins, 'react', 'react-hooks', 'vitest'],
  rules: {
    ...config.rules,
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        disallowTypeAnnotations: false,
      },
    ],
    '@typescript-eslint/no-redeclare': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/boolean-prop-naming': 'warn',
    'react/display-name': 'warn',
    'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
    'react/hook-use-state': 'error',
    'react/jsx-boolean-value': 'error',
    'react/jsx-fragments': 'error',
    'react/jsx-handler-names': 'warn',
    'react/jsx-max-depth': ['warn', { max: 10 }],
    'react/jsx-no-bind': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-leaked-render': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-sort-props': 'error',
    'react/no-array-index-key': 'error',
    'react/no-danger': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-string-refs': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unstable-nested-components': 'error',
    'react/no-unused-prop-types': 'error',
    'react/prefer-read-only-props': 'error',
    'react/prop-types': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-default-props': 'error',
    'react/sort-prop-types': 'error',
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error',
  },
  overrides: [
    {
      files: ['*.tsx', 'vite.config.mts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
