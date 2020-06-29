// pages/caichan/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow:false,
    subject_id: '',
    property_value: '',
    property_note: '',
    open_bank: '',
    bank_num: '',
    num: '',
    land_authority: '',
    land_type: '',
    land_address: '',
    land_num: '',
    land_name: '',
    car_num: '',
    bonds_name: '',
    company:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    let url = app.globalData.url + '/index/getAssetsClue';
    console.log(url)
    let data = {};
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)

      this.setData({
        pickerProDataf: res.data
      })

    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    console.log(options)
    if (options.subject_id ){
      if(options.subject_id==1){
        this.setData({
          countryIndex: 0,
        })
      }else{
        this.setData({
          countryIndex: parseInt(options.subject_id) - 1,
        })
      }
      if (options.land_type == 1) {
        this.setData({
          countryIndex1: 0,
        })
      } else {
        this.setData({
          countryIndex1: parseInt(options.land_type) - 1,
        })
      }
      this.setData({

        
        note_id: options.id,
        bank_num: options.bank_num,
        bonds_name: options.bonds_name,
        car_num: options.car_num,
        company: options.company,
        land_address: options.land_address,
        land_authority: options.land_authority,
        land_name: options.land_name,
        land_num: options.land_num,

        num: options.num,
        open_bank: options.open_bank,
        property_note: options.property_note,
        property_value: options.property_value,
        isshow:true
      })
    }else{
      this.setData({
        isshow: false
      })
    }
    this.setData({
      order_id: options.order_id
    })
  },
  property_value: function(e) {
    console.log(e)
    this.setData({
      property_value: e.detail.value
    })
  },
  pickerProChangef: function(e) {
    this.setData({
      countryIndex: e.detail.value,
    });

    console.log(this.data.pickerProDataf[e.detail.value])
    console.log(this.data.countryIndex)
  },
  // 债劵
  land_type:function(e){
    this.setData({
      countryIndex1: e.detail.value,
      land_typeindex: parseInt(e.detail.value) +1
    });
    console.log(parseInt(e.detail.value) + 1)
  },
  //财产描述
  property_note:function(e){
    this.setData({
      property_note: e.detail.value
    })
  },
  // 开户行
  open_bank:function(e){
    this.setData({
      open_bank: e.detail.value
    })
  },
  // 银行账号
  bank_num:function(e){
    this.setData({
      bank_num: e.detail.value
    })
  },
  // 数量
  num:function(e){
    this.setData({
      num: e.detail.value
    })
  },
  // 土地登记机关
  land_authority:function(e){
    this.setData({
      land_authority: e.detail.value
    })
  },
  // 土地坐落地址
  land_address:function(e){
    this.setData({
      land_address: e.detail.value
    })
  },
  // "证照号码"
  land_num:function(e){
    this.setData({
      land_num: e.detail.value
    })
  },
  // "土地名称"
  land_name:function(e){
    this.setData({
      land_name: e.detail.value
    })
  },
  // "车牌号"
  car_num:function(e){
    this.setData({
      car_num: e.detail.value
    })
  },
  // "机械设备名称"
  bonds_name:function(e){
    this.setData({
      bonds_name: e.detail.value
    })
  },
  // "品名"
  land_name:function(e){
    this.setData({
      land_name: e.detail.value
    })
  },
  // "所在企业"
  company:function(e){
    this.setData({
      company: e.detail.value
    })
  },
  submit:function(e){
    if (!this.data.countryIndex){
      wx.showToast({
        title: '请选择被保险人类型',
        icon:'none'
      })
      return
    }
    if (this.data.countryIndex==0){
      if (!this.data.property_value){
        wx.showToast({
          title: '请填写财产价值',
          icon:'none'
        })
        return
      }
      if (!this.data.property_note) {
        wx.showToast({
          title: '请填写财产描述',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex ==1) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.bank_num) {
        wx.showToast({
          title: '请填写银行账号',
          icon: 'none'
        })
        return
      }
      if (!this.data.open_bank) {
        wx.showToast({
          title: '请填写开户行',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 2) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.countryIndex1) {
        wx.showToast({
          title: '请选择种类',
          icon: 'none'
        })
        return
      }
      if (!this.data.num) {
        wx.showToast({
          title: '请填写数量',
          icon: 'none'
        })
        return
      }

    }
    if (this.data.countryIndex == 3) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.countryIndex1) {
        wx.showToast({
          title: '请选择证照类型',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_address) {
        wx.showToast({
          title: '请填写土地坐落地址',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_authority) {
        wx.showToast({
          title: '请填写土地登记机关',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_num) {
        wx.showToast({
          title: '请填写证照号码',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 4) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.countryIndex1) {
        wx.showToast({
          title: '请选择证照类型',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_address) {
        wx.showToast({
          title: '请填写房产坐落地址',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_num) {
        wx.showToast({
          title: '请填写房产证件号码',
          icon: 'none'
        })
        return
      }
     
    }
    if (this.data.countryIndex == 5) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.car_num) {
        wx.showToast({
          title: '请填写车牌号',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex ==6) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.bonds_name) {
        wx.showToast({
          title: '请填写机械设备名称',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 7) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.countryIndex1) {
        wx.showToast({
          title: '请选择种类',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_name) {
        wx.showToast({
          title: '请填写品名',
          icon: 'none'
        })
        return
      }
      if (!this.data.num) {
        wx.showToast({
          title: '请填数量',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 8) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }

      if (!this.data.bonds_name) {
        wx.showToast({
          title: '请填写债务人',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 9) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }

      if (!this.data.company) {
        wx.showToast({
          title: '请填写所在企业',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 10) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 11) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 12) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_name) {
        wx.showToast({
          title: '请填写名称',
          icon: 'none'
        })
        return
      }
      if (!this.data.countryIndex1) {
        wx.showToast({
          title: '请选择知识产权证照',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 13) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.property_note) {
        wx.showToast({
          title: '请填写财产/线索描述',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 13) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.property_note) {
        wx.showToast({
          title: '请填写财产/线索描述',
          icon: 'none'
        })
        return
      }
      if (!this.data.num) {
        wx.showToast({
          title: '请填写数量',
          icon: 'none'
        })
        return
      }
    }
    var that = this;
    var url = app.globalData.url + '/index/addNote';
    if (this.data.pickerProDataf[this.data.countryIndex].text.type){
      var params = {
        order_id: this.data.order_id,
        subject_id: parseInt(this.data.countryIndex) + 1,
        land_type: parseInt(this.data.countryIndex1) + 1,
        property_value: this.data.property_value,
        property_note: this.data.property_note,
        open_bank: this.data.open_bank,
        bank_num: this.data.bank_num,
        num: this.data.num,
        land_authority: this.data.land_authority,
        land_address: this.data.land_address,
        land_num: this.data.land_num,
        land_name: this.data.land_name,
        car_num: this.data.car_num,
        bonds_name: this.data.bonds_name,
        company: this.data.company,
      }
    }else{
      var params = {
        order_id: this.data.order_id,
        subject_id: parseInt(this.data.countryIndex) + 1,
        property_value: this.data.property_value,
        property_note: this.data.property_note,
        open_bank: this.data.open_bank,
        bank_num: this.data.bank_num,
        num: this.data.num,
        land_authority: this.data.land_authority,
        land_address: this.data.land_address,
        land_num: this.data.land_num,
        land_name: this.data.land_name,
        car_num: this.data.car_num,
        bonds_name: this.data.bonds_name,
        company: this.data.company,
      }
    }

    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          list: res.data
        })
      } else {

      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      success: function () {
        console.log('成功！')
      }
    })
  },
  submits: function (e) {
    if (!this.data.countryIndex) {
      wx.showToast({
        title: '请选择被保险人类型',
        icon: 'none'
      })
      return
    }
    if (this.data.countryIndex == 0) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.property_note) {
        wx.showToast({
          title: '请填写财产描述',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 1) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.bank_num) {
        wx.showToast({
          title: '请填写银行账号',
          icon: 'none'
        })
        return
      }
      if (!this.data.open_bank) {
        wx.showToast({
          title: '请填写开户行',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 2) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.countryIndex1) {
        wx.showToast({
          title: '请选择种类',
          icon: 'none'
        })
        return
      }
      if (!this.data.num) {
        wx.showToast({
          title: '请填写数量',
          icon: 'none'
        })
        return
      }

    }
    if (this.data.countryIndex == 3) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.countryIndex1) {
        wx.showToast({
          title: '请选择证照类型',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_address) {
        wx.showToast({
          title: '请填写土地坐落地址',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_authority) {
        wx.showToast({
          title: '请填写土地登记机关',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_num) {
        wx.showToast({
          title: '请填写证照号码',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 4) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.countryIndex1) {
        wx.showToast({
          title: '请选择证照类型',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_address) {
        wx.showToast({
          title: '请填写房产坐落地址',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_num) {
        wx.showToast({
          title: '请填写房产证件号码',
          icon: 'none'
        })
        return
      }

    }
    if (this.data.countryIndex == 5) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.car_num) {
        wx.showToast({
          title: '请填写车牌号',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 6) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.bonds_name) {
        wx.showToast({
          title: '请填写机械设备名称',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 7) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.countryIndex1) {
        wx.showToast({
          title: '请选择种类',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_name) {
        wx.showToast({
          title: '请填写品名',
          icon: 'none'
        })
        return
      }
      if (!this.data.num) {
        wx.showToast({
          title: '请填数量',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 8) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }

      if (!this.data.bonds_name) {
        wx.showToast({
          title: '请填写债务人',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 9) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }

      if (!this.data.company) {
        wx.showToast({
          title: '请填写所在企业',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 10) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 11) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 12) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.land_name) {
        wx.showToast({
          title: '请填写名称',
          icon: 'none'
        })
        return
      }
      if (!this.data.countryIndex1) {
        wx.showToast({
          title: '请选择知识产权证照',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 13) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.property_note) {
        wx.showToast({
          title: '请填写财产/线索描述',
          icon: 'none'
        })
        return
      }
    }
    if (this.data.countryIndex == 13) {
      if (!this.data.property_value) {
        wx.showToast({
          title: '请填写财产价值',
          icon: 'none'
        })
        return
      }
      if (!this.data.property_note) {
        wx.showToast({
          title: '请填写财产/线索描述',
          icon: 'none'
        })
        return
      }
      if (!this.data.num) {
        wx.showToast({
          title: '请填写数量',
          icon: 'none'
        })
        return
      }
    }
    var that = this;
    var url = app.globalData.url + '/index/editNote';
    if (this.data.pickerProDataf[this.data.countryIndex].text.type) {
      var params = {
        note_id: this.data.note_id,
        order_id: this.data.order_id,
        subject_id: parseInt(this.data.countryIndex) + 1,
        land_type: parseInt(this.data.countryIndex1) + 1,
        property_value: this.data.property_value,
        property_note: this.data.property_note,
        open_bank: this.data.open_bank,
        bank_num: this.data.bank_num,
        num: this.data.num,
        land_authority: this.data.land_authority,
        land_address: this.data.land_address,
        land_num: this.data.land_num,
        land_name: this.data.land_name,
        car_num: this.data.car_num,
        bonds_name: this.data.bonds_name,
        company: this.data.company,
      }
    } else {
      var params = {
        note_id: this.data.note_id,
        order_id: this.data.order_id,
        subject_id: parseInt(this.data.countryIndex) + 1,
        property_value: this.data.property_value,
        property_note: this.data.property_note,
        open_bank: this.data.open_bank,
        bank_num: this.data.bank_num,
        num: this.data.num,
        land_authority: this.data.land_authority,
        land_address: this.data.land_address,
        land_num: this.data.land_num,
        land_name: this.data.land_name,
        car_num: this.data.car_num,
        bonds_name: this.data.bonds_name,
        company: this.data.company,
      }
    }

    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          list: res.data
        })
      } else {

      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
    })
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      success: function () {
        console.log('成功！')
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})