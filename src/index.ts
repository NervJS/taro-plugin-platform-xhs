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
    let content = ''

    if (assets['app.css']) {
      content = assets['app.css'].source()
    }

    const match = content.match(COMMON_CSS_REG)
    if (content !== '' && match?.length) {
      assets['app.css'] = new ConcatSource(...match, content.replace(COMMON_CSS_REG, ''))
    }
  })
}
