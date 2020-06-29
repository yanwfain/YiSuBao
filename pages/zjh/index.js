// pages/zjh/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryIndex1: 0,
    pickerProDataf1: [
      {
        name: '请选择'
      },
      {
        name: '身份证'
      },
      {
        name: '护照'
      },
      {
        name: '军官证'
      },
      {
        name: '组织机构代码'
      },
      {
        name: '统一社会信用代码'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  id_num: function (e) {
    this.setData({
      id_num: e.detail.value
    })
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  pickerProChangef1: function (e) {
    this.setData({ countryIndex1: e.detail.value });
    console.log(this.data.countryIndex1)
  },
  tijiao: function (e) {
    var that = this;
    if (!this.data.name) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return
    }
    if (this.data.countryIndex1 == 0) {
      wx.showToast({
        title: '请选择证件类型',
        icon: 'none'
      })
      return
    }
    if (!this.data.id_num) {
      wx.showToast({
        title: '请填写证件号码',
        icon: 'none'
      })
      return
    }
    if (this.data.countryIndex1==1){
      var url_1 = app.globalData.url + '/index/getId';
      var params_1 = {
        name: this.data.name,
        id_num: this.data.id_num,
      }
      app.wxRequest('POST', url_1, params_1, (res) => {
        console.log(res)
        if (res.code == 1) {
          var url = app.globalData.url + '/user/editUser';
          var params = {
            user_id: app.globalData.user_id,
            id_num: this.data.id_num,
            id_num_type: this.data.countryIndex1,
            realname: this.data.name,
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
                title: res.msg,
                icon: 'none'
              })
            }
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
      })

    }else{
      var url = app.globalData.url + '/user/editUser';
      var params = {
        user_id: app.globalData.user_id,
        id_num: this.data.id_num,
        id_num_type: this.data.countryIndex1,
        realname: this.data.name,
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
            title: res.msg,
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