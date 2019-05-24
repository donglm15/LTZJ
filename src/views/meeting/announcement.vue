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
              <el-option v-for="s in meetingStatus" :key="s.id" :label="s.statusName" :value="s.id" />
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
            <el-select v-model="listQuery.meetingPosition" placeholder="请选择" style="width: 230px;" @change="getList">
              <el-option v-for="(p,index) in meetingPosition" :key="index" :label="p" :value="p" />
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
              v-model="announcementDate"
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
          <el-button class="filter-item" icon="el-icon-refresh" @click="resetForm('listQuery')">  {{ $t('table.reset') }}</el-button>
        </el-row>
      </el-card>
    </div>

    <el-card class="operate-container" shadow="never" style="margin-bottom: 20px;">
      <i class="el-icon-tickets" style="margin-top: 5px" />
      <span style="margin-top: 5px">数据列表</span>
      <el-button v-if="multipleSelectionFlag" type="danger" size="mini" style="float: right;margin-left: 10px" @click="popDelete">
        批量删除
      </el-button>
      <el-button type="success" size="mini" style="float: right;margin-left: 10px" @click="handleDownload">
        {{ $t('table.export') }}
      </el-button>
      <el-button
        style="float: right;"
        type="primary"
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
          <!--<span>{{ scope.row.meetingDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>-->
          <span>{{ scope.row.meetingDate }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="meetingPosition" :label="$t('Announcement.meetingPosition')" align="center" width="110">-->
      <!--<template slot-scope="scope">-->
      <!--{{ scope.row.meetingPosition.positionName }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="meetingStatus" :label="$t('Announcement.meetingStatus')" align="center" width="100">-->
      <!--<template slot-scope="scope">-->
      <!--<el-tag :type="scope.row.meetingStatus.statusName | statusFilter">{{ scope.row.meetingStatus.statusName | typeFilter }}</el-tag>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="meetingPosition" :label="$t('Announcement.meetingPosition')" align="center" width="110">
        <!--<template slot-scope="scope">-->
        <!--{{ scope.row.meetingPosition.positionName }}-->
        <!--</template>-->
      </el-table-column>
      <el-table-column prop="announcementMeetingStatus.meetingStatus" :label="$t('Announcement.meetingStatus')" align="center" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.announcementMeetingStatus.meetingStatus| statusFilter">{{ scope.row.announcementMeetingStatus.meetingStatus }}</el-tag>
          <!--{{ scope.row.announcementMeetingStatus.meetingStatus}}-->
        </template>
      </el-table-column>
      <!--按钮-->
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="{row}">
          <el-button type="text" plain size="mini" style="width: 46px;" @click.stop="handleUpdate(row)">延迟</el-button>
          <el-button type="text" plain size="mini" style="width: 46px;" @click.stop="cancelData(row)">取消</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" style="width: 46px;" @click.stop="del(row)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--底部分页-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!--//批量删除弹框-->
    <!--<el-dialog :visible.sync="multiDeleteVisible" title="提示" width="30%">-->
    <!--<span>确定要删除吗</span>-->
    <!--<span slot="footer">-->
    <!--<el-button type="primary" @click="multiDelete">确 定</el-button>-->
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->
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
import { fetchAnnouncementList, delayMeeting, meetingPlace, deleteAnnouncement } from '@/api/announcement'
import { parseTime } from '@/utils'// 导出
import Pagination from '@/components/Pagination'

// 不变化的业务字典数据，可以定义为全局变量,否则应该放在data里
// const meetingPosition = [
//  { id: 1, positionName: '7楼会议室' },
//  { id: 2, positionName: '8楼会议室' },
//  { id: 3, positionName: '9楼会议室' },
//  { id: 4, positionName: '10楼会议室' },
//  { id: 5, positionName: '11楼会议室' },
//  { id: 6, positionName: '15楼会议室' }
// ]
const meetingStatus = [
  { id: 1, statusName: '草稿' },
  { id: 2, statusName: '已通知' },
  { id: 3, statusName: '延期' },
  { id: 4, statusName: '取消' }

]
export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const meetingStatus = {
        已通知: 'success',
        草稿: 'info',
        延期: 'warning',
        取消: 'danger'

      }
      return meetingStatus[status]
    }
  },
  data() {
    return {
      downloadLoading: false, // 是否导出（默认否）
      // 批量删除
      multipleSelectionFlag: false,
      multiDeleteVisible: false,
      multipleSelection: [],

      ss: '',
      readonly: true,
      //        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      //      multipleSelection: [],
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
        startDateTime: undefined,
        endDateTime: undefined,
        meetingStatus: undefined
      },
      announcementDate: '',
      meetingPosition: undefined,
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
    'announcementDate': {
      handler(val, oldVar) {
        if (val == null) {
          this.announcementDate = ''
        }
      }
    }

  },
  created() {
    this.ss = Object.assign({}, this.$route.query)
    console.log(this.ss)
    this.getPlace()
    this.getList()
  },
  methods: {
    // 重置
    resetForm(listQuery) {
      this.$refs[listQuery].resetFields()
      this.announcementDate = ''
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

    // 后台分页
    getList() {
      //      console.log(this.listQuery.meetingDate)
      this.listLoading = true
      //      if (this.ss.meetingPosition) {
      //        fetchAnnouncementList(this.listQuery).then(response => {
      //          //            console.log(response.data)
      //          this.pageData = response.data.list
      //          this.total = response.data.total
      //          this.pageData.unshift(this.ss)
      //          // Just to simulate the time of the request
      //          //            setTimeout(() => {
      //          //              this.listLoading = false
      //          //            }, 1.5 * 1000)
      //        })
      //      } else {
      //        fetchAnnouncementList(this.listQuery).then(response => {
      //          console.log(response.data)
      //          this.pageData = response.data.items
      //          this.total = response.data.total
      //          // this.pageData.unshift(this.ss)
      //          // Just to simulate the time of the request
      //          //            setTimeout(() => {
      //          //              this.listLoading = false
      //          //            }, 1.5 * 1000)
      //        })
      //      }

      this.listQuery.startDateTime = this.announcementDate[0]
      this.listQuery.endDateTime = this.announcementDate[1]
      fetchAnnouncementList(this.listQuery).then(response => {
        //            console.log(response.data)
        this.pageData = response.data.list
        this.total = response.data.total
        //          this.pageData.unshift(this.ss)
        // Just to simulate the time of the request
        //        setTimeout(() => {
        //          this.listLoading = false
        //        }, 1.5 * 1000)
        this.listLoading = false
      })
    },
    // 获取会议地址
    getPlace() {
      meetingPlace().then(response => {
        console.log(response.data.items)
        this.meetingPosition = response.data.items
        this.total = response.data.total
      })
    },
    // 删除
    del(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //        let index = -1
        //        this.pageData.forEach((news, idx) => {
        //          if (news.id === row.id) { index = idx }
        //        })
        //        this.pageData.splice(index, 1)
        deleteAnnouncement({ id: row.id })
        this.getList()

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
          if (news.id === row.id) { index = idx }
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
    },
    // 批量删除
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.multipleSelectionFlag = true
      if (this.multipleSelection.length === 0) {
        // 如不进行判断则勾选完毕后批量删除按钮还是会在
        this.multipleSelectionFlag = false
      }
    },
    multiDelete() {
      this.multiDeleteVisible = false
      const checkArr = this.multipleSelection // multipleSelection存储了勾选到的数据
      const params = []
      const self = this
      checkArr.forEach(function(item) {
        params.push(item._id) // 添加所有需要删除数据的id到一个数组，post提交过去
      })
      //  $http即是axios，可以在main.js里面设置 Vue.prototype.$http = axios;
      this.$http.post('/fashion/multiDelete', params).then(function(res) {
        if (res.data.status === '1') {
          self.$message({
            message: '删除成功',
            type: 'success'
          })
        }
        self.getFashionList(1, 1, 5)
      })
    },
    popDelete() {
      this.$confirm('是否要进行该批量操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id)
        }
        this.batchDelete(ids) // 批量删除
      })
    },
    // 批量删除方法
    batchDelete(ids) {
      // ids:数组（所选表格项的id值数组）
      for (let i = 0; i < ids.length; i++) { // 循环所选中的表格项
        this.pageData.forEach((user, idx) => { // 循环此页码面的表格数据
          if (user.id === ids[i]) { // 若表格数据id与选中的id一致
            this.pageData.splice(idx, 1) // 删除要删除的数据
          }
        })
      }
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },

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
    // 导出按钮的逻辑
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['编号', '会议通知ID', '会议主题', '招开部门', '开会时间', '会议地点', '会议状态']
        const filterVal = ['id', 'meetingID', 'meetingTheme', 'department', 'meetingDate', 'meetingPosition', 'meetingStatus']
        const data = this.formatJson(filterVal, this.pageData)

        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '联通之家会议通知列表'
        })
        this.downloadLoading = false
      })
    },
    // 导出时的时间及职位的数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'meetingStatus') {
          //          console.log(v[j])
          return v[j].statusName
        } else if (j === 'meetingDate') {
          return parseTime(v[j])
        } else if (j === 'meetingPosition') {
          return v[j].positionName
        } else {
          return v[j]
        }
      }))
    }

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
