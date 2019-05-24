<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of data" :key="index" :timestamp="item.startTime" placement="top" @click.native="detail(index)">
        <el-badge :value="item.people">
          <el-card style="width: 400px">
            <el-row type="flex" align="middle">
              <el-col :span="20">
                <div style="font-weight: bold" :class="{classB:item.people>=200, classL:item.people<=20, classF:item.people<=100 && item.people>20, classR:item.people<200&&item.people>100}">
                  {{ item.title }}
                </div>
              </el-col>
              <el-col :span="4">
                <el-tag :type="item.people>=200? 'danger': (item.people <= 20 ? 'info' : (item.people<=100? 'success':'warning'))">{{ item.tag }}</el-tag>
              </el-col>
            </el-row>
            <p :class="{classB:item.people>=200, classL:item.people<=20, classF:item.people<=100 && item.people>20, classR:item.people<200&&item.people>100}">活动地址：{{ item.address }}</p>
          </el-card>
        </el-badge>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { fetchActivityList } from '@/api/activity'
import ElRow from 'element-ui/packages/row/src/row'
import ElCol from 'element-ui/packages/col/src/col'
export default {
  components: {
    ElCol,
    ElRow },
  data() {
    return {
      listQuery: {
        limit: 4,
        page: 1,
        type: 1
      },
      data: []
    }
  },
  created() {
    this.getActivity()
  },
  methods: {
    getActivity() {
      fetchActivityList(this.listQuery).then((response) => {
        this.data = response.data.list
        console.log(this.data)
        this.data.forEach(value => {
          if (value.people >= 200) {
            value.tag = '爆'
          } else if (value.people <= 20) {
            value.tag = '冷'
          } else if (value.people > 20 && value.people <= 100) {
            value.tag = '沸'
          } else {
            value.tag = '热'
          }
        })
      })
    },
    detail(idx) {
      console.log(this.data[idx])
      this.$router.push({
        path: '/activity/activityDetail',
        query: this.data[idx]
      })
    }
  }
}
</script>

<style >
  .classB{
    color: #F56C6C;
  }
  .classL{
    color: #909399;
  }
  .classF{
    color: #67C23A;
  }
  .classR{
    color: #E6A23C;
  }
  .el-timeline-item__timestamp{
    color: white!important;
  }
</style>

