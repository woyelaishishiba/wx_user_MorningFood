
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationList: [],
    hidden: true
  },

  onTap: function (e) {
    var location = e.currentTarget.dataset.key;
    if(location.length > 10){
      location = location.substr(0,10) + "..."
    }
    wx.setStorageSync('location', location)
    wx.switchTab({
      url: '/pages/home/home'
    })
  },

  getLocation: function () {
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.request({
          url: 'http://api.map.baidu.com/geocoder/v2/?coordtype=gcj02ll&location=' + latitude + ',' + longitude + '&output=json&pois=0&latest_admin=1&ak=RifyX8FCj9mTYQsiFNlvaCDeX1GQGvsK',
          method: "GET",
          success: function (res) {
            console.log(res.data)
            wx.setStorageSync('location', res.data.result.formatted_address.substr(res.data.result.formatted_address.indexOf('市') + 1, 10))
          },
          fail: function(error){
            console.log(error)
          }
        })
      },
      fail: function (error) {
        console.log(error)
      }
    })
    wx.switchTab({
      url: '/pages/home/home'
    })
  },

  input: function (e) {
    if (e.detail.value) {
      this.setData({
        hidden: false
      })
      this.search(e.detail.value);
    } else {
      this.setData({
        hidden: true
      })
    }
  },

  search: function (text) {
    var that = this;
    wx.request({
      url: 'http://api.map.baidu.com/place/v2/suggestion?query=' + text + '&region=大连&city_limit=true&output=json&ak=RifyX8FCj9mTYQsiFNlvaCDeX1GQGvsK',
      success: function (res) {
        that.setData({
          locationList: res.data.result
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    wx.authorize({
      scope: 'scope.userLocation',
      success: (res) => {
        console.log('获取位置权限成功')
      },
      fail: (res) => {
        console.log('获取位置权限失败')
        wx.switchTab({
          url: '/pages/home/home',
        })
      },
    })
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

  }
})