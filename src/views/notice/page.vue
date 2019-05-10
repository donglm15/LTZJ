<template>
  <div class="app-container">
    <div class="filter-container">
      <!--查、增-->
      <div class="filter-container">
        <el-input v-model="listQuery.title" :placeholder="$t('notice.noticeTitle')" style="width: 200px;" class="filter-item" @keyup.native.enter="selectFilter" />
        <el-select v-model="listQuery.typePublish" :placeholder="$t('notice.noticePublish')" clearable class="filter-item" style="width: 130px" @change="selectFilter">
          <el-option v-for="item in noticePublish" :key="item.publishId" :label="item.typePublish" :value="item.publishId" />
        </el-select>
        <el-select v-model="listQuery.typeStatus" :placeholder="$t('notice.status')" clearable class="filter-item" style="width: 130px" @change="selectFilter">
          <el-option v-for="(item,index) in typeStatus" :key="index" :label="item.typeName" :value="item.typeName" />
        </el-select>
        <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="selectFilter">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="selectFilter">
          {{ $t('table.search') }}
        </el-button>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-data-analysis" @click="noticeChart">
          统计
        </el-button>
      </div>
      <!--表格-->
      <el-table v-loading="listLoading" :data="pageData" border style="width: 100%;text-align: center" height="390">
        <el-table-column prop="noticeId" align="center" sortable :label="$t('notice.noticeId')" width="100" />
        <el-table-column prop="noticeDate" align="center" sortable :label="$t('notice.noticeDate')" width="120" />
        <el-table-column prop="noticePublish.typePublish" align="center" :label="$t('notice.noticePublish')" width="120" />
        <el-table-column prop="noticeTitle" align="center" sortable :label="$t('notice.noticeTitle')" />
        <el-table-column :label="$t('table.status')" class-name="status-col" width="120">
          <template slot-scope="{row}">
            <el-tag :type="row.noticeStatus | statusFilter">
              {{ row.noticeStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="noticeReadNum" align="center" sortable :label="$t('notice.noticeReadNum')" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.noticeReadNum | typeFilter">{{ scope.row.noticeReadNum }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('notice.actions')" align="center" class-name="small-padding fixed-width" width="260">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" :disabled="row.editIf" @click="handleUpdate(row)">
              {{ $t('table.edit') }}
            </el-button>
            <el-button v-if="row.noticeStatus!='draft'" type="primary" size="mini" @click="handleModifyStatus(row,'draft')">
              查看
            </el-button>
            <el-button v-if="row.noticeStatus!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
              {{ $t('table.publish') }}
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row)">
              {{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
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
    statusFilter(noticeStatus) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[noticeStatus]
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
        noticeStatus: 'draft'
      }
    }
  },
  methods: {
    ...mapActions(['updateNotice', 'deleteNotice']),
    gx() {
      for (let j = 0; j < this.total; j++) {
        if (this.notice.notice[j].noticeStatus === 'draft') {
          this.notice.notice[j].editIf = false
          this.notice.notice[j].noticeReadNum = 0
        }
      }
    },
    getList() { // 过滤
      const { page, limit, title, sort, typePublish, typeStatus } = this.listQuery
      let filterData = this.tableData.filter(item => {
        if (title && item.noticeTitle.indexOf(title) < 0) return false
        if (typePublish && item.noticePublish.publishId !== typePublish) return false
        if (typeStatus && item.noticeStatus !== typeStatus) return false
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
    selectFilter() { // 搜索过滤
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      if (status === 'published') {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.noticeStatus = status
        row.editIf = true
      }
      if (row.noticeStatus === 'published' && status !== 'published') {
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
        noticeStatus: 'published'
      }
    },
    handleSee(row) {
      this.$router.push({ path: '/notice/noticeDetails', query: { id: row.noticeId }})
    },
    handleUpdate(row) {
      this.$router.push({ path: '/notice/noticeEst', query: { id: row.noticeId }})
    },
    noticeChart() {
      this.$router.push({ path: '/notice/noticeCharts' })
    },
    handleDelete(row) {
      this.$confirm('永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.deleteNotice(row)
        if ((this.listQuery.page - 1) * this.listQuery.limit === this.tableData.length) { this.listQuery.page -= 1 }
        this.getList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  computed: {
    ...mapState(['notice'])
  },
  mounted() {
    this.listLoading = true
    this.tableData = this.notice.notice
    this.total = this.tableData.length
    this.gx()
    this.getList()
    setTimeout(() => {
      this.listLoading = false
    }, 1 * 1000)
  }
}
</script>
<style>
</style>
