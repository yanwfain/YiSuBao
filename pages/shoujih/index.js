// pages/shoujih/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonDisable: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  code: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  butn: function (e) {
    var that = this
    if (!this.data.buttonDisable) {

      var mobile = this.data.mobile;
      var regMobile = /^[1][3,4,5,6,7,8][0-9]{9}$/;
      if (!regMobile.test(mobile)) {
        wx.showToast({
          icon: 'none',
          title: '手机号有误！'
        })
        return false;
      }
      var c = 60;
      var intervalId = setInterval(function () {
        c = c - 1;
        that.setData({
          verifyCodeTime: '重新获取' + (c),
          buttonDisable: true
        })

        console.log(c)
        if (c == 0) {
          clearInterval(intervalId);
          that.setData({
            verifyCodeTime: '发送验证码',
            buttonDisable: false
          })
        }
      }, 1000)
      var url = app.globalData.url + '/index/sendSms';
      var params = {
        user_id: app.globalData.user_id,
        mobile: this.data.mobile,

      }
      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
          that.setData({
            codess: res.data.code
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
    }
  },
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  tijiao: function (e) {
    var that = this;
    // if (!this.data.email) {
    //   wx.showToast({
    //     title: '请填写邮箱',
    //     icon: 'none'
    //   })
    //   return
    // }
    if (!this.data.mobile) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return
    }
    if (this.data.codess != this.data.code) {
      wx.showToast({
        title: '验证码不正确',
        icon: 'none'
      })
      return
    }
    // index / sendSms
    var url = app.globalData.url + '/user/editUser';

      var params = {
        user_id: app.globalData.user_id,
        code: this.data.code,
        mobile: this.data.mobile,
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