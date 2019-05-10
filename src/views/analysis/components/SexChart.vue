<template>
  <div ref="chart" class="chart-container" />
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
    const h = data()
    this.chart = echarts.init(this.$refs.chart)
    const option = {
      backgroundColor: '#08263a',
      title: {
        text: '冰激凌”用户不同年龄段男女人数统计',
        subtext: '单位:人',
        x: 'center',

        textStyle: {
          color: '#fff',
          fontSize: '22'
        },
        subtextStyle: {
          color: '#90979c',
          fontSize: '16'

        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          textStyle: {
            color: '#fff'
          }

        }
      },
      grid: {
        borderWidth: 0,
        top: 110,
        bottom: 95,
        textStyle: {
          color: '#fff'
        }
      },
      legend: {
        x: '4%',
        top: '11%',
        textStyle: {
          color: '#90979c'
        },
        data: ['女', '男', '平均']
      },

      calculable: true,
      xAxis: [{
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#90979c'
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitArea: {
          show: false
        },
        axisLabel: {
          interval: 0

        },
        data: [`10-15`, `15-20`, `20-25`, `25-30`, `30-35`, `35-40`, `40-45`, `45-50`, `50-55`]
      }],
      yAxis: [{
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#90979c'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0

        },
        splitArea: {
          show: false
        }

      }],
      dataZoom: [{
        show: true,
        height: 30,
        xAxisIndex: [
          0
        ],
        bottom: 30,
        start: 10,
        end: 80,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle: {
          color: '#d3dee5'

        },
        textStyle: {
          color: '#fff' },
        borderColor: '#90979c'

      }, {
        type: 'inside',
        show: true,
        height: 15,
        start: 1,
        end: 35
      }],
      series: [{
        name: '女',
        type: 'bar',
        stack: '总量',
        barMaxWidth: 35,
        barGap: '10%',
        itemStyle: {
          normal: {
            color: 'rgba(255,144,128,1)',
            label: {
              show: true,
              textStyle: {
                color: '#fff'
              },
              position: 'insideTop',
              formatter: function(p) {
                return p.value > 0 ? (p.value) : ''
              }
            }
          }
        },
        data: h[1]
      },
      {
        name: '男',
        type: 'bar',
        stack: '总量',
        itemStyle: {
          normal: {
            color: 'rgba(0,191,183,1)',
            barBorderRadius: 0,
            label: {
              show: true,
              position: 'top',
              formatter: function(p) {
                return p.value > 0 ? (p.value) : ''
              }
            }
          }
        },
        data: h[0]
      }, {
        name: '总数',
        type: 'line',
        stack: '总量',
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
          normal: {
            color: 'rgba(252,230,48,1)',
            barBorderRadius: 0,
            label: {
              show: true,
              position: 'top',
              formatter: function(p) {
                return p.value > 0 ? (p.value) : ''
              }
            }
          }
        },
        data: h[2]
      }
      ]
    }
    function RandomNumBoth(Min, Max) {
      const Range = Max - Min
      const Rand = Math.random()
      const num = Min + Math.round(Rand * Range)// 四舍五入
      return num
    }
    function data() { // 男生
      const n = []
      const m = []
      for (let i = 0; i < 9; i++) {
        n.push(RandomNumBoth(3000, 5000))
        m.push(RandomNumBoth(2000, 4000))
      }
      const t = m.map((v, i) => v + n[i])
      return [n, m, t]
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
