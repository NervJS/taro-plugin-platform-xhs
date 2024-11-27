/* eslint-disable no-console */
import { IPluginContext, TaroPlatformBase } from '@tarojs/service'
import { existsSync, readJSONSync } from 'fs-extra'
import { join, resolve } from 'path'

import { components } from './components'
import { RecursiveTemplate, RecursiveXsTemplate, UnRecursiveTemplate, UnRecursiveXsTemplate } from './template'

import type { IOptions } from './index'

const pkg = require('../package.json')

const PACKAGE_NAME = pkg.name

const templateTypes: IOptions['template'][] = [
  'recursive',
  'recursiveXs',
  'unRecursive',
  'unRecursiveXs',
]
export default class XHS extends TaroPlatformBase {
  platform = 'xhs'
  globalObject = 'xhs'
  projectConfigJson = 'project.xhs.json'
  runtimePath = `${PACKAGE_NAME}/dist/runtime`
  taroComponentsPath = `${PACKAGE_NAME}/dist/components-react`
  fileType = {
    templ: '.xhsml',
    style: '.css',
    config: '.json',
    script: '.js',
    xs: '.sjs'
  }

  template = new RecursiveTemplate()

  constructor (ctx: IPluginContext, config, options: IOptions) {
    super(ctx, config)

    const projectConfigJsonPath = resolve(ctx.ctx.appPath, 'project.xhs.json')
    if (!existsSync(projectConfigJsonPath)) {
      throw new Error(`请确保项目中存在与project.config.json 同级的 project.xhs.json 文件`)
    }

    const { chalk } = ctx.helper
    const tips : string[] = []
    tips.push(chalk.yellowBright([
      `编译到小红书平台时, 您的小红书IDE版本需要 > 2.3.1`,
      `基础库版本需 >= 3.102.3 需在 project.xhs.json libVersion 和 专业号后台 设置`,
      `服务商需调用 https://miniapp.xiaohongshu.com/docsV2/doc/DC056776 设置最低基础库版本`
    ].join('\n ')))

    tips.push(chalk.yellowBright([
      `若页面不能正常运行可在config文件夹中调整插件 ${PACKAGE_NAME} 的 template 配置项`,
      `可选值为 ${templateTypes.join(' | ')} 默认为 ${templateTypes[0]}`,
    ].join('\n ')))

    if (typeof options.template !== 'undefined' && !templateTypes.includes(options.template)) {
      throw new Error(`插件 ${PACKAGE_NAME} 的 options.template 配置项只能为 ${templateTypes.join(' | ')} , 当前为 '${options.template}'`)
    } else if (typeof options.template !== 'undefined') {
      // 如果用户配置了模板类型，以用户配置为准
      switch (options.template) {
        case 'recursive':
          this.template = new RecursiveTemplate()
          break
        case 'recursiveXs':
          this.template = new RecursiveXsTemplate()
          break
        case 'unRecursive':
          this.template = new UnRecursiveTemplate()
          break
        case 'unRecursiveXs':
          this.template = new UnRecursiveXsTemplate()
          break
      }
    } else {
      this.template = new RecursiveTemplate()
    }

    if (tips.length) {
      console.log(chalk.bold(chalk.yellowBright(`[${PACKAGE_NAME}]:`)))
      tips.forEach((item, index) => console.log(`${chalk.yellowBright(index + 1)}. ${item}`))
      console.log('\n')
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
  modifyTemplate () {
    this.template.mergeComponents(this.ctx, components)
  }

  /**
   * 在 project.config.json 中添加框架信息，方便产物能被 IDE 消费和上报
   */
  addFrameworkInfoToProjectConfigJson () {
    const info = {
      framework: {
        platform: 'Taro',
        // 使用框架
        version: this.ctx.initialConfig.framework,
        // taro版本
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

    const distProjectConfig = { ...origProjectConfig }
    if (origProjectConfig.compileType !== 'plugin') {
      distProjectConfig.miniprogramRoot = './'
    }
    this.ctx.writeFileToDist({
      filePath: 'project.config.json',
      content: JSON.stringify({ ...distProjectConfig, ...info }, null, 2)
    })
  }
}
