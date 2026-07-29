import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

const typeCheckedFiles = [
  'src/**/*.ts',
  'tests/**/*.ts',
  'integrationTests/**/*.ts',
];

export default [
  { ignores: ['coverage/', 'docs/', 'scripts/', 'dist/', 'eslint.config.*'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: typeCheckedFiles,
    languageOptions: {
      parserOptions: { project: './tsconfig.eslint.json' },
    },
  },
  {
    files: [
      'tests/**/*.spec.ts',
      'integrationTests/**/*.spec.ts',
      'integrationTests/utils/**',
    ],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      'no-new': 'off',
    },
  },
  {
    languageOptions: {
      globals: {
        after: 'readonly',
        afterEach: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        xdescribe: 'readonly',
        xit: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
];
