// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    restaurant: [],
    location: "点击定位",
    mainFilter: 0,
    mask1Hidden: true,
    categoryList: {
      pageone: [{
        name: "美食",
        src: "/pages/images/1.png"
      }, {
        name: "甜点饮品",
        src: "/pages/images/2.png"
      }, {
        name: "超市",
        src: "/pages/images/3.png"
      }, {
        name: "正餐精选",
        src: "/pages/images/4.png"
      }, {
        name: "生鲜果蔬",
        src: "/pages/images/5.png"
      }, {
        name: "全部商家",
        src: "/pages/images/6.png"
      }, {
        name: "免配送费",
        src: "/pages/images/7.png"
      }, {
        name: "新商家",
        src: "/pages/images/8.png"
      }],
      pagetwo: [{
        name: "美食2",
        src: "/pages/images/1.png"
      }, {
        name: "甜点饮品2",
        src: "/pages/images/2.png"
      }, {
        name: "美团超市",
        src: "/pages/images/3.png"
      }, {
        name: "正餐精选2",
        src: "/pages/images/4.png"
      }, {
        name: "生鲜果蔬2",
        src: "/pages/images/5.png"
      }, {
        name: "全部商家2",
        src: "/pages/images/6.png"
      }, {
        name: "免配送费2",
        src: "/pages/images/7.png"
      }, {
        name: "新商家2",
        src: "/pages/images/8.png"
      }]
    },
    sortSelected: "综合排序"
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
    var that = this;
    wx.request({
      //easy-mock生成的虚拟数据接口链接
      url: "https://www.easy-mock.com/mock/5cdccd6645a4a610b39976ab/example/restaurant/info",
      method: "GET",
      success: function(res) { //成功得到数据，对数据进行处理
        that.setData({ //将数据发送到data中
          restaurant: res.data.data.restaurant,
          location: wx.getStorageSync('location') ? wx.getStorageSync('location') : "点击定位"
        })
      }
    });
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


  handleOpenMenu: function(e) {
    var item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../menu/menu?name=' + item.name
    })

  },

  handleMainFilter: function(e) {
    var filterNow = e.currentTarget.dataset.item.name
    var that = this;
    if (filterNow === "新商家") {
      var newRestaurant = that.data.restaurant.filter((item) => {
        return item.isNew === true
      })
      that.setData({
        //1代表为新商家
        mainFilter: filterNow === "新商家" ? 1 : 0,
        restaurant: newRestaurant
      })
    } else if (that.data.mainFilter === 1) {
      wx.request({
        url: "https://www.easy-mock.com/mock/5cdccd6645a4a610b39976ab/example/restaurant/info", //easy-mock生成的虚拟数据接口链接
        method: "GET",
        success: function(res) { //成功得到数据，对数据进行处理
          that.setData({ //将数据发送到data中
            restaurant: res.data.data.restaurant,
            mainFilter: 0
          })
        }
      });
    }
  },

  mask1Cancel: function() {
    this.setData({
      mask1Hidden: true
    })
  },

  onOverallTag: function(e) {
    this.setData({
      mask1Hidden: false
    })
  }

})