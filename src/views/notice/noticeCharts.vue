<template>
  <div class="app-container">
    <div class="chart-container">
      <el-button type="primary" style="position: relative; left: 10px; top:10px " @click="backNotice">返回</el-button>
      <el-button type="primary" style="position: relative; left: 10px; top:10px " @click="chooseNotice">切换</el-button>
      <div :id="id" :class="className" style="height:100%; width: 100%" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import echarts from 'echarts'
import { noticeStatistics } from '@/api/notice'

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
      page: 0,
      chartChoose: 0,
      chart: null,
      data: null,
      Ymax: 0,
      Ymax2: 0,
      numData: [],
      publishData1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      publishData2: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      publishXAxis: [],
      dateData1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      dateData2: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      dateXAxis: []
    }
  },
  computed: {
    ...mapState(['notice'])
  },
  mounted() {
    this.page = this.$route.query.pageNext
    this.chart = echarts.init(document.getElementById(this.id))
    noticeStatistics('noticePublish', 'noticeStatus').then(response => {
      this.data = response.data.items
      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; ; j++) {
          if (this.publishXAxis[j] === this.data[i].noticeFirst) {
            if (this.data[i].noticeSecond === 'published') {
              this.publishData2[j] = this.data[i].count
            } else {
              this.publishData1[j] = this.data[i].count
            }
            break
          }
          if (j >= this.publishXAxis.length) {
            this.publishXAxis[j] = this.data[i].noticeFirst
            if (this.data[i].noticeSecond === 'published') {
              this.publishData2[j] = this.data[i].count
            } else {
              this.publishData1[j] = this.data[i].count
            }
            break
          }
        }
      }
      for (let i = 0; i < this.publishXAxis.length; i++) {
        this.publishData1[i] += this.publishData2[i]
        if (this.publishData1[i] > this.Ymax) {
          this.Ymax = parseInt(this.publishData1[i] / 5) * 5 + 5
        }
      }

      const optionData = {
        title: {
          text: '公告统计表',
          subtext: '各部门公告发布情况',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 28
          },
          subtextStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        xAxis: {
          data: this.publishXAxis,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 20
            }
          }
        },
        yAxis: {
          min: 0,
          max: this.Ymax,
          interval: 5,
          gridIndex: 0,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 20
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
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: null,
          axisPointer: {
            type: 'shadow'
          },
          textStyle: { color: 'yellow', decoration: 'none', fontFamily: 'Verdana, sans-serif', fontSize: 20, fontStyle: 'italic', fontWeight: 'bold' }
        },
        series: [{ name: '总计', type: 'bar', data: this.publishData1 }, { name: '发布', type: 'bar', data: this.publishData2, color: 'orange' }],
        legend: {
          show: true,
          data: [{ name: '总计', icon: 'cricle' }, { name: '发布', icon: 'cricle' }],
          left: 'right',
          textStyle: { color: '#fff', decoration: 'none', fontFamily: 'Verdana, sans-serif', fontSize: 16, fontStyle: 'italic' }
        }
      }
      this.chart.setOption(optionData)
    })
  },
  methods: {
    chooseNotice() {
      this.chartChoose += 1
      if (this.chartChoose > 1) {
        this.chartChoose = 0
      }
      if (this.chartChoose === 0) {
        const optionData = {
          title: {
            text: '公告统计表',
            subtext: '各部门公告发布情况',
            left: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 28
            }
          },
          xAxis: {
            data: this.publishXAxis,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 20
              }
            }
          },
          yAxis: {
            min: 0,
            max: this.Ymax,
            interval: 5,
            gridIndex: 0
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
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: null,
            axisPointer: {
              type: 'shadow'
            }
          },
          series: [{ name: '总计', type: 'bar', data: this.publishData1 }, { name: '发布', type: 'bar', data: this.publishData2, color: 'orange' }],
          legend: {
            show: true,
            data: [{ name: '总计', icon: 'cricle' }, { name: '发布', icon: 'cricle' }],
            left: 'right'
          }
        }
        this.chart.setOption(optionData)
      }
      if (this.chartChoose === 1) {
        noticeStatistics('YEAR(noticeDate)', 'noticeStatus').then(response => {
          this.data = response.data.items
          for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; ; j++) {
              if (this.dateXAxis[j] === this.data[i].noticeFirst) {
                if (this.data[i].noticeSecond === 'published') {
                  this.dateData2[j] = this.data[i].count
                } else {
                  this.dateData1[j] = this.data[i].count
                }
                break
              }
              if (j >= this.dateXAxis.length) {
                this.dateXAxis[j] = this.data[i].noticeFirst
                if (this.data[i].noticeSecond === 'published') {
                  this.dateData2[j] = this.data[i].count
                } else {
                  this.dateData1[j] = this.data[i].count
                }
                break
              }
            }
          }
          for (let i = 0; i < this.dateXAxis.length; i++) {
            this.dateData1[i] += this.dateData2[i]
            if (this.dateData1[i] > this.Ymax2) {
              this.Ymax2 = parseInt(this.dateData1[i] / 5) * 5 + 5
            }
          }

          const optionData = {
            title: {
              text: '公告统计表',
              subtext: '各年公告发布情况',
              left: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 28
              }
            },
            xAxis: {
              data: this.dateXAxis,
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 20
                }
              }
            },
            yAxis: {
              min: 0,
              max: this.Ymax2,
              interval: 5,
              gridIndex: 0
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
              }
            },
            tooltip: {
              trigger: 'axis',
              formatter: null,
              axisPointer: {
                type: 'line'
              }
            },
            series: [{ name: '总计', type: 'line', data: this.dateData1 }, { name: '发布', type: 'line', data: this.dateData2, color: 'orange' }],
            legend: {
              show: true,
              data: [{ name: '总计', icon: 'cricle' }, { name: '发布', icon: 'cricle' }],
              left: 'right'
            }
          }
          this.chart.setOption(optionData)
        })
      }
    },
    backNotice() {
      this.$router.push({ path: '/notice/page', query: { page: this.page }})
    }
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
