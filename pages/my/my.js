// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodNum: ["aaa", "bbb"],
    total_fee: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: res => {
        if (res.code) {
          console.log("获取到的code" + res.code)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var url = "这里设置自己的url"
          wx.request({
            url: "http://localhost:8080/getopenid",
            data: {
              class: "ajsjaksdqwdw",
              code: res.code,
              name: "hhh"
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            success: res => {
              var openid = res.data;
              console.log(res)
              wx.setStorage({
                key: 'openid',
                data: openid,
              })
            },
            fail: error => {
              console.log(error)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  addPrice: function (e) {
    var that = this;
    var now_fee = this.data.total_fee + 10
    that.setData({
      total_fee: now_fee
    })
  },

  startPay: function (e) {
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        //该步骤调用签名数据
        console.log("开始请求签名" + res.data)
        wx.request({
          url: "http://localhost:8080/getpaymentinfo",
          method: 'POST',
          data: {
            foodNum: that.data.foodNum,  /*所点的食品*/
            total_fee: that.data.total_fee,   /*订单金额*/
            openid: res.data
          },
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            console.log(res)
            wx.requestPayment({
              'timeStamp': res.data.timeStamp,
              'nonceStr': res.data.nonceStr,
              'package': res.data.mypackage,
              'signType': 'MD5',
              'paySign': res.data.paySign,
              'success': function (res) {
                console.log("支付成功")
                console.log(res);
              },
              'fail': function (res) {
                console.log("支付失败")
                console.log('fail:' + JSON.stringify(res));
              }
            })

          }
        })

      },
    })
  },

})