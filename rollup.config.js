import babel from "rollup-plugin-babel";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import svg from 'rollup-plugin-svg'
import pkg from './package.json'

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },    {
      file: pkg.module,
      format: "esm"
    }
  ],
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    postcss({
      modules: true,
      extensions: ['.css']
    }),
    resolve({
      mainFields: ['browser', 'jsnext', 'module', 'main'],
    }),
    commonjs(),
    svg({
      base64: true
    })
  ],
  external: ["react", "styled-components", "d3", "recharts"],
} 