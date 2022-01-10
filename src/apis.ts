import { processApis } from '@tarojs/shared'

declare const xhs: any

export function initNativeApi (taro) {
  processApis(taro, xhs)
  taro.cloud = xhs.cloud
}
