/**
 * @file index.js
 * @author xuguixin0624@gmail.com
 * @description 登录页面
 */
var app = getApp();
Page({
  data: {
    email: 'Zinc@qq.com',//邮箱
    password: '123456',//密码
    isAgree: true//记住账号密码凭证
  },
  onLogin () {
    var email, password, reg; 

    email = this.data.email;
    password = this.data.password;
    reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 

    if(email === '') {
      wx.showToast({
        title: '邮箱不能为空',
        image: '../../images/failmsg.png',
        duration: 2000
      });
      return;
    };
    if(!reg.test(email)) {
      wx.showToast({
        title: '邮箱格式不正确',
        image: '../../images/failmsg.png',
        duration: 2000
      });
      return;
    };
    if(password == '') {
      wx.showToast({
        title: '密码不能为空',
        image: '../../images/failmsg.png',
        duration: 2000
      });
      return;
    };
    wx.switchTab({
      url: '../main/main'
    })
  },
  inputEmail (e) {
    this.setData({
        email: e.detail.value
      });
  },
  inputPassword (e) {
    this.setData({
        password: e.detail.value
      });
  },
  bindAgreeChange (e) {
    this.setData({
        isAgree: !!e.detail.value.length
    });
  }
})