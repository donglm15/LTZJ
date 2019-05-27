<template>
  <div class="chart-container" />
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { fetchActivityList } from '@/api/activity'

export default {
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
        this.tableData = response.data.list
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
          //          backgroundColor: '#08263a',
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            width: '350px',
            textStyle: {
              color: '#90979c'
            },
            data: ['冰淇淋129', '大冰神卡', '小冰神卡', '腾讯天王卡', '腾讯地王卡', '米粉卡', '冰淇淋99']
          },
          calculable: true,
          series: [
            {
              name: '每月销量分布图',
              type: 'pie',
              roseType: 'radius',
              radius: ['10%', '50%'],
              center: ['50%', '40%'],
              data: [
                { value: this.ss1, name: '冰淇淋129' },
                { value: this.ss2, name: '大冰神卡' },
                { value: this.ss3, name: '小冰神卡' },
                { value: this.ss6, name: '腾讯天王卡' },
                { value: this.ss7, name: '米粉卡' },
                { value: this.ss5, name: '冰淇淋99' },
                { value: this.ss4, name: '腾讯地王卡' }
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
  .chart-container{
    position: relative;
    width: 100%;
    height: 400px;
  }
</style>
