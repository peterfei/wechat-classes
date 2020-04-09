import HtmlToJson from '../../utils/html2json';
import {wwwUrl} from '../../global';
// 获取屏幕的宽高
let realWindowWidth = 0;
let realWindowHeight = 0;

(function() {
  wx.getSystemInfo({
    success(res) {
      realWindowWidth = res.windowWidth;
      realWindowHeight = res.windowHeight;
    },
  });
})();

Component({
  properties: {
    nodes: {
      type: null,
      observer(val) {
        if (val) {
          if (typeof val === 'string') {
            // 初始为html富文本字符串
            this._parseHtml(val);
          } else if (Array.isArray(val)) {
            // html 富文本解析成节点数组
            this.setData({nodesData: val});
          } else {
            // 其余为单个节点对象
            const nodesData = [val];
            this.setData({nodesData});
          }
        }
      },
    },
  },

  data: {
    nodesData: [],
    bindData: {},
  },

  methods: {
    _parseHtml(html, bindName) {
      bindName = 'wxParseData';

      //存放html节点转化后的json数据
      const transData = HtmlToJson.html2json(html, bindName);

      transData.view = {};
      transData.view.imagePadding = 0;

      this.setData({
        nodesData: transData.nodes,
        bindData: {
          [bindName]: transData,
        },
      });
      console.log(this.data);
    },

    /**
     * 图片视觉宽高计算函数区
     * @param {*} e
     */
    wxParseImgLoad(e) {
      // 获取当前的image node节点
      const {from: tagFrom} = e.target.dataset || {};
      if (typeof tagFrom !== 'undefined' && tagFrom.length > 0) {
        const {width, height} = e.detail;

        //因为无法获取view宽度 需要自定义padding进行计算，稍后处理
        const recal = this._wxAutoImageCal(width, height);
        this.setData({width: recal.imageWidth});
      }
    },

    /**
     * 计算视觉优先的图片宽高
     * @param {*} originalWidth
     * @param {*} originalHeight
     */
    _wxAutoImageCal(originalWidth, originalHeight) {
      let windowWidth = 0,
        windowHeight = 0;
      let autoWidth = 0,
        autoHeight = 0;
      const results = {};
      windowWidth = realWindowWidth;
      windowHeight = realWindowHeight;

      // 判断按照哪种方式进行缩放
      if (originalWidth > windowWidth) {
        //在图片width大于手机屏幕width时候
        autoWidth = windowWidth;
        autoHeight = (autoWidth * originalHeight) / originalWidth;
        results.imageWidth = autoWidth;
        results.imageHeight = autoHeight;
      } else {
        // 否则展示原来数据
        results.imageWidth = originalWidth;
        results.imageHeight = originalHeight;
      }
      return results;
    },

    /**
     * 增加a标签跳转
     * @param {*} e
     */
    wxParseTagATap(e) {
      const {src} = e.currentTarget.dataset;
      console.log(`%c%s`, 'color:blue', src);
      wx.downloadFile({
        url: wwwUrl + src,
        success(res) {
          console.log(`...正在下载`, JSON.stringify(res));
          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success: function(res) {
              var saveFilePath = res.savedFilePath;
              wx.showToast({
                title: '保存成功！',
                duration: 2000,
              });
              console.log('下载成功,保存至:', saveFilePath);
            }, //可以将saveFilePath写入到页面数据中
            fail: function(res) {
              console.log(res);
				wx.showToast({title:'因小程序下载受限,请转至app下载',icon:"none"})
            },
          });
        },
        fail(err) {
          console.log(`...下载失败`, JSON.stringify(err));
        },
      });
      // 采用递归组件方式渲染，不能通过triggerEvent方式向父级传参，可以获取当前页面调用页面方法处理
      const curPages = getCurrentPages();
      const currentPage = curPages[curPages.length - 1];
      if (currentPage) {
        currentPage.handleTagATap && currentPage.handleTagATap(src);
      }
    },
  },
});
