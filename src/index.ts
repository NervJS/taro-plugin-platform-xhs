import ConcatSource from 'webpack-sources/lib/ConcatSource'

import XHS from './program'

import type { IPluginContext } from '@tarojs/service'

// 让其它平台插件可以继承此平台
export { XHS }

const IMPORT_CSS_REG = /@import\s+['"].*?\.css['"];?/g

const APP_STYLE_NAME = 'app.css'
// const APP_ORIGIN_NAME = 'app-origin.css'
// const COMMON_STYLE_NAME = 'common.css'

export interface IOptions {
  // 模板类型
  template?: 'recursive' | 'unRecursive' | 'recursiveXs' | 'unRecursiveXs'
}


export default (ctx: IPluginContext, options: IOptions = {}) => {
  ctx.registerPlatform({
    name: 'xhs',
    useConfigName: 'mini',
    async fn ({ config }) {
      const program = new XHS(ctx, config, options)
      await program.start()
    }
  })

  ctx.modifyBuildAssets(({ assets }) => {
    // 解决构建时 app.css 中的 @import 在最后的问题
    if (assets[APP_STYLE_NAME]) {
      const content = assets[APP_STYLE_NAME].source()
      const source = new ConcatSource()
      const macthes = content.matchAll(IMPORT_CSS_REG)
      for (const macth of macthes) {
        source.add(macth[0])
        source.add('\n')
      }
      source.add(content.replace(IMPORT_CSS_REG, ''))
      assets[APP_STYLE_NAME] = source
    }
  })
}
