// pages/myinfo/myinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (wx.getStorageSync("userInfo") !== "") {
      this.setData({
        isLogin: true
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //进入登录界面
  toLogin: function() {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  exit: function() {
    var that = this;
    wx.showModal({
      title: '',
      content: '请确认是否退出登录',
      confirmColor: "#FD8238",
      success(res) {
        if (res.confirm) {
          that.setData({
            isLogin: false
          });
          wx.removeStorageSync("userInfo");
        }
      }
    });
  },

  navigatorToOrder: function () {
    wx.switchTab({
      url: '/pages/order/order',
    })
  }

})