// pages/addyhk/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid: 1,
    imgbox: [],
    imgbox1: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  clickFn: function (e) {
    this.setData({
      tid: e.currentTarget.dataset.id
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
    var n = 9;
    if (9 > imgbox.length > 0) {
      n = 9 - imgbox.length;
    } else if (imgbox.length == 9) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9，设置图片张数
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
    var n = 9;
    if (9 > imgbox1.length > 0) {
      n = 9 - imgbox1.length;
    } else if (imgbox1.length == 9) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9，设置图片张数
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
      }
    })
  },

  //图片
  imgbox1: function (e) {
    this.setData({
      imgbox1: e.detail.value
    })
  },
  tijiao: function (e) {
    wx.navigateTo({
      url: '../yhkdelit/index',
    })
  },
  tijiao1: function (e) {
    wx.navigateTo({
      url: '../wxdelit/index',
    })
  },
  tijiao2: function (e) {
    wx.navigateTo({
      url: '../zfbdelit/index',
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