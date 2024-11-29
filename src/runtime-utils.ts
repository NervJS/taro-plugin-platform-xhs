import { initNativeApi } from './apis'

export { initNativeApi }

export * from './apis-list'
export * from './components'

export const hostConfig = {
  initNativeApi,
  getPathIndex (indexOfNode) {
    return `${indexOfNode}`
  },
  getMiniLifecycle (config) {
    const methods = config.page[5]
    /**
     * 兼容 taro 场景下 onShareChat 不支持的问题
     *
     * @warning 这个变更的缺陷会导致 taro 场景默认都支持 onShareChat (微信好友分享) 的功能
     *
     * 如果需要按照 taro 官方 onShareAppMessage, onShareTimeline 的方式走配置化方式
     * 需要在 taro 底层进行统一，详见 @link {https://github.com/NervJS/taro/issues/12217}
     */
    if (methods.indexOf('onShareChat') === -1) {
      methods.push('onShareChat')
    }
    if (methods.indexOf('onCopyUrl') === -1) {
      methods.push('onCopyUrl')
    }
    return config
  }
}
