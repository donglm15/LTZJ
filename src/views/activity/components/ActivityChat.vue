<template>
  <div class="dashboard-editor-container">
    <el-row style="width: 100%; height:400px; margin-bottom: 20px">
      <line-chart height="100%" width="100%" />
    </el-row>

    <el-row type="flex">
      <!--<el-col :xs="24" :sm="24" :lg="8">-->
      <!--<div class="chart-wrapper">-->
      <!--&lt;!&ndash;<raddar-chart />&ndash;&gt;-->
      <!--</div>-->
      <!--</el-col>-->
      <el-col :span="12">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LineChart from './LineChart'
import BarChart from './BarChart'
import PieChart from './PieChart'
export default {
  components: {
    BarChart,
    LineChart,
    PieChart
  },
  data() {
    return { msg: 'vue 模板页' }
  }
}
</script>
<style scoped>
  .dashboard-editor-container {
    padding: 20px;
    background-color: #08263a;
    position: relative;
    height: 100%;
  }

  .chart-wrapper {
    background: #08263a;
    padding: 16px 16px 0;
    margin-bottom: 20px;
  }
</style>
