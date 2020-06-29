// pages/shenqin/index.js
var app = getApp();
// const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowModel:false,
    imgbox: [],//选择图片
    imgbox_list: [],//选择图片
    imgboxs: [],
    imgboxs_list: [],
    imgboxs1: [],
    imgboxs1_list: [],
    imgboxs12: [],
    imgboxs12_list: [],
    fileIDs: [],//上传云存储后的返回值
    ridos: '',
    man:[],//被申请人信息
    'listcnt.man': [],
    'listcnt.note': [],
    'listcnt.policy':[],
    case_price:'',
    case_num:null,
    case_note: null,
    lawyer_name: null,
    lawyer_mobile: null,
    recipients: null,
    recipients_mobile: null,
    address: null,
  },
  topic_preview: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片

    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: that.data.imgbox // 需要预览的图片http链接列表
    })
  },
  topic_preview1: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片

    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: that.data.imgboxs // 需要预览的图片http链接列表
    })
  },
  topic_preview2: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片

    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: that.data.imgboxs1 // 需要预览的图片http链接列表
    })
  },
  topic_preview3: function (e) {
    var that = this;
    var url = e.currentTarget.dataset.url;
    //通过循环在数据链里面找到和这个id相同的这一组数据，然后再取出这一组数据当中的图片

    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: that.data.imgboxs12 // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      listIarry: app.globalData.listIarry,
      tname: options.tname
    })
    wx.setNavigationBarTitle({
      title:  this.data.listIarry.sq_title
    })
    if (options.order_id){
      this.setData({
        order_id: options.order_id,
        isbtn: options.isbtn
      })
      var that = this;
      var url = app.globalData.url + '/index/getOrder';
      var params = {
        order_id: this.data.order_id
      }
      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
          that.setData({
            listcnt: res.data,
            case_note: res.data.case_note,
            case_num: res.data.case_num,
            case_price: res.data.case_price,
            recipients: res.data.recipients,
            recipients_mobile: res.data.recipients_mobile,
            address: res.data.address,
            warrant_money: res.data.warrant_money,
            warrant_price: res.data.warrant_price,
            lawyer_name: res.data.lawyer_name,
            lawyer_mobile: res.data.lawyer_mobile,
            insurance_company_name: res.data.insurance_company_name,
            insurance_company_image: res.data.insurance_company_image,
            order_sn: res.data.order_sn
          })
          if (!res.data.case_num || res.data.case_num=='null') {
            that.setData({
              case_num: ''
            })
          }
          if (!res.data.case_note || res.data.case_note == 'null') {
            that.setData({
              case_note: ''
            })
          }
          if (!res.data.lawyer_name || res.data.lawyer_name == 'null') {
            that.setData({
              lawyer_name: ''
            })
          }
          if (!res.data.lawyer_mobile || res.data.lawyer_mobile == 'null') {
            that.setData({
              lawyer_mobile: ''
            })
          }
          if (!res.data.recipients || res.data.recipients == 'null') {
            that.setData({
              recipients: ''
            })
          }
          if (!res.data.recipients_mobile || res.data.recipients_mobile == 'null') {
            that.setData({
              recipients_mobile: ''
            })
          }
          if (!res.data.address || res.data.address == 'null') {
            that.setData({
              address: ''
            })
          }
        
          // if (!res.data.indictment_images || res.data.indictment_images.length<1) {
          //   that.setData({
          //     imgbox: [],
          //     imgbox_list: [],//选择图片
          //   })
          // }
          // if (!res.data.address || res.data.address == 'null') {
          //   that.setData({
          //     address: ''
          //   })
          // }
          // if (!res.data.address || res.data.address == 'null') {
          //   that.setData({
          //     address: ''
          //   })
          // }
          // 起诉状/案件受理通知书
          if (res.data.indictment_images){
            that.setData({
              imgbox: res.data.indictment_images_1 ,
              imgbox_list: res.data.indictment_images
            })
          }else{
            that.setData({
              imgbox: [],
              imgbox_list:[]
            })
          }
          if (res.data.preservation_images) {
            that.setData({
              imgboxs: res.data.preservation_images_1 ,
              imgboxs_list: res.data.preservation_images
            })
          } else {
            that.setData({
              imgboxs: [],
             imgboxs_list: []
            })
          }
          if (res.data.parties_images) {
            that.setData({
              imgboxs1: res.data.parties_images_1,
              imgboxs1_list: res.data.parties_images
            })
          } else {
            that.setData({
              imgboxs1: [],
              imgboxs1_list: []
            })
          }
          if (res.data.materials_images) {
            that.setData({
              imgboxs12: res.data.materials_images_1 ,
              imgboxs12_list: res.data.materials_images
            })
          } else {
            that.setData({
              imgboxs12: [],
              imgboxs12_list: []
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
    }else{
      var that = this;
      this.setData({
        warrant_money: options.warrant_money,
        tname: options.tname
      })
      var url = app.globalData.url + '/index/addOrder';
      var params = {
        type:options.type,
        user_id: app.globalData.user_id,
        court_id: options.court_id,
        insurance_company_id: options.insurance_company_id,
        warrant_price: options.warrant_price,
        warrant_money: options.warrant_money,
        warrant_rate: options.rate,
        order_type: 1,
      }
      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
          that.setData({
            order_id: res.data.order_id
          })
          var url = app.globalData.url + '/index/getOrder';
          var params = {
            user_id: app.globalData.user_id,
            order_id: that.data.order_id
          }
          app.wxRequest('POST', url, params, (res) => {
            console.log(res)
            if (res.code == 1) {
              that.setData({
                listcnt: res.data,
                case_note: res.data.case_note,
                case_num: res.data.case_num,
                case_price: res.data.case_price,
                recipients: res.data.recipients,
                recipients_mobile: res.data.recipients_mobile,
                address: res.data.address,
                warrant_money: res.data.warrant_money,
                warrant_price: res.data.warrant_price,
                insurance_company_name: res.data.insurance_company_name,
                insurance_company_image: res.data.insurance_company_image,
                insurance_company_id: res.data.insurance_company_id,
                order_sn: res.data.order_sn
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
    }
    
  },
  openshow:function(e){
    this.setData({
      isshowModel:true
    })
    this.kefull()
  },
  falFn:function(e){
    this.setData({
      isshowModel: false
    })
  },
  kefull: function (e) {
    if (this.data.status) {
      if (this.data.status == 0 || this.data.status == 1) {
        var that = this;
        var url = app.globalData.url + '/index/editOrderNote';
        var params = {
          order_id: this.data.order_id,
          whether_communicate: 2
        }
        app.wxRequest('POST', url, params, (res) => {
          console.log(res)
          if (res.code == 1) {


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
      }
    }

  },
  open: function () {
    wx.showActionSheet({
      itemList: ['400-818-8686'],
      success: function (res) {
        console.log(res) //当点击400-9900-2250就相当于点击了
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
  bindcatdelit:function(e){
    wx.navigateTo({
      url: '../shenqindelit/index?index=' + e.currentTarget.dataset.index + '&name=' + e.currentTarget.dataset.name + '&id_num=' + e.currentTarget.dataset.id_num + '&id=' + e.currentTarget.dataset.id + '&order_id=' +this.data.order_id
    })
  },
  case_price: function (e) {
    this.setData({
      case_price: e.detail.value
    })
  },
  case_num: function (e) {
    this.setData({
      case_num: e.detail.value
    })
  },
  case_note: function (e) {
    this.setData({
      case_note: e.detail.value
    })
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
                address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
                recipients: res.userName,
                recipients_mobile: res.telNumber
              })
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
                  address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
                  recipients: res.userName,
                  recipients_mobile: res.telNumber
                })
              }
            })
          }
        }
      }
    })
  },
  caichanFn: function (e) {
    wx.navigateTo({
      url: '../caichan/index?order_id=' + this.data.order_id,
    })
  },
  caichanFns: function (e) {
    wx.navigateTo({
      url: '../caichan/index?order_id=' + this.data.order_id + '&id=' + e.currentTarget.dataset.id + '&subject_id=' + e.currentTarget.dataset.subject_id + '&property_value=' + e.currentTarget.dataset.property_value +  '&bank_num=' + e.currentTarget.dataset.bank_num + '&bonds_name=' + e.currentTarget.dataset.bonds_name + '&car_num=' + e.currentTarget.dataset.car_num + '&company=' + e.currentTarget.dataset.company + '&land_address=' + e.currentTarget.dataset.land_address + '&land_authority=' + e.currentTarget.dataset.land_authority + '&land_name=' + e.currentTarget.dataset.land_name + '&land_num=' + e.currentTarget.dataset.land_num + '&land_type=' + e.currentTarget.dataset.land_type + '&num=' + e.currentTarget.dataset.num + '&open_bank=' + e.currentTarget.dataset.open_bank + '&property_note=' + e.currentTarget.dataset.property_note 
    })
  },
  tibaoFn: function (e) {
    wx.navigateTo({
      url: '../qibao/index?order_id='  +this.data.order_id,
    })
  },
  tibaoFns: function (e) {
    wx.navigateTo({
      url: '../qibao/index?status=' + e.currentTarget.dataset.status + '&num_type=' + e.currentTarget.dataset.num_type + '&company_name=' + e.currentTarget.dataset.company_name + '&order_id=' + this.data.order_id + '&name=' + e.currentTarget.dataset.name + '&id_num=' + e.currentTarget.dataset.id_num + '&id=' + e.currentTarget.dataset.id
    })
  },
  user_delit: function (e) {
    wx.navigateTo({
      url: '../shenqindelit/index?order_id= ' + this.data.order_id,
    })
  },
  delitwenFn: function (e) {
    wx.navigateTo({
      url: '../delitwen/index?id=1',
    })
  },
  delitwenFns: function (e) {
    wx.navigateTo({
      url: '../delitwen/index?order_id=' + this.data.order_id + '&tids=' + 1,
    })
  },
  ycfp: function (e) {
    console.log(e)
    this.setData({
      ridos: e.detail.value
    })

  },
  riods: function (e) {
    // console.log('1')
    this.setData({
      ridos: '1'
    })
    console.log(this.data.ridos)
  },
  // 删除照片 &&
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    let imgbox_list = this.data.imgbox_list;
    imgbox.splice(index, 1)
    imgbox_list.splice(index, 1)
    that.setData({
      imgbox: imgbox,
      imgbox_list: imgbox_list
    });
  },
  // 选择图片 &&&
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var that = this;
    var n = 99;
    if (99 > imgbox.length > 0) {
      n = 99 - imgbox.length;
    } else if (imgbox.length == 99) {
      n = 1;
    }
   
    wx.chooseImage({
      count: n, // 默认99，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (99 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          imgbox: imgbox
        });
        for (var i = 0; i<=that.data.imgbox.length;i++){
          
        wx.uploadFile({
          url: app.globalData.url + '/common/upload',      //此处换上你的接口地址
          filePath: tempFilePaths[i],
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
            wx.showLoading({
              title: '上传中.',
            })
            if (res.statusCode==200){
              wx.hideLoading()
            }
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
        // api / common / upload
      }
    })
  },

  //图片
  imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
    })
  },
  imgDelete1s: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgboxs = this.data.imgboxs;
    let imgboxs_list = this.data.imgboxs_list;
    imgboxs.splice(index, 1)
    imgboxs_list.splice(index, 1)
    that.setData({
      imgboxs: imgboxs,
      imgboxs_list: imgboxs_list,
    });
  },
  // 选择图片 &&&
  addPic1s: function (e) {
    var imgboxs = this.data.imgboxs;
    console.log(imgboxs)
    var that = this;
    var n = 99;
    if (99 > imgboxs.length > 0) {
      n = 99 - imgboxs.length;
    } else if (imgboxs.length == 99) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认99，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgboxs.length == 0) {
          imgboxs = tempFilePaths
        } else if (99 > imgboxs.length) {
          imgboxs = imgboxs.concat(tempFilePaths);
        }
        that.setData({
          imgboxs: imgboxs
        });
        for (var i = 0; i <= that.data.imgboxs.length; i++) {
          wx.uploadFile({
            url: app.globalData.url + '/common/upload',      //此处换上你的接口地址
            filePath: tempFilePaths[i],
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
              that.data.imgboxs_list.push(datas.data.url);
              that.setData({
                imgboxs_list: that.data.imgboxs_list,
              });

              console.log(that.data.imgboxs_list)
            },

            fail: function (res) {
              console.log('fail');
            },
          })
        }
      }
    })
  },

  //图片
  imgboxs: function (e) {
    this.setData({
      imgboxs: e.detail.value
    })
  },
  imgDelete1s1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgboxs1 = this.data.imgboxs1;
    let imgboxs1_list = this.data.imgboxs1_list;
    imgboxs1.splice(index, 1)
    imgboxs1_list.splice(index, 1)
    that.setData({
      imgboxs1: imgboxs1,
      imgboxs1_list: imgboxs1_list
    });
  },
  // 选择图片 &&&
  addPic1s1: function (e) {
    var imgboxs1 = this.data.imgboxs1;
    console.log(imgboxs1)
    var that = this;
    var n = 99;
    if (99 > imgboxs1.length > 0) {
      n = 99 - imgboxs1.length;
    } else if (imgboxs1.length == 99) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认99，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgboxs1.length == 0) {
          imgboxs1 = tempFilePaths
        } else if (99 > imgboxs1.length) {
          imgboxs1 = imgboxs1.concat(tempFilePaths);
        }
        that.setData({
          imgboxs1: imgboxs1
        });
        for (var i = 0; i <= that.data.imgboxs1.length; i++) {
          wx.uploadFile({
            url: app.globalData.url + '/common/upload',      //此处换上你的接口地址
            filePath: tempFilePaths[i],
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
              that.data.imgboxs1_list.push(datas.data.url);
              that.setData({
                imgboxs1_list: that.data.imgboxs1_list,
              });

              console.log(that.data.imgboxs1_list)
            },

            fail: function (res) {
              console.log('fail');
            },
          })
        }
      }
    })
  },

  //图片
  imgboxs1: function (e) {
    this.setData({
      imgboxs1: e.detail.value
    })
  },
  imgDelete1s12: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgboxs12 = this.data.imgboxs12;
    let imgboxs12_list = this.data.imgboxs12_list;
    imgboxs12.splice(index, 1)
    imgboxs12_list.splice(index, 1)
    that.setData({
      imgboxs12: imgboxs12,
      imgboxs12_list: imgboxs12_list,

    });
  },
  // 选择图片 &&&
  addPic1s12: function (e) {
    var imgboxs12 = this.data.imgboxs12;
    console.log(imgboxs12)
    var that = this;
    var n = 99;
    if (99 > imgboxs12.length > 0) {
      n = 99 - imgboxs12.length;
    } else if (imgboxs12.length == 99) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认99，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgboxs12.length == 0) {
          imgboxs12 = tempFilePaths
        } else if (99 > imgboxs12.length) {
          imgboxs12 = imgboxs12.concat(tempFilePaths);
        }
        that.setData({
          imgboxs12: imgboxs12
        });
        for (var i = 0; i <= that.data.imgboxs12.length; i++) {
          wx.uploadFile({
            url: app.globalData.url + '/common/upload',      //此处换上你的接口地址
            filePath: tempFilePaths[i],
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
              that.data.imgboxs12_list.push(datas.data.url);
              that.setData({
                imgboxs12_list: that.data.imgboxs12_list,
              });

              console.log(that.data.imgboxs12_list)
            },

            fail: function (res) {
              console.log('fail');
            },
          })
        }
      }
    })
  },

  //图片
  imgboxs12: function (e) {
    this.setData({
      imgboxs12: e.detail.value
    })
  },

  //发布按钮
  fb: function (e) {
    if (!this.data.imgbox.length) {
      wx.showToast({
        icon: 'none',
        title: '图片类容为空'
      });
    } else {
      //上传图片到云存储
      wx.showLoading({
        title: '上传中',
      })
      let promiseArr = [];
      for (let i = 0; i < this.data.imgbox.length; i++) {
        promiseArr.push(new Promise((reslove, reject) => {
          let item = this.data.imgbox[i];
          let suffix = /\.\w+$/.exec(item)[0];//正则表达式返回文件的扩展名
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
            filePath: item, // 小程序临时文件路径
            success: res => {
              this.setData({
                fileIDs: this.data.fileIDs.concat(res.fileID)
              });
              console.log(res.fileID)//输出上传后图片的返回地址
              reslove();
              wx.hideLoading();
              wx.showToast({
                title: "上传成功",
              })
            },
            fail: res => {
              wx.hideLoading();
              wx.showToast({
                title: "上传失败",
              })
            }

          })
        }));
      }
      Promise.all(promiseArr).then(res => {//等数组都做完后做then方法
        console.log("图片上传完成后再执行")
        this.setData({
          imgbox: []
        })
      })

    }
  },
  lawyer_name:function(e){
    this.setData({
      lawyer_name:e.detail.value
    })
  },
  lawyer_mobile: function (e) {
    this.setData({
      lawyer_mobile: e.detail.value
    })
  },
  submit: function (e) {
    if (e.currentTarget.dataset.id==2){
      if (!this.data.case_price) {
        wx.showToast({
          title: '请填写' +  this.data.listIarry.sq_susongsub,
          icon: 'none'
        })
        return
      }
     
      if (!this.data.listcnt.man || this.data.listcnt.man.length < 1) {
        wx.showToast({
          title: '请填写' + this.data.listIarry.sq_beishenq,
          icon: 'none'
        })
        return
      }
      if (!this.data.listcnt.policy || this.data.listcnt.policy.length < 1) {
        wx.showToast({
          title: '请填写' + this.data.listIarry.sq_toubao,
          icon: 'none'
        })
        return
      }
      if (!this.data.listcnt.note || this.data.listcnt.note.length < 1) {
        wx.showToast({
          title: '请填写' + this.data.listIarry.sq_caichan,
          icon: 'none'
        })
        return
      }
      if (!this.data.recipients) {
        wx.showToast({
          title: '请填写邮寄信息',
          icon: 'none'
        })
        return
      }
      if (!this.data.imgbox_list || this.data.imgbox_list.length < 1) {
        wx.showToast({
          title: '请上传' + this.data.listIarry.sq_img1,
          icon: 'none'
        })
        return
      }
      if (!this.data.imgboxs_list || this.data.imgboxs_list.length < 1) {
        wx.showToast({
          title: '请上传' + this.data.listIarry.sq_img2,
          icon: 'none'
        })
        return
      }
      if (!this.data.imgboxs1_list || this.data.imgboxs1_list.length < 1) {
        wx.showToast({
          title: '请上传' + this.data.listIarry.sq_img3,
          icon: 'none'
        })
        return
      }
      if (!this.data.imgboxs12_list || this.data.imgboxs12_list.length < 1) {
        wx.showToast({
          title: '请上传' + this.data.listIarry.sq_img4,
          icon: 'none'
        })
        return
      }
      if (!this.data.ridos) {
        wx.showToast({
          title: '请阅读并勾选' + this.data.listIarry.sq_bottomxieyi,
          icon: 'none'
        })
        return
      }
    }
   
    var that = this;
    var url = app.globalData.url + '/index/editOrder';
    if (e.currentTarget.dataset.id == 2) {
      var params = {
        add: 1,
        case_price: this.data.case_price,
        case_num: this.data.case_num,
        address: this.data.address,
        case_note: this.data.case_note,
        recipients: this.data.recipients,
        recipients_mobile: this.data.recipients_mobile,
        lawyer_name: this.data.lawyer_name,
        lawyer_mobile: this.data.lawyer_mobile,
        order_id: that.data.order_id,
        indictment_images: that.data.imgbox_list,
        preservation_images: that.data.imgboxs_list,
        parties_images: that.data.imgboxs1_list,
        materials_images: that.data.imgboxs12_list,
      }
      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
          wx.showModal({
            title: '提示',
            content: '订单已提交后台审核，如有问题咨询请联系客服',
            success: function (res) {
              if (res.cancel) {
                //点击取消
                console.log("您点击了取消")
              } else if (res.confirm) {

                //点击确定
                wx.switchTab({
                  url: '../meshen/index'
                })
                console.log("您点击了确定")
              }

            }
          })
          // wx.redirectTo({
          //   url: '../wachtpicker/index?order_id=' + that.data.order_id + '&insurance_company_id=' + this.data.insurance_company_id + '&order_sn=' + this.data.order_sn + '&insurance_company_name=' + this.data.insurance_company_name + '&warrant_money=' + this.data.warrant_money,
          // })
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
      var params = {
        case_price: this.data.case_price,
        case_num: this.data.case_num,
        address: this.data.address,
        case_note: this.data.case_note,
        recipients: this.data.recipients,
        recipients_mobile: this.data.recipients_mobile,
        lawyer_name: this.data.lawyer_name,
        lawyer_mobile: this.data.lawyer_mobile,
        order_id: that.data.order_id,
        indictment_images: that.data.imgbox_list,
        preservation_images: that.data.imgboxs_list,
        parties_images: that.data.imgboxs1_list,
        materials_images: that.data.imgboxs12_list,
      }
      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
          // that.setData({
          //   order_id: res.data.order_id
          // })
          wx.showModal({
            title: '提示',
            content: '暂存成功',
            success: function (res) {
              if (res.cancel) {
                //点击取消
                console.log("您点击了取消")
              } else if (res.confirm) {

                //点击确定
                wx.switchTab({
                  url: '../meshen/index'
                })
                console.log("您点击了确定")
              }

            }
          })
         
        } else {
          wx.showToast({
            title:res.msg,
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
    wx.showLoading({
      title: '加载中',
      
    })
    if (this.data.order_id){
      var that = this;
      var url = app.globalData.url + '/index/getOrder';
      var params = {
        order_id: this.data.order_id
      }
      app.wxRequest('POST', url, params, (res) => {
        console.log(res)
        if (res.code == 1) {
          that.setData({
            listcnt: res.data,
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
      wx.hideLoading()
    }else{
      wx.hideLoading()
    }
  
    // console.log(this.data)
    // console.log(this.data.name)
    // console.log(this.data.id_num)
    // if (this.data.name){
    //   var listo = {
    //     name: this.data.name,
    //     id_num: this.data.name
    //   };
    //   that.data.man.push(listo)

    //   for (var i = 0; i <= that.data.man.length; i++) {
    //     that.setData({
    //       man: that.data.man
    //     })
    //     console.log(that.data.man)
    //   }
    // }
 
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