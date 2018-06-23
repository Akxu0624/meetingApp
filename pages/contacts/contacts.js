var app = getApp();
var util=require('../../utils/util.js');
var searchLetter = ["A", "B", "C", "D", "E", "F", "G", "H","J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"];
import {
  CONTACTS
} from '../../utils/data.js';
Page({
	data: {
		contactData: [],
    	searchLetter: [],
	    showLetter: "",
	    winHeight: 0,
      contactsList: CONTACTS,
	    isShowLetter: false,
	    scrollTop: 0,//置顶高度
	    scrollTopId: '',//置顶id
	    contacts: '',
	    inputShowed: false,
	    inputVal: "",//搜索框键入值
	    inputList: [],//存储搜索结果
	    checkList: [],//存储选中人员,（需要传递给后台数据）
	    type: 'reserve'
    },
    // 生命周期函数--监听页面加载
    onLoad (options) {
		this.setData({
      contactData: app.globalData.contactData,
      type: options.type
    });
    var sysInfo = wx.getSystemInfoSync();
		var winHeight = sysInfo.windowHeight;
		var itemH = winHeight / searchLetter.length;
		var tempObj = [];

		wx.showLoading({
		  title: '加载中',
		});
		for (var i = 0; i < searchLetter.length; i++) {
			var temp = {};
			temp.name = searchLetter[i];
			temp.tHeight = i * itemH;
			temp.bHeight = (i + 1) * itemH;
			tempObj.push(temp)
		}
		this.setData({
			winHeight: winHeight,
			itemH: itemH,
			searchLetter: tempObj,
			checkList: app.globalData.checkList
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
		app.updateCheckList(this.data.checkList);
		app.updateContactsList(this.data.contactsList);
	},
	onPullDownRefresh () {
	// 页面相关事件处理函数--监听用户下拉动作

	},
	onReachBottom () {
	// 页面上拉触底事件的处理函数

	},
	// 点击右侧字母事件
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
	showInput () {
		this.setData({
		    inputShowed: true
		});
	},
	hideInput () {
		this.setData({
		    inputVal: "",
		    inputShowed: false
		});
	},
	clearInput () {
		this.setData({
		    inputVal: ""
		});
	},
	//匹配搜索事件
	inputTyping (e) {
		var prefix = e.detail.value;//用户实时输入值
		var searchList = [];//检索结果数组
    var adapterSource = this.data.contactData;//匹配源
		if(prefix != '') {//输入值不为空情况
			adapterSource.forEach(function(e) {
				var name = e.name;
				if (name.indexOf(prefix) != -1) {
					searchList.push(e);
				}
			})
		}
		console.log(searchList);
		if (searchList.length != 0) {
			this.setData({
				inputList: searchList
			});
		} else {
			this.setData({
				inputList: []
			})
		}
		//获取实时输入值赋值给inputVal
		this.setData({
		    inputVal: e.detail.value
		});
	},
	//点击单个联系人选中或者取消事件
	onSelectItem (e) {
	
		var checkMan = {},//用来存储当前联系人
			judgment = 1, //未选中为1
			arr = this.data.contactsList,//临时存储人员列表
			_checkList = this.data.checkList;//临时存储选中的人数组

		checkMan.name = e.currentTarget.dataset.name;
		checkMan.email = e.currentTarget.dataset.email;
		for (var i = 0; i<_checkList.length; i++ ) {
			if (_checkList[i].name === checkMan.name && _checkList[i].email === checkMan.email) {
				//取消选中
				util.removeByValue(_checkList, _checkList[i].name, _checkList[i].email);
				judgment = 0;

				//在contactsList对应项去掉选中状态
				 for (var j = 0; j <arr.length; j++) {
					for (var k = 0; k < arr[j].contactsInfo.length; k++) {
						if (typeof(arr[j].contactsInfo[k]) != "undefined" ) {
							if (arr[j].contactsInfo[k].name === checkMan.name && arr[j].contactsInfo[k].email === checkMan.email) {
								arr[j].contactsInfo[k].check = false;
								this.setData({
				   					contactsList: arr
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
			_checkList.push(checkMan);

			//在contactsList对应项显示选中状态
			 for (var j = 0; j <arr.length; j++) {
				for (var k = 0; k < arr[j].contactsInfo.length; k++) {
					if (typeof(arr[j].contactsInfo[k]) != "undefined" ) {
						if (arr[j].contactsInfo[k].name === checkMan.name && arr[j].contactsInfo[k].email === checkMan.email) {
						arr[j].contactsInfo[k].check = true;

						this.setData({
		   					contactsList: arr
						});
						break;
					}
					}
				}
			}
		}
		this.setData({
		    checkList: _checkList
		});
	},
	searchSelectedEvent (e) {
		var checkMan = {},//用来存储当前联系人
			judgment = 1, //未选中为1
			arr = this.data.contactsList,//临时存储人员列表
			_checkList = this.data.checkList;//临时存储选中的人数组

		checkMan.name = e.currentTarget.dataset.name;
		checkMan.email = e.currentTarget.dataset.email;
		for (var i = 0; i<_checkList.length; i++ ) {
			if (_checkList[i].name === checkMan.name && _checkList[i].email === checkMan.email) {
				//取消选中
				util.removeByValue(_checkList, _checkList[i].name, _checkList[i].email);
				judgment = 0;

				//在contactsList对应项去掉选中状态
				 for (var j = 0; j <arr.length; j++) {
					for (var k = 0; k < arr[j].contactsInfo.length; k++) {
						if (typeof(arr[j].contactsInfo[k]) != "undefined" ) {
							if (arr[j].contactsInfo[k].name === checkMan.name && arr[j].contactsInfo[k].email === checkMan.email) {
								arr[j].contactsInfo[k].check = false;
								this.setData({
				   					contactsList: arr
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
			_checkList.push(checkMan);

			//在contactsList对应项显示选中状态
			 for (var j = 0; j <arr.length; j++) {
				for (var k = 0; k < arr[j].contactsInfo.length; k++) {
					if (typeof(arr[j].contactsInfo[k]) != "undefined" ) {
						if (arr[j].contactsInfo[k].name === checkMan.name && arr[j].contactsInfo[k].email === checkMan.email) {
						arr[j].contactsInfo[k].check = true;

						this.setData({
		   					contactsList: arr
						});
						break;
					}
					}
				}
			}
		}
		this.setData({
		    checkList: _checkList
		});
		if (this.data.type === 'remote') {
			wx.navigateBack({
			  	url: '../remote/remote'
			});
		} else {
			wx.navigateBack({
			  	url: '../reserve/reserve'
			});
		}
	}
})
