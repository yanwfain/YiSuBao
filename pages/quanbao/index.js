// pages/quanbao/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow:false,
    countryIndex: 0,
    pickerProDataf: [
      {
        name: '请选择'
      },
      {
        name: '货币现金'
      },
      {
        name: '存款'
      },
      {
        name: '债劵'
      },
      {
        name: '土地使用权'
      },
       {
        name: '房产'
      },
      {
        name: '交通运输工具'
      },
      {
        name: '机器设备'
      },

      {
        name: '产品、原材料'
      },

      {
        name: '债权'
      },
      {
        name: '股权'
      },
      {
        name: '股票'
      },
      {
        name: '基金'
      },
      {
        name: '知识产权'
      },
      {
        name: '古玩字画'
      },
      {
        name: '其他财产'
      },
      {
        name: '保全查控'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.listIarry)
    console.log(options)
    this.setData({
      titlop: options.titlop,
      is_open: options.is_open,
      listIarry: app.globalData.listIarry
    })
    wx.setNavigationBarTitle({
      title:  this.data.listIarry.title
    })
    console.log(this.data)
    // index / getSubject
    var that = this;
    var url = app.globalData.url + '/index/getSubject';
    var params = {

    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
       
      } else {

      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
  },
  actiyFn:function(e){
    wx.navigateTo({
      url: '../city/index',
    })
  },
  searFn:function(e){
    var that = this;
    var url = app.globalData.url + '/user/getUserInfo';
    var params = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        app.globalData.is_approval == res.data.is_approval
        if (res.data.is_approval != 2) {
          wx.showModal({
            title: '提示',
            content: '您需要先进行认证才能进行下一步操作',
            success: function (res) {

              if (res.cancel) {

                //点击取消

                console.log("您点击了取消")

              } else if (res.confirm) {

                //点击确定

                console.log("您点击了确定")
                wx.navigateTo({
                  url: '../userdelit/index'
                })
              }

            }
          })
          return
        }
        if (!this.data.settitle) {
          wx.showToast({
            title: '请选择法院',
            icon: 'none'
          })
          return
        }
        if (!this.data.pickers) {
          wx.showToast({
            title: '请输入担保金额',
            icon: 'none'
          })
          return
        }
        if (this.data.countryIndex == 0) {
          wx.showToast({
            title: '请选择标的类型',
            icon: 'none'
          })
          return
        }
        var url1 = app.globalData.url + '/index/getInsuranceCompany';
        var params1 = {
          court_id: this.data.setid,
          subject_id: this.data.countryIndex,
          warrant_price: this.data.pickers,
        }
        app.wxRequest('POST', url1, params1, (res) => {
          console.log(res)
          if (res.code == 1) {
            if (res.data.length>3){
              wx.createSelectorQuery().select('#ops').boundingClientRect(function (rect) {
                // 使页面滚动到底部
                console.log(rect)
                wx.pageScrollTo({
                  scrollTop: 200
                })
              }).exec()
            }
            this.setData({
              isshow: true,
              listcnt: res.data
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
        wx.hideLoading()
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
  inpFn:function(e){
    console.log(e)
    this.setData({
      pickers: e.detail.value
    })
  },
  shnqiFmn:function(e){
    wx.navigateTo({
      url: '../shenqin/index?court_id=' + this.data.setid + '&warrant_money=' + e.currentTarget.dataset.warrant_money + '&rate=' + e.currentTarget.dataset.rate + '&insurance_company_id=' + e.currentTarget.dataset.id + '&warrant_price=' + this.data.pickers + '&type=' + this.data.countryIndex + '&tname=' + this.data.pickerProDataf[this.data.countryIndex].name
,
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
    wx.showLoading({
      title: '加载中.',
    })
    console.log(this.data)
    var that = this;
    var url = app.globalData.url + '/user/getUserInfo';
    var params = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        app.globalData.is_approval == res.data.is_approval
    
        wx.hideLoading()
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