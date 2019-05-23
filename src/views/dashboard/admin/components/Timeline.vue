<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of data" :key="index" :timestamp="item.startTime" placement="top">
        <el-badge :value="item.tag">
          <el-card style="width: 450px">
            <el-row>
              <el-col>
                <h4>{{ item.title }}</h4>
              </el-col>
              <el-col>
                <el-tag>{{ item.tag }}</el-tag>
              </el-col>
            </el-row>
            <p>{{ item.address }}</p>
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
        page: 1
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
    }
  }
}
</script>

