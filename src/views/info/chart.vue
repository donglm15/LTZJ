<template>
  <div class="chart-container">
    <div :id="id" :class="className" :style="{height:height,width:width}" class="chart" />
  </div>
</template>

<script>
import { fetchInfoChart } from '@/api/info'
import echarts from 'echarts'
import resize from './mixins/resize'
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
      default: '800px'
    },
    height: {
      type: String,
      default: '800px'
    }
  },
  data() {
    return {
      tableData: [],
      chart: null
    }
  },
  mounted() {
    // 首次挂载新闻列表组件时获得所有新闻数据
    fetchInfoChart({}).then(response => {
      this.tableData = response.data.items
    })
    // 初始化echarts图表实例
    this.chart = echarts.init(document.getElementById(this.id))

    setTimeout(() => {
      // 完成图表绘制配置
      this.chart.setOption({
        title: {
          text: '资讯数据占比图',
          left: 'center',
          top: '10px',
          textStyle: {
            fontSize: 22
          }
        },

        series: [
          {
            name: '阅读量',
            type: 'pie',
            data: this.getData(this.getList(1)),
            radius: '50%',
            label: {
              normal: {
                // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: '{b} : {c}个 ({d}%)'
              }
            }
          },
          {
            name: '点赞数',
            type: 'pie',
            radius: '50%',
            data: this.getData(this.getList(2)),
            label: {
              normal: {
                // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: '{b} : {c}个 ({d}%)'
              }
            }
          },
          {
            name: '收藏数',
            type: 'pie',
            radius: '50%',
            data: this.getData(this.getList(3)),
            label: {
              normal: {
                // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: '{b} : {c}个 ({d}%)'
              }
            }
          }
        ],
        legend: {
          left: 'center',
          top: '60px',
          show: true,
          data: [
            {
              name: '阅读量',
              icon: 'circle'
            },
            {
              name: '点赞数',
              icon: 'circle'
            },
            {
              name: '收藏数',
              icon: 'circle'
            }
          ],
          selected: {
            '阅读量': true,
            '点赞数': false,
            '收藏数': false
          },
          selectedMode: 'single'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'left',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        }
      })
    }, 1000)
  },
  methods: {
    getData(list) {
      let huobao = 0
      let redian = 0
      let putong = 0
      list.forEach((val) => {
        if (val >= 200) { huobao++ } else if (val >= 100) { redian++ } else { putong++ }
      })
      return [{ value: huobao, name: '火爆' }, { value: redian, name: '热点' }, { value: putong, name: '普通' }]
    },
    getList(type) { // 1为浏览，2为点赞，3为收藏
      const list = []
      console.log('tabledata')
      console.log(this.tableData)
      this.tableData.forEach((info) => {
        if (type === 1) { list.unshift(info.read) } else if (type === 2) { list.unshift(info.like) } else { list.unshift(info.favorite) }
      })
      return list
    }
  }
}
</script>

<style>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
    padding: 0 auto;
  }
  .chart{
    margin: 0 auto;
  }
</style>
