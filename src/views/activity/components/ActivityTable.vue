<template>
  <div>
    <el-date-picker v-model="listQuery.startTime" type="datetime" placeholder="活动开始时间" format="yyyy-MM-dd HH:mm" />
    <el-date-picker v-model="listQuery.endTime" type="datetime" placeholder="活动结束时间" format="yyyy-MM-dd HH:mm" />
    <el-input v-model="listQuery.title" placeholder="按活动名称进行搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

    <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
      {{ $t('table.search') }}
    </el-button>
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
      发起活动
    </el-button>

    <div style="margin-top: 10px">
      <el-table v-loading="listLoading" :data="tableData" border style="width: 100%;text-align: center" @row-click="handleDetail">
        <el-table-column prop="title" label="活动名称" />
        <el-table-column prop="people" sortable label="活动人数" width="120" align="center" />
        <el-table-column prop="startTime" sortable label="活动开始时间" width="150" align="center" />
        <el-table-column prop="endTime" sortable label="活动结束时间" width="150" align="center" />

        <el-table-column prop="type" label="热度" width="80" align="center">
          <!--<template slot-scope="scope">-->
          <!--<el-tag :type="scope.row.hot">{{scope.row.type}}</el-tag>-->
          <!--</template>-->
          <template slot-scope="scope">
            <el-tag :type="scope.row.people>=200? 'danger': (scope.row.people <= 20 ? 'info' : (scope.row.people<=100? 'success':'warning'))">{{ initTag(scope.row) }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click.stop="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
            <el-button type="danger" size="mini" @click.stop="delActivity(scope.row)"> {{ $t('table.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      <el-dialog title="活动编辑" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
          <!--<el-form-item :label="$t('table.type')" prop="newsType">-->
          <!--<el-select v-model="temp.newsType" class="filter-item" placeholder="请选择" value-key="id">-->
          <!--<el-option v-for="item in newsType" :key="item.id" :label="item.typeName" :value="item" />-->
          <!--</el-select>-->
          <!--</el-form-item>-->

          <el-form-item label="起始时间" prop="startTime">
            <el-date-picker v-model="temp.startTime" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" />
          </el-form-item>

          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker v-model="temp.endTime" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" />
          </el-form-item>

          <el-form-item label="人数" prop="people">
            <el-input v-model.number="temp.people" />
          </el-form-item>

          <el-form-item label="活动奖品" prop="prize">
            <el-input v-model="temp.prize" />
          </el-form-item>

          <el-form-item label="活动名称" prop="title">
            <el-input v-model="temp.title" />
          </el-form-item>

          <el-form-item label="活动内容" prop="content">
            <el-input v-model="temp.content" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入内容" />
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button type="primary" @click="updateData()">
            {{ $t('table.confirm') }}
          </el-button>
        </div>
      </el-dialog>

    </div>
  </div>

</template>
<script>
import waves from '@/directive/waves'
import { fetchActivityList, updateActivities } from '@/api/activity'
import Pagination from '@/components/Pagination'
export default {
  directives: { waves },
  components: { Pagination },
  props: ['type'],
  data() {
    return {
      listQuery: {
        startTime: '',
        endTime: '',
        page: 1,
        limit: 20,
        title: undefined,
        type: this.type
      },
      tableData: [],
      listLoading: false,
      total: 0,

      flag: -1,
      // tag标记
      tag: '22',
      dialogFormVisible: false,

      rules: {
        title: [{ required: true, message: '请输入活动名称' }],
        content: [{ required: true, message: '请输入活动内容' }],
        startTime: [{ required: true, message: '请输入活动开始时间' }],
        endTime: [{ required: true, message: '请输入活动结束时间' }],
        people: [{ required: true, message: '请输入活动人数' }, { type: 'number', message: '年龄必须为数字值' }],
        prize: [{ required: true, message: '请输入活动奖品' }],
        address: [{ required: true, message: '请输入活动地址' }]
      },
      temp: {
        id: undefined,
        content: '',
        startTime: '',
        endTime: '',
        title: '',
        people: '',
        prize: ''
      },
      ee: 1,
      ss: ''
    }
  },
  created() {
    this.ss = Object.assign({}, this.$route.query)
    // this.ss.unshift(tt)
    console.log('sss' + this.ss)
    this.getList()
  },
  methods: {
    handleDetail(row) {
      this.$router.push({
        path: '/activity/activityDetail',
        query: row
      })
    },
    initTag(row) {
      if (row.people >= 200) {
        row.tag = '爆'
      } else if (row.people <= 20) {
        row.tag = '冷'
      } else if (row.people > 20 && row.people <= 100) {
        row.tag = '沸'
      } else {
        row.tag = '热'
      }
      return row.tag
    },
    getList() {
      this.listLoading = true
      if (this.ss.type == this.listQuery.type) {//eslint-disable-line
        fetchActivityList(this.listQuery).then(response => {
          console.log(response)
          this.tableData = response.data.items
          this.total = response.data.total
          this.tableData.unshift(this.ss)
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else {
        fetchActivityList(this.listQuery).then(response => {
          console.log(response)
          this.tableData = response.data.items
          this.total = response.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
    },
    // 查询
    handleFilter() {
      this.listQuery.page = 1
      if (this.listQuery.endTime != '' && this.listQuery.endTime < this.listQuery.startTime) {//eslint-disable-line
        this.$message.error('错了哦，活动结束时间不能比活动开始时间小')
      } else {
        this.getList()
      }
    },
    // 新建活动
    handleCreate() {
      this.$router.push('/activity/activityNew')
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          if (new Date(tempData.startTime) > new Date(tempData.endTime)) {
            this.$message.error('错了哦，活动结束时间不能比活动开始时间小')
          } else {
            updateActivities(tempData).then(() => {
              for (const v of this.tableData) {
                if (v.id === this.temp.id) {
                  const index = this.tableData.indexOf(v)
                  this.tableData.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        }
      })
    },

    delActivity(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.forEach((item, idx) => {
          if (item.id === row.id) {
            this.flag = idx
          }
        })
        this.tableData.splice(this.flag, 1)
        this.flag = -1
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style>
</style>
