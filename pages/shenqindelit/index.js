// pages/shenqindelit/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow:false,
    input2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.id){
      if (!options.id_num || options.id_num=='undefined' ){
        this.setData({
          input2:''
        })
      }else{
        this.setData({
          input2: options.id_num
        })
      }
      this.setData({
        isshow:true,
        input1:options.name,
        id:options.id
      })
    }else{
      this.setData({
        isshow: false
      })
    }
    this.setData({
      order_id: options.order_id
    })
    var that = this
    var url = app.globalData.url + '/index/getOrder';
    var params = {
      user_id: app.globalData.user_id,
      order_id: that.data.order_id
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          listcnt: res.data.man,
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
  getBirthAndSex: function (e) {
    var ts = this;
    var code = this.data.input2 //identity 为你输入的身份证  
    console.log(code)
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var tip = "";
    var pass = true;
    var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
    if (!code || !code.match(reg)) {
      tip = "身份证号格式错误";
      pass = false;
    } else if (!city[code.substr(0, 2)]) {
      tip = "地址编码错误"; pass = false;
    } else {
      //18位身份证需要验证最后一位校验位 
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)  
        //加权因子  
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];  
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != code[17]) {
          tip = "校验位错误";
          pass = false;
        }
      }
    }
    console.log("pass===" + pass)
    this.setData({
      pass: pass
    })
    if (pass) { ts.setData({ allow_id: true }); wx.setStorageSync("idcard", code) }
    if (!pass) console.log("tip" + tip);
    return pass;
  },
  inp1:function(e){
    this.setData({
      input1: e.detail.value
    })
   
  },
  inp2: function (e) {
    this.setData({
      input2: e.detail.value

    })
  },
  submits:function(e){
    if (this.data.listcnt.length>=1){
      for (var index in this.data.listcnt){
        if (this.data.listcnt[index].name == this.data.input1){
          wx.showToast({
            title: '该被申请人已添加',
          })
          return
        }
      }
    }
    // this.getBirthAndSex()
    if (!this.data.input1) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return
    }
    // if (!this.data.input2) {
    //   wx.showToast({
    //     title: '请填写证件号码',
    //     icon:'none'
    //   })
    //   return
    // }
    // if (!this.data.pass){
    //   wx.showToast({
    //     title: '请填写正确的身份证信息',
    //     icon: 'none'
    //   })
    //   return
    // }
    var that = this;
    var url = app.globalData.url + '/index/editMan';
    var params = {
      name: that.data.input1,
      id_num: that.data.input2,
      order_id: that.data.order_id,
      man_id: that.data.id
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        wx.hideLoading()
      
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })

      }
      wx.navigateBack({
        delta: 1,  // 返回上一级页面。
        success: function () {
          console.log('成功！')
        }
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })

   
  },
  submit:function(e){
    if (this.data.listcnt.length >= 1) {
      for (var index in this.data.listcnt) {
        if (this.data.listcnt[index].name == this.data.input1) {
          wx.showToast({
            title: '该被申请人已添加',
          })
          return
        }
      }
    }
    // this.getBirthAndSex()
    if (!this.data.input1){
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      }) 
      return
    }
    // if (!this.data.input2) {
    //   wx.showToast({
    //     title: '请填写身份证',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if (!this.data.pass) {
    //   wx.showToast({
    //     title: '请填写正确的身份证信息',
    //     icon: 'none'
    //   })
    //   return
    // }
    var that = this;
    var url = app.globalData.url + '/index/addMan';
    var params = {
      name: that.data.input1,
      id_num: that.data.input2,
      order_id: that.data.order_id,
      man_id: that.data.id
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        wx.hideLoading()
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