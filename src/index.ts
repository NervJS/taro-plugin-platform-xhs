import XHS from './program'
import ConcatSource from 'webpack-sources/lib/ConcatSource'
import type { IPluginContext } from '@tarojs/service'

// 让其它平台插件可以继承此平台
export { XHS }

const COMMON_CSS_REG = /@import\s+['"]\.\/.+\.css['"];?/g

export default (ctx: IPluginContext) => {
  ctx.registerPlatform({
    name: 'xhs',
    useConfigName: 'mini',
    async fn ({ config }) {
      const program = new XHS(ctx, config)
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
      assets['app.css'] = new ConcatSource(match[0], content.replace(COMMON_CSS_REG, ''))
    }
  })

}
