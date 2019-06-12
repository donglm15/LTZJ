<template>
  <div>
    <div class="chart-wrapper" style="margin-left: 20px">
      <sex-chart />
    </div>
    <el-row>
      <el-col :span="12">
        <div class="chart-wrapper">
          <one-chart />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-wrapper">
          <liu-chart />
        </div>
      </el-col>
    </el-row>

    <el-row>
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
import OneChart from './components/OneChart'
import LiuChart from './components/LiuChart'
export default {
  name: 'Ice',
  components: {
    MapChart,
    TimeChart,
    SexChart,
    TypeChart,
    OneChart,
    LiuChart
  },
  data() {
    return {
    }
  }
}
</script>
<style>
  .chart-wrapper {
    /*background: #fff;*/
    /*padding: 10px 0 0 0;*/
    /*margin-bottom: 10px;*/
    margin-bottom: 30px;
    height: 500px;
  }
</style>
