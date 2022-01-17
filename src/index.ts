import XHS from './program'
import type { IPluginContext } from '@tarojs/service'
// 小红书系纵向扩展
export { XHS }

export default (ctx: IPluginContext) => {
  ctx.registerPlatform({
    name: 'xhs',
    useConfigName: 'mini',
    async fn ({ config }) {
      const program = new XHS(ctx, config)
      await program.start()
    }
  })
}
