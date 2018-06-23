/**
 * @file reserve.js
 * @author xuguixin0624@gmail.com
 * @description 常规预定
 */
var app = getApp();
var util = require('../../utils/util.js');
Page({
	data: {
		title: "",//会议主题
		sdate: "",//开始日期
		edate: "",//结束日期
		stime: "",//开始时间
		etime: "",//结束时间
		describe: "",//描述
		rcontacts: [],//联系人组
		rboardroom: [],//会议室组
        rcontactsId:[],
		source: ''
	},
	onLoad: function(options) {
		if (options.id !== undefined && options.id === '1') {
			console.log(options);
			let rboardroom = [];
			rboardroom.push({
				roomId: options.no,
				roomName: options.name
			});
			var startTimeTemp = options.stime.split(' ')[1];
			var endTimeTemp = options.etime.split(' ')[1];
			var startTime = startTimeTemp.split(':')[0] + ':' + startTimeTemp.split(':')[1];
			var endTime = endTimeTemp.split(':')[0] + ':' + endTimeTemp.split(':')[1];
			this.setData({
				sdate: options.stime.split(' ')[0],
				edate: options.etime.split(' ')[0],
				stime: startTime,
				etime: endTime,
				rboardroom: rboardroom,
				source: 'local'
			});
			this.setData({
				rcontacts: app.globalData.checkList
			});
		} else if (options.id !== undefined && options.id === '2') {
			let rboardroom = [];
			var idArr = options.roomId.split(',');
			var nameArr = options.roomName.split(',');
			var start = options.stime.split(' ');
			var end = options.etime.split(' ');
			for (var i = 0; i < idArr.length; i++) {
				rboardroom.push({
					roomId: idArr[i],
					roomName: nameArr[i]
				});
			}
			console.log(options);
            var startTimeTemp = options.stime.split(' ')[1];
            var endTimeTemp = options.etime.split(' ')[1];
            var startTime = startTimeTemp.split(':')[0] + ':' + startTimeTemp.split(':')[1];
            var endTime = endTimeTemp.split(':')[0] + ':' + endTimeTemp.split(':')[1];
        	this.setData({
        		sdate: start[0],
        		edate: end[0],
                stime: startTime,
                etime: endTime,
        		rboardroom: rboardroom,
        		rcontacts: options.attendeesArr.split(','),
                rcontactsId: options.attendeesId.split(','),
        		source: 'remote'
        	});
		} else {
			this.setData({
				sdate: util.getDate(),
				edate: util.getDate(),
				stime: util.getTime(),
				etime: util.getTime()
			});
			this.setData({
				rcontacts: app.globalData.checkList,
				rboardroom: app.globalData.checkBrList
			});
		}
	},
	onShow () {
		if (this.data.source === '') {
			this.setData({
				rboardroom: app.globalData.checkBrList
			});
		}
		if (this.data.source !== 'remote') {
			this.setData({
				rcontacts: app.globalData.checkList
			});
		}
	},
	onUnload () {
		app.updateCheckList(this.data.rcontacts);
		app.updateCheckBrList(this.data.rboardroom);
	},
	onHide () {
		app.updateCheckList(this.data.rcontacts);
		app.updateCheckBrList(this.data.rboardroom);
	},
	//预定按钮事件
	onReserve () {
		var attendees = [];
		if (this.data.source === 'remote') {
			attendees = this.data.rcontactsId;
		} else {
			attendees = this.data.rcontacts.map(item => item.email);
		}
		var rooms = this.data.rboardroom.map(item => item.roomId);
		var params = {
			subject: this.data.title,
			startDate: this.data.sdate,
			endDate: this.data.edate,
			startTime: this.data.stime,
			endTime: this.data.etime,
			description: this.data.describe,
			attendees: attendees,
			rooms: rooms
		};
    wx.showLoading({
      title: '正在预定中...',
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
    console.log(this.data.stime);
	},
	onChangeEtime (e) {
		this.setData({
			etime: e.detail.value
		});
    console.log(1212);
	},
	onSelect () {
    wx.navigateTo({
      url: "../contacts/contacts?type=reserve"
    })
  },
  onSelectBR () {
    wx.navigateTo({
      url: "../boardroom/boardroom"
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
    
        }
      }
    })
  },
  //删除会议室
  delBoardRoom (e) {
    var _this = this;

    wx.showModal({
        title: '提示',
        content: '是否移除该会议室',
        success: function(res) {
          if (res.confirm) {
            var checkRoom = {},//用来存储当前会议室
        arr = app.globalData.boardroomList,//临时存储会议室列表
        _checkList = _this.data.rboardroom;//临时存储选中的会议室数组

        checkRoom.name = e.currentTarget.dataset.name;
        checkRoom.id = e.currentTarget.dataset.id;
        for (var i = 0; i<_checkList.length; i++ ) {
          if (_checkList[i].name === checkRoom.name && _checkList[i].id === checkRoom.id) {
            //取消选中
        
            util.removeByValueBr(_checkList, _checkList[i].name, _checkList[i].id);

            //在boardroomList对应项去掉选中状态
              for (var j = 0; j <arr.length; j++) {
              for (var k = 0; k < arr[j].boardroomInfo.length; k++) {
                if (typeof(arr[j].boardroomInfo[k]) != "undefined" ) {
                  if (arr[j].boardroomInfo[k].name === checkRoom.name && arr[j].boardroomInfo[k].id == checkRoom.id) {
                    arr[j].boardroomInfo[k].check = false;
                    app.updateBoardroomList(arr);
                    break;
                  }
                }
              }
            }
            break;
          } 
        }
        _this.setData({
            rboardroom: _checkList
        });
          }else if (res.cancel) {

          }
        },fail: function(res) {

        }
    })
  },
  getTitle (e) {
    this.setData({
      title: e.detail.value
    });
  },
  getDescribe (e) {
    this.setData({
      describe: e.detail.value
    })
  }
})
