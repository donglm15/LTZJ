<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts' // 引入ECharts
import resize from './mixins/resize' // 根据页面大小重新绘制图表

export default {
  mixins: [resize],
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
    this.initChart() // 初始化图表
  },
  beforeDestroy() { // 实例销毁之前
    if (!this.chart) {
      return
    }
    this.chart.dispose() // 销毁图表
    this.chart = null
  },
  methods: {
    initChart() { // 初始化图表
      this.chart = echarts.init(document.getElementById(this.id))
      // x轴坐标值（1-12月）
      const xData = (function() {
        const data = []
        for (let i = 1; i < 13; i++) {
          data.push(i + ' 月')
        }
        return data // [1月 2月...12月]
      }()) // (function(){...}())立即执行函数
      // 完成图表绘制配置
      this.chart.setOption({
        backgroundColor: 'rgba(255, 255, 255,0)', // 背景色
        // 标题
        title: {
          text: '用户活跃度统计',
          x: '20', // 主标题水平距离左侧的大小
          top: '20', // 主标题离容器上侧的距离
          textStyle: { // 主标题风格
            color: '#fff',
            fontSize: '22'
          },
          subtext: '统计2018年的数据', // 副标题
          subtextStyle: { // 副标题风格
            color: '#fff',
            fontSize: '16'
          }
        },
        // 提示框组件
        tooltip: {
          trigger: 'axis', // 触发类型(axis:坐标轴触发)
          axisPointer: { // 坐标轴指示器配置项
            type: 'cross',
            label: {
              backgroundColor: '#000'
            },
            textStyle: {
              color: '#fff'
            }
          }
        },
        // 直角坐标系内绘图网格
        grid: {
          show: false, // 显示
          left: '5%', // grid 组件离容器左侧的距离
          right: '5%', // grid 组件离容器右侧的距离。
          borderWidth: 0, // 网格的边框线宽
          top: 150, // grid 组件离容器上侧的距离
          bottom: 95, // grid 组件离容器下侧的距离
          textStyle: {
            color: '#fff'
          }
        },
        // 图例组件
        legend: {
          x: '6%',
          top: '14%',
          textStyle: {
            color: '#fff'
          },
          data: ['老用户', '新用户', '所有用户']
        },
        // 是否启用拖拽重计算特性，默认关闭(即值为false)
        calculable: true,
        // x 轴
        xAxis: [{
          type: 'category', // 类目轴(离散的)
          axisLine: { // 坐标轴轴线相关设置
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: { // 分隔线
            show: false
          },
          axisTick: { // 坐标轴刻度
            show: false
          },
          splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示
            show: false
          },
          axisLabel: { // 坐标轴刻度标签的相关设置
            interval: 0 // 0:强制显示所有标签
          },
          data: xData
        }],
        // y 轴
        yAxis: [{
          type: 'value', // 数值轴(连续的)
          splitLine: { // 分隔线
            show: true,
            lineStyle: { // 线的类型
              type: 'dashed' // 虚线
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
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
        // 区域缩放组件
        dataZoom: [{
          show: false,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 0,
          end: 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: { // 移动方块
            color: '#d3dee5'
          },
          textStyle: { // 文字
            color: '#666' },
          borderColor: '#90979c' // 边框
        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        // series:一系列的数据(图表中的数据)
        series: [{
          name: '老用户',
          type: 'bar',
          stack: 'total', // 数据堆叠,同个类目轴上系列配置相同的stack值可以堆叠放置
          barMaxWidth: 35, // 柱条的最大宽度
          barGap: '10%', // 不同系列的柱间距离
          itemStyle: { // 图形样式
            normal: {
              color: 'rgba(2, 134, 217,1)', // 柱条的颜色
              label: { // 数据标签
                show: true,
                textStyle: {
                  color: '#fff' // 颜色
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          // 老用户数据
          data: [
            709,
            1917,
            2455,
            2610,
            1719,
            1433,
            1544,
            3285,
            5208,
            3372,
            2484,
            4078
          ]
        }, {
          name: '新用户',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: 'rgba(254, 136, 4,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                textStyle: {
                  color: '#fff' // 颜色
                },
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          // 新用户数据
          data: [
            327,
            1776,
            507,
            1200,
            800,
            482,
            204,
            1390,
            1001,
            951,
            381,
            220
          ]
        }, {
          name: '所有用户',
          type: 'line',
          smooth: true, // 平滑的曲线
          stack: 'total',
          symbolSize: 20, // 标记的大小
          symbol: 'circle', // 标记的图形
          itemStyle: {
            normal: {
              color: 'rgba(253, 247, 5,1)', // 颜色
              barBorderRadius: 0, // 圆角半径
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#fff' // 颜色
                },
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          // 平均值数据
          data: [
            1036,
            3693,
            2962,
            3810,
            2519,
            1915,
            1748,
            4675,
            6209,
            4323,
            2865,
            4298
          ]
        }
        ]
      })
    }
  }
}
</script>

<style>

</style>
