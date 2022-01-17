import { UnRecursiveTemplate } from '@tarojs/shared/dist/template'

export class Template extends UnRecursiveTemplate {
  supportXS = false
  Adapter = {
    if: 'xhs:if',
    else: 'xhs:else',
    elseif: 'xhs:elif',
    for: 'xhs:for',
    forItem: 'xhs:for-item',
    forIndex: 'xhs:for-index',
    key: 'xhs:key',
    type: 'xhs'
  }

  // createMiniComponents (components): any {
  //   const result = super.createMiniComponents(components)
  //   // TODO: 删除小红书不支持的组件
  //   // delete result['pure-view']
  //   return result
  // }
}
