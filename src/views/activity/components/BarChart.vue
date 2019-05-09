<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { fetchActivityList } from '@/api/activity'

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      tableData: [],
      data: [],
      listQuery: {
        page: 1,
        limit: 100
      },
      ss1: 0,
      ss2: 0,
      ss3: 0,
      ss4: 0,

      qq1: 0,
      qq2: 0,
      qq3: 0,
      qq4: 0,

      ww1: 0,
      ww2: 0,
      ww3: 0,
      ww4: 0
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getList() {
      fetchActivityList(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.tableData.forEach(value => {
          // console.log(value.type)
          if (value.type == 'doing') {//eslint-disable-line
            if (value.people >= 200) {
              // row.tag = '爆'
              this.ss1++
            } else if (value.people <= 20) {
              // row.tag = '冷'
              this.ss2++
            } else if (value.people > 20 && value.people <= 100) {
              // row.tag = '沸'
              this.ss3++
            } else {
              // row.tag = '热'
              this.ss4++
            }
          } else if (value.type == 'do') {//eslint-disable-line
            if (value.people >= 200) {
              // row.tag = '爆'
              this.qq1++
            } else if (value.people <= 20) {
              // row.tag = '冷'
              this.qq2++
            } else if (value.people > 20 && value.people <= 100) {
              // row.tag = '沸'
              this.qq3++
            } else {
              // row.tag = '热'
              this.qq4++
            }
          } else {
            if (value.people >= 200) {
              // row.tag = '爆'
              this.ww1++
            } else if (value.people <= 20) {
              // row.tag = '冷'
              this.ww2++
            } else if (value.people > 20 && value.people <= 100) {
              // row.tag = '沸'
              this.ww3++
            } else {
              // row.tag = '热'
              this.ww4++
            }
          }
        })
        // console.log(this.ss1,this.ss2,this.ss3,this.ss4)
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      setTimeout(() => {
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['进行中', '未进行', '已结束'],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],
          series: [{
            name: '爆',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            // data: [79, 52, 200, 334, 390, 330, 220],
            data: [this.ss1, this.qq1, this.ww1],
            animationDuration
          }, {
            name: '热',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            // data: [80, 52, 200, 334, 390, 330, 220],
            data: [this.ss4, this.qq4, this.ww4],
            animationDuration
          }, {
            name: '沸',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            // data: [30, 52, 200, 334, 390, 330, 220],
            data: [this.ss3, this.qq3, this.ww3],
            animationDuration
          }, {
            name: '冷',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            // data: [30, 52, 200, 334, 390, 330, 220],
            data: [this.ss2, this.qq2, this.ww2],
            animationDuration
          }]
        })
      }, 1000)
    }
  }
}
</script>
