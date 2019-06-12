<template>
  <div class="app-container">
    <!--头部输入框-->
    <div class="filter-container">
      <!--会议室名称检索输入框-->
      <el-input v-model="listQuery.meetingName" :placeholder="$t('meeting.meetingName')" style="width: 200px;" class="filter-item" @keyup.native.enter="getList" />
      <!--会议室地址检索输入框-->
      <!--<el-input v-model="listQuery.meetingPosition" @keyup.native.enter="getList" :placeholder="$t('meeting.meetingPosition')" style="width: 200px;" class="filter-item"  />-->
      <!--会议室容纳人数检索输入框-->
      <el-input v-model="listQuery.peopleNum" :placeholder="$t('meeting.peopleNum')" style="width: 200px;" class="filter-item" @keyup.native.enter="getList" />
      <!--ID排序选择-->
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="getList">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('meeting.add') }}
      </el-button>
      <!--<el-button :loading="downloadLoading" class="filter-item" style="padding: 10px 13px;" type="primary" icon="el-icon-download" @click="handleDownload">-->
      <!--{{ $t('table.export') }}-->
      <!--</el-button>-->
    </div>
    <!--表格-->
    <el-table v-loading="listLoading" :data="pageData" border style="width: 100%;text-align: center">
      <el-table-column prop="id" sortable :label="$t('meeting.id')" align="center" width="100" />
      <el-table-column prop="meetingName" :label="$t('meeting.meetingName')" align="center" />
      <el-table-column prop="meetingPosition" sortable :label="$t('meeting.meetingPosition')" align="center" width="250" />
      <el-table-column prop="peopleNum" sortable :label="$t('meeting.peopleNum')" align="center" width="150" />
      <el-table-column prop="ifMore" sortable :label="$t('meeting.ifMore')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.ifMore | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ifOpen" sortable :label="$t('meeting.ifOpen')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.ifOpen | openFilter }}</span>
        </template>
      </el-table-column>
      <!--按钮-->
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" width="200">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="del(row)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--底部分页-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!--编辑新增弹框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="95px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('meeting.meetingName')" prop="meetingName">
          <el-input v-model="temp.meetingName" />
        </el-form-item>
        <el-form-item :label="$t('meeting.meetingPosition')" prop="meetingPosition">
          <el-input v-model="temp.meetingPosition" />
        </el-form-item>
        <el-form-item :label="$t('meeting.peopleNum')" prop="peopleNum">
          <el-input v-model="temp.peopleNum" />
        </el-form-item>
        <el-form-item :label="$t('ifMore')" prop="ifMore">
          <el-select v-model="temp.ifMore" value-key="id" class="filter-item" placeholder="Please select">
            <el-option v-for="item in ifMore" :key="item.id" :label="item.typeName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('ifOpen')" prop="ifOpen">
          <el-select v-model="temp.ifOpen" value-key="id" class="filter-item" placeholder="Please select">
            <el-option v-for="m in ifOpen" :key="m.id" :label="m.openName" :value="m.id" />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchMeetingList, deleteMeeting, updateMeeting, createMeeting } from '@/api/meeting'
// import { parseTime } from '@/utils'//
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

// 不变化的业务字典数据，可以定义为全局变量,否则应该放在data里
const ifMore = [
  { id: 0, typeName: '否' }, { id: 1, typeName: '是' }
]
const ifOpen = [
  { id: 0, openName: '未启用' }, { id: 1, openName: '启用' }
]

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      return status === 1 ? '是' : '否'
    },
    openFilter(open) {
      return open === 1 ? '启用' : '未启用'
    }
  },
  data() {
    return {
      // 从后台获取的总数据
      pageData: null,
      ifMore, // 全局变量的数据字典
      ifOpen,
      total: 0, // mock后台传过来的数据总条数
      listQuery: {// 分页参数和头部检索参数的对象
        page: 1,
        limit: 10,
        meetingName: undefined,
        meetingPosition: undefined,
        peopleNum: undefined,
        sort: '+id'
      },
      //      pageData:[],//前台每页要显示的数据
      // 生成id 正序 倒叙
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      // 控制loading加载特效
      listLoading: false,
      // 编辑时能赋值的对象
      temp: {
        id: '',
        meetingName: '',
        meetingPosition: '',
        peopleNum: '',
        ifMore: 1,
        ifOpen: 1
      },

      dialogFormVisible: false, // 关闭弹窗
      dialogStatus: '', // 弹框中点击确定按钮判断是使用新增还是编辑方法
      textMap: {
        update: 'Edit',
        create: 'Create'
      },

      rules: {
        meetingName: [{ required: true, message: 'meetingName is required', trigger: 'blur' }],
        meetingPosition: [{ required: true, message: 'meetingPosition is required', trigger: 'blur' }],
        peopleNum: [{ required: true, message: 'peopleNum is required', trigger: 'blur' }],
        ifMore: [
          { required: true, message: '请选择会议地点', trigger: 'change' }

        ]
      }

    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 后台分页
    getList() {
      this.listLoading = true
      fetchMeetingList(this.listQuery).then(response => {
        console.log(response.data)
        this.pageData = response.data.list
        this.total = response.data.total

        // Just to simulate the time of the request
        //        setTimeout(() => {
        //          this.listLoading = false
        //        }, 1.5 * 1000)
        this.listLoading = false
      })
    },
    // 删除
    del(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMeeting({ id: row.id })
        this.getList()
        this.index = -1

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

    // 修改
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true// 开启弹窗
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateMeeting(tempData).then(() => { // updateMeeting定义在api/meeting.js和moke/meeting.js,后在本页import进来
            this.getList()
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
    resetTemp() {
      this.temp = {
        id: '',
        meetingName: '',
        meetingPosition: '',
        peopleNum: '',
        ifMore: 1,
        ifOpen: 1
      }
    },
    // 新增
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          //          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createMeeting(this.temp).then(() => {
            //            this.pageData.unshift(this.temp)
            this.getList()
            console.log(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }

  }
}
</script>

<style>

</style>
