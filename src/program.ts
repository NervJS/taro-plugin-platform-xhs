import { existsSync, readJSONSync } from 'fs-extra'
import { resolve, join } from 'path'
import { IPluginContext, TaroPlatformBase } from '@tarojs/service'
import { Template } from './template'
import { components } from './components'
import packageJson from '../package.json'

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

  constructor(ctx: IPluginContext, config) {
    super(ctx, config)

    if (!existsSync(resolve(ctx.ctx.appPath, 'project.xhs.json'))) {
      console.warn(`【Break Change】project.config.json 已经修改为 project.xhs.json，请确保项目中存在 project.xhs.json 文件`)
    }

    this.setupTransaction.addWrapper({
      close: () => {
        this.modifyTemplate()
        ctx.generateFrameworkInfo()
        this.addFrameworkInfoToProjectConfigJson()
      }
    })
  }

  /**
   * 增加组件或修改组件属性
   */
  modifyTemplate() {
    this.template.mergeComponents(this.ctx, components)
  }

  /**
   * 在 project.config.json 中添加框架信息，方便产物能被 IDE 消费和上报
   */
  addFrameworkInfoToProjectConfigJson() {
    const info = {
      framework: {
        tool: 'Taro',
        name: packageJson.name,
        version: packageJson.version,
      }
    }

    const { appPath, sourcePath } = this.ctx.paths

    // 生成 project.config.json
    const projectConfigFileName = this.projectConfigJson
    let projectConfigPath = join(appPath, projectConfigFileName)
    if (!existsSync(projectConfigPath)) {
      // 若项目根目录不存在对应平台的 projectConfig 文件，则尝试从源代码目录查找
      projectConfigPath = join(sourcePath, projectConfigFileName)
      if (!existsSync(projectConfigPath)) return
    }

    const origProjectConfig = readJSONSync(projectConfigPath)

    let distProjectConfig = origProjectConfig
    if (origProjectConfig.compileType !== 'plugin') {
      distProjectConfig = Object.assign({}, origProjectConfig, { miniprogramRoot: './' })
    }
    this.ctx.writeFileToDist({
      filePath: 'project.config.json',
      content: JSON.stringify({ ...distProjectConfig, ...info }, null, 2)
    })
  }
}
