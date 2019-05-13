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
    this.chart = echarts.init(this.$refs.chart)
    const option = {
      series: [
        {
          name: ' 在线人数',
          type: 'pie',
          radius: ['25%', '30%'],
          center: ['15%', '20%'],
          startAngle: 225,
          color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#00a2ff'
          }, {
            offset: 1,
            color: '#70ffac'
          }]), 'transparent'],
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 75,
            name: '在线人数',
            label: {
              normal: {
                formatter: '在线人数\n',
                textStyle: {
                  color: '#000',
                  fontSize: 20
                }
              }
            }
          }, {
            value: 25,
            name: '%',
            label: {
              normal: {
                formatter: '\n95',
                textStyle: {
                  color: '#007ac6',
                  fontSize: 30

                }
              }
            }
          },
          {
            value: 0,
            name: '%',
            label: {
              normal: {
                formatter: '',
                textStyle: {
                  color: '#fff',
                  fontSize: 16

                }
              }
            }
          }]
        },
        {
          name: ' 在售项目',
          type: 'pie',
          radius: ['25%', '30%'],
          center: ['38%', '20%'],
          startAngle: 225,
          color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#00a2ff'
          }, {
            offset: 1,
            color: '#70ffac'
          }]), 'transparent'],
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 75,
            name: '在售项目',
            label: {
              normal: {
                formatter: '在售项目\n',
                textStyle: {
                  color: '#000',
                  fontSize: 20

                }
              }
            }
          }, {
            value: 25,
            name: '%',
            label: {
              normal: {
                formatter: '\n53',
                textStyle: {
                  color: '#007ac6',
                  fontSize: 30

                }
              }
            }
          },
          {
            value: 0,
            name: '%',
            label: {
              normal: {
                formatter: '',
                textStyle: {
                  color: '#fff',
                  fontSize: 16

                }
              }
            }
          }]
        },
        {
          name: ' 现有产品',
          type: 'pie',
          radius: ['25%', '30%'],
          center: ['62%', '20%'],
          startAngle: 225,
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 75,
            'itemStyle': {
              'normal': {
                'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  'offset': 0,
                  'color': '#f125ff'
                }, {
                  'offset': 1,
                  'color': '#2dcbff'
                }])
              }
            },
            name: '现有产品',
            label: {
              normal: {
                formatter: '现有产品\n',
                textStyle: {
                  color: '#000',
                  fontSize: 20

                }
              }
            }
          }, {
            value: 25,
            name: '%',
            label: {
              normal: {
                formatter: '\n84',
                textStyle: {
                  color: '#f125ff',
                  fontSize: 30

                }
              }
            }
          },
          {
            value: 0,
            name: '%',
            label: {
              normal: {
                formatter: '',
                textStyle: {
                  color: '#fff',
                  fontSize: 16

                }
              }
            }
          }]
        },
        {
          name: '总人数',
          type: 'pie',
          radius: ['25%', '30%'],
          center: ['85%', '20%'],
          startAngle: 225,
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 75,
            'itemStyle': {
              'normal': {
                'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  'offset': 0,
                  'color': '#f125ff'
                }, {
                  'offset': 1,
                  'color': '#2dcbff'
                }])
              }
            },
            name: '总人数',
            label: {
              normal: {
                formatter: '总人数\n',
                textStyle: {
                  color: '#000',
                  fontSize: 20

                }
              }
            }
          }, {
            value: 25,
            name: '%',
            label: {
              normal: {
                formatter: '\n5341',
                textStyle: {
                  color: '#f125ff',
                  fontSize: 30

                }
              }
            }
          },
          {
            value: 0,
            name: '%',
            label: {
              normal: {
                formatter: '',
                textStyle: {
                  color: '#fff',
                  fontSize: 16

                }
              }
            }
          }]
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
