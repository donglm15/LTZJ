<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.produce_name" :placeholder="$t('table.produce_name')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.produce_importance" :placeholder="$t('table.produce_importance')" clearable style="width: 130px" class="filter-item">
        <el-option v-for="(item,i) in importanceOptions" :key="i" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.produce_type" :placeholder="$t('table.produce_type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        创建
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      //序号
      <el-table-column :label="$t('table.produce_id')" prop="produce_id" sortable="custom" align="center" width="100%">
        <template slot-scope="scope">
          <span>{{ scope.row.produce_id }}</span>
        </template>
      </el-table-column>
      //时间
      <el-table-column :label="$t('table.produce_datatime')" prop="produce_datatime" sortable="custom" width="220px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.produce_datatime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      //产品名称
      <el-table-column :label="$t('table.produce_name')" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.produce_name }}</span>
          <el-tag>{{ row.produce_type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      //项目组名称
      <el-table-column :label="$t('table.produce_team_name')" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.produce_team_name }}</span>
        </template>
      </el-table-column>
      //重要性
      <el-table-column :label="$t('table.produce_importance')" sortable class-name="status-col" width="160px">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.produce_importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>
      //详情、编辑、删除
      <el-table-column :label="$t('table.actions')" align="center" width="350" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" prop="produce_id" size="small" @click="detailsProduct(row)">
            {{ $t('table.detailsproduct') }}
          </el-button>
          <el-button type="primary" size="small" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button size="small" type="danger" @click="delProduce(row,'list')">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :name-product="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:60px;">
        <el-form-item :label="$t('table.produce_type')" prop="produce_type">
          <el-select v-model="temp.produce_type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.produce_datatime')" prop="produce_datatime">
          <el-date-picker v-model="temp.produce_datatime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item :label="$t('table.produce_name')" prop="produce_name">
          <el-input v-model="temp.produce_name" />
        </el-form-item>
        <el-form-item :label="$t('table.produce_importance')">
          <el-rate v-model="temp.produce_importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item :label="$t('table.remark')">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
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

    <el-dialog :visible.sync="dialogPvVisible" name-product="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchPageProduceList, deleteNoticeOne, insertPageProduceOne, updatePageProduceOne } from '@/api/PageProduce'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: '5G', display_name: '5G' },
  { key: 'YUN', display_name: '云计算' },
  { key: 'DSJ', display_name: '大数据' },
  { key: 'RGZN', display_name: '人工智能' },
  { key: 'WLW', display_name: '物联网' }
]
// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        //          draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(produce_type) {
      return calendarTypeKeyValue[produce_type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        produce_importance: undefined,
        produce_name: undefined,
        produce_type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3, 4, 5],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        produce_id: '',
        produce_importance: 1,
        remark: '',
        produce_datatime: '',
        produce_name: '',
        produce_type: '',
        status: 'published'
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
        produce_type: [{ required: true, message: 'produce_type is required', trigger: 'change' }],
        produce_datatime: [{ required: true, message: 'produce_datatime is required', trigger: 'change' }],
        produce_name: [{ required: true, message: 'produce_name is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    delProduce(row) {
      this.$confirm('是否删除此产品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let index = -1
        this.list.forEach((list, idx) => {
          if (list.produce_id == row.produce_id) { index = idx }})//eslint-disable-line
        this.list.splice(index, 1)
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

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      fetchPageProduceList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'produce_id') {
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
        produce_id: '',
        produce_importance: 1,
        remark: '',
        produce_datatime: '',
        produce_name: '',
        status: 'published',
        produce_type: ''
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
          insertPageProduceOne(this.temp).then(() => {
            this.fetchPageProduceList()
            this.dialogFormVisible = false
            this.$notify({
              produce_name: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    detailsProduct(row) {
      this.$router.push({ path: 'ThingProduce' })
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
          const tempData = Object.assign({}, this.temp)
          console.log(tempData)
          updatePageProduceOne(tempData).then(() => {
            for (const v of this.list) {
              if (v.produce_id === this.temp.produce_id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              produce_name: '成功',
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
        produce_name: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      deleteNoticeOne(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['produce_datatime', 'produce_name', 'produce_type', 'produce_importance', 'status']
          const filterVal = ['produce_datatime', 'produce_name', 'produce_type', 'produce_importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j == 'produce_datatime') {//eslint-disable-line
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

