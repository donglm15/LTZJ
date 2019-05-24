<template>
  <div ref="chart" class="chart-container" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {

  data() {
    return {
      chart: null
    }
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
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '“冰激凌”用户APP偏好',
          subtext: '单位:%',
          x: 'center',
          textStyle: {
            color: '#fff',
            fontWeight: 'bold'
          },
          subtextStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        legend: {
          left: 'center',
          bottom: '10',
          textStyle: {
            color: '#fff'
          },
          data: ['手机视频', '即时通信', '手机音频', '地图导航', '电子支付', '新闻资讯', '网上购物']
        },
        calculable: true,
        series: [
          {
            name: '冰激凌”用户APP类别偏好度',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '50%'],
            data: [
              { value: 70, name: '手机视频' },
              { value: 110, name: '即时通信' },
              { value: 60, name: '手机音频' },
              { value: 45, name: '地图导航' },
              { value: 31, name: '电子支付' },
              { value: 62, name: '新闻资讯' },
              { value: 35, name: '网上购物' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
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
