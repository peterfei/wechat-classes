import { capitalize, logMethodAsync, renameKeys } from "../../utils/util";
import regeneratorRuntime, {
    async
} from "../../regenerator-runtime/runtime.js";
import { token, contentType } from "../../global";
const app = getApp();
const DEFAULT_PAGE = 0;
Page({
    startPageX: 0,
    currentView: DEFAULT_PAGE,
    /**
     * 页面的初始数据
     */
    data: {
        surveyResults: [],
        navScrollLeft: 0,
        toView: `s_${DEFAULT_PAGE}`,
        selected_answer: [], //这里的数据结构如下:[{answes_id,question_id,type}]
        showMask: false,
        questioned: [],
        surveyToken: ""
    },

    touchStart(e) {
        this.startPageX = e.changedTouches[0].pageX;
    },
    prev(e) {
        this.currentView = this.currentView !== 0 ? +this.currentView - 1 : 0;
        this.setData({
            toView: `s_${this.currentView}`,
            currentPage: this.currentView
        });
    },
    next(e) {
        logMethodAsync("next事件:", e);
        const maxPage = this.data.surveyResults.length - 1;
        logMethodAsync("currentView", this.currentView);
        this.currentView =
            this.currentView !== maxPage ? +this.currentView + 1 : maxPage;
        logMethodAsync("currentView", this.currentView);
        this.setData({
            toView: `s_${this.currentView}`,
            currentPage: this.currentView
        });
    },
    touchEnd(e) {
        logMethodAsync("touchEnd事件:", e);
        const moveX = e.changedTouches[0].pageX - this.startPageX;
        const maxPage = this.data.surveyResults.length - 1;
        if (Math.abs(moveX) >= 20) {
            if (moveX > 0) {
                this.currentView =
                    this.currentView !== 0 ? this.currentView - 1 : 0;
            } else {
                this.currentView =
                    this.currentView !== maxPage
                        ? this.currentView + 1
                        : maxPage;
            }
        }
        this.setData({
            toView: `s_${this.currentView}`,
            currentPage: this.currentView
        });
    },

    scrollToPage: function(e) {
        logMethodAsync("scrollToPage", e);
        this.currentView = e.currentTarget.id;
        this.setData({
            toView: `s_${e.currentTarget.id}`,
            showMask: false,
            currentPage: e.currentTarget.id
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function(options) {
        let { survey_id, id } = options;

        let systemInfo = await wx.getSystemInfo();
        this.setData({
            survey_id: survey_id,
            classes_id: id,
            windowWidth: systemInfo.windowWidth,
            currentPage: this.currentView
        });
        this.loadData();
        this.getSurveyToken();
        /**
         * TODO 切换至下一题时,更改title 标题
         *
         */
    },

    /**
     * @fn function 获取提交答案时的Token
     * @return
     */
    getSurveyToken: async function() {
        let _data = { survey_id: this.data.survey_id };
        const result = await app.initClassPromise.getSurveyToken(
            token,
            _data,
            contentType
        );
        logMethodAsync("获取到的surveyToken", result);
        this.setData({
            surveyToken: result.result_data.start_token
        });
    },

    /**
     * @fn submitAnswer:function 提交答案
     * @param [] e
     */
    submitAnswer: async function(e) {
        /*wx.showModal({
      title: '',
      content: '确定要提交答案吗?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      },
    });*/
        let results = this.data.selected_answer.reduce((groups, item) => {
            let groupFound = groups.find(
                arrItem => item.question_id === arrItem.questions_ids
            );
            if (groupFound) {
                if (groupFound.answer_ids.indexOf(item.answes_id) == -1) {
                    groupFound.answer_ids.push(item.answes_id);
                }
            } else {
                let newGroup = {
                    answer_ids: [item.answes_id],
                    questions_ids: item.question_id
                };
                groups.push(newGroup);
            }
            return groups;
        }, []); //!!!IMPORT 针对数组进行了重新的组装,使用reduce分组及合并数组的object对象
        results = results.map(m => {
            m.answer_ids = m.answer_ids.join(",");
            return m;
        });
        logMethodAsync("results ", results);

        logMethodAsync("所选的答案列表", results);
        let _data = {
            survey_id: +this.data.survey_id,
            classes_id: +this.data.classes_id,
            encrypt_data: this.data.surveyToken,
            answer_data: JSON.stringify(results)
        };

        logMethodAsync("将要提交的答案数据", _data);

        const post_result = await app.initClassPromise.submitAnswer(
            token,
            _data,
            contentType
        );
        logMethodAsync("返回提交结果", post_result);
        if (post_result.error_code == 50000) {
            wx.showToast({
                title: post_result.error_msg,
                icon: "none",
                duration: 2000
            });
            return false;
        }
    },
    onFloatBtn: function(e) {
        console.log("onFloatBtn click");
        this.setData({ showMask: !this.data.showMask });
    },
    touchmoveHandler: function(e) {
        this.setData({
            //点击空白时触发
            showMask: false
        });
    },
    loadData: async function() {
        let _data = {
            survey_id: this.data.survey_id,
            classes_id: this.data.classes_id,
            is_rand: 1
        };
        const result = await app.initClassPromise.userSurvey(
            token,
            _data,
            contentType
        );
        logMethodAsync("当前获取到的列表", result);
        this.setData({
            surveyResults: result.result_data.question,
            totalPage: result.result_data.question.length - 1
        });
    },

    /**
     * @fn function 点击答题选项
     * @param [] e
     * @return
     */
    onAnswerChoose: function(e) {
        let { info, itemid, type } = e.currentTarget.dataset;
        let id = e.currentTarget.id;
        let ids = [];
        let newResult = [],
            obj = {};
        let _question = [];
        obj["answes_id"] = id;
        obj["question_id"] = itemid;
        obj["type"] = type;
        logMethodAsync("题型类型", type);
        //在push 之前检查是否已有键值,如有，则更新
        if (this.data.selected_answer.length > 0) {
            if (type == 1 || type == 3) {
                //单选
                newResult = this.data.selected_answer.filter((obj, index) => {
                    return obj.type == "1" || obj.type == "3"
                        ? obj["question_id"] != itemid
                        : obj; //有相同的键
                });
            } else if (type == 2) {
                logMethodAsync("题型类型", type);
                logMethodAsync("newResult is", newResult);
                newResult = this.data.selected_answer;
            }
        }
        ids.push(obj);
        logMethodAsync("newResult is", newResult);
        _question.push(itemid); //对答完题的主干进行记录
        /**
         * 选题后的答案列表
         *
         */
        this.setData({
            selected_answer: newResult.concat(ids),
            questioned: Array.from(
                new Set([...this.data.questioned, ..._question])
            ) //去重
        });
        logMethodAsync("点击答题选项", this.data.selected_answer);
        logMethodAsync("答完的题干", this.data.questioned);
        let _this = this;
        this.data.surveyResults.forEach(item => {
            let _q = _this.data.questioned.findIndex(_item => {
                return _item == item.id;
            });
            item["selected"] = _q >= 0 ? true : false;
            return item.answer.forEach(ans => {
                let x = _this.data.selected_answer.findIndex(_item => {
                    return _item.answes_id == ans.id;
                });
                ans["selected"] = x >= 0 ? true : false;
                return ans;
            });
        });

        logMethodAsync("更改后的对象", this.data.surveyResults);
        this.setData({ surveyResults: this.data.surveyResults });
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
    onShareAppMessage: function() {}
});
