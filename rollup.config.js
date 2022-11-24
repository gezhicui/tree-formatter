import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: './src/index.ts',
    output: {
      dir: 'lib',
      format: 'cjs',
      entryFileNames: '[name].cjs.js',
    },
    plugins: [resolve(), commonjs(), typescript(), terser()],
  },
  {
    input: './src/index.ts',
    output: {
      dir: 'lib',
      format: 'esm',
      entryFileNames: '[name].esm.js',
    },
    plugins: [resolve(), commonjs(), typescript(), terser()],
  },
];
