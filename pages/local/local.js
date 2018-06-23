/**
 * @file local.js
 * @author xuguixin0624@gmail.com
 * @description 同城预定
 */
import API from "../../api/api.js";
import {
  L_ROOMLIST
} from "../../utils/data.js";
var app = getApp();
Page({
  data: {
    hidden: true,
    cities: [{
      name: '全部',
      id: 'all'
    }, {
      name: '北京',
      id: 'beijing'
    }, {
      name: '上海',
      id: 'shanghai'
    }, {
      name: '深圳',
      id: 'shenzhen'
    }, {
      name: '广州',
      id: 'guangzhou'
    }],
    index: 0,
    condition: true,
    conditionVal: '',
    locArr: ["不限", "01F", "02F", "03F", "04F", "05F"],
    peoArr: ["不限", "0~5人", "6~10人", "10人以上"],//人数
    devArr: ["不限", "八爪鱼", "视频"],//设备
    timeArr: ["不限", "0.5h", "1.0h", "1.5h", "2.0h+"],
    Loc_index: 0,
    Peo_index: 0,
    Dev_index: 0,
    Time_index: 0,
    boardroomList: L_ROOMLIST
  },
  onLoad () {
    // 生命周期函数--监听页面加载
    // 根据当前用户返回所在城市会议室列表
    try {
      var city = wx.getStorageSync('city');
      this.setData({
        conditionVal: 'all'
      });
      if (city) {
          console.log("所在城市"+city);
      }
    } catch (e) {
      console.log(e);
    }
    wx.showLoading({
      title: '加载中',
    });
    wx.hideLoading();
  },
  onReady () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow () {
    // 生命周期函数--监听页面显示
  },
  onHide () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh () {
    // 页面相关事件处理函数--监听用户下拉动作
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    });
  },
  onReachBottom () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage () {
    // 用户点击右上角转发
  },
  onPageScroll () {
    // 页面滚动触发事件的处理函数
  },
  onFilter () {
    //下拉弹出筛选界面方法
    this.setData({
      hidden: false
    });
  },
  onConfirm () {
    //筛选界面确认方法
    this.setData({
      hidden: true
    });
    let [attendeeNum, duration] = [[0, ], 0]
    if (this.data.Peo_index === '3') {
      attendeeNum = [10,];
    } else if (this.data.Peo_index === '1') {
      attendeeNum = [0, 5];
    } else if (this.data.Peo_index === '2') {
      attendeeNum = [6, 10];
    } else {
      attendeeNum = [0,];
    }
    if (this.data.Time_index === '1') {
      duration = 30;
    } else if (this.data.Time_index === '2') {
      duration = 60;
    } else if (this.data.Time_index === '3') {
      duration = 90;
    } else if (this.data.Time_index === '4') {
      duration = 120;
    } else {
      duration = 0;
    }
    
  },
  onHideWin (e) {
    //隐藏筛选界面
     this.setData({
      hidden: true
    });
  },
  onChangeCity (e) {
    //切换城市方法
    var _this = this,
        flag = 0;
    this.setData({
      index: e.detail.value,
      condition: false,
    });
    wx.showToast({
      title: '数据加载中',
      icon: 'loading'
    });
    if (e.detail.value !== '2' || e.detail.value !== '0') {
      this.setData({
        boardroomList: []
      });
    } else {
      this.setData({
        boardroomList: L_ROOMLIST 
      });
    }
    wx.hideToast();
  },
  //位置选择方法
  onSelectLoc (e) {
    this.setData({
      Loc_index: e.currentTarget.id
    });
  },
  //人数选择方法
  onSelectPeo (e) {
    console.log(e);
    this.setData({
      Peo_index: e.currentTarget.id
    });
  },
  //设备选择方法
  onSelectDev (e) {
    this.setData({
      Dev_index: e.currentTarget.id
    });
  },
  //选择时长方法
  onSelectTime (e) {
     this.setData({
      Time_index: e.currentTarget.id
    });
  },
  //预约按钮方法
  goReserve (e) {
    var checkRoom = {},
        arr = [];
    checkRoom.name = e.currentTarget.dataset.name;
    checkRoom.id = e.currentTarget.dataset.id;
    arr.push(checkRoom);

    app.updateCheckList([]);
    app.updateCheckBrList(arr);
    app.updateContactsList([]);
    app.updateBoardroomList([]);

    // 跳转传参,这里id=1是为了表示从同城预约界面过来,从另一个页面onload里接收数
    var params = "stime="+e.currentTarget.dataset.stime+"&"+
                  "etime="+e.currentTarget.dataset.etime+"&"+
                  "name="+e.currentTarget.dataset.name+"&"+
                  "no="+e.currentTarget.dataset.no+"&id=1";
    var url = "../reserve/reserve?"+params;
    wx.navigateTo({
      url: url
    })
  }
}) 
