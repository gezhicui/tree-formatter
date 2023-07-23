import { nodeResolve } from '@rollup/plugin-node-resolve';
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

    plugins: [nodeResolve(), commonjs(), typescript(), terser()],
  },
  {
    input: './src/index.ts',
    output: {
      dir: 'lib',
      format: 'esm',
      entryFileNames: '[name].esm.js',
    },
    // 解析模块路径时，优先使用浏览器环境下的解析规则
    plugins: [nodeResolve({ browser: true }), , commonjs(), typescript(), terser()],
  },
];
