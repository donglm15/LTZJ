<template>
  <div class="chart-container">
    <div ref="chart" style="height: 500px" />
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
    const option = {
      title: {
        text: '“冰激凌”用户月均使用流量分布',
        x: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      color: ['#D25E5A'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['500M以下', '500m-1G', '1-2G', '2-4G', '4-6G', '6-8G', '8G以上'],
          axisTick: {
            alignWithLabel: true
          },
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        }
      ],
      series: [
        {
          name: '分布比例',
          type: 'bar',
          barWidth: '60%',
          data: [25, 8, 11, 12, 12, 11, 21]
        }
      ]
    }
    this.chart.setOption(option)
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
