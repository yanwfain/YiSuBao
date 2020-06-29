//index.js
//获取应用实例
const app = getApp()
var httpUtils = require('../../js/httpUtils.js');
Page({
  data: {
    userInfo: {},
    isshowModel:false,
    hasUserInfo: true,
    isshowvie: false,
    isSiuser: false,
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    img:[
      { img: 'http://zsb.baike360.cn/public/image/10f2633670122e27bbbb0ffb2742f1d.png' },
      // { img: '../../image/10f2633670122e27bbbb0ffb2742f1d.png' },

    ],
  },
  imgHss: function (e) {
    // console.log(e)
    var winWid = wx.getSystemInfoSync().windowWidth;         //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;
    var swiperH = winWid * imgh / imgw
    // console.log(imgh)
    // console.log(swiperH)
    this.setData({
      sHeiss: swiperH  //设置高度
    })
    // console.log(this.data.sHei)
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
  qbaoFn:function(e){
    wx.navigateTo({
      url: '../quanbao/index?titlop=' + this.data.list_txt.baoxian_company + '&is_open=' + +this.data.list_txt.is_open
    })
  },
  thTabop:function(e){
   wx.navigateTo({
     url: '../indextwo/index?titlop=' + this.data.list_txt.baoxian_company
   })
  },
  ggopfn: function (e) {
    this.setData({
      hasUserInfo: true
    })
  },
  ggopfns:function(e){
    this.setData({
      isSiuser: false
    })
  },
  onLoad: function (options) {
    if (options.scene){
      this.setData({
        agent_id: options.scene
      })
    }
    var that = this;
    console.log(app.globalData)
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
    var url = app.globalData.url + '/index/getHome';
    var params = {
     
    }
    wx.showLoading({
      title: '加载中',
    })
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          imageslist: res.data.images,
          list_txt:res.data
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
          headimg: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      },
      fail: function () { },

    })


    getOpenid(that, that.data.agent_id)
  },
  getPhoneNumber: function (e) { //点击获取手机号码按钮
    var that = this;
    wx.checkSession({

      success: function () {
        console.log(e)
        console.log(e.detail.errMsg)

        console.log(e.detail.iv)

        console.log(e.detail.encryptedData)



        var ency = e.detail.encryptedData;

        var iv = e.detail.iv;

        var sessionk = that.data.sessionKey;
        // console


        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {

          that.setData({

            modalstatus: true

          });

        } else { //同意授权
          let url = app.globalData.url + '/user/getphone';
          console.log(url)
          let data = {
            encry: ency,

            iv: iv,

            sessionKey: that.data.session_key
          };
          console.log(data)

          app.wxRequest('POST', url, data, (res) => {
            wx.showLoading({
              title: '加载中'
            })
            console.log(res)
            if (res.code == 1) {
              wx.showToast({
                title: '获取成功',
                // icon: 'none'
              })
              that.setData({
                mobile: res.data.phone.phoneNumber
              })
              that.setData({
                isSiuser: false,
                // isadd:true
              })
              wx.hideLoading()
              var url = app.globalData.url + '/user/editUser';
              // let url = app.globalData.url + '/api/User/editUser';
              console.log(url)
              let data = {
                user_id: app.globalData.user_id,
                mobile: res.data.phone.phoneNumber,
              };
              console.log(data)
              app.wxRequest('POST', url, data, (res) => {
                console.log(res)
                if (res.code == 1) {
                  // getOpenid(that)

                }

              }, (err) => {
                wx.showToast({
                  title: '提交失败',
                })
                console.log(err.errMsg)
              })
            } else {
              that.setData({
                isSiuser: true,
                // isadd:false
              })
              wx.showToast({
                title: '获取失败',
                icon: 'none'
              })
            }
            that.setData({
              phoneNumber: res.data.phone.phoneNumber
            })

          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })

        }

      },

      fail: function () {

        console.log("session_key 已经失效，需要重新执行登录流程");

        that.wxlogin(); //重新登录

      }

    });
  },
  onShow:function(){

    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 500
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
    wx.showLoading({
      title: '加载中',
    })
    wx.hideLoading()
    // this.onLoad()
    this.onShow()
    wx.stopPullDownRefresh();
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
function getOpenid(that, agent_id) {
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
          if (!res.data.mobile){
            that.setData({
              isSiuser:true
            })
          } else {
            that.setData({
              isSiuser: false
            })
          }
          app.globalData.user_id = res.data.id
          app.globalData.level = res.data.level,
            app.globalData.is_approval = res.data.is_approval,
          app.globalData.user_name = res.data.name
          app.globalData.head_img = res.data.head_img
          app.globalData.all_price = res.data.all_price
          that.setData({
            headimg: res.data.head_img,
            nickName: res.data.name,
            birthday: res.data.birthday,
            phone: res.data.phone,
            real_name: res.data.real_name,
            all_price: res.data.all_price
          })
          if (res.data.status==1){
            wx.showModal({
              title: '提示',
              content: '您的账号已被限制，无法操作',
              showCancel: false,
              success: function (res) {
                if (res.cancel) {
                  //点击取
                  console.log("您点击了取消")
                } else if (res.confirm) {

                  //点击确定
                  wx.navigateTo({
                    url: '../nono/index',
                  })
                  console.log("您点击了确定")
                }
              }
            })
            return
          
          }
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
          params.agent_id = agent_id
          console.log(params.headimg)
          console.log(params.user_name)
          app.wxRequest('POST', url2, params, (res) => {
            console.log(res)
            app.wxRequest('POST', url1, params, (res) => {
              console.log(res)
              if (!res.data.mobile) {
                that.setData({
                  isSiuser: true
                })
              }else{
                that.setData({
                  isSiuser: false
                })
              }
              app.globalData.user_id = res.data.id
              app.globalData.user_name = res.data.name
              app.globalData.head_img = res.data.head_img
              app.globalData.level = res.data.level,
                app.globalData.is_approval = res.data.is_approval
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