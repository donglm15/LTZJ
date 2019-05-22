<template>
  <div class="tab-container">
    <el-tabs v-model="activeTab">
      <el-tab-pane v-for="item in tabOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <activity-table v-if="activeTab==item.key" :type="item.key" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ActivityTable from './components/ActivityTable.vue'
const tabOptions = [
  {
    label: '正在进行中', key: '1'
  },
  {
    label: '未开始活动', key: '3'
  },
  {
    label: '已结束活动', key: '2'
  }
]
export default {
  components: {
    ActivityTable
  },
  data() {
    return {
      activeTab: '1',
      tabOptions
    }
  }
}
</script>
<style>
  .tab-container{
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
  }
  .el-tabs__item{
    font-size: 20px;
  }
  /*.el-tabs__item:hover{*/
    /*color: red;*/
    /*cursor: pointer;*/
  /*}*/
  /*.el-tabs__item.is-active{*/
    /*color: red;*/
  /*}*/
  /*.el-tabs__active-bar{*/
    /*background-color: red;*/
  /*}*/
</style>
