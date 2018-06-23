/**
 * @file remote.js
 * @author xuguixin0624@gmail.com
 * @description 异地速约
 */
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
  	currentDev: 1,
    currentTime: 1,
    currentCp: 1,
    sdate: "",//开始日期
    edate: "",//结束日期
    stime: "",//开始时间
    etime: "",//结束时间
    rcontacts: [],//联系人组
    dev: "",//设备
    timeLen: "",//时长
    company: {
      beijing: false,
      shanghai: false,
      guangzhou: false,
      shenzhen: false,
      chengdu: false,
      haerbin: false
    }//公司
  },
  onLoad () {
    this.setData({
      sdate: util.getDate(),
      edate: util.getDate(),
      stime: util.getTime(),
      etime: util.getTime(1)
    });
    app.updateCheckList([]);
    app.updateCheckBrList([]);
    app.updateContactsList([]);
    app.updateBoardroomList([]);
  },
  onShow () {
    this.setData({
      rcontacts: app.globalData.checkList,
      rboardroom: app.globalData.checkBrList
    });
  },
  onHide () {
    app.updateCheckList(this.data.rcontacts);
  },
  onReady () {
  },
  onSelectDev (e) {
    this.setData({
      currentDev: e.currentTarget.id
    })
  },
  onSelectTime (e) {
    this.setData({
      currentTime: e.currentTarget.id
    })
    console.log(this.data.currentTime);
  },
  onSelectCom (e) {
    var name = e.currentTarget.dataset.name; 
    var arr = this.data.company;
    if (arr[name] == false) {
      arr[name] = true;
    } else {
      arr[name] = false;
    }
    this.setData({
      company: arr
    });
  },
  onChangeSdate (e) {
    this.setData({
      sdate: e.detail.value,
      edate: e.detail.value
    });
  },
  onChangeEdate (e) {
    this.setData({
      edate: e.detail.value
    });
  },
  onChangeStime (e) {
    this.setData({
      stime: e.detail.value,
      etime: e.detail.value
    });
  },
  onChangeEtime (e) {
    this.setData({
      etime: e.detail.value
    });
  },
  onSelect () {
    wx.navigateTo({
      url: "../contacts/contacts?type=remote"
    })
  },
  //删除联系人
  delContacts (e) {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '是否移除该参会者',
      success: function(res) {
        if (res.confirm) {
          var checkMan = {},//用来存储当前联系人
          arr = app.globalData.contactsList,//临时存储人员列表
          _checkList = _this.data.rcontacts;//临时存储选中的人数组

          checkMan.name = e.currentTarget.dataset.name;
          checkMan.email = e.currentTarget.dataset.email;

          for (var i = 0; i<_checkList.length; i++ ) {
            if (_checkList[i].name === checkMan.name && _checkList[i].email === checkMan.email) {
              //取消选中
              util.removeByValue(_checkList, _checkList[i].name, _checkList[i].email);

              //在contactsList对应项去掉选中状态
               for (var j = 0; j <arr.length; j++) {
                for (var k = 0; k < arr[k].contactsInfo.length; k++) {
                  if (typeof(arr[j].contactsInfo[k]) != "undefined" ) {
                    if (arr[j].contactsInfo[k].name === checkMan.name && arr[j].contactsInfo[k].email === checkMan.email) {
                      arr[j].contactsInfo[k].check = false;
                      app.updateContactsList(arr);
                      break;
                    }
                  }
                }
              }
              break;
            } 
          }
          _this.setData({
              rcontacts: _checkList
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //点击搜索方法
  onSearch () {
    let [attendees, cities, duration] = [[], [], 0];
    for (let key in this.data.company) {
      if (this.data.company[key]) {
        cities.push(key);
      }
    };
    attendees = this.data.rcontacts.map(item => item.email);
    if (this.data.currentTime == 2) {
      duration = 30;
    } else if (this.data.currentTime == 3) {
      duration = 60;
    } else if (this.data.currentTime == 4) {
      duration = 90;
    } else if (this.data.currentTime == 5) {
      duration = 120;
    } else {
      duration = 0;
    }
    var params =  "attendees="+ attendees + '&' + 
                  "cities="+ cities + '&' + 
                  "device="+ this.data.currentDev + '&' + 
                  "startDate="+ this.data.sdate + '&' + 
                  "endDate="+ this.data.edate + '&' + 
                  "startTime=" + this.data.stime + '&' + 
                  "endTime=" + this.data.etime + '&' +  
                  "duration=" + duration;
    var url = "../remoteResult/remoteResult?"+params;
    wx.navigateTo({
      url: url
    });
  }
})
