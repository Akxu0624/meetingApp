var app = getApp();
var util=require('../../utils/util.js')
import {
  BOARDROOMS
} from '../../utils/data.js';
Page({
	data: {
    searchCity: [],
    showLetter: "",
    winHeight: 0,
    boardroomList: BOARDROOMS,
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    checkBrList: []//存储选中会议室
  },
  onLoad () {
    // 生命周期函数--监听页面加载
    var searchCity = ['北京', '上海', '深圳', '广州'];
		var sysInfo = wx.getSystemInfoSync();
		var winHeight = sysInfo.windowHeight;
		var itemH = winHeight / searchCity.length;
		var tempObj = [];
		for (var i = 0; i < searchCity.length; i++) {
			var temp = {};
			temp.name = searchCity[i];
			temp.tHeight = i * itemH;
			temp.bHeight = (i + 1) * itemH;
			tempObj.push(temp);
		}
		this.setData({
			winHeight: winHeight,
			itemH: itemH,
			searchCity: tempObj,
			checkBrList: app.globalData.checkBrList
		});
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
		app.updateCheckBrList(this.data.checkBrList);
		app.updateBoardroomList(this.data.boardroomList);
	},
	onPullDownRefresh () {
	// 页面相关事件处理函数--监听用户下拉动作

	},
	onReachBottom () {
	// 页面上拉触底事件的处理函数
	},
	clickLetter (e) {
		var showLetter = e.currentTarget.dataset.letter;
		this.setData({
		  showLetter: showLetter,
		  isShowLetter: true,
		  scrollTopId: showLetter,
		})
		var that = this;
		setTimeout(function () {
		  that.setData({
		    isShowLetter: false
		  })
		}, 1000)
	},
	//点击会议室选中或者取消事件
	onSelectItem (e) {
	
		var checkRoom = {},//
			judgment = 1, //未选中为1
			arr = this.data.boardroomList,//
			_checkList = this.data.checkBrList;//

		checkRoom.name = e.currentTarget.dataset.name;
		checkRoom.id = e.currentTarget.dataset.id;
		for (var i = 0; i<_checkList.length; i++ ) {
			if (_checkList[i].name === checkRoom.name && _checkList[i].id === checkRoom.id) {
				//取消选中
				util.removeByValueBr(_checkList, _checkList[i].name, _checkList[i].id);
				judgment = 0;

				//在boardroomList对应项去掉选中状态
				 for (var j = 0; j <arr.length; j++) {
					for (var k = 0; k < arr[j].boardroomInfo.length; k++) {
						if (typeof(arr[j].boardroomInfo[k]) != "undefined" ) {
							if (arr[j].boardroomInfo[k].name === checkRoom.name && arr[j].boardroomInfo[k].id == checkRoom.id) {
								arr[j].boardroomInfo[k].check = false;
								this.setData({
				   					boardroomList: arr
								});
								break;
							}
						}
					}
				}
				break;
			} 
		}

		if (judgment) {
			//选中
			_checkList.push(checkRoom);
			//在boardroomList对应项显示选中状态
			 for (var j = 0; j <arr.length; j++) {
				for (var k = 0; k < arr[j].boardroomInfo.length; k++) {
					if (typeof(arr[j].boardroomInfo[k]) != "undefined" ) {
						if (arr[j].boardroomInfo[k].name === checkRoom.name && arr[j].boardroomInfo[k].id == checkRoom.id) {
							arr[j].boardroomInfo[k].check = true;
							this.setData({
			   					boardroomList: arr
							});
							break;
						}
					}
				}
			}
		}
		this.setData({
		    checkBrList: _checkList
		});
	}
})
