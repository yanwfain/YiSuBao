// pages/qibao/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryIndex: 0,
    countryIndex1: 0,
    countryIndex2: 0,
    pickerProDataf: [
      {
        name: '请选择'
      },
      {
        name: '自然人'
      },
      {
        name: '法人'
      },
      {
        name: '非法人组织'
      }
    ],
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
      }
    ],
    pickerProDataf2: [
      {
        name: '请选择'
      },
      {
        name: '组织机构代码证'
      },
      {
        name: '统一社会信用代码证'
      }
    ],
    ishow:false
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
      title:  this.data.listIarry.sq_toubao
    })
    if(options.status){
      this.setData({
        ishow:true,
        countryIndex: options.status,
        policy_id:options.id
      })
      if (options.status==1){
        this.setData({
          countryIndex1: options.num_type,
          inp2: options.name,
          inp3: options.id_num
        })
      }else{
        if (options.num_type==4){
          this.setData({
            countryIndex2:1
          })
        }
        if (options.num_type == 5) {
          this.setData({
            countryIndex2: 2
          })
        }
        this.setData({
          inp1: options.company_name,
          inp3: options.id_num,
          inp4:options.name
        })
      }
    }else{
      this.setData({
        ishow: false,
      })
    }
    this.setData({
      order_id: options.order_id
    })
  },
  inp4:function(e){
    this.setData({
      inp4:e.detail.value
    })
  },
  inp3: function (e) {
    this.setData({
      inp3: e.detail.value
    })
  },
  inp2: function (e) {
    this.setData({
      inp2: e.detail.value
    })
  },
  inp1: function (e) {
    this.setData({
      inp1: e.detail.value
    })
  },
  tabpicker1: function (e) {
    if (this.data.countryIndex == 0) {
      wx.showToast({
        title: '请选择被保险人类型',
        icon: 'none'
      })
      return
    }

  },
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
  },
  pickerProChangef1: function (e) {
    if (this.data.countryIndex == 0) {
      wx.showToast({
        title: '请先选择被保险人类型',
        icon: 'none'
      })
      return
    }
    this.setData({ countryIndex1: e.detail.value });
    console.log(this.data.countryIndex1)
  },
  pickerProChangef2: function (e) {
    this.setData({ countryIndex2: e.detail.value });
    console.log(this.data.countryIndex2)
  },
  inp1: function (e) {
    console.log(e)
    this.setData({
      inp1: e.detail.value
    })
  },
  inp2: function (e) {
    console.log(e)
    this.setData({
      inp2: e.detail.value
    })
  },
  inp3: function (e) {
    console.log(e)
    this.setData({
      inp3: e.detail.value
    })
  },
  inp4: function (e) {
    console.log(e)
    this.setData({
      inp4: e.detail.value
    })
  },
  submits: function (e) {
    if (this.data.countryIndex == 0) {
      wx.showToast({
        title: '请选择被保险人类型',
        icon: 'none'
      })
      return
    }
    if (this.data.countryIndex == 1) {

      if (this.data.countryIndex1 == 0) {
        wx.showToast({
          title: '请选择证件类型',
          icon: 'none'
        })
        return
      }
      if (!this.data.inp2) {
        wx.showToast({
          title: '请填写被保险人姓名',
          icon: 'none'
        })
        return
      }
      if (!this.data.inp3) {
        wx.showToast({
          title: '请填写证件号码',
          icon: 'none'
        })
        return
      }
      if (this.data.countryIndex1==1){
        var that = this;
        var url_1 = app.globalData.url + '/index/getId';
        var params_1 = {
          name: this.data.inp2,
          id_num: this.data.inp3,
        }
        app.wxRequest('POST', url_1, params_1, (res) => {
          console.log(res)
          if (res.code == 1) {
            var params = {
              status: that.data.countryIndex,
              name: that.data.inp2,
              num_type: that.data.countryIndex1,
              id_num: that.data.inp3,
              order_id: that.data.order_id,
              policy_id: that.data.policy_id
            }
            var url = app.globalData.url + '/index/editPolicy';

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
        var that = this;
        var params = {
          status: this.data.countryIndex,
          name: this.data.inp2,
          num_type: this.data.countryIndex1,
          id_num: this.data.inp3,
          order_id: this.data.order_id,
          policy_id: this.data.policy_id
        }
        var url = app.globalData.url + '/index/editPolicy';

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

          }
        }, (err) => {
          wx.showToast({
            title: '提交失败',
          })
        })
      }
    } else {
      if (this.data.countryIndex2 == 0) {
        wx.showToast({
          title: '请选择证件类型',
          icon: 'none'
        })
        return
      }
      if (this.data.inp1 == 0) {
        wx.showToast({
          title: '请输入企业名称',
          icon: 'none'
        })
        return
      }
      if (!this.data.inp4) {
        wx.showToast({
          title: '请填写法人姓名',
          icon: 'none'
        })
        return
      }
      if (!this.data.inp3) {
        wx.showToast({
          title: '请填写证件号码',
          icon: 'none'
        })
        return
      }
      if (this.data.countryIndex2 == 2) {
        var num_type = 5
      }
      if (this.data.countryIndex2 == 1) {
        var num_type = 4
      }
      var params = {
        company_name: this.data.inp1,
        status: this.data.countryIndex,
        name: this.data.inp4,
        num_type: num_type,
        id_num: this.data.inp3,
        order_id: this.data.order_id,
        policy_id: this.data.policy_id
      }
      var that = this;
      var url = app.globalData.url + '/index/editPolicy';
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

        }
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
      })
    }

  },
  submit: function (e) {
    if (this.data.countryIndex ==0){
      wx.showToast({
        title: '请选择被保险人类型',
        icon: 'none'
      })
      return
    }
    if (this.data.countryIndex == 1) {
      if (this.data.countryIndex1 == 0) {
        wx.showToast({
          title: '请选择证件类型',
          icon: 'none'
        })
        return
      }
      if (!this.data.inp2) {
        wx.showToast({
          title: '请填写被保险人姓名',
          icon: 'none'
        })
        return
      }
      if (!this.data.inp3) {
        wx.showToast({
          title: '请填写证件号码',
          icon: 'none'
        })
        return
      }
      if (this.data.countryIndex1==1){
        var that = this;
        var url_1 = app.globalData.url + '/index/getId';
        var params_1 = {
          name: this.data.inp2,
          id_num: this.data.inp3,
        }
        app.wxRequest('POST', url_1, params_1, (res) => {
          console.log(res)
          if (res.code == 1) {
            var params = {
              status: that.data.countryIndex,
              name: that.data.inp2,
              num_type: that.data.countryIndex1,
              id_num: that.data.inp3,
              order_id: that.data.order_id,
            }
            var url = app.globalData.url + '/index/addPolicy';

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
        var that = this;
        var params = {
          status: this.data.countryIndex,
          name: this.data.inp2,
          num_type: this.data.countryIndex1,
          id_num: this.data.inp3,
          order_id: this.data.order_id,
        }
        var url = app.globalData.url + '/index/addPolicy';

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

          }
        }, (err) => {
          wx.showToast({
            title: '提交失败',
          })
        })
      }
    }else{
      if (this.data.countryIndex2 == 0) {
        wx.showToast({
          title: '请选择证件类型',
          icon: 'none'
        })
        return
      }
      if (this.data.inp1 == 0) {
        wx.showToast({
          title: '请输入企业名称',
          icon: 'none'
        })
        return
      }
      if (!this.data.inp4) {
        wx.showToast({
          title: '请填写法人姓名',
          icon: 'none'
        })
        return
      }
      if (!this.data.inp3) {
        wx.showToast({
          title: '请填写证件号码',
          icon: 'none'
        })
        return
      }
      if (this.data.countryIndex2==2){
        var num_type = 5
      }
      if (this.data.countryIndex2==1){
        var num_type = 4
      }
      var params = {
        company_name: this.data.inp1,
        status: this.data.countryIndex,
        name: this.data.inp4,
        num_type: num_type,
        id_num: this.data.inp3,
        order_id: this.data.order_id,
      }
      var that = this;
      var url = app.globalData.url + '/index/addPolicy';
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