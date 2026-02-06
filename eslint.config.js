import reactHooks from 'eslint-plugin-react-hooks'

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  reactHooks.configs.flat.recommended,
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
