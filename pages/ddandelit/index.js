// pages/ddandelit/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:0,
    page: 1,
    movieList: [],
    status:''
  },
  bindfu:function(e){
    wx.navigateTo({
      url: '../wachtpicker/index?insurance_company_id=' + e.currentTarget.dataset.insurance_company_id + '&order_sn=' + e.currentTarget.dataset.order_sn + '&insurance_company_name=' + e.currentTarget.dataset.insurance_company_name + '&warrant_money=' + e.currentTarget.dataset.warrant_money + '&order_id=' + e.currentTarget.dataset.order_id,
    })
  },
  deleFn:function(e){
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
            status:6,
          }
          app.wxRequest('POST', url, params, (res) => {
            console.log(res)
            if (res.code == 1) {
              that.setData({
                movieList:[]
              })
              that.getMore(1, that.data.status);

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      listIarry: app.globalData.listIarry,
    })
    this.setData({
      tid: options.tid,
    })
    console.log(options.tid)
    if (options.tid==0){
      this.setData({
        status:''
      })
    }
    if (options.tid == 1) {
      this.setData({
        status: 0
      })
    }
    if (options.tid == 2) {
      this.setData({
        status: 1
      })
    }
    if (options.tid == 3) {
      this.setData({
        status: 2
      })
    }
    if (options.tid == 4) {
      this.setData({
        status: 3
      })
    }
    if (options.tid == 5) {
      this.setData({
        status: 4
      })
    }

    var that = this
    this.getMore(that.data.page, that.data.status)
  },
  bindlist:function(e){
    this.setData({
      tid: e.currentTarget.dataset.id,
      page:1,
      movieList:[]
    })
    var that = this
    if (e.currentTarget.dataset.id==0){
      wx.showLoading({
        title: '加载中',
        icon:'none'
      })
      this.setData({
        status:''
      })
      this.getMore(that.data.page,that.data.status)
      wx.hideLoading()
    }
    if (e.currentTarget.dataset.id == 1) {
      wx.showLoading({
        title: '加载中',
        icon: 'none'
      })
      this.setData({
        status: 0
      })
      this.getMore(that.data.page, that.data.status)
      wx.hideLoading()
    }
    if (e.currentTarget.dataset.id == 2) {
      wx.showLoading({
        title: '加载中',
        icon: 'none'
      })
      this.setData({
        status: 1
      })
      this.getMore(that.data.page, that.data.status)
      wx.hideLoading()
    }
    if (e.currentTarget.dataset.id == 3) {
      wx.showLoading({
        title: '加载中',
        icon: 'none'
      })
      this.setData({
        status: 2
      })
      this.getMore(that.data.page, that.data.status)
      wx.hideLoading()
    }
    if (e.currentTarget.dataset.id == 4) {
      wx.showLoading({
        title: '加载中',
        icon: 'none'
      })
      this.setData({
        status: 3
      })
      this.getMore(that.data.page, that.data.status)
      wx.hideLoading()
    }
    if (e.currentTarget.dataset.id == 5) {
      wx.showLoading({
        title: '加载中',
        icon: 'none'
      })
      this.setData({
        status: 4
      })
      this.getMore(that.data.page, that.data.status)
      wx.hideLoading()
    }
    if (e.currentTarget.dataset.id == 6) {
      wx.showLoading({
        title: '加载中',
        icon: 'none'
      })
      this.setData({
        status:5
      })
      this.getMore(that.data.page, that.data.status)
      wx.hideLoading()
    }
    if (e.currentTarget.dataset.id == 7) {
      wx.showLoading({
        title: '加载中',
        icon: 'none'
      })
      this.setData({
        status: 6
      })
      this.getMore(that.data.page, that.data.status)
      wx.hideLoading()
    }

  },
  baoquan: function (e) {
    wx.navigateTo({
      url: '../shenqin/index?order_id=' + e.currentTarget.dataset.id + '&tname=' + e.currentTarget.dataset.tname,
    })
  },
  baoquans: function (e) {
    wx.navigateTo({
      url: '../shenqin/index?order_id=' + e.currentTarget.dataset.id + '&isbtn=' + 1 + '&tname=' + e.currentTarget.dataset.tname,
    })
  },
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
  getMore: function (page,status) {
    var that = this;
    var url = app.globalData.url + '/index/getOrderList';
    var params = {
      user_id: app.globalData.user_id,
      status: status,
      page: page
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
      title: '加载中',
    })
    var that = this;
    console.log(that.data.status)
    if (that.data.status){
      console.log(that.data.status)
      this.getMore(that.data.page, that.data.status);
    }
  
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    this.getMore(that.data.page,that.data.status);
    wx.hideLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})