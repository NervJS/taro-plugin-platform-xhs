import {
  RecursiveTemplate as TaroRecursiveTemplate,
  UnRecursiveTemplate as TaroUnRecursiveTemplate,
} from '@tarojs/shared/dist/template'

const ADAPTER = {
  if: 'xhs:if',
  else: 'xhs:else',
  elseif: 'xhs:elif',
  for: 'xhs:for',
  forItem: 'xhs:for-item',
  forIndex: 'xhs:for-index',
  key: 'xhs:key',
  xs: 'sjs',
  type: 'xhs'
}

function createReplacePropNameFunction () {
  return function (name: string, value: string, componentName: string) {
    let result = name

    // 处理 eh 值的替换逻辑
    if (value === 'eh') {
      result = name.toLowerCase()
    }

    // 处理 button 组件 share-type 字段的替换逻辑
    if (componentName === 'button' && name === 'share-type') {
      result = 'data-share-type'
    }

    return result
  }
}


function createXsFunction () {
  return function (filePath = './utils') {
    return `<sjs module="xs" src="${filePath}.sjs" />`
  }
}

export class RecursiveTemplate extends TaroRecursiveTemplate {
  supportXS = false
  isSupportRecursive = true
  Adapter = ADAPTER

  constructor () {
    super()
    // @ts-ignore
    this.isUseXS = false
  }

  replacePropName = createReplacePropNameFunction()
}



export class RecursiveXsTemplate extends TaroRecursiveTemplate {
  supportXS = true
  Adapter = ADAPTER

  constructor () {
    super()
    // @ts-ignore
    this.isUseXS = true
  }

  replacePropName = createReplacePropNameFunction()

  buildXsTemplate = createXsFunction()
}

export class UnRecursiveTemplate extends TaroUnRecursiveTemplate {
  supportXS = false
  isSupportRecursive = false
  Adapter = ADAPTER

  constructor () {
    super()
    // @ts-ignore
    this.isUseXS = false
  }

  replacePropName = createReplacePropNameFunction()
}

export class UnRecursiveXsTemplate extends TaroUnRecursiveTemplate {
  supportXS = true
  isSupportRecursive = false
  Adapter = ADAPTER

  constructor () {
    super()
    // @ts-ignore
    this.isUseXS = true
  }

  replacePropName = createReplacePropNameFunction()

  buildXsTemplate = createXsFunction()
}

