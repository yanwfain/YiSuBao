// pages/meshen/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    movieList: [],
    isshowModel:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
  onLoad: function (options) {
    var that = this
    this.setData({
      listIarry: app.globalData.listIarry,
    })
    // this.getMore(that.data.page)
  },
  bindfu: function (e) {
    wx.navigateTo({
      url: '../wachtpicker/index?insurance_company_id=' + e.currentTarget.dataset.insurance_company_id + '&order_sn=' + e.currentTarget.dataset.order_sn + '&insurance_company_name=' + e.currentTarget.dataset.insurance_company_name + '&warrant_money=' + e.currentTarget.dataset.warrant_money + '&order_id=' + e.currentTarget.dataset.order_id,
    })
  },
  deleFn: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      success: function (res) {

        if (res.cancel) {

          //点击取消

          console.log("您点击了取消")

        } else if (res.confirm) {

          var url = app.globalData.url + '/index/editOrderNote';
          var params = {
            order_id: e.currentTarget.dataset.id,
            status: 6,
          }
          app.wxRequest('POST', url, params, (res) => {
            console.log(res)
            if (res.code == 1) {
              that.setData({
                movieList: []
              })
              that.getMore(1);

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
          //点击确定

          console.log("您点击了确定")

        }

      }

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
  baoquan: function (e) {
    wx.navigateTo({
      url: '../shenqin/index?order_id=' + e.currentTarget.dataset.id + '&tname= ' + e.currentTarget.dataset.tname,
    })
  },
  baoquans: function (e) {
    wx.navigateTo({
      url: '../shenqin/index?order_id=' + e.currentTarget.dataset.id + '&isbtn=' + 1 + '&tname= ' + e.currentTarget.dataset.tname,
    })
  },
  // isbtn
  jixuFn: function (e) {
    wx.navigateTo({
      url: '../toubao/index?order_id=' + e.currentTarget.dataset.id
    })
  },
  jixuFns: function (e) {
    wx.navigateTo({
      url: '../toubao/index?order_id=' + e.currentTarget.dataset.id + '&isbtn=' + 1,
    })
  },
  getMore: function (page) {
    var that = this;
    var url = app.globalData.url + '/index/getOrderList';
    var params = {
      user_id: app.globalData.user_id,
      page:page
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        if (that.data.page > 1) {
          var movieLists = that.data.movieList;
          that.setData({
            movieList: movieLists.concat(res.data.rows),
            page: page + 1
          })
        } else {
          that.setData({
            movieList: res.data.rows,
            page: page + 1
          })
        }
      } else {
        wx.showToast({
          title: '没有更多数据了！',
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
    wx.showLoading({
      title: '加载中.',
    })
    var that =this;
    this.setData({
      movieList:[]
    })
    this.getMore(1)
    wx.hideLoading()
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
    this.onShow()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    this.getMore(that.data.page);
    wx.hideLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})