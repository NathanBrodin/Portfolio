import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    rules: {
      'no-shadow': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      'import/consistent-type-specifier-style': 'off',
      '@typescript-eslint/array-type': 'off',
    },
  },
]
