<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { fetchActivityList } from '@/api/activity'

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
      ss5: 0,
      ss6: 0,
      ss7: 0
    }
  },
  mounted() {
    this.getList()
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getList() {
      fetchActivityList(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.tableData.forEach(value => {
          if (value.prize.match('爱奇艺')) {
            this.ss1++
          } else if (value.prize.match('流量包')) {
            this.ss2++
          } else if (value.prize.match('话费')) {
            this.ss3++
          } else if (value.prize.match('腾讯视频')) {
            this.ss4++
          } else if (value.prize.match('微信红包')) {
            this.ss5++
          } else if (value.prize.match('中石油')) {
            this.ss6++
          } else if (value.prize.match('京东E卡')) {
            this.ss7++
          }
        })
        // console.log(this.ss1,this.ss2,this.ss3,this.ss4,this.ss5,this.ss6,this.ss7)
      })
    },

    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      setTimeout(() => {
        this.chart.setOption({
          //            title:{
          //              text:'奖品分布数据',
          //              textStyle: {
          //                color: '#90979c',
          //                fontSize: '22'
          //              },
          //              left:'center',
          //              top:'top'
          //            },
          backgroundColor: '#08263a',
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            width: '450px',
            textStyle: {
              color: '#90979c'
            },
            data: ['爱奇艺视频卡', '流量包', '话费', '中石油加油卡', '腾讯视频卡', '京东E卡', '微信红包']
          },
          calculable: true,
          series: [
            {
              name: '奖品分布图',
              type: 'pie',
              roseType: 'radius',
              radius: [15, 95],
              center: ['50%', '38%'],
              data: [
                { value: this.ss1, name: '爱奇艺视频卡' },
                { value: this.ss2, name: '流量包' },
                { value: this.ss3, name: '话费' },
                { value: this.ss6, name: '中石油加油卡' },
                { value: this.ss7, name: '京东E卡' },
                { value: this.ss5, name: '微信红包' },
                { value: this.ss4, name: '腾讯视频卡' }
              ],

              animationEasing: 'cubicInOut',
              animationDuration: 1000
            }
          ]
        })
      }, 1000)
    }

  }
}
</script>
<style>
</style>
