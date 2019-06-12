<template>
  <div class="dashboard-editor-container">
    <el-carousel :interval="2000" type="card" height="300px">
      <el-carousel-item v-for="url in urls" :key="url.url">
        <img :src="url.url" style="width: 100%; height: 100%" @click="getInfo(url.link)">
      </el-carousel-item>
    </el-carousel>

    <el-row :gutter="25" type="flex" justify="space-between" style="margin-top: 20px">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 13}" :xl="{span: 12}" style="margin-bottom: 30px">
        <el-row :gutter="15" style="margin-top: 20px">
          <el-col :span="12">
            <todo-list style="height: 274px" />
          </el-col>
          <el-col :span="12">
            <ele-calendar
              :data="datedef"
              :prop="prop"
              style="height: 274px; width: 100%"
              class="calendar"
            />
          </el-col>
        </el-row>
        <el-row style="margin-top: 44px">
          <notice />
        </el-row>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 11}" :xl="{span: 12}" style="margin-bottom:30px;">
        <Timeline />
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <map-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bai-map />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { fetchTopInfo } from '@/api/info'
import PieChart from './components/PieChart'
import Timeline from './components/Timeline.vue'
import BaiMap from './components/baidu.vue'
import MapChart from './components/mapChart.vue'
import TodoList from './components/TodoList'
import Notice from './components/notice.vue'
import eleCalendar from 'ele-calendar'
import 'ele-calendar/dist/vue-calendar.css'
import ElRow from 'element-ui/packages/row/src/row'
import ElCol from 'element-ui/packages/col/src/col'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    ElCol,
    ElRow,
    PieChart,
    Timeline,
    MapChart,
    BaiMap,
    TodoList,
    eleCalendar,
    Notice
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      urls: [],
      datedef: [
        { 'date': '2019-06-12', 'content': '23231', 'cid': null },
        { 'date': '2019-06-17', 'content': '223444', 'cid': null }
      ],
      prop: 'date'
    }
  },
  mounted() {
    fetchTopInfo({}).then(response => {
      const tableData = response.data.items
      tableData.forEach(info => {
        if (info.imgUrl.match(/^img/)) { info.imgUrl = '/admin/' + info.imgUrl }
        this.urls.push({ url: info.imgUrl, link: '/info/infoDetail?id=' + info.id })
      })
    })
  },
  methods: {
    getInfo(link) {
      this.$router.push(link)
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  position: relative;
}

  .chart-wrapper {
    background: #fff;
    /*padding: 16px 16px 0;*/
    margin-bottom: 32px;
  }

  .calendar{
    background-image: url("10.jpg");
    background-size: 100% 50px;
    background-repeat: no-repeat;
  }

</style>
