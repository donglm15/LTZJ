<template>
  <div class="app-container">
    <div class="filter-container">
      <!--查、增-->
      <div class="filter-container">
        <el-input v-model="listQuery.title" :placeholder="$t('notice.noticeTitle')" style="width: 200px;" class="filter-item" @keyup.native.enter="getList" />
        <el-select v-model="listQuery.typePublish" :placeholder="$t('notice.noticePublish')" clearable class="filter-item" style="width: 130px" @change="getList">
          <el-option v-for="item in noticePublish" :key="item.publishId" :label="item.typePublish" :value="item.publishId" />
        </el-select>
        <el-select v-model="listQuery.typeStatus" :placeholder="$t('notice.status')" clearable class="filter-item" style="width: 130px" @change="getList">
          <el-option v-for="(item,index) in typeStatus" :key="index" :label="item.typeName" :value="item.typeName" />
        </el-select>
        <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="getList">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
          {{ $t('table.search') }}
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          {{ $t('table.add') }}
        </el-button>
      </div>
      <!--表格-->
      <el-table v-loading="listLoading" :data="pageData" border style="width: 100%;text-align: center">
        <el-table-column prop="noticeId" align="center" sortable :label="$t('notice.noticeId')" width="100" />
        <el-table-column prop="noticeDate" align="center" sortable :label="$t('notice.noticeDate')" width="120" />
        <el-table-column prop="noticePublish.typePublish" align="center" :label="$t('notice.noticePublish')" width="120" />
        <el-table-column prop="noticeTitle" align="center" sortable :label="$t('notice.noticeTitle')" width="260" />
        <el-table-column :label="$t('table.status')" class-name="status-col" width="120">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="noticeReadNum" align="center" sortable :label="$t('notice.noticeReadNum')" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.noticeReadNum | typeFilter">{{ scope.row.noticeReadNum }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('notice.actions')" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" :disabled="row.editIf" @click="handleUpdate(row)">
              {{ $t('table.edit') }}
            </el-button>
            <el-button v-if="row.status!='draft'" type="primary" size="mini" @click="handleModifyStatus(row,'draft')">
              查看
            </el-button>
            <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
              {{ $t('table.publish') }}
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row)">
              {{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      <!--编辑修改页面-->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
          <el-form-item :label="$t('notice.noticeId')" prop="noticeId">
            <el-input v-model="temp.noticeId" read-flag />
          </el-form-item>
          <el-form-item :label="$t('notice.noticeDate')" prop="noticeDate">
            <el-date-picker v-model="temp.noticeDate" value-format="yyyy-MM-dd" type="date" placeholder="Please pick a date" />
          </el-form-item>
          <el-form-item :label="$t('notice.noticePublish')" prop="noticePublish.typePublish">
            <el-select v-model="temp.noticePublish.publishId" class="filter-item" placeholder="Please select">
              <el-option v-for="item in noticePublish" :key="item.publishId" :label="item.typePublish" :value="item.publishId" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('notice.noticeTitle')" prop="noticeTitle">
            <el-input v-model="temp.noticeTitle" />
          </el-form-item>
          <el-form-item :label="$t('notice.noticeContent')" prop="noticeContent">
            <el-input v-model="temp.noticeContent" type="textarea" :row="3" />
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
  </div>
</template>
<script>
import { fetchNotice, createNotice, updateNotice } from '@/api/notice'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const noticePublish = [
  { publishId: 1, typePublish: '人力资源部' },
  { publishId: 2, typePublish: '办公厅' },
  { publishId: 3, typePublish: '综合部' }
]

export default {
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
    typeFilter(read) {
      return read >= 200 ? 'danger' : (read >= 100 ? 'warning' : 'success')
    }
  },
  data() {
    return {
      typeStatus: [
        { typeName: 'published' },
        { typeName: 'draft' }
      ],
      editIf: false,
      readFlag: false,
      listLoading: false,
      tableData: null,
      pageData: null,
      noticePublish,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        typePublish: undefined,
        typeStatus: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        noticeId: '',
        noticeDate: '',
        noticePublish: { publishId: '', typePublish: '' },
        noticeTitle: '',
        noticeContent: '',
        noticeReadNum: 0,
        status: 'draft'
      },
      dialogFormVisible: false, // 编辑添加页
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false
    }
  },
  mounted() {
    this.listLoading = true
    fetchNotice(this.listQuery).then(response => {
      this.tableData = response.data.items
      this.total = response.data.total
      this.gx()
      this.getList()
    })
    setTimeout(() => {
      this.listLoading = false
    }, 1 * 1000)
  },
  methods: {
    gx() {
      for (var j = 0; j < this.total; j++) {
        if (this.tableData[j].status === 'draft') {
          this.tableData[j].editIf = false
          this.tableData[j].noticeReadNum = 0
        }
      }
    },
    getList() {
      const { page, limit, title, sort, typePublish, typeStatus } = this.listQuery
      let filterData = this.tableData.filter(item => {
        if (title && item.noticeTitle.indexOf(title) < 0) return false
        if (typePublish && item.noticePublish.publishId !== typePublish) return false
        if (typeStatus && item.status !== typeStatus) return false
        return true
      })
      if (sort === '-id') {
        filterData = filterData.reverse()
      }
      this.total = filterData.length
      this.pageData = filterData.filter((item, index) => {
        return index < page * limit && index >= limit * (page - 1)
      })
    },
    handleModifyStatus(row, status) {
      if (status === 'published') {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
        row.editIf = true
      }
      if (row.status === 'published' && status !== 'published') {
        this.handleSee(row)
      }
    },
    resetTemp() {
      this.temp = {
        noticeId: '',
        noticeDate: '',
        noticePublish: { publishId: '', typePublish: '' },
        noticeTitle: '',
        noticeContent: '',
        noticeReadNum: '',
        status: 'published'
      }
    },
    handleSee(row) {
      const h = this.$createElement
      this.$msgbox({
        title: '公告详情',
        message: h('p', { style: 'font-size:20px' }, [
          h('span', { style: 'font-weight:bolder' }, 'ID：'), h('i', { style: 'font-size:17px' }, row.noticeId), h('br'),
          h('span', { style: 'font-weight:bolder' }, '日期：'), h('i', { style: 'font-size:17px' }, row.noticeDate), h('br'),
          h('span', { style: 'font-weight:bolder' }, '发布部门：'), h('i', { style: 'font-size:17px' }, row.noticePublish.typePublish), h('br'),
          h('span', { style: 'font-weight:bolder' }, '点击量：'), h('i', { style: 'font-size:17px' }, row.noticeReadNum), h('br'),
          h('span', { style: 'font-weight:bolder' }, '标题：'), h('i', { style: 'font-size:17px' }, row.noticeTitle), h('br'),
          h('span', { style: 'font-weight:bolder' }, '内容：'), h('i', { style: 'font-size:17px' }, row.noticeContent)
        ]),
        confirmButtonText: '确定'
      })
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
          createNotice(this.temp).then(() => {
            this.temp.noticePublish.typePublish = noticePublish[this.temp.noticePublish.publishId - 1].typePublish
            this.temp.noticeReadNum = 0
            this.temp.status = 'draft'
            this.tableData.unshift(this.temp)
            this.dialogFormVisible = false
            this.getList()
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.noticePublish.typePublish = noticePublish[this.temp.noticePublish.publishId - 1].typePublish
          this.temp.status = 'draft'
          updateNotice(this.temp).then(() => {
            for (const v of this.tableData) {
              if (v.noticeId === this.temp.noticeId) {
                const index = this.tableData.indexOf(v)
                this.tableData.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.getList()
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
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.tableData.indexOf(row)
      this.tableData.splice(index, 1)
      this.getList()
    }
  }
}
</script>
<style>
</style>
