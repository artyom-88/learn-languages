module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
  },
  extends: ['airbnb-typescript/base', 'prettier'],
  plugins: ['prettier', 'import'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        disallowTypeAnnotations: true,
      },
    ],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],
    'import/no-cycle': 'error',
    'import/no-default-export': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/order': [
      'error',
      {
        'alphabetize': { order: 'asc', caseInsensitive: true },
        'groups': [['builtin', 'external'], ['internal', 'unknown', 'object'], ['parent'], ['sibling', 'index']],
        'newlines-between': 'always',
        'pathGroups': [
          {
            pattern: 'react*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '{app,common,features,test}/**',
            group: 'external',
            position: 'after',
          },
        ],
        'pathGroupsExcludedImportTypes': ['react'],
      },
    ],
    'import/prefer-default-export': 'off',
    'one-var': ['error', 'never'],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        bracketSpacing: true,
        jsxSingleQuote: true,
        printWidth: 120,
        quoteProps: 'consistent',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
    'require-await': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        asyncArrow: 'always',
        named: 'never',
      },
    ],
    'import/no-duplicates': 'error',
    'import/no-useless-path-segments': 'error',
  },
};
