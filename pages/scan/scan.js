/**
 * @file scan.js
 * @author xuguixin0624@gmail.com
 * @description 会议室排期详情
 */
import Util from "../../utils/util.js";
import API from "../../api/api.js";
var app = getApp();
Page({
	data: {
		brDetailsList: {
      "name": "桃花源会议室排期",
      "id": "11",
      "array": [
        { "start_time": "12:00", "end_time": "13:00", "title": "巴西VS瑞士", "initiator": "内马尔" },
        { "start_time": "13:00", "end_time": "15:00", "title": "巴西VS中国", "initiator": "阿鲁巴" },
        { "start_time": "15:10", "end_time": "15:40", "title": "阿根廷VS冰岛", "initiator": "梅西" },
        { "start_time": "16:00", "end_time": "17:00", "title": "德国VS墨西哥", "initiator": "鸡肉卷" },
        { "start_time": "17:00", "end_time": "17:50", "title": "世界杯吐槽大会", "initiator": "中国队" }
      ]
    },
		title: ''
	},
	onLoad (options) {
    wx.setNavigationBarTitle({
      title: this.data.brDetailsList.name
    });
	}
})
