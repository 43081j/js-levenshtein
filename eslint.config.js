import eslintjs from '@eslint/js';
import {configs as tseslintConfigs} from 'typescript-eslint';

const {configs: eslintConfigs} = eslintjs;

export default [
  {
    ...eslintConfigs.recommended,
    files: ['src/**/*.ts']
  },
  ...tseslintConfigs.strict
];
