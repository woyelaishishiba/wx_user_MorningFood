// pages/order/order.js
var util = require("../../utils/util.js");
import {
  myUrl,
} from "../config/myconfig.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    startIndex: 0,
    total: 0,
    isHideLoadMore: true,
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
    var userInfo = wx.getStorageSync("userInfo")
    if (userInfo == '') {
      that.setData({
        orderList: [],
        startIndex: 0,
        total: 0,
      })
      wx.showToast({
        title: '未授权',
        icon: 'none',
        duration: 1000,
      })
      return;
    }
    wx.request({
      url: myUrl + '/getFoodInfoListLength?nickName=' + userInfo.nickName,
      method: 'GET',
      success: function(res) {
        that.setData({
          total: res.data,
        })
      },
    })
    if (that.data.orderList.length == 0) {
      that.getOrder(0)
    }
  },

  getOrder: function(startIndex) {
    var that = this;
    var userInfo = wx.getStorageSync("userInfo")
    const payload = {
      'startIndex': startIndex,
      'nickName': userInfo.nickName,
    }
    that.setData({
      isHideLoadMore: false,
    })
    wx.request({
      url: myUrl + '/getFoodInfoListByUser',
      method: 'POST',
      data: payload,
      success: function(res) {
        const orderList = res.data.map((item) => {
          const date = new Date(item.getTime);
          item.getTime = util.formatTime(date)
          return item;
        })
        console.log(orderList)
        var newData = that.data.orderList.concat(orderList)
        that.setData({
          isHideLoadMore: true,
          orderList: newData,
        })
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      orderList: [],
    })
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
    console.log("下拉菜单")
    this.setData({
      orderList: [],
      startIndex: 0,
    })
    this.getOrder(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    if (that.data.total === that.data.orderList.length) {
      return;
    }
    var nowStart = that.data.startIndex
    that.setData({
      startIndex: nowStart + 5,
      isHideLoadMore: false,
    });
    that.getOrder(nowStart + 5);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  navigatorToOrderDetail: function() {
    console.log("未实现该功能")
  },

  openToCancel: function(e) {
    var that = this;
    wx.showModal({
      title: '取消',
      content: '是否确认删除这个',
      confirmText: "确定",
      cancelText: "点错了",
      cancelColor: "#FD8238",
      confirmColor: '#FD8238',
      success: function(res) {
        if (res.confirm) {
          that.toCancel(e.currentTarget.dataset.id)
        } else {
          console.log('取消撤销菜品操作')
        }
      }
    });
  },

  toCancel: function(id) {
    var that = this;
    wx.request({
      url: myUrl + '/deleteFoodInfoList?id=' + id,
      method: 'GET',
      success: function(res) {
        var orderList = that.data.orderList;
        var deleted = -1;
        for (var i = 0; i < orderList.length; i++) {
          if (orderList[i].id === id) {
            deleted = i;
            break;
          }
        }
        orderList.splice(deleted, 1)
        that.setData({
          orderList: orderList
        })
      }
    })
  }

})