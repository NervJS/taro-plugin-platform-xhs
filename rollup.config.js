const { join } = require('path')
const typescript = require('rollup-plugin-typescript2')
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json'

const cwd = __dirname

const output = 'dist'

const base = {
  external: ['@tarojs/shared', '@tarojs/service'],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    }),
    json(),

    commonjs({
      include: /node_modules/,
      sourceMap: false,
    })
  ]
}

// 供 CLI 编译时使用的 Taro 插件入口
const compileConfig = {
  input: join(cwd, 'src/index.ts'),
  output: {
    file: join(cwd, `${output}/index.js`),
    format: 'cjs',
    sourcemap: true,
    exports: 'named'
  },
  ...base
}

// 供 Loader 使用的运行时入口
const runtimeConfig = {
  input: join(cwd, 'src/runtime.ts'),
  output: {
    file: join(cwd, `${output}/runtime.js`),
    format: 'es',
    sourcemap: true
  },
  ...base
}

// 供继承的包使用，为了能 tree-shaking
const runtimeUtilsConfig = {
  input: join(cwd, 'src/runtime-utils.ts'),
  output: {
    file: join(cwd, `${output}/runtime-utils.js`),
    format: 'es',
    sourcemap: true
  },
  ...base
}

module.exports = [compileConfig, runtimeConfig, runtimeUtilsConfig]
