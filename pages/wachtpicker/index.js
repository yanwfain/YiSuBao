// pages/wachtpicker/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      listIarry: app.globalData.listIarry,
    })
    wx.setNavigationBarTitle({
      title:  this.data.listIarry.zf_title
    })
    this.setData({
      insurance_company_id: options.insurance_company_id,
      order_sn: options.order_sn,
      insurance_company_name: options.insurance_company_name,
      warrant_money: options.warrant_money,
      order_id: options.order_id
    })
    var url = app.globalData.url + '/index/getPayInfo';
    var params = {
      insurance_company_id: options.insurance_company_id
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          list:res.data
        })
      } else {
        wx.showToast({
          title: '暂无数据',
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  submit:function(e){
    wx.navigateTo({
      url: '../dapinz/index?order_id=' + this.data.order_id,
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

  }
})