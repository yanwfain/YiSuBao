// pages/youx/index.js
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

  },
  email: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  tijiao: function (e) {
    var that = this;


    if (!this.data.email) {
      wx.showToast({
        title: '请填写邮箱',
        icon: 'none'
      })
      return
    }
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
    var emailVar = reg.test(this.data.email);  
    if (!emailVar){
      wx.showToast({
        title: '请填写正确邮箱',
        icon: 'none'
      })
      return
    }


    // index / sendSms
    var url = app.globalData.url + '/user/editUser';

      var params = {
        user_id: app.globalData.user_id,
      
        email: this.data.email,
      }
    

    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        wx.navigateBack({
          delta: 1,  // 返回上一级页面。
          success: function () {
            console.log('成功！')
          }
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