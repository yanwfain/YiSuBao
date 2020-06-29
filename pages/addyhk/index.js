// pages/addyhk/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:1,
    imgbox: [],
    imgbox1:[],
    imgbox_list: [],
    imgbox_list1:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = app.globalData.url + '/user/myPayType';
    var params = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
          this.setData({
            alipay: res.data.alipay,
            bank: res.data.bank,
            wechat: res.data.wechat,
            
          })
        if (res.data.bank){
          this.setData({
            card_num: this.data.bank.card_num,
            banks: this.data.bank.bank,
            card_name: this.data.bank.card_name,
            mobile: this.data.bank.mobile,
          })
        }
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
  },
  clickFn:function(e){
    this.setData({
      tid: e.currentTarget.dataset.id
    })
    if (e.currentTarget.dataset.id==1){
      var that = this;
      var url = app.globalData.url + '/user/myPayType';
      var params = {
        user_id: app.globalData.user_id,
      }
      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
          that.setData({
            card_num: res.data.bank.card_num,
            banks: res.data.bank.bank,
            card_name: res.data.bank.card_name,
            mobile: res.data.bank.mobile,
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
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        mobile: '',
        pay_name:'',
      })
      var that = this;
      var url = app.globalData.url + '/user/myPayType';
      var params = {
        user_id: app.globalData.user_id,
      }
      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
          that.setData({
            pay_name: res.data.wechat.pay_name,
            mobile: res.data.wechat.mobile,
          })
          that.data.imgbox.push(res.data.wechat.pay_image)
          that.setData({
            imgbox: that.data.imgbox
          })
          console.log(that.data.imgbox)
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
    if (e.currentTarget.dataset.id == 3) {
      this.setData({
        mobile: '',
        pay_name: '',
      })
      var that = this;
      var url = app.globalData.url + '/user/myPayType';
      var params = {
        user_id: app.globalData.user_id,
      }
      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
          that.setData({
            pay_name: res.data.alipay.pay_name,
            mobile: res.data.alipay.mobile,
          })
          that.data.imgbox1.push(res.data.alipay.pay_image)
          that.setData({
            imgbox1: that.data.imgbox1
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
      count: 1, // 默认9，设置图片张数
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
  // 删除照片 &&
  imgDelete11: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox1 = this.data.imgbox1;
    imgbox1.splice(index, 1)
    that.setData({
      imgbox1: imgbox1
    });
  },
  // 选择图片 &&&
  addPic11: function (e) {
    var imgbox1 = this.data.imgbox1;
    console.log(imgbox1)
    var that = this;
    // var n = 9;
    // if (9 > imgbox1.length > 0) {
    //   n = 9 - imgbox1.length;
    // } else if (imgbox1.length == 9) {
    //   n = 1;
    // }
    wx.chooseImage({
      count: 1, // 默认9，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgbox1.length == 0) {
          imgbox1 = tempFilePaths
        } else if (9 > imgbox1.length) {
          imgbox1 = imgbox1.concat(tempFilePaths);
        }
        that.setData({
          imgbox1: imgbox1
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
            that.data.imgbox_list1.push(datas.data.url);
            that.setData({
              imgbox_list1: that.data.imgbox_list1,
            });
            console.log(that.data.imgbox_list1)
          },

          fail: function (res) {
            console.log('fail');
          },
        })
      }
    })
  },

  //图片
  imgbox1: function (e) {
    this.setData({
      imgbox1: e.detail.value
    })
  },
  card_num:function(e){
    this.setData({
      card_num:e.detail.value
    })
  },
  banks:function (e) {
    this.setData({
      banks:e.detail.value
    })
  },
  card_name: function (e) {
    this.setData({
      card_name: e.detail.value
    })
  },
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  pay_name:function(e){
    this.setData({
      pay_name: e.detail.value
    })
  },
  tijiao:function(e){
    if (!this.data.card_num){
      wx.showToast({
        title: '请填写银行卡号',
        icon:'none'
      })
      return
    }
    if (!this.data.banks) {
      wx.showToast({
        title: '请填写开卡银行',
        icon: 'none'
      })
      return
    }
    if (!this.data.card_name) {
      wx.showToast({
        title: '请填写开卡人姓名',
        icon: 'none'
      })
      return
    }
    if (!this.data.mobile) {
      wx.showToast({
        title: '请填写开卡人手机号',
        icon: 'none'
      })
      return
    }
    var that = this;
    var url = app.globalData.url + '/user/addPayType';
    var params = {
      type:1,
      user_id: app.globalData.user_id,
      bank: this.data.banks ,
      card_num: this.data.card_num,
      card_name: this.data.card_name,
      mobile: this.data.mobile,
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
          wx.showToast({
            title: '提交成功',
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
  },
  tijiao1: function (e) {
    if (!this.data.card_num) {
      wx.showToast({
        title: '请填写银行卡号',
        icon: 'none'
      })
      return
    }
    if (!this.data.banks) {
      wx.showToast({
        title: '请填写开卡银行',
        icon: 'none'
      })
      return
    }
    if (!this.data.card_name) {
      wx.showToast({
        title: '请填写开卡人姓名',
        icon: 'none'
      })
      return
    }
    if (!this.data.mobile) {
      wx.showToast({
        title: '请填写开卡人手机号',
        icon: 'none'
      })
      return
    }
    var that = this;
    var url = app.globalData.url + '/user/editPayType';
    var params = {
      pay_id: 1,
      type:1,
      user_id: app.globalData.user_id,
      bank: this.data.banks,
      card_num: this.data.card_num,
      card_name: this.data.card_name,
      mobile: this.data.mobile,
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
          wx.showToast({
            title: '提交成功',
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
  },


  tijiao2: function (e) {
    if (!this.data.pay_name) {
      wx.showToast({
        title: '请填写微信名',
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
    if (this.data.imgbox_list.length<1) {
      wx.showToast({
        title: '请上传收款码',
        icon: 'none'
      })
      return
    }
    var that = this;
    var url = app.globalData.url + '/user/addPayType';
    var params = {
      type: 2,
      user_id: app.globalData.user_id,
      pay_name: this.data.pay_name,
      pay_image: this.data.imgbox_list,
      mobile: this.data.mobile,
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
       
          wx.showToast({
            title: '提交成功',
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
  },
  tijiao2_2: function (e) {
    if (!this.data.pay_name) {
      wx.showToast({
        title: '请填写微信名',
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
    if (this.data.imgbox_list.length < 1) {
      wx.showToast({
        title: '请重新上传收款码',
        icon: 'none'
      })
      return
    }
    var that = this;
    var url = app.globalData.url + '/user/editPayType';
    var params = {
      pay_id: 2,
      type:2,
      user_id: app.globalData.user_id,
      pay_name: this.data.pay_name,
      pay_image: this.data.imgbox_list,
      mobile: this.data.mobile,
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        wx.showToast({
          title: '提交成功',
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
  },

  tijiao3: function (e) {
    if (!this.data.pay_name) {
      wx.showToast({
        title: '请填写支付宝名',
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
    if (this.data.imgbox_list1.length < 1) {
      wx.showToast({
        title: '请上传收款码',
        icon: 'none'
      })
      return
    }
    var that = this;
    var url = app.globalData.url + '/user/addPayType';
    var params = {
      type:3,
      user_id: app.globalData.user_id,
      pay_name: this.data.pay_name,
      pay_image: this.data.imgbox_list1,
      mobile: this.data.mobile,
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        wx.showToast({
          title: '提交成功',
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
  },
  tijiao3_3: function (e) {
    if (!this.data.pay_name) {
      wx.showToast({
        title: '请填写支付宝名',
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
    if (this.data.imgbox_list1.length < 1) {
      wx.showToast({
        title: '请重新上传收款码',
        icon: 'none'
      })
      return
    }
    var that = this;
    var url = app.globalData.url + '/user/editPayType';
    var params = {
      pay_id: 3,
      type:3,
      user_id: app.globalData.user_id,
      pay_name: this.data.pay_name,
      pay_image: this.data.imgbox_list1,
      mobile: this.data.mobile,
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        wx.showToast({
          title: '提交成功',
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
  },
  // tijiao1: function (e) {
  //   wx.navigateTo({
  //     url: '../wxdelit/index',
  //   })
  // },
  // tijiao2: function (e) {
  //   wx.navigateTo({
  //     url: '../zfbdelit/index',
  //   })
  // },
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