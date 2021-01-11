import { babel } from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'
import url from '@rollup/plugin-url'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts', '.tsx'],
    }),
    postcss({
      modules: true,
      extensions: ['.css'],
    }),
    nodeResolve({
      mainFields: ['browser', 'jsnext', 'module', 'main'],
    }),
    commonjs({ extensions: ['.js', '.ts', '.tsx'] }),
    url(),
    json(),
    typescript(),
  ],
  external: ['react', 'react-dom', 'styled-components', 'd3', 'recharts', 'antd', 'typescript', 'tslib'],
}
