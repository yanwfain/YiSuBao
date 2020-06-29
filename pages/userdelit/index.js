// pages/addyhk/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbox: [],
    realname: '',
    mobile: '',
    id_num: '',
    lawyer_num: '',
    lawyer: '',
    email: '',
    code:'',
    countryIndex: 0,
    imgbox_list:[],
    pickerProDataf: [
      {
        name: '请选择'
      },
      {
        name: '普通用户'
      },
      {
        name: '律师用户'
      }
    ],
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
    buttonDisable: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var url = app.globalData.url + '/index/getPayInfo';
    // var params = {
    //   insurance_company_id: options.insurance_company_id
    // }
    // app.wxRequest('POST', url, params, (res) => {
    //   console.log(res)
    //   if (res.code == 1) {
    //     that.setData({
    //       list: res.data
    //     })
    //   } else {
    //     wx.showToast({
    //       title: '暂无数据',
    //       icon: 'none'
    //     })
    //   }
    // }, (err) => {
    //   wx.showToast({
    //     title: '提交失败',
    //   })
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
                address_delit: that.data.eAddress.city + that.data.eAddress.detail
              })
              console.log(that.data.address_delit)
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
                  address_delit: that.data.eAddress.city + that.data.eAddress.detail
                })
                console.log(that.data.address_delit)
              }
            })
          }
        }
      }
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
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  pickerProChangef: function (e) {
    this.setData({ countryIndex: e.detail.value });
    console.log(this.data.countryIndex)
  },
  pickerProChangef1: function (e) {
    this.setData({ countryIndex1: e.detail.value });
    console.log(this.data.countryIndex1)
  },
  // 删除照片 &&
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 选择图片 &&&
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var that = this;
    // var n = 9;
    // if (9 > imgbox.length > 0) {
    //   n = 9 - imgbox.length;
    // } else if (imgbox.length == 9) {
    //   n = 1;
    // }
    wx.chooseImage({
      count:1, // 默认9，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (9 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          imgbox: imgbox
        });
        wx.uploadFile({
          url: app.globalData.url + '/common/upload',      //此处换上你的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
          },
          formData: {
            'user': 'test'  //其他额外的formdata，可不写
          },
          success: function (res) {
            // if (res.statusCode==200){
            //   wx.hideLoading()
            // }
            console.log(res)
            var datas = JSON.parse(res.data);
            console.log(datas)
            that.data.imgbox_list.push(datas.data.url);
            that.setData({
              imgbox_list: that.data.imgbox_list,
            });
            console.log(that.data.imgbox_list)
          },
          fail: function (res) {
            console.log('fail');
          },
        })
      }
    })
  },

  //图片
  imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
    })
  },
  realname:function(e){
    this.setData({
      realname:e.detail.value
    })
  },
  lawyer_num:function(e){
    this.setData({ lawyer_num: e.detail.value})
  
  },
  lawyer: function (e) {
    this.setData({ lawyer: e.detail.value })

  },
  code:function(e){
    this.setData({
      code: e.detail.value
    })
  },
  email:function(e){
    this.setData({
      email: e.detail.value
    })
  },
  id_num:function(e){
    this.setData({
      id_num:e.detail.value
    })
  },
  tijiao: function (e) {
    var that = this;
    if (this.data.countryIndex==0){
      wx.showToast({
        title: '请选择身份类型',
        icon:'none'
      })
      return
    }
    if (!this.data.realname) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return
    }
    if (this.data.countryIndex1==0) {
      wx.showToast({
        title: '请选择证件类型',
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
    if (!this.data.mobile) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return
    }
    if (this.data.codess != this.data.code){
      wx.showToast({
        title: '验证码不正确',
        icon: 'none'
      })
      return
    }
    if (this.data.countryIndex == 2 && !this.data.lawyer_num) {
      wx.showToast({
        title: '请填写律师证号',
        icon: 'none'
      })
      return
    }
    if (this.data.countryIndex == 2 && !this.data.lawyer) {
      wx.showToast({
        title: '请填写律所名称',
        icon: 'none'
      })
      return
    }
    if (this.data.countryIndex == 2 && this.data.imgbox_list.length<1) {
      wx.showToast({
        title: '请上传律师人像照',
        icon: 'none'
      })
      return
    }
    if (this.data.countryIndex1==1){
      var url_1 = app.globalData.url + '/index/getId';
      var params_1 = {
        name: this.data.realname,
        id_num: this.data.id_num,
      }
      app.wxRequest('POST', url_1, params_1, (res) => {
        console.log(res)
        if (res.code == 1) {
          var url = app.globalData.url + '/user/editUser';
          if (that.data.countryIndex == 1) {
            var params = {
              user_id: app.globalData.user_id,
              mobile: that.data.mobile,
              realname: that.data.realname,
              id_num_type: that.data.countryIndex1,
              id_num: that.data.id_num,
              level: that.data.countryIndex,
              code: that.data.code,
              email: that.data.email
            }
          } if (that.data.countryIndex == 2) {
            var params = {
              user_id: app.globalData.user_id,
              mobile: that.data.mobile,
              realname: that.data.realname,
              id_num_type: that.data.countryIndex1,
              id_num: that.data.id_num,
              level: that.data.countryIndex,
              lawyer_num: that.data.lawyer_num,
              Lawyer: that.data.lawyer,
              code: that.data.code,
              image: that.data.imgbox_list,
              email: that.data.email
            }
          }

          app.wxRequest('POST', url, params, (res) => {
            console.log(res)
            if (res.code == 1) {
              wx.showModal({
                title: '提示',
                content: res.msg,
                showCancel: false,
                success: function (res) {
                  if (res.cancel) {
                    //点击取消
                    console.log("您点击了取消")
                  } else if (res.confirm) {

                    //点击确定
                    wx.navigateBack({
                      delta: 1,  // 返回上一级页面。
                      success: function () {
                        console.log('成功！')
                      }
                    })
                    console.log("您点击了确定")
                  }

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
      if (that.data.countryIndex == 1) {
        var params = {
          user_id: app.globalData.user_id,
          mobile: that.data.mobile,
          realname: that.data.realname,
          id_num_type: that.data.countryIndex1,
          id_num: that.data.id_num,
          level: that.data.countryIndex,
          code: that.data.code,
          email: that.data.email
        }
      } if (that.data.countryIndex == 2) {
        var params = {
          user_id: app.globalData.user_id,
          mobile: that.data.mobile,
          realname: that.data.realname,
          id_num_type: that.data.countryIndex1,
          id_num: that.data.id_num,
          level: that.data.countryIndex,
          lawyer_num: that.data.lawyer_num,
          Lawyer: that.data.lawyer,
          code: that.data.code,
          image: that.data.imgbox_list,
          email: that.data.email
        }
      }

      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
          wx.showModal({
            title: '提示',
            content: res.msg,
            showCancel: false,
            success: function (res) {
              if (res.cancel) {
                //点击取消
                console.log("您点击了取消")
              } else if (res.confirm) {

                //点击确定
                wx.navigateBack({
                  delta: 1,  // 返回上一级页面。
                  success: function () {
                    console.log('成功！')
                  }
                })
                console.log("您点击了确定")
              }

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