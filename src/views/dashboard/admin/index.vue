<template>
  <div class="dashboard-editor-container">
    <el-carousel :interval="3000" type="card" height="300px">
      <el-carousel-item v-for="url in urls" :key="url">
        <img :src="url" style="width: 100%; height: 100%">
      </el-carousel-item>
    </el-carousel>

    <!--<el-card style="margin-bottom: 40px">-->
    <!--<div style="height:150px;"><time-chart /></div>-->
    <!--</el-card>-->

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="margin-bottom:30px;">
        <baidu />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <Timeline />
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <one-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import OneChart from './components/OneChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import Timeline from './components/Timeline.vue'
import Baidu from './components/baidu.vue'

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
    OneChart,
    PieChart,
    BarChart,
    Timeline,
    Baidu
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      urls: [
        'http://www.cnr.cn/jingji/gundong/20190507/W020190507333935627790.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557484053673&di=4343d194f22f5bc077b07977bd0871cb&imgtype=0&src=http%3A%2F%2Fwx4.sinaimg.cn%2Flarge%2F007ihk0Jgy1g2rj09o18nj30o30dktju.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557483655667&di=0f521aa6981111580ed6d394cc78c34d&imgtype=0&src=http%3A%2F%2Fres.zohi.tv%2Fa%2F10001%2F201904%2F44e671c1dce04cf634862571f7f6a5f3.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557483677422&di=dc18188aebe6f4174c805b55e3bbb684&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F253%2Fw640h413%2F20190419%2FjYZe-hvvuiyn2053343.jpg'
        //        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        //        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        //        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
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
  background-image: url("../../../assets/img/timg.jpg");
  position: relative;
}

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

</style>
