<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>
<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import { fetchActivityList } from '@/api/activity'
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
      chart: null,
      tableData: [],
      data: [],
      listQuery: {
        page: 1,
        limit: 100
      },
      ss1: 0,
      ss2: 0,
      ss3: 0,
      ss4: 0,
      ss5: 0,
      ss6: 0,
      ss7: 0,
      ss8: 0,
      ss9: 0,
      ss10: 0,
      ss11: 0,
      ss12: 0
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchActivityList(this.listQuery).then(response => {
        this.tableData = response.data.items
        // console.log(this.tableData)
        this.tableData.forEach(value => {
          const tempStrs = value.startTime.split(' ')
          const dateStrs = tempStrs[0].split('-')
          const month = parseInt(dateStrs[1], 10)
          // console.log(month)
          if (month === 1) {
            this.ss1 += value.people
          } else if (month === 2) {
            this.ss2 += value.people
          } else if (month === 3) {
            this.ss3 += value.people
          } else if (month === 4) {
            this.ss4 += value.people
          } else if (month === 5) {
            this.ss5 += value.people
          } else if (month === 6) {
            this.ss6 += value.people
          } else if (month === 7) {
            this.ss7 += value.people
          } else if (month === 8) {
            this.ss8 += value.people
          } else if (month === 9) {
            this.ss9 += value.people
          } else if (month === 10) {
            this.ss10 += value.people
          } else if (month === 11) {
            this.ss11 += value.people
          } else if (month === 12) {
            this.ss12 += value.people
          }
          // this.data.push(value.people)
        })
        this.data.push(this.ss1, this.ss2, this.ss3, this.ss4, this.ss5, this.ss6, this.ss7, this.ss8, this.ss9, this.ss10, this.ss11, this.ss12)
        // console.log(this.data)
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      setTimeout(() => {
        this.chart.setOption({
          //          backgroundColor: '#08263a',
          title: {
            text: '活动时间数据图',
            textStyle: {
              color: '#90979c',
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
              textStyle: {
                color: '#fff'
              }
            }
          },
          grid: {
            left: '5%',
            right: '5%',
            borderWidth: 0,
            top: 100,
            bottom: 95,
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            left: 'left',
            top: '10%',
            textStyle: {
              color: '#90979c'
            },
            data: ['人数']
          },
          xAxis: [{
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
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
            name: '人数',
            type: 'bar',
            stack: 'total',
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
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: this.data
          },
          {
            name: '人数',
            type: 'line',
            stack: 'total',
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: 'rgba(252,230,48,1)',
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: this.data
          }
          ]
        })
      }, 1000)
    }
  }
}
</script>
<style>
</style>
