<template>
  <div class="chart-container">
    <div ref="chart" style="height: 500px" />
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')

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
        text: '“冰激凌”用户终端偏好',
        subtext: '终端机型',
        left: 'center',
        textStyle: {
          color: '#fff'
        },
        subtextStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        formatter: '{b}:<br />用户比例： {c}%'
      },
      color: ['rgb(100,200,300)'],
      series: [{
        name: '终端品牌',
        type: 'treemap',
        visibleMin: 100,
        roam: false,
        data: [ // 注意，最外层是一个数组，而非从某个根节点开始。
          {
            value: 100,
            children: [{
              value: 35, // value字段的值，对应到面积大小。
              // 也可以是数组，如 [2323, 43, 55]，则数组第一项对应到面积大小。
              // 数组其他项可以用于额外的视觉映射，详情参见 series-treemp.levels。
              id: 'someid-1', // id 不是必须设置的。
              // 但是如果想使用 API 来改变某个节点，需要用 id 来定位。
              name: '苹果', // 显示在矩形中的描述文字。
              children: [
                {
                  value: 30,
                  id: 'someid-31',
                  name: 'iPhone 6'
                }, {
                  value: 32,
                  id: 'someid-32',
                  name: 'iPhone 7 Plus'
                }, {
                  value: 15,
                  id: 'someid-33',
                  name: 'iPhone X'
                }, {
                  value: 12,
                  id: 'someid-34',
                  name: 'iPhone 7'
                }, {
                  value: 11,
                  id: 'someid-31',
                  name: 'iPhone 6s'
                }
                // ...
              ],
              label: { // 此节点特殊的 label 定义（如果需要的话）。
                // ...         // label的格式参见 series-treemap.label。
              },
              itemStyle: { // 此节点特殊的 itemStyle 定义（如果需要的话）。
                // ...         // label的格式参见 series-treemap.itemStyle。
              }
            }, {
              value: 11,
              id: 'someid-2',
              name: 'OPPO',
              children: [
                {
                  value: 40,
                  id: 'someid-31',
                  name: 'OPPO R9S'
                }, {
                  value: 21,
                  id: 'someid-32',
                  name: 'OPPO R15x'
                }, {
                  value: 13,
                  id: 'someid-33',
                  name: 'OPPO A7'
                }, {
                  value: 10,
                  id: 'someid-34',
                  name: 'OPPO A7X'
                }, {
                  value: 7,
                  id: 'someid-31',
                  name: 'OPPO K1'
                }

                // ...
              ]

            }, {
              value: 20,
              id: 'someid-3',
              name: '华为',
              children: [
                {
                  value: 32,
                  id: 'someid-31',
                  name: '华为Mate 20 X'
                }, {
                  value: 24,
                  id: 'someid-32',
                  name: '华为Mate 20 Pro'
                }, {
                  value: 14,
                  id: 'someid-33',
                  name: '华为P20'
                }, {
                  value: 15,
                  id: 'someid-34',
                  name: '华为Mate30'
                }, {
                  value: 20,
                  id: 'someid-31',
                  name: '华为P30'
                }
                // ...
              ]

            }, {
              value: 10,
              id: 'someid-4',
              name: 'VIVO',
              children: [
                {
                  value: 24,
                  id: 'someid-31',
                  name: 'VIVO Y93'
                }, {
                  value: 13,
                  id: 'someid-32',
                  name: 'VIVO X20A'
                }, {
                  value: 35,
                  id: 'someid-33',
                  name: 'VIVO X27'
                }, {
                  value: 30,
                  id: 'someid-34',
                  name: 'VIVO NEX'
                }, {
                  value: 10,
                  id: 'someid-31',
                  name: 'VIVO S1'
                }
                // ...
              ]

            }, {
              value: 15,
              id: 'someid-5',
              name: '其它',
              children: [
                {
                  value: 25,
                  id: 'someid-31',
                  name: '小米'
                }, {
                  value: 25,
                  id: 'someid-32',
                  name: '荣耀'
                }, {
                  value: 25,
                  id: 'someid-33',
                  name: '三星'
                }, {
                  value: 12,
                  id: 'someid-34',
                  name: '金立'
                }, {
                  value: 13,
                  id: 'someid-31',
                  name: '魅族'
                }
                // ...
              ]

            }

            ]
          }
          // {
          //     value: [23, 59, 12]
          //     // 如果没有children，可以不写
          // },
          // ...
        ],
        leafDepth: 2,
        levels: [{
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 10,
              gapWidth: 4
            }
          }
        }, {
          colorSaturation: [0.3, 0.6],
          itemStyle: {
            normal: {
              borderColorSaturation: 0.7,
              gapWidth: 5,
              borderWidth: 2
            }
          }
        }, {
          colorSaturation: [0.3, 0.5],
          itemStyle: {
            normal: {
              borderColorSaturation: 0.6,
              gapWidth: 1
            }
          }
        }, {
          colorSaturation: [0.3, 0.5]
        }]
      }]
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
