<template>
  <div class="app-container">
    <!--头部输入框-->
    <div class="filter-container">
      <el-card class="form-container" shadow="never" style="margin-bottom: 10px;">
        <!--<i class="el-icon-search" style="margin: 5px 0 10px 0"></i>-->
        <!--<span style="margin: 5px 0 10px 0">筛选搜索</span>-->
        <el-form ref="listQuery" :inline="true" :model="listQuery" class="demo-form-inline" label-width="90px">

          <el-form-item :label="$t('Announcement.meetingID')" prop="meetingID">
            <el-input v-model="listQuery.meetingID" placeholder="" style="width: 230px;" @keyup.native.enter="getList" />
          </el-form-item>
          <!--会议状态-->
          <el-form-item :label="$t('Announcement.meetingStatus')" prop="meetingStatus">
            <el-select v-model="listQuery.meetingStatus" value-key="id" placeholder="请选择" style="width: 230px;" @change="getList">
              <el-option v-for="s in meetingStatus" :key="s.id" :label="s.statusName" :value="s.statusName" />
            </el-select>
          </el-form-item>
          <!--会议类型-->
          <!--<el-form-item :label="$t('Announcement.meetingType')" prop="meetingType" style="margin-bottom: 0;">-->
          <!--<el-select v-model="form.meetingType" value-key="id"  placeholder="请选择" style="width: 100%;">-->
          <!--<el-option v-for="idx in meetingType" :key="idx.id" :label="idx.typeName" :value="idx" />-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--会议地点-->
          <el-form-item :label="$t('Announcement.meetingPosition')" prop="meetingPosition">
            <el-select v-model="listQuery.meetingPosition" value-key="id" placeholder="请选择" style="width: 230px;" @change="getList">
              <el-option v-for="p in meetingPosition" :key="p.id" :label="p.positionName" :value="p.positionName" />
            </el-select>
          </el-form-item>
          <!--招开部门-->
          <el-form-item :label="$t('Announcement.department')" prop="department">
            <el-input v-model="listQuery.department" placeholder="请输入" style="width: 230px;" @keyup.native.enter="getList" />
          </el-form-item>
          <!--会议主题-->
          <el-form-item :label="$t('Announcement.meetingTheme')" prop="meetingTheme">
            <el-input v-model="listQuery.meetingTheme" placeholder="请输入" style="width: 230px;" @keyup.native.enter="getList" />
          </el-form-item>
          <el-form-item label="开会日期" prop="meetingDate">
            <el-date-picker
              v-model="listQuery.meetingDate"
              prop="meetingDate"
              type="daterange"
              align="right"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="-"
              :picker-options="pickerOptions"
              style="width: 230px;"
            />
          </el-form-item>
        </el-form>

        <el-row :inline="true" type="flex" justify="center">
          <el-button class="filter-item" icon="el-icon-search" style="text-align: center" @click="getList">
            {{ $t('table.inquire') }}
          </el-button>
          <!--<el-button  class="filter-item"  icon="el-icon-refresh"   @click="reset(listQueryNew)" style="text-align: center">-->
          <!--{{ $t('table.reset') }}-->
          <!--</el-button>-->
          <el-button class="filter-item" icon="el-icon-refresh" @click="resetForm('listQuery')">  {{ $t('table.reset') }}</el-button>
        </el-row>

      <!--<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">-->
        <!--{{ $t('meeting.add') }}-->
      <!--</el-button>-->
      <!--<el-button :loading="downloadLoading" class="filter-item" style="padding: 10px 13px;" type="primary" icon="el-icon-download" @click="handleDownload">-->
      <!--{{ $t('table.export') }}-->
      <!--</el-button>-->
      </el-card>
    </div>

    <el-card class="operate-container" shadow="never" style="margin-bottom: 20px;">
      <i class="el-icon-tickets" style="margin-top: 5px" />
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        style="float: right"
        size="mini"
        @click.stop="handleAdd"
      >
        {{ $t('Announcement.New') }}
      </el-button>
      <!--<el-button type="primary" size="mini" @click.stop="handleAdd" style="width: 46px;">-->
      <!--{{ $t('Announcement.New') }}-->
      <!--</el-button>-->
    </el-card>
    <!--表格@row-click="qq"-->
    <el-table v-loading="listLoading" :data="pageData" border style="width: 100%;text-align: center" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="50" />
      <el-table-column prop="id" sortable :label="$t('meeting.id')" align="center" width="80" />
      <el-table-column prop="meetingID" :label="$t('Announcement.meetingID')" align="center" width="100" />
      <el-table-column prop="meetingTheme" :label="$t('Announcement.meetingTheme')" align="center" />
      <el-table-column prop="department" :label="$t('Announcement.department')" align="center" width="110" />
      <el-table-column prop="meetingDate" :label="$t('Announcement.meetingDate')" align="center" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.meetingDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="meetingPosition.positionName" :label="$t('Announcement.meetingPosition')" align="center" width="110" />
      <el-table-column prop="meetingStatus.statusName" :label="$t('Announcement.meetingStatus')" align="center" width="100" />
      <el-table-column label="延迟" align="center" width="50">
        <template slot-scope="{row}">
          <el-button type="text" size="small" @click.stop="handleUpdate(row)">延迟</el-button>
        </template>
      </el-table-column>
      <el-table-column label="取消" align="center" width="50">
        <template slot-scope="{row}">
          <el-button type="text" size="small" @click.stop="cancelData(row)">取消</el-button>
        </template>
      </el-table-column>
      <!--按钮-->
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="{row}">
          <!--<el-button type="primary" size="mini" @click.stop="handleAdd" style="width: 46px;">-->
          <!--{{ $t('Announcement.New') }}-->
          <!--</el-button>-->
          <!--<el-button type="success" size="mini"  @click="handleDownload" style="width: 46px;">-->
          <!--{{ $t('table.export') }}-->
          <!--</el-button>-->
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" style="width: 46px;" @click.stop="del(row)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--底部分页-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!--编辑新增弹框-->
    <el-dialog title="会议延期" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="85px" style="width: 230px;margin-left:50px;text-align: center">

        <el-form-item :label="$t('Announcement.meetingID')" prop="meetingID">
          <el-input v-model="temp.meetingID" readonly placeholder="" style="width: 230px;" />
        </el-form-item>
        <el-form-item :label="$t('Announcement.meetingTheme')" prop="meetingTheme">
          <el-input v-model="temp.meetingTheme" readonly placeholder="请输入" style="width: 230px;" />
        </el-form-item>
        <el-form-item label="原定时间" prop="meetingDate">
          <el-date-picker v-model="temp.meetingDate" readonly type="datetime" placeholder="Please pick a date" style="width: 230px;" />
        </el-form-item>
        <el-form-item label="推迟到" prop="delayDate" required>
          <el-date-picker v-model="temp.delayDate" type="datetime" placeholder="Please pick a date" style="width: 230px;" />
        </el-form-item>
      </el-form>
      <div style="margin-left: 50px" class="dialog-footer">
        <el-button type="primary" @click="delayData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchAnnouncementList, delayMeeting } from '@/api/announcement'
//  import { parseTime } from '@/utils'//导出
import Pagination from '@/components/Pagination'

// 不变化的业务字典数据，可以定义为全局变量,否则应该放在data里
const meetingPosition = [
  { id: 1, positionName: '7楼会议室' },
  { id: 2, positionName: '8楼会议室' },
  { id: 3, positionName: '9楼会议室' },
  { id: 4, positionName: '10楼会议室' },
  { id: 5, positionName: '11楼会议室' },
  { id: 6, positionName: '15楼会议室' }
]
const meetingStatus = [
  { id: 1, statusName: '草稿' },
  { id: 2, statusName: '已通知' },
  { id: 3, statusName: '延期' },
  { id: 4, statusName: '取消' }

]
export default {
  components: {
    Pagination },
  data() {
    return {
      ss: '',
      readonly: true,
      //        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      multipleSelection: [],
      // 从后台获取的总数据
      pageData: null,
      total: 0, // mock后台传过来的数据总条数
      listQuery: {// 分页参数和头部检索参数的对象
        page: 1,
        limit: 20,
        meetingID: undefined,
        meetingTheme: undefined,
        department: undefined,
        meetingPosition: undefined,
        meetingDate: '',
        meetingStatus: undefined
      },
      meetingPosition,
      meetingStatus,
      // 给延迟赋值
      temp: {
        meetingID: '',
        meetingTheme: '',
        department: '',
        meetingDate: '',
        meetingPosition: {},
        meetingStatus: {},
        delayDate: ''
      },

      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },

      // 控制loading加载特效
      listLoading: false,
      // 新建时能赋值的对象
      //        form: {
      //          meetingID:'',
      //          meetingType:{},
      //          meetingPosition: {},
      //          user:'',
      //          department:'',
      //          meetingStatus:{},
      //          meetingPeople:'',
      //          meetingDate:'',
      //          dateLong: '',
      //          meetingTheme:'',
      //          Presenter:'',
      //          Data:'',
      //          meetingContent:'',
      //          msg:''
      //        },

      dialogFormVisible: false, // 关闭弹窗
      dialogStatus: '', // 弹框中点击确定按钮判断是使用新增还是编辑方法
      textMap: {
        update: 'Edit',
        create: 'Create'
      },

      rules: {
        delayDate: [{ type: 'date', required: true, message: 'date is required', trigger: 'change' }]
      }

    }
  },

  // 监听时间置空
  watch: {
    'listQuery.meetingDate': {
      handler(val, oldVar) {
        if (val == null) {
          this.listQuery.meetingDate = ''
        }
      }
    }

  },
  created() {
    this.ss = Object.assign({}, this.$route.query)
    this.getList()
  },
  methods: {
    // 重置
    resetForm(listQuery) {
      this.$refs[listQuery].resetFields()
    },
    handleAdd(row) {
      this.$router.push(
        {
          path: 'meetingForm/',
          query: row
        }

      )
    },
    //      qq(row){
    //        this.$router.push(
    //          {
    //            path: 'meetingForm/',
    //            query: row
    //          }
    //
    //        )
    //      },
    // 选项框发生改变时记录选中的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 后台分页
    getList() {
      console.log(this.listQuery.meetingDate)
      //        this.listLoading = true
      if (this.ss) {
        fetchAnnouncementList(this.listQuery).then(response => {
          //            console.log(response.data)
          this.pageData = response.data.items
          this.total = response.data.total
          this.pageData.unshift(this.ss)
          // Just to simulate the time of the request
          //            setTimeout(() => {
          //              this.listLoading = false
          //            }, 1.5 * 1000)
        })
      } else {
        fetchAnnouncementList(this.listQuery).then(response => {
          console.log(response.data)
          this.pageData = response.data.items
          this.total = response.data.total
          this.pageData.unshift(this.ss)
          // Just to simulate the time of the request
          //            setTimeout(() => {
          //              this.listLoading = false
          //            }, 1.5 * 1000)
        })
      }
    },
    // 删除
    del(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let index = -1
        this.pageData.forEach((news, idx) => {
          if (news.id == row.id) { index = idx }//eslint-disable-line
        })
        this.pageData.splice(index, 1)

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
    },

    // 延期
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true// 开启弹窗
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    delayData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)

          delayMeeting(tempData).then(() => { // updateMeeting定义在api/meeting.js和moke/meeting.js,后在本页import进来
            for (const v of this.pageData) {
              if (v.id === this.temp.id) {
                const index = this.pageData.indexOf(v)
                this.temp.meetingDate = this.temp.delayDate

                this.temp.meetingStatus = this.meetingStatus[2]
                this.pageData.splice(index, 1, this.temp)

                break
              }
            }
            this.dialogFormVisible = false // 关闭弹窗
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    cancelData(row) {
      this.$confirm('确定取消此次会议吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let index = -1
        this.pageData.forEach((news, idx) => {
          if (news.id == row.id) { index = idx }//eslint-disable-line
        })
        //          console.log(this.pageData,index)
        this.pageData[index].meetingStatus = this.meetingStatus[3]

        this.$message({
          type: 'success',
          message: '已取消!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }

    // 导出
    //    handleDownload() {
    //      this.downloadLoading = true
    //      import('@/vendor/Export2Excel').then(excel => {
    //        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    //        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    //        const data = this.formatJson(filterVal, this.list)
    //        excel.export_json_to_excel({
    //          header: tHeader,
    //          data,
    //          filename: 'table-list'
    //        })
    //        this.downloadLoading = false
    //      })
    //    },
    //    formatJson(filterVal, jsonData) {
    //      return jsonData.map(v => filterVal.map(j => {
    //        if (j === 'timestamp') {
    //          return parseTime(v[j])
    //        } else {
    //          return v[j]
    //        }
    //      }))
    //    }

  }
}
</script>

<style>
  .el-form-item__label{
    padding-right: 12px !important;
  }
  .filter-item{
    margin-bottom: 0 !important;
  }
</style>
