<template>
  <div class="app-container">
    <div class="chart-container">
      <el-button type="primary" icon="el-icon-arrow-right" style="position: relative; left: 10px; top:10px " @click="chooseNotice">切换</el-button>
      <div :id="id" :class="className" style="height:100%; width: 100%" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import echarts from 'echarts'

export default {
  computed: {
    ...mapState(['notice'])
  },
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chartChoose: -1,
      chart: null,
      numData: [],
      publishData1: [],
      publishData2: [],
      publishXAxis: [],
      dateData1: [],
      dateData2: [],
      dateXAxis: ['2018-01-', '2018-02-', '2018-03-', '2018-04-', '2018-05-', '2018-06-', '2018-07-', '2018-08-', '2018-09-', '2018-10-', '2018-11-', '2018-12-']
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById(this.id))
    this.chooseNotice()
  },
  methods: {
    chooseNotice() {
      this.chartChoose += 1
      if (this.chartChoose > 2) {
        this.chartChoose = 0
      }
      if (this.chartChoose === 0) {
        for (let i = 0; i < this.notice.notice.length; i++) {
          if (this.publishXAxis.indexOf(this.notice.notice[i].noticePublish.typePublish) === -1) {
            this.publishXAxis.push(this.notice.notice[i].noticePublish.typePublish)
          }
        }
        for (let px = 0; px < this.publishXAxis.length; px++) {
          let num1 = 0
          let num2 = 0
          for (const v of this.notice.notice) {
            if (this.publishXAxis[px] === v.noticePublish.typePublish) {
              num1 += 1
              if (v.noticeStatus === 'published') num2 += 1
            }
          }
          this.publishData1[px] = num1
          this.publishData2[px] = num2
          num1 = 0
          num2 = 0
        }
        const optionData = {
          title: {
            text: '公告统计表',
            subtext: '各部门公告发布情况',
            left: 'center'
          },
          xAxis: {
            data: this.publishXAxis
          },
          yAxis: {
            min: 0,
            max: 45,
            interval: 5,
            gridIndex: 0
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          series: [{ name: '总计', type: 'bar', data: this.publishData1 }, { name: '发布', type: 'bar', data: this.publishData2 }],
          legend: {
            show: true,
            data: [{ name: '总计', icon: 'cricle' }, { name: '发布', icon: 'cricle' }],
            left: 'right'
          }
        }
        this.chart.setOption(optionData)
      }
      if (this.chartChoose === 1) {
        for (let dx = 0; dx < this.dateXAxis.length; dx++) {
          let num1 = 0
          let num2 = 0
          for (const v of this.notice.notice) {
            if (v.noticeDate.includes(this.dateXAxis[dx])) {
              num1 += 1
              if (v.noticeStatus === 'published') num2 += 1
            }
          }
          this.dateData1[dx] = num1
          this.dateData2[dx] = num2
          num1 = 0
          num2 = 0
        }
        const optionData = {
          title: {
            text: '公告统计表',
            subtext: '2018年各月份公告发布情况',
            left: 'center'
          },
          xAxis: {
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
          },
          yAxis: {
            min: 0,
            max: 15,
            interval: 5,
            gridIndex: 0
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          series: [{ name: '总计', type: 'line', data: this.dateData1 }, { name: '发布', type: 'line', data: this.dateData2 }],
          legend: {
            show: true,
            data: [{ name: '总计', icon: 'cricle' }, { name: '发布', icon: 'cricle' }],
            left: 'right'
          }
        }
        this.chart.setOption(optionData)
      }
      if (this.chartChoose === 2) {
        let n1 = 0, n2 = 0, n3 = 0, n4 = 0, n5 = 0, n6 = 0 //eslint-disable-line
        for (const v of this.notice.notice) {
          if (v.noticeStatus === 'published') {
            if (v.noticeReadNum <= 50) {
              n1 += 1
            } else if (v.noticeReadNum <= 100) {
              n2 += 1
            } else if (v.noticeReadNum <= 150) {
              n3 += 1
            } else if (v.noticeReadNum <= 200) {
              n4 += 1
            } else if (v.noticeReadNum <= 250) {
              n5 += 1
            } else if (v.noticeReadNum <= 300) {
              n6 += 1
            }
          }
        }
        const optionData = {
          title: {
            text: '公告统计表',
            subtext: '公告点击量统计情况',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            right: 20,
            data: ['<50', '50-100', '100-150', '150-200', '200-250', '>250']
          },
          series: [
            {
              name: '点击量',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: n1, name: '<50' },
                { value: n2, name: '50-100' },
                { value: n3, name: '100-150' },
                { value: n4, name: '150-200' },
                { value: n5, name: '200-250' },
                { value: n6, name: '>250' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        this.chart.setOption(optionData, true)
      }
    }
  }
}
</script>

<style>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
