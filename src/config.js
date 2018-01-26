import router from '@/router'
import qs from 'qs'
import { onSessionTimeOut, onLoginStateCheckFaild, onSendAjaxRespErr } from './common'

const _urlParams = ((_temp) => {
  return _temp ? qs.parse(_temp.substring(1, _temp.length)) : null
})(window.location.search)

export const viewPlusOptions = {
  router,
  env: 'BROWSER',
  // env: 'MOBILE_PHONE',
  debug: process.env.NODE_ENV !== 'production',
  appUrl: 'http://192.168.1.109:9999',
  // appUrl: 'http://emobile.ynrcc.com',
  // appUrl: 'http://emobile.jiiiiiin.cn',
  // jsComponents: {
  //   onModCanBeBack
  // },
  utilCache: {
    enable: true,
    onInitComplete() {
    }
  },
  jsBridge: {
    context: {
      name: 'ViewPlus'
    }
  },
  loginStateCheck: {
    isLogined: _urlParams !== null && _urlParams.l === 'true',
    checkPaths: [ // |(\/AccountManagement.+)
      /^((\/Interbus)(?!\/(SubMenu|ExchangeRateQry))\/.+)|(\/Loan.+)|(\/InvestmentFinance(?!\/(ProductHome|FinanceCalc))\/.+)|(\/TransferMoney.+)|(\/CustomerAgent.+)|(\/CreditCard.+)|(\/PersonalCenter(?!\/(OnlineRegisterPre|OnlineRegisterForEbankUserPre|VersionHome))\/.+)$/
    ],
    onLoginStateCheckFaild
  },
  utilHttp: {
    baseURL: 'http://192.168.1.109:9999/pweb',
    // baseURL: 'http://emobile.ynrcc.com/pweb',
    // baseURL: 'http://emobile.jiiiiiin.cn/pweb',
    timeout: '100000',
    // withCredentials: false,
    // mode: 'NATIVE',
    headers: ((params) => {
      // ！这样的写法只是为了方便测试和开发环境
      let res = {
        BSMobileDevice: 'ANDRIOD',
        BSMobileClientVer: '3.01',
        BSMobileClientApp: 'MOBILEBANK',
        BSMobileDeviceId: '65784CF48334634548B11F0DC5A89BC3',
        BSMobileIsBroken: '',
        BSMobileSystemVersion: '',
        Accept: 'application/json, text/plain, */*'
      }
      if (params && params.id && params.d && params.sv && params.b && params.cs) {
        res.BSMobileDeviceId = params.id
        res.BSMobileDevice = params.d
        res.BSMobileSystemVersion = params.sv
        res.BSMobileIsBroken = params.b
        res.BSMobileClientVer = params.cs
      }
      return res
    })(_urlParams || {}),
    params: {
      BankId: '9999',
      LoginType: 'K',
      _locale: 'zh_CN'
    },
    statusCodeKey: 'ReturnCode',
    statusCode: '000000',
    msgKey: 'ReturnMessage',
    needBase64DecodeMsg: true,
    defShowLoading: true,
    onSendAjaxRespErr,
    onReqErrPaserMsg: (response, errMsg) => { return `${errMsg} [服务端]` },
    accessRules: {
      sessionTimeOut: ['role.invalid_user', 'validation.user.force.logout.exception'],
      onSessionTimeOut,
      unauthorized: ['core_error_unauthorized'],
      onUnauthorized(response) {
        // TODO 待测试
        console.log('example on onUnauthorized call')
        this.uiDialog(`onUnauthorized回调：${response.ReturnMessage}`, {
          title: '错误回调'
        })
      }
    }
  }
}
