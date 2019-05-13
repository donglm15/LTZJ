<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/userVitality' // 引入用户活跃度图表
export default {
  name: 'MixChart',
  components: { Chart },
  data() {
    return {
      msg: '用户统计'
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
