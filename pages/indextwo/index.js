// pages/indextwo/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowModel: false,
    toView:'',
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    img: [
      { img: 'http://zsb.baike360.cn/public/image/10f2633670122e27bbbb0ffb2742f1d.png' },
      // { img: '../../image/10f2633670122e27bbbb0ffb2742f1d.png' },

    ],
    tabid:'id1',
    botnum:5000
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      listIarry: app.globalData.listIarry,
    })
    wx.setNavigationBarTitle({
      title:  this.data.listIarry.jx_title
    })
    this.setData({
      titlop: options.titlop
    })
    var url = app.globalData.url + '/index/getHome';
    var params = {

    }
 
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          characteristic: res.data.characteristic,
          flow_path: res.data.flow_path,
          question: res.data.question,
          info: res.data.info,
          imgaes: res.data.images,
          divpage:res.data
        })

        wx.hideLoading()
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
  imgHss: function (e) {
    // console.log(e)
    var winWid = wx.getSystemInfoSync().windowWidth;         //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;
    var swiperH = winWid * imgh / imgw
    // console.log(imgh)
    // console.log(swiperH)
    this.setData({
      sHeiss: swiperH  //设置高度
    })
    // console.log(this.data.sHei)
  },

  inpFn: function (e) {
    console.log(e)
    this.setData({
      pickers: e.detail.value
    })
    var num = parseInt(e.detail.value)
    if (num*0.01>5000){
      this.setData({
        botnum:num * 0.01
      })
    }else{
      this.setData({
        botnum: 5000
      })
    }
  },
  tabFn:function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    this.setData({
      tabid: e.currentTarget.dataset.id,
      toView: e.currentTarget.dataset.id
    })
  },
  actiyFn: function (e) {
    wx.navigateTo({
      url: '../city/index',
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
  submit:function(e){
    var that = this;
    var url = app.globalData.url + '/user/getUserInfo';
    var params = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        app.globalData.is_approval == res.data.is_approval
        if (res.data.is_approval!= 2) {
          wx.showModal({
            title: '提示',
            content: '您需要先进行认证才能进行下一步操作',
            success: function (res) {

              if (res.cancel) {

                //点击取消

                console.log("您点击了取消")

              } else if (res.confirm) {

                //点击确定

                console.log("您点击了确定")
                wx.navigateTo({
                  url: '../userdelit/index'
                })
              }

            }
          })
          return
        }
        if (!this.data.pickers) {
          wx.showToast({
            title: '请输入' + this.data.listIarry.jx_danbao,
            icon: 'none'
          })
          return
        }
        if (!this.data.settitle) {
          wx.showToast({
            title: '请选择' + this.data.listIarry.jx_fayuan,
            icon: 'none'
          })
          return
        }
        wx.navigateTo({
          url: '../toubao/index?warrant_price=' + this.data.pickers + '&setid=' + this.data.setid + '&warrant_money=' + this.data.botnum + '&settitle=' + this.data.settitle + '&company_id=' + this.data.divpage.company_id ,
        })
        wx.hideLoading()
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
    console.log(this.data)
    wx.showLoading({
      title: '加载中.',
    })
    console.log(this.data)
    var that = this;
    var url = app.globalData.url + '/user/getUserInfo';
    var params = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      if (res.code == 1) {
        app.globalData.is_approval == res.data.is_approval

        wx.hideLoading()
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