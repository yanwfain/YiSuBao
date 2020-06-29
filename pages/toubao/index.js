// pages/toubao/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    settitle:'',
    ridos:'',
    'listcnt.policy': [],
    case_num:'',
    lawyer_name:'',
    lawyer_mobile:'',
    email:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      listIarry: app.globalData.listIarry,
    })
    wx.setNavigationBarTitle({
      title:  this.data.listIarry.jx_title
    })
    if (options.order_id) {
      this.setData({
        order_id: options.order_id,
        isbtn: options.isbtn
      })
      var that = this;
      var url = app.globalData.url + '/index/getOrder';
      var params = {
        order_id: this.data.order_id
      }
      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
          that.setData({
            listcnt: res.data,
            settitle: res.data.court_id_name,
            case_num: res.data.case_num,
            recipients: res.data.recipients,
            recipients_mobile: res.data.recipients_mobile,
            address: res.data.address,
            warrant_money: res.data.warrant_money,
            warrant_price: res.data.warrant_price,
            lawyer_name: res.data.lawyer_name,
            lawyer_mobile: res.data.lawyer_mobile,
            insurance_company_name: res.data.insurance_company_name,
            insurance_company_image: res.data.insurance_company_image,
            email: res.data.email,
            status: res.data.status,
            order_sn: res.data.order_sn
          })
          if (!res.data.court_id_name || res.data.court_id_name == "null" || res.data.court_id_name == "undefined"){
            that.setData({
              court_id_name:''
            })
          }
          if (!res.data.warrant_price || res.data.warrant_price == "null" || res.data.warrant_price == "undefined") {
            that.setData({
              warrant_price: ''
            })
          }
          if (!res.data.case_num || res.data.case_num == "null" || res.data.case_num == "undefined") {
            that.setData({
              case_num: ''
            })
          }
          if (!res.data.lawyer_name || res.data.lawyer_name == "null" || res.data.lawyer_name == "undefined") {
            that.setData({
              lawyer_name: ''
            })
          }
          if (!res.data.lawyer_mobile || res.data.lawyer_mobile == "null" || res.data.lawyer_mobile == "undefined") {
            that.setData({
              lawyer_mobile: ''
            })
          }
          if (!res.data.recipients || res.data.recipients == "null" || res.data.recipients == "undefined") {
            that.setData({
              recipients: ''
            })
          }
          if (!res.data.recipients_mobile || res.data.recipients_mobile == "null" || res.data.recipients_mobile == "undefined") {
            that.setData({
              recipients_mobile: ''
            })
          }
          if (!res.data.address || res.data.address == "null" || res.data.address == "undefined") {
            that.setData({
              address: ''
            })
          }
          if (!res.data.email || res.data.email == "null" || res.data.email == "undefined") {
            that.setData({
              email: ''
            })
          }
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
    } else {
      var that = this;
      that.setData({
        settitle: options.settitle,
        setid: options.setid,
        warrant_money: options.warrant_money,
        warrant_price: options.warrant_price,
      })
      var url = app.globalData.url + '/index/addOrder';
      var params = {
        user_id: app.globalData.user_id,
        court_id: options.setid,
        insurance_company_id: options.company_id,
        warrant_price: options.warrant_price,
        warrant_money: options.warrant_money,
        warrant_rate: 1,
        order_type: 2,
        // company_id
      }
      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
          that.setData({
            order_id: res.data.order_id
          })
          var url = app.globalData.url + '/index/getOrder';
          var params = {
            user_id: app.globalData.user_id,
            order_id: that.data.order_id
          }
          app.wxRequest('POST', url, params, (res) => {
            console.log(res)
            if (res.code == 1) {
              that.setData({
                listcnt: res.data,
                case_num: res.data.case_num,
                recipients: res.data.recipients,
                recipients_mobile: res.data.recipients_mobile,
                address: res.data.address,
                warrant_money: res.data.warrant_money,
                warrant_price: res.data.warrant_price,
                insurance_company_name: res.data.insurance_company_name,
                insurance_company_image: res.data.insurance_company_image,
                insurance_company_id: res.data.insurance_company_id,
                order_sn: res.data.order_sn
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
  openshow: function (e) {
    this.setData({
      isshowModel: true
    })
    this.kefull()
  },
  falFn: function (e) {
    this.setData({
      isshowModel: false
    })
  },
  kefull:function(e){
    if (this.data.status){
      if (this.data.status == 0 || this.data.status == 1){
        var that = this;
        var url = app.globalData.url + '/index/editOrderNote';
        var params = {
          order_id: this.data.order_id,
          whether_communicate:2
        }
        app.wxRequest('POST', url, params, (res) => {
          console.log(res)
          if (res.code == 1) {


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
    }
    
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
  warrant_price:function(e){
    this.setData({
      warrant_price:e.detail.value
    })
    var num = parseInt(e.detail.value)
    if (num * 0.01 > 5000) {
      this.setData({
        warrant_money: num * 0.01
      })
    } else {
      this.setData({
        warrant_money: 5000
      })
    }
  },
  tibaoFn: function (e) {
    wx.navigateTo({
      url: '../qibao/index?order_id=' + this.data.order_id,
    })
  },
  tibaoFns: function (e) {
    wx.navigateTo({
      url: '../qibao/index?status=' + e.currentTarget.dataset.status + '&num_type=' + e.currentTarget.dataset.num_type + '&company_name=' + e.currentTarget.dataset.company_name + '&order_id=' + this.data.order_id + '&name=' + e.currentTarget.dataset.name + '&id_num=' + e.currentTarget.dataset.id_num + '&id=' + e.currentTarget.dataset.id
    })
  },
  lawyer_name: function (e) {
    this.setData({
      lawyer_name: e.detail.value
    })
  },
  lawyer_mobile: function (e) {
    this.setData({
      lawyer_mobile: e.detail.value
    })
  },
  actiyFn: function (e) {
    wx.navigateTo({
      url: '../city/index',
    })
  },
  delitwenFn: function (e) {
    wx.navigateTo({
      url: '../delitwen/index?id=3',
    })
  },
  delitwenFn1: function (e) {
    wx.navigateTo({
      url: '../delitwen/index?order_id=' + this.data.order_id,
    })
  },
  case_num:function(e){
      this.setData({
        case_num:e.detail.value
      })
  },
  submit: function (e) {
    if (!this.data.settitle) {
      wx.showToast({
        title: '请填写' + this.data.listIarry.jx_bdshouli,
        icon: 'none'
      })
      return
    }
    if (!this.data.warrant_price) {
      wx.showToast({
        title: '请填写' + this.data.listIarry.danbao,
        icon: 'none'
      })
      return
    }
    if (!this.data.listcnt.policy || this.data.listcnt.policy.length < 1) {
      wx.showToast({
        title: '请填写' + this.data.listIarry.sq_toubao,
        icon: 'none'
      })
      return
    }
    if (!this.data.recipients) {
      wx.showToast({
        title: '请填写' + this.data.listIarry.sq_youji,
        icon: 'none'
      })
      return
    }
    if (!this.data.ridos) {
      wx.showToast({
        title: '请阅读并勾选' + this.data.listIarry.jx_susong,
        icon: 'none'
      })
      return
    }
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
    var emailVar = reg.test(this.data.email);
    if (!emailVar) {
      wx.showToast({
        title: '请填写正确邮箱',
        icon: 'none'
      })
      return
    }
    var that = this;
    var url = app.globalData.url + '/index/editOrder';
      var params = {
        add: 1,
        court_id:this.data.setid,
        warrant_price: this.data.warrant_price,
        warrant_money: this.data.warrant_money,
        case_num: this.data.case_num,
        address: this.data.address,
        recipients: this.data.recipients,
        recipients_mobile: this.data.recipients_mobile,
        lawyer_name: this.data.lawyer_name,
        lawyer_mobile: this.data.lawyer_mobile,
        order_id: that.data.order_id,
        email: this.data.email,
        warrant_rate:1
      }
      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
        
          wx.redirectTo({
            url: '../wachtpicker/index?order_id=' + that.data.order_id + '&insurance_company_id=' + this.data.insurance_company_id + '&order_sn=' + this.data.order_sn + '&insurance_company_name=' + this.data.insurance_company_name + '&warrant_money=' + this.data.warrant_money,
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
    // wx.navigateTo({
    //   url: '../wacthdelit/index',
    // })
  },
  wxaddress() {
    const that = this
    const arr = {}
    wx.getSetting({
      success(res) {
        console.log(res)
        if (res.authSetting['scope.address']) {
          wx.chooseAddress({
            success(res) {
              arr['name'] = res.userName
              arr['mobile'] = res.telNumber,
                arr['city'] = res.provinceName + res.cityName + res.countyName
              arr['detail'] = res.detailInfo
              that.setData({
                eAddress: arr
              })
              console.log(that.data.eAddress)
              that.setData({
                address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
                recipients: res.userName,
                recipients_mobile: res.telNumber
              })
            }
          })
        } else {
          if (res.authSetting['scope.address'] == false) {
            wx.openSetting({
              success(res) {
                console.log(res)
                console.log(res.authSetting)
              }
            })
          } else {
            wx.chooseAddress({
              success(res) {
                console.log(res)
                arr['name'] = res.userName
                arr['mobile'] = res.telNumber,
                  arr['city'] = res.provinceName + res.cityName + res.countyName
                arr['detail'] = res.detailInfo
                that.setData({
                  eAddress: arr
                })
                console.log(that.data.eAddress)
                that.setData({
                  address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
                  recipients: res.userName,
                  recipients_mobile: res.telNumber
                })
              }
            })
          }
        }
      }
    })
  },
  email:function(e){
    this.setData({
      email:e.detail.value
    })
  },
  copyFn: function (e) {
    wx.setClipboardData({
      data: '13810463997@163.com',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  cityFn:function(e){
    wx.navigateTo({
      url: '../city/index',
    })
  },
  ycfp: function (e) {
    console.log(e)
    this.setData({
      ridos: e.detail.value
    })

  },
  riods: function (e) {
    // console.log('1')
    this.setData({
      ridos: '1'
    })
    console.log(this.data.ridos)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',

    })
    if (this.data.order_id) {
      var that = this;
      var url = app.globalData.url + '/index/getOrder';
      var params = {
        order_id: this.data.order_id
      }
      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
          that.setData({
            listcnt: res.data,

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
      wx.hideLoading()
    }

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