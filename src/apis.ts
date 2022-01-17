import { processApis } from '@tarojs/shared'

declare const xhs: any

export function initNativeApi (taro) {
  processApis(taro, xhs)
  // 自定义api到taro对象上
  // taro.cloud = xhs.cloud
}
