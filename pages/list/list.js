/**
 * @file list.js
 * @author xuguixin0624@gmail.com
 * @description 会议室查看列表
 */
var util=require('../../utils/util.js')
var boardroom = require('../../utils/boardroomArr.js');
var app = getApp();
import {
  BOARDROOMS
} from '../../utils/data.js';
Page({
	data: {
    	searchCity: [],//侧栏浮动选项
      boardroomList: BOARDROOMS, //会议室列表
	    showLetter: "",//字母
	    winHeight: 0,
	    isShowLetter: false,
	    scrollTop: 0,//置顶高度
	    scrollTopId: ''//置顶id
    },
    onLoad () {
        // 生命周期函数--监听页面加载
        var searchCity = ["北京", "上海", "深圳", "广州"];
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
			searchCity: tempObj
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
	},
	onPullDownRefresh () {
	// 页面相关事件处理函数--监听用户下拉动作
	},
	onReachBottom () {
	// 页面上拉触底事件的处理函数
	},
	clickLetter (e) {
		//点击侧栏城市
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
	onSelectItem (e) {
		// 选中会议室需要传递会议室编号id,u_id=1代表从列表入口进来
		var params = "id=" + e.currentTarget.dataset.id + "&u_id=1";
		
		wx.navigateTo({
			url: "../scan/scan?"+params
		})
	}
})
