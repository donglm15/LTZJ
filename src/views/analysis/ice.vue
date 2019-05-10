<template>
  <div style="background-color: #08263a">
    <sex-chart />
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <time-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <map-chart />
        </div>
      </el-col><el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <type-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MapChart from './components/mapChart'
import TimeChart from './components/TimeChart'
import SexChart from './components/SexChart'
import TypeChart from './components/TypeChart'
export default {
  name: 'Ice',
  components: {
    MapChart,
    TimeChart,
    SexChart,
    TypeChart
  },
  data() {
    return {
    }
  }
}
</script>
<style>
  .chart-wrapper {
    background: #fff;
    /*padding: 16px 16px 0;*/
    margin-bottom: 32px;
  }
</style>
