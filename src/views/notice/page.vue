<template>
  <div class="app-container">
    <div class="filter-container">
      <!--查、增-->
      <div class="filter-container">
        <el-input v-model="listQuery.noticeTitle" :placeholder="$t('notice.noticeTitle')" style="width: 200px;" class="filter-item" @keyup.native.enter="findList" />
        <el-select v-model="listQuery.noticePublish" :placeholder="$t('notice.noticePublish')" clearable class="filter-item" style="width: 130px" @change=" findList">
          <el-option v-for="(item,i) in publishData" :key="i" :label="item" :value="item" />
        </el-select>
        <el-select v-model="listQuery.noticeStatus" :placeholder="$t('notice.status')" clearable class="filter-item" style="width: 130px" @change=" findList">
          <el-option v-for="(item,index) in typeStatus" :key="index" :label="item" :value="item" />
        </el-select>
        <el-select v-model="listQuery.order" style="width: 140px" class="filter-item" @change=" findList">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click=" findList">
          {{ $t('table.search') }}
        </el-button>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-data-analysis" @click="noticeChart">
          统计
        </el-button>
      </div>
      <!--表格-->
      <el-table v-loading="listLoading" :data="tableData" border style="width: 100%;text-align: center">
        <el-table-column prop="noticeId" align="center" sortable :label="$t('notice.noticeId')" width="80" />
        <el-table-column prop="noticeDate" align="center" sortable :label="$t('notice.noticeDate')" width="110" />
        <el-table-column prop="noticePublish" align="center" :label="$t('notice.noticePublish')" width="110" />
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
            <!--:disabled="judgeStatus(row.noticeStatus)"-->
            <el-button type="primary" size="mini" :disabled="judgeStatus(row.noticeStatus)" @click="handleUpdate(row)">
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
import { fetchNoticeBack, publishNoticeBack, deleteNoticeOne, updateStatusOne } from '@/api/notice'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

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
      typeStatus: ['published', 'draft'],
      editIf: false,
      readFlag: false,
      listLoading: false,
      tableData: null,
      publishData: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        noticeTitle: undefined,
        noticePublish: undefined,
        noticeStatus: undefined,
        order: '-id'
      },
      sortOptions: [{ label: 'ID Descending', key: '-id' }, { label: 'ID Ascending', key: '+id' }],
      temp: {
        noticeId: '',
        noticeDate: '',
        noticePublish: '',
        noticeTitle: '',
        noticeContent: '',
        noticeReadNum: 0,
        noticeStatus: 'draft'
      }
    }
  },
  computed: {
    ...mapState(['notice'])
  },
  created() {
    if (this.$route.query.page > 0) {
      this.listQuery.page = this.$route.query.page
    }
  },
  mounted() {
    publishNoticeBack().then(response => {
      this.publishData = response.data.items
    })
    this.getList()
  },

  methods: {
    ...mapActions(['updateNotice', 'deleteNotice']),
    judgeStatus(status) {
      if (status === 'published') {
        return true
      } else {
        return false
      }
    },
    findList() {
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      fetchNoticeBack(this.listQuery).then(response => {
        this.tableData = response.data.list
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    handleModifyStatus(row, status) {
      if (status === 'published') {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        updateStatusOne(row.noticeId, status).then(response => {
          this.getList()
          console.log('更新状态')
        })
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
        noticePublish: '',
        noticeTitle: '',
        noticeContent: '',
        noticeReadNum: '',
        noticeStatus: 'published'
      }
    },
    handleSee(row) {
      this.$router.push({ path: '/notice/noticeDetails', query: { id: row.noticeId, pageNext: this.listQuery.page }})
    },
    handleUpdate(row) {
      this.$router.push({ path: '/notice/noticeEst', query: { id: row.noticeId, pageNext: this.listQuery.page }})
    },
    noticeChart() {
      this.$router.push({ path: '/notice/noticeCharts', query: { pageNext: this.listQuery.page }})
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNoticeOne(row.noticeId).then(response => {
          if (response.data === 'success') {
            if ((this.listQuery.page - 1) * this.listQuery.limit === this.tableData.length) { this.listQuery.page -= 1 }
            this.getList()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: '失败',
              message: '删除失败',
              type: 'info'
            })
          }
        })
      }).catch(() => {
        this.$notify({
          message: '已取消删除',
          type: 'info'
        })
      })
    }
  }
}
</script>
<style>
</style>
