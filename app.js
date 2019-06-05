//app.js
import { myUrl } from './pages/config/myconfig.js'
App({
  onLaunch: function() {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //登录操作
    wx.login({
      success: res => {
        wx.setStorageSync('code', res.code)
        wx.request({
          url: myUrl + '/getopenidandsessionkey',
          method: "POST",
          data: {
            code: res.code,
          },
          success: res => {
            wx.setStorageSync('openid', res.data.openid)
            wx.setStorageSync('session_key', res.data.session_key)
          },
          fail: err => {
            console.log(err)
          }
        })
        
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            // success: res => {
            //   // 可以将 res 发送给后台解码出 unionId
            //   wx.setStorageSync('userInfo', res.userInfo)
            //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            //   // 所以此处加入 callback 以防止这种情况
            //   if (this.userInfoReadyCallback) {
            //     this.userInfoReadyCallback(res)
            //   }
            // }
          })
        } else {
          wx.showToast({
            title: '需要先进行登录',
            icon: 'none',
            duration: 1000
          })
        }

      }
    })
  },

  globalData: {

  }
})