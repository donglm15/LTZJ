<template>
  <div class="dashboard-editor-container">
    <p>"{{ product }}"一周趋势变化</p>
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/DailyMapChart'
function data1() {
  const t = []
  const h = []
  for (let i = 0; i < 7; i++) {
    t.push((Math.random() * (-15 - 50) + 50).toFixed(2))
    h.push((Math.random() * (-10 - 25) + 25).toFixed(2))
  }
  return [t, h]
}
const lineChartData = {
  users: {
    title: '新增用户',
    tratio: data1()[0],
    hratio: data1()[1]
  },
  purchases: {
    title: '计费收入',
    tratio: data1()[0],
    hratio: data1()[1]
  }
}

export default {
  name: 'DailyMap',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.users,
      product: this.$route.query.product,
      person: this.$route.query.person,
      billing: this.$route.query.billing
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }

  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    /*background-color: rgb(240, 242, 245);*/
    position: relative;
  }

  .chart-wrapper {
    /*background: #fff;*/
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  p{
    text-align: center;
    font-weight: bold;
    font-size: 25px;
  }
</style>
