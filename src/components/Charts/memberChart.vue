<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>
<script>

import echarts from 'echarts'
import resize from './mixins/resize'    //eslint-disable-line

export default {

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
      chart: null
    }
  },

  mounted() {
    this.chart = echarts.init(document.getElementById(this.id))

    this.chart.setOption({
      title: {
        text: '',
        subtext: '每月组织活动时间'

      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },

      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: {
        min: 0,
        max: 25,
        name: '时间（小时）',
        interval: 1,
        gridIndex: 0,
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }

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
        },
        grid: { top: '55%' }
      },
      series: [
        {
          name: '主题党日',
          color: '#e6a700',
          type: 'bar',
          smooth: true,
          data: [3, 2, 5, 2, 7, 2, 5, 4, 5, 6, 9, 4]
        },
        {
          name: '党员自学',
          color: '#e2e2e2',
          type: 'bar',
          smooth: true,
          data: [5, 2, 8, 6, 8, 5, 7, 6, 4, 8, 10, 6]
        },
        {
          name: '经验交流',
          type: 'bar',
          smooth: true,
          data: [15, 12, 13, 7, 10, 9, 12, 15, 20, 22, 14, 16]
        },

        {
          name: '基层动态',
          color: '#f3f436',
          type: 'bar',
          smooth: true,
          data: [5, 2, 10, 13, 14, 13.5, 20, 18.5, 3, 14, 16, 19]
        },

        {
          name: '平均学习时长',
          color: 'yellow',
          type: 'line',
          //          smooth: true,
          data: [8.3, 8, 11.3, 9, 10.3, 9.17, 13, 9, 11.3, 11.3, 13.3, 10.2],
          style: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top'
              }
            }
          }
        },

        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '25%'],
          label: {
            formatter: '{b}: {@} ({d}%)'
          },
          encode: {
            itemName: 'product',
            value: '2012',
            tooltip: '2012'
          }
        }

      ],

      //      series:[
      //        {
      //          name:'活动占比',
      //          type:'pie',
      //
      //        }
      //      ],

      legend: {
        show: true,
        data: [
          {
            name: '主题党日',
            icon: 'circle'
          },
          {
            name: '党员自学',
            icon: 'circle'
          },
          {
            name: '基层动态',
            icon: 'circle'
          },
          {
            name: '经验交流',
            icon: 'circle'
          },
          {
            name: '平均学习时长',
            icon: 'line'
          }
        ]
      }

    })
  }

  //  mounted() {
  //    this.initChart()
  //  },
  //  beforeDestroy() {
  //    if (!this.chart) {
  //      return
  //    }
  //    this.chart.dispose()
  //    this.chart = null
  //  },

}
</script>

<style>

</style>
