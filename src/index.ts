import XHS from './program'
import type { IPluginContext } from '@tarojs/service'

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
