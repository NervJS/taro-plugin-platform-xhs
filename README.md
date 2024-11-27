# `@tarojs/plugin-platform-xhs`

Taro 插件。用于支持编译为小红书小程序。

## 使用

#### 1. 配置插件

```js
// Taro 项目配置
module.exports = {
  // ...
  plugins: [
    '@tarojs/plugin-platform-xhs'
  ]
}
```

```js
// Taro 项目配置
module.exports = {
  // ...
  plugins: [
    ['@tarojs/plugin-platform-xhs', { template: 'recursive' }]
  ]
}
```

#### 2. 编译为小红书小程序

```shell
taro build --type xhs
taro build --type xhs --watch
```

#### 其它

##### 平台判断

```js
if (process.env.TARO_ENV === 'xhs') {
  // ...
}
```

## License

MIT License

Copyright (c) O2Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
