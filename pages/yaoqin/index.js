// pages/yaoqin/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    movieList: [],
    tid:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    this.getMore(that.data.page)
  },
  getMore: function (page) {
    var that = this;
    if(this.data.tid==1){
      var url = app.globalData.url + '/user/myLineList';
    }
    if(this.data.tid==2){
      var url = app.globalData.url + '/user/myTwoLineList';
    }
   
    var params = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.code == 1) {
        if (that.data.page > 1) {
          var movieLists = that.data.movieList;
          that.setData({
            movieList: movieLists.concat(res.data.rows),
            page: page + 1
          })
        } else {
          that.setData({
            movieList: res.data.rows,
            page: page + 1
          })
        }
      } else {
        wx.showToast({
          title: '没有更多数据了！',
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  tabFn:function(e){
    this.setData({
      tid: e.currentTarget.dataset.id,
      page:1
    })
    wx.showLoading({
      title: '加载中',
    })
    this.getMore(1)
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
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    this.getMore(that.data.page);
    wx.hideLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})