// pages/dapinz/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbox: [],//选择图片
    imgbox_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      listIarry: app.globalData.listIarry,
    })
    this.setData({
      order_id: options.order_id
    })
    wx.setNavigationBarTitle({
      title:  this.data.listIarry.dk_title
    })
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
    // var n =1;
    // if (1 > imgbox.length > 0) {
    //   n = 1 - imgbox.length;
    // } else if (imgbox.length == 1) {
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
        } else if (1 > imgbox.length) {
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
  submit:function(e){
    if (!this.data.imgbox_list || this.data.imgbox_list.length<1){
      wx.showToast({
        title: '请' + this.data.listIarry.dk_title1,
        icon:'none'
      })
      return
    }
    var url = app.globalData.url + '/index/orderPay';
    var params = {
      order_id: this.data.order_id,
      pay_order: this.data.imgbox_list
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        wx.switchTab({
          url:'../index/index'
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