import { singleQuote } from '@tarojs/shared'

export const components = {
  // ======== 调整属性 ========
  Icon: {
    size: '23'
  },
  Button: {
    'data-channel': singleQuote(''),
    'share-type': singleQuote('normal'),
    bindGetPhoneNumber: '',
    bindGetUserInfo: '',
    bindOpenSetting: '',
    bindContact: '',
    bindChooseAddress: '',
    bindChooseInvoiceTitle: '',
    bindLogin: ''
  },
  Form: {
    'report-submit-timeout': '0'
  },
  Slider: {
    color: singleQuote('#e9e9e9'),
    'selected-color': singleQuote('#1aad19')
  },
  WebView: {
    'progressbar-color': singleQuote('#51a0d8')
  },
  Video: {
    'play-btn-position': singleQuote('center'),
  },
  Textarea: {
    'disable-default-padding': 'false'
  }
}
