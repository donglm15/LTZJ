<template>
  <div ref="chart" class="chart-container" />
</template>

<script>
import echarts from 'echarts'
import 'echarts/lib/chart/map'
import resize from '@/components/Charts/mixins/resize'
// 需引入对应国家、省、区的地图数据文件
import 'echarts/map/js/province/fujian.js'

export default {
  mixin: [resize],
  data() {
    return {
      chart: null,
      option: null
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart)

    //    const region = ['南平市', '宁德市', '三明市', '福州市', '莆田市', '泉州市', '漳州市', '龙岩市', '厦门市']
    //    function RandomNumBoth(Min, Max) {
    //      const Range = Max - Min
    //      const Rand = Math.random()
    //      const num = Min + Math.round(Rand * Range)// 四舍五入
    //      return num
    //    }
    //    function data() {
    //      const d = []
    //      for (let i = 0; i < 9; i++) {
    //        d.push({
    //          name: region[i],
    //          value: RandomNumBoth(60, 500)
    //        })
    //      }
    //      return d
    //    }
    const option = {
      legend: { // 地图上面的点
        orient: 'vertical',
        left: 'left',
        data: ['福建']
      },
      title: {
        text: '福建“冰激凌”用户分布',
        subtext: '福建“冰激凌”用户分布（单位:万）',
        left: 'center',
        top: 'top',
        textStyle: {
          color: '#fff'
        },
        subtextStyle: {
          color: '#fff'
        }
      }, // 地图左侧数据过滤器
      visualMap: {
        min: 0,
        max: 500,
        itemWidth: 10,
        itemHeight: 80,
        orient: 'horizontal',
        type: 'continuous', // 连续
        calculable: true, // 是否可拖拽计算
        realtime: false, // 是否实时计算
        text: ['人口', '万'],
        left: 'left',
        bottom: 20,
        textStyle: {
          color: '#fff'
        },
        inRange: {
          color: ['green', 'yellow', 'red']
        }
      }, // 数据提示框
      tooltip: {
        trigger: 'item',
        formatter(params) {
          return params.seriesName + '<br/>' + params.name + ' : ' + params.value + '万'
        }
      },
      // 配置工具箱
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },

      // 配置数据系列(数据分析维度)
      series: [
        // 分比对不同维度分析的数据进行呈现方式的配置
        {
          // 系列名--分析的数据维度
          name: '用户数量',
          type: 'map',
          mapType: '福建',
          // 是否响应鼠标缩放
          roam: false,
          // 配置样式
          itemStyle: {
            // 区域高亮状态下的样式
            normal: {
              label: {
                show: true
              }
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          data: [{ name: '福州市', value: 472 },
            { name: '泉州市', value: 412 },
            { name: '厦门市', value: 366 },
            { name: '漳州市', value: 270 },
            { name: '莆田市', value: 258 },
            { name: '南平市', value: 227 },
            { name: '龙岩市', value: 157 },
            { name: '宁德市', value: 213 },
            { name: '三明市', value: 145 }]
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
