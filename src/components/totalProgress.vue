<template>
    <div class="Progress_wrapper">
    <page>
        <div class="user_Progress_wrapper">
            <div class="user_Progress" >
                <div class="task_plan-ti_ku-wrapper">
                    <div class="task_plan-ti_ku_item task_plan-wrapper">
                        <div class="userProgress_item_title flex_between">
                            <span class="userProgress_item_title_text">任务计划</span>
                            <span v-cloak class="userProgress_item_title_percentage">{{renderData.currentTaskDays?renderData&&renderData.currentTaskDays:0}}/{{this.totalTaskDays}}</span>
                        </div>
                        <div class="progress-graph">
                            <div class=" userProgress_item_progress flex_between">当前完成
                                <el-progress class="zl-progress" :text-inside="false"  :stroke-width="10" :percentage="100"  :show-text="false"   /> <span >{{this.percentageCalculation(renderData.currentTaskDays, this.totalTaskDays)}}%</span></div>
                            <div class=" userProgress_item_progress flex_between">计划完成 <el-progress class="zl-progress" :text-inside="false"  :stroke-width="10" :percentage="100"  :show-text="false"   /><span >{{percentageCalculation(renderData.planTaskDays, this.totalTaskDays)}}%</span></div>
                        </div>
                    </div>
                    <div class="userProgress_item_title flex_between" style="margin-top: 44px"></div>
                    <div class="task_plan-ti_ku_item ti_ku-wrapper" @click="reload()" >
                        <div class="userProgress_item_title flex_between">
                            <span class="userProgress_item_title_text">专项练习</span>
                            <span v-cloak class="userProgress_item_title_percentage ">{{renderData.questionAnswerNum?renderData&&renderData.questionAnswerNum:0}}/{{renderData.questionTotalNum}}</span>
                        </div>
                        <div class="progress-graph">
                            <div class=" userProgress_item_progress flex_between">当前完成
                                <el-progress class="zl-progress" :text-inside="false"  :stroke-width="10" :percentage="95"  :show-text="false"   /> <span>{{this.percentageCalculation(renderData.questionAnswerNum, renderData.questionTotalNum)}}%</span></div>
                            <div class=" userProgress_item_progress flex_between">计划完成 <el-progress class="zl-progress" :text-inside="false"  :stroke-width="10" :percentage="100"  :show-text="false"   /><span >{{percentageCalculation(renderData.planTaskDays, this.totalTaskDays)}}%</span></div>
                        </div>
                    </div>
                </div>
                <div class="completePaper_word_composition" v-cloak>
                    <div class="completePaper_word_composition-item">
                        <!--真题练习-->
                        <div class="userProgress_item" v-cloak>
                            <div class="userProgress_item_title flex_between">
                                <div class="userProgress_item_title-yellow-square"></div>
                                <p>
                                    <span>真题练习</span>
                                </p>
                                <div class=" userProgress_item_title_quantity">
                                    <div>已完成{{this.renderData.completePaperNum?this.renderData&&this.renderData.completePaperNum:0}}套试卷</div>
                                </div>
                            </div>
                            <div class=" userProgress_item_progress flex_between"><div>当前完成</div><el-progress class="zl-progress" :text-inside="false"  :stroke-width="10" :percentage="100"  :show-text="false"   /><span>{{percentageCalculation(renderData.completePaperNum, renderData.totalPaperNum)}}%</span></div>
                        </div>
                        <!--单词-->
                        <div class="userProgress_item">
                            <div class="userProgress_item_title flex_between ">
                                <div class="userProgress_item_title-yellow-square"></div>
                                <p>
                                    <span>单词</span>
                                </p>
                                <span class="">{{this.renderData&&this.renderData.learnWordNum}}/{{this.renderData&&this.renderData.totalWordNum}}</span>
                            </div>
                            <div class=" userProgress_item_progress flex_between" >当前完成<el-progress class="zl-progress" :text-inside="false"  :stroke-width="10" :percentage="percentageCalculation(renderData.learnWordNum, renderData.totalWordNum)"  :show-text="false"   /><span>{{percentageCalculation(renderData.learnWordNum, renderData.totalWordNum)}}%</span></div>
                        </div>
                        <!--作文-->
                        <div class="userProgress_item">
                            <div class="userProgress_item_title flex_between">
                                <div class="userProgress_item_title-yellow-square"></div>
                                <p>
                                    <span>作文</span>
                                </p>
                                <span class="">{{renderData&&renderData.learnCompositionNum}}/{{renderData&&renderData.totalCompositionNum}}</span>
                            </div>
                            <!--:style="'width:'+renderData.compositionProgress+'%'"-->
                            <div class=" userProgress_item_progress flex_between">当前完成<el-progress class="zl-progress" :text-inside="false"  :stroke-width="10" :percentage="this.percentageCalculation(renderData.learnCompositionNum, renderData.totalCompositionNum, true)"  :show-text="false"   /><span >{{percentageCalculation(renderData.learnCompositionNum, renderData.totalCompositionNum)}}%</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </page>
    <zl-footer>
        <div class="index-footer-confirmReturnButton" @click="back">
            返回
        </div>
    </zl-footer>
    </div>
</template>
<script>
  import page from './page'
  import zlFooter from './zlFooter'
export default {
  data () {
    return {
      weekReportId: '',
      renderData: '',
      totalTaskDays: 100
    }
  },
  components: {
    page,
    'zl-footer': zlFooter
  },
  mounted () {
    this.$store.dispatch('setPageDescription', '总计划完成情况')
    this.$store.dispatch('setPageState', 4)
    console.log('this.$route.params.weekReportId：' + this.$store.state.weekReportId)
    this.weekReportId = this.$route.params.weekReportId
    this.$http.get(process.env.VUE_APP_WEEKREPORT_URL + 'weekReport/userTotalProgress?weekReportId=' + this.$store.state.weekReportId)
      .then((res) => {
        if (res.data.state === 200) {
          this.renderData = res.data.data.renderData
        }
      })
  },

  methods: {
    //  返回按钮
    back() {
      this.$router.push('/index')
    },
    reload () {
      console.log(21212)
      location.reload()
    },
    percentageCalculation (v1, v2) {
      var vv = 0
      if (v1 && v2) {
        const vv = Math.round(v1 / v2 * 100)
          return vv
      }
      return vv
    },
    GetQueryString(name) {
      var after = window.location.href.split('?')[1]
       if (after) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = after.match(reg)
        if (r != null) {
          return decodeURIComponent(r[2])
        } else {
          return null
        }
      }
    }
  }
}
</script>
<style  type="text/scss" lang="scss" rel="stylesheet/scss">
    @import "../assets/styles/global";
    .Progress_wrapper{
        .user_Progress_wrapper {
            width: 100%;
            height: 100%;
            /*margin-left: 35px;*/
            /*margin-right: 32px;*/
            .user_Progress {
                height: 100%;
                margin-left: 32px;
                .task_plan-ti_ku-wrapper {
                    width: 100%;
                    .task_plan-ti_ku_item {
                        position: relative;
                        height: 201px;
                        width: 571px;
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        display: flex;
                        .userProgress_item_title {
                            .userProgress_item_title_text {
                                position: absolute;
                                left: 25px;
                                top: 10px;
                                width:104px;
                                height:33px;
                                font-size:24px;
                                font-weight:500;
                                color:rgba(255,253,227,1);
                                line-height:33px;
                                text-shadow:0px 0px 2px rgba(255,232,137,1);
                            }
                            .userProgress_item_title_percentage {
                                position: absolute;
                                left: 163px;
                                top: 20px;
                                width:60px;
                                height:25px;
                                font-size:18px;
                                font-weight:500;
                                color:rgba(255,253,227,1);
                                line-height:25px;
                                text-shadow:0px 0px 2px rgba(255,232,137,1);
                            }
                        }
                        .progress-graph {
                            position: absolute;
                            top: 48px;
                            left: -14px;
                            .userProgress_item_progress {
                                margin-top: 30px;
                                display: flex;
                                margin-left: 38px;
                                flex-direction: row;
                                font-weight:500;
                                color:rgba(205,243,255,1);
                                text-shadow:0px 0px 1px rgba(153,231,255,1);
                                margin-bottom: 1px;
                                .zl-progress {
                                    margin-left: 9px;
                                    width: 360.1px;
                                    margin-right: 16px;
                                    height: 17px;
                                    margin-top: 1px;
                                    overflow: hidden;
                                }
                                > span {
                                    height:28px;
                                    position: absolute;
                                    right: -40px;
                                    font-weight:500;
                                    color:rgba(255,238,34,1);
                                    line-height:28px;
                                    text-shadow:0px 0px 1px rgba(153,231,255,1);
                                }
                                > div {
                                    flex: 1;
                                }
                            }
                            .userProgress_item_progress:nth-child(2) {
                                margin-top: 34px;
                            }
                        }

                    }
                    .ti_ku-wrapper {
                        background-image: url("../assets/images/middle_data_subtitle_02.png");
                    }
                    .task_plan-wrapper {
                        background-image: url("../assets/images/middle_data_subtitle.png");
                    }
                }
                .completePaper_word_composition {
                    position: relative;
                    margin-top: -18px;
                    margin-left: 17px;
                    height: 449px;
                    width: 538px;
                    background-image: url("../assets/images/thin-border-square-box.png");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    z-index: 999;
                    padding: 20px 24px;
                    .completePaper_word_composition-item {
                        margin-top: 53.25px;
                        .userProgress_item {
                            position: relative;
                            display: flex;
                            width: 100%;
                            flex-direction: column;
                            .userProgress_item_title {
                                position: relative;
                                margin-bottom: 21px;
                                display: flex;
                                flex-direction: row;
                                font-size:24px;
                                font-weight:500;
                                color:rgba(255,255,255,1);
                                line-height:33px;
                                align-items: baseline;
                                .userProgress_item_title-yellow-square {
                                    width:5px;
                                    height:20px;
                                    margin-right: 9px;
                                    background:rgba(249,213,67,1);
                                }
                                p {
                                    font-size:24px;
                                    font-weight:500;
                                    color:rgba(255,255,255,1);
                                    line-height:33px;
                                }
                                > span {
                                    position: absolute;
                                    right: 6px;
                                }
                                .userProgress_item_title_quantity {
                                    position: absolute;
                                    right: 6px;
                                }
                            }
                            .userProgress_item_progress {
                                position: relative;
                                width: 100%;
                                display: flex;
                                font-weight:500;
                                color:rgba(205,243,255,1);
                                margin-left: 0%;
                                flex-wrap: nowrap;
                                text-shadow:0px 0px 1px rgba(153,231,255,1);
                                margin-bottom: 38px;
                                .zl-progress {
                                    margin-left: 18.6px;
                                    width: 317px;
                                    margin-right: 16px;
                                    overflow: hidden;
                                }
                                > span {
                                    position: absolute;
                                    right: 6px;
                                    height:28px;
                                    font-weight:500;
                                    color:rgba(255,238,34,1);
                                    line-height:28px;
                                    text-shadow:0px 0px 1px rgba(153,231,255,1);
                                }
                            }
                        }
                        .userProgress_item:nth-child(n+2) {
                            padding-top: 4px;
                        }
                    }
                }
            }
        }
        .index-footer-confirmReturnButton {
            display: -moz-box;/*兼容Firefox*/
            display: -webkit-box;/*兼容FSafari、Chrome*/
            -moz-box-align: center;/*兼容Firefox*/
            -webkit-box-align: center;/*兼容FSafari、Chrome */
            -moz-box-pack: center;/*兼容Firefox*/
            -webkit-box-pack: center;/*兼容FSafari、Chrome */
            height: 100%;
        }
    }

</style>
