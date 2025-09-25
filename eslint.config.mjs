import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended'),
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'global.d.ts'],
  },
  {
    rules: {
      // 1. Enforce camelCase, allow UPPER_CASE for constants
      camelcase: [
        'error',
        {
          properties: 'always',
          ignoreGlobals: false,
          allow: ['^[_A-Z0-9]+$'], // constants like CAPITAL_LETTERS
        },
      ],

      // 2. Disallow anonymous/arrow functions, except in callbacks
      'func-names': ['error', 'always'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'func-style': ['error', 'declaration', { allowArrowFunctions: false }],

      // 3. Prettier rules (explicit)
      'prettier/prettier': [
        'error',
        {
          printWidth: 120,
          semi: true,
          singleQuote: true,
          jsxSingleQuote: true,
          trailingComma: 'all',
        },
      ],
    },
  },
];

export default eslintConfig;
