<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.id" :label="item.typename+'('+item.id+')'" :value="item.id" /></el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange" @row-click="checkMember">
      <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.date')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.date | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.title')" width="200px" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.title }}</span><br>
          <el-tag>{{ row.memberType.typename }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip="true" prop="content" :label="$t('table.content')" align="center">
        <!--<span class="link-type">{{row.content | ellipsis}}</span>-->
      </el-table-column>

      <el-table-column :label="$t('table.author')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.readings')" align="center" width="95">
        <template slot-scope="{row}">
          <span v-if="row.readings" class="link-type">{{ row.readings }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,'deleted')">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">

        <!--<el-form-item :label="$t('table.id')" prop="id">-->
        <!--<el-input v-model="temp.id" />-->
        <!--</el-form-item>-->

        <el-form-item :label="$t('table.type')" prop="memberType">
          <el-select v-model="temp.memberType" value-key="id" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.id" :label="item.typename" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.date')" prop="timestamp">
          <el-date-picker v-model="temp.date" type="date" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item :label="$t('table.title')" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item :label="$t('table.content')" prop="content">
          <el-input v-model="temp.content" type="textarea" label-height="800px" />
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
import { fetchList, createMember, updateMember, deleteMember } from '@/api/member'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'  //eslint-disable-line
import Pagination from '@/components/Pagination'
import MemberDetail from './components/memberDetail'    //eslint-disable-line

const calendarTypeOptions = [
  { id: '1', typename: '经验交流' },
  { id: '2', typename: '基层动态' },
  { id: '3', typename: '主题党日' },
  { id: '4', typename: '党员自学' }
]

const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'Member',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },

    //      ellipsis(value){
    //        if(!value) return''
    //        if((value.length>10){
    //          return value.slice(0,10) + '...'
    //        }
    //        return value
    //      },

    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableData: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
      temp: {
        id: undefined,
        date: '',
        timestamp: new Date(),
        title: '',
        membertypeid: '',
        memberType: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        date: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        console.log(this.list)

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        //          remark: '',
        timestamp: new Date(),
        title: '',
        type: ''
      }
    },

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
          //          this.temp.id = parseInt(Math.random() * 100)
          this.temp.author = '刘华'
          this.temp.membertypeid = this.temp.memberType.id
          createMember(this.temp).then(() => {
            this.getList()
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
    },

    checkMember(row) {
      this.tableData.forEach((member, idx) => {
        if (member.id === row.id) {
          this.tempId = idx
        }
      })
      this.tableData[this.tempId]
      this.getList()
      this.$router.push({ name: 'memberDetail', params: { id: row.id, row: row }})
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      event.stopPropagation()
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.membertypeid = tempData.memberType.id

          updateMember(tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
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
    //    handleDelete(row) {
    //      this.$notify({
    //        title: '成功',
    //        message: '删除成功',
    //        type: 'warning',
    //        duration: 2000
    //      })
    //      event.stopPropagation()
    //      const index = this.list.indexOf(row)
    //      this.list.splice(index, 1)
    //      event.stopPropagation()
    //    }
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'dander'
      }).then(() => {
        const index = this.list.indexOf(row)// 找到要删除数据在list中的位置
        this.list.splice(index, 1)// 通过splice 删除数据
        console.log(row.id)
        deleteMember(row.id).then(() => {
          this.getList()
          this.$message({
            type: 'danger',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '已取消删除'
        })
      })
      event.stopPropagation()
    }
  }
}
</script>
<style>
</style>
