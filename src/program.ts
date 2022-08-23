import { existsSync } from 'fs'
import { resolve } from 'path'
import { TaroPlatformBase } from '@tarojs/service'
import { Template } from './template'
import { components } from './components'

const PACKAGE_NAME = '@tarojs/plugin-platform-xhs'

export default class XHS extends TaroPlatformBase {
  platform = 'xhs'
  globalObject = 'xhs'
  projectConfigJson = 'project.xhs.json'
  runtimePath = `${PACKAGE_NAME}/dist/runtime`
  fileType = {
    templ: '.xhsml',
    style: '.css',
    config: '.json',
    script: '.js'
  }

  template = new Template()

  constructor (ctx, config) {
    super(ctx, config)

    if (!existsSync(resolve(ctx.ctx.appPath, 'project.xhs.json'))) {
      console.warn(`【Break Change】project.config.json 已经修改为 project.xhs.json，请确保项目中存在 project.xhs.json 文件`)
    }

    this.setupTransaction.addWrapper({
      close: this.modifyTemplate
    })
  }

  /**
   * 增加组件或修改组件属性
   */
  modifyTemplate () {
    this.template.mergeComponents(this.ctx, components)
  }
}
