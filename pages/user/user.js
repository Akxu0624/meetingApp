/**
 * @file user.js
 * @author xuguixin0624@gmail.com
 * @description 个人中心
 */
Page({
	loginOut () {
		wx.showModal({
		  title: '提示',
		  content: '是否退出当前账号',
		  success: function(res) {
		    if (res.confirm) {
		    	wx.clearStorageSync();
				wx.redirectTo({
		      		url: "../index/index"
		    	});
		    } else if (res.cancel) {
		      console.log('用户点击取消')
		    }
		  }
		})
	}
})
