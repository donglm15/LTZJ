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
        text: '“冰激凌”用户活跃时段',
        subtext: '“冰激凌”用户分时段平均使用流量',
        x: 'center',

        textStyle: {
          color: '#fff'
        },
        subtextStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}点<br>{c}M ({d}%)'
      },
      series: [{
        name: '上网时间',
        type: 'pie',
        radius: ['5%', '65%'],
        roseType: 'area',
        color: ['#3fa7dc'],
        data: data(),
        labelLine: {
          normal: {
            show: false
          }
        },
        label: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
      {
        name: '',
        type: 'gauge',
        min: 0,
        max: 24,
        startAngle: 90,
        endAngle: 449.9,
        radius: '85%',
        splitNumber: 24,
        clockwise: false,
        animation: false,
        detail: {
          show: false,
          formatter: '{value}',
          textStyle: {
            color: '#63869e'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: [
              [0.25, '#63869e'],
              [0.75, '#ffffff'],
              [1, '#63869e']
            ],
            width: '40%',
            shadowColor: '#0d4b81', // 默认透明
            shadowBlur: 40,
            opacity: 1
          }
        },
        splitLine: {
          length: 5,
          lineStyle: {
            color: '#ffffff',
            width: 2
          }
        },
        axisLabel: {
          formatter: function(v) {
            return v || ''
          },
          textStyle: {
            color: 'red',
            fontWeight: 700
          }
        },
        itemStyle: {
          normal: {
            color: 'green',
            width: 2
          }
        }
      },
      {
        name: '',
        type: 'gauge',
        min: 0,
        max: 24,
        startAngle: 90,
        endAngle: 449.9,
        radius: '72%',
        splitNumber: 24,
        clockwise: false,
        animation: false,
        detail: {
          show: false,
          formatter: '{value}',
          textStyle: {
            color: '#63869e'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: [
              [1, '#E8E8E8']
            ],
            width: '10%',
            opacity: 0.8
          }
        },
        splitLine: {
          show: true,
          length: '92%',
          lineStyle: {
            color: 'grey',
            width: '1'
          }
        },
        axisLabel: {
          show: false,
          formatter: function(v) {
            return v || ''
          },
          textStyle: {
            color: '#fb5310',
            fontWeight: 700
          }
        },
        itemStyle: {
          normal: {
            color: 'green',
            width: 2,
            borderWidth: 3
          }
        }
      }
      ]
    }
    function data() { // 用户上网流量
      const d = []
      for (let i = 0; i < 24; i++) {
        d.push({
          name: i + '~' + (i + 1),
          value: (Math.random() * 100).toFixed(1)
        })
      }
      return d
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
