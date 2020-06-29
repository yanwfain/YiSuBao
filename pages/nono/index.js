// pages/tindex/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowModel:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  imgH: function (e) {
    // console.log(e)
    var winWid = wx.getSystemInfoSync().windowWidth;         //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;
    var swiperH = winWid * imgh / imgw
    // console.log(imgh)
    // console.log(swiperH)　　　　　
    this.setData({
      sHei: swiperH  //设置高度
    })
    // console.log(this.data.sHei)
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