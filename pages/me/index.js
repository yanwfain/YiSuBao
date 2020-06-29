// pages/me/index.js
var app = getApp()
var httpUtils = require('../../js/httpUtils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    isshowModel:false,
  },
  listFkn:function(e){
    wx.navigateTo({
      url: '../xiaoxilist/index',
    })
  },
  ggopfn: function (e) {
    this.setData({
      hasUserInfo: true
    })
  },
  openshow: function (e) {
    this.setData({
      isshowModel: true
    })
  },
  falFn: function (e) {
    this.setData({
      isshowModel: false
    })
  },
  open: function () {
    wx.showActionSheet({
      itemList: ['400-818-8686'],
      success: function (res) {
        console.log(res) //当点击400-900-2250就相当于点击了
        wx.makePhoneCall({
          phoneNumber: '400-818-8686', //此号码并非真实电话号码，仅用于测试  
          success: function () {
            console.log("拨打电话成功！")
          },
          fail: function () {
            console.log("拨打电话失败！")
          }
        })
        if (!res.cancel) {
          console.log(res.tapIndex)//console出了下标
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName,
    })
    var that = this;
    setTimeout(function () {
      if (app.globalData.userInfo == null) {
        that.setData({
          hasUserInfo: false,
          isUser: false
        })
      }
    }, 1000)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        isUser: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          isUser: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            isUser: true
          })
        }
      })
    }
    let url = app.globalData.url + '/user/getUserInfo';
    console.log(url)
    let data = {
      user_id: app.globalData.user_id
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      that.setData({
        list:res.data
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
  },
  getUserInfo(e) {

    console.log("ok")
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res)

        app.globalData.userInfo = res.userInfo
        that.setData({
          encryptedData: res.encryptedData,
          iv: res.iv,
          rawData: res.rawData,
          wxuser: res.userInfo,
          signature: res.signature,
          hasUserInfo: true,
          canIUse: true,
          isUser: true,
          isSiuser: false,
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      },
      fail: function () { },

    })
     getOpenid(that)
     this.onShow()
  },
  tixianFn:function(e){
    wx.navigateTo({
      url: '../tixian/index?current_score=' + this.data.list.current_score,
    })
  },
  userFn:function(e){
    wx.navigateTo({
      url: '../userdelit/index',
    })
  },
  jifenFn:function(e){

    wx.navigateTo({
      url: '../jifen/index?current_score=' + this.data.list.current_score,
    })
  },
  ddantab:function(e){
    wx.navigateTo({
      url: '../ddandelit/index?tid=0',
    })
  },
  clickFn:function(e){
    wx.navigateTo({
      url: '../ddandelit/index?tid=' + e.currentTarget.dataset.id,
    })
  },
  yapqing:function(e){
    wx.navigateTo({
      url: '../yaoqin/index',
    })
  },
  kehuddDn:function(e){
    wx.navigateTo({
      url: '../kedudelit/index',
    })
  },
  yhkFn:function(e){
    wx.navigateTo({
      url: '../addyhk/index',
    })
  },
  imgFn:function(e){
    wx.navigateTo({
      url: '../resssgn/index',
    })
  },
  zjh:function(e){
    wx.navigateTo({
      url: '../zjh/index',
    })
  },
  shoujih:function(e){
    wx.navigateTo({
      url: '../shoujih/index',
    })
  },
  youx:function(e){
    wx.navigateTo({
      url: '../youx/index',
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
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 500
    })
    var that = this
    this.onLoad()
    getOpenid(that)
    
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
    this.onShow()
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
function getOpenid(that) {
  var url = app.globalData.url + '/index/getOpenid';
  var url1 = app.globalData.url + '/user/getUserInfo';
  var url2 = app.globalData.url + '/user/addUser';
  console.log(that)
  var params = {};
  params.appId = 'wx589a0532f1d28a02';
  console.log(params.appId);
  var wxlogin = httpUtils.httpPromise(wx.login);
  wxlogin().then(function (res) {
    console.log(res)
    params.code = res.code;
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      // var that = this;
      app.globalData.openId = res.data.openid
      that.setData({
        session_key: res.data.session_key
      })
      params.openid = res.data.openid;
      app.wxRequest('POST', url1, params, (res) => {
        console.log(res)
        if (res.code == '1') {

          app.globalData.user_id = res.data.id
          app.globalData.user_name = res.data.name
          app.globalData.head_img = res.data.head_img
          app.globalData.all_price = res.data.all_price
          app.globalData.level = res.data.level
          that.setData({
            headimg: res.data.head_img,
            nickName: res.data.name,
            birthday: res.data.birthday,
            phone: res.data.phone,
            real_name: res.data.real_name,
            all_price: res.data.all_price,
            menber:res.data
          })
        }
        if (res.code == '0') {
          console.log(app.globalData.userInfo)
          // var params1 = {

          // };
          app.globalData.head_img = app.globalData.userInfo.avatarUrl
          params.openid = app.globalData.openId;
          params.headimg = app.globalData.userInfo.avatarUrl;
          params.user_name = app.globalData.userInfo.nickName;
          params.sex = app.globalData.userInfo.gender;
          console.log(params.headimg)
          console.log(params.user_name)
          app.wxRequest('POST', url2, params, (res) => {
            console.log(res)
            app.wxRequest('POST', url1, params, (res) => {
              console.log(res)
              app.globalData.user_id = res.data.id
              app.globalData.user_name = res.data.name
              app.globalData.head_img = res.data.head_img
              app.globalData.level = res.data.level
            }, (err) => {
              wx.showToast({
                title: '提交失败',
              })
              console.log(err.errMsg)
            })
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }

      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    var params1 = {
      openid: app.globalData.openId
    }


  })

}