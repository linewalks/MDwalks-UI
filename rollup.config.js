import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'
import svg from 'rollup-plugin-svg'
// import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    postcss({
      modules: true,
      extensions: ['.css'],
    }),
    resolve({
      mainFields: ['browser', 'jsnext', 'module', 'main'],
    }),
    commonjs(),
    svg({
      base64: true,
    }),
    json(),
    // ts 작업이 끝나면 추가
    // typescript({ useTsconfigDeclarationDir: true }),
  ],
  external: ['react', 'styled-components', 'd3', 'recharts'],
}
