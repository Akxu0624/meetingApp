/**
 * @file remoteResult.js
 * @author xuguixin0624@gmail.com
 * @description 异地搜索结果
 */
import API from "../../api/api.js";
import {
  R_DATALIST
} from '../../utils/data.js';
var app = getApp();

Page({
	data: {
    dataList: R_DATALIST
	},
	onLoad (options) {
    console.log(options);
	},
	//预约按钮方法
	goReserve (e) {
	    var roomNameArr = e.currentTarget.dataset.room.map(item =>item.roomName);
	    var roomIdArr = e.currentTarget.dataset.room.map(item => item.roomId);
	    var attendeesArr = e.currentTarget.dataset.attendees.map(item => item.userDisplayName);
	    var attendeesId = e.currentTarget.dataset.attendees.map(item => item.email);
	    // 跳转传参,这里id=2是为了表示从同城预约界面过来,从另一个页面onload里接收数
	    var params = "stime="+e.currentTarget.dataset.stime+"&"+
	                  "etime="+e.currentTarget.dataset.etime+"&"+
	                  "roomName="+roomNameArr+"&"+
	                  "roomId="+roomIdArr+"&"+
	                  "attendeesId="+attendeesId+"&"+
	                  "attendeesArr="+attendeesArr+"&id=2";
	    var url = "../reserve/reserve?"+params;
	    wx.navigateTo({
	      url: url
	    })
	}
})
