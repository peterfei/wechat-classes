import {token, contentType} from '../../global';
import regeneratorRuntime from '../../regenerator-runtime/runtime';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    html_data: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    console.log(`%c%s`, 'color:#9e9', JSON.stringify(options));
    const article_info = await app.initClassPromise.showClassesArticleInfo(
      token,
      {id: options.id, article_id: options.article_id},
      contentType,
    );
    console.log(`%c%s`, 'color:red', JSON.stringify(article_info));
	wx.setNavigationBarTitle({
		title: article_info.result_data.name
	})
    this.setData({
      html_data: article_info.result_data.content,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
});
