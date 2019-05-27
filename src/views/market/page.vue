<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" :placeholder="$t('table.jobName')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" :placeholder="$t('table.importantly')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.marketType" :placeholder="$t('table.jobSort')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.id" :label="item.typeName" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        {{ $t('table.export') }}
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        {{ $t('table.reviewer') }}
      </el-checkbox>
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
      @row-click="openDetails"
    >
      <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.jobName')" align="center" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.title }}</span><br>
          <el-tag :type="row.marketType.typeName | typeFilter">{{ row.marketType.typeName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.endTime')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.employName')" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.employName }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="$t('table.reviewer')" width="120px" align="center">
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.importantly')" width="90px" align="center">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.jobPlace')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jobPlace }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.status')" class-name="status-col" width="120">
        <template slot-scope="{row}">
          <el-tag :type="row.marketStatus.status | statusFilter">
            {{ row.marketStatus.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click.stop="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button v-if="row.marketStatus.status !='published'" disabled size="mini" type="success" @click.stop="handleModifyStatus(row,'published')">
            {{ $t('table.publish') }}
          </el-button>
          <el-button v-if="row.marketStatus.status !='draft'" disabled size="mini" @click.stop="handleModifyStatus(row,'draft')">
            {{ $t('table.draft') }}
          </el-button>
          <el-button v-if="row.marketStatus.status !='deleted'" size="mini" type="danger" @click.stop="handleDelete(row)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.jobSort')">
          <el-select v-model="temp.marketType" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.id" :label="item.typeName" :value="item.typeName" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.jobName')" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item :label="$t('table.employName')" prop="employName">
          <el-input v-model="temp.employName" />
        </el-form-item>
        <el-form-item :label="$t('table.jobPlace')" prop="jobPlace">
          <el-input v-model="temp.jobPlace" />
        </el-form-item>
        <el-form-item :label="$t('table.reviewer')" prop="reviewer">
          <el-input v-model="temp.reviewer" />
        </el-form-item>
        <el-form-item :label="$t('table.importantly')" prop="importance">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item :label="$t('table.endTime')" prop="endData">
          <el-date-picker v-model="temp.endDate" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item :label="$t('table.jobDetail')" prop="content">
          <el-input v-model="temp.content" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
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
import { fetchList, deleteMarket, createMarket, updateMarket } from '@/api/market'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'// 导出
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { id: '1', typeName: '管理序列' },
  { id: '2', typeName: '技术序列' },
  { id: '3', typeName: '支撑序列' },
  { id: '4', typeName: '市场序列' }
]

const types = {
  '管理序列': 1,
  '技术序列': 2,
  '支撑序列': 3,
  '市场序列': 4
}

export default {
  name: 'Table',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(marketStatus) {
      const statusMap = {
        published: 'success',
        draft: 'danger'
      }
      return statusMap[marketStatus]
    },
    typeFilter(marketType) {
      const typeMap = {
        管理序列: 'success',
        技术序列: 'warning',
        支撑序列: 'primary',
        市场序列: 'danger'
      }
      return typeMap[marketType]
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
        limit: 10,
        importance: undefined,
        title: undefined,
        marketType: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3, 4, 5],
      calendarTypeOptions,
      sortOptions: [{ label: '升序', key: '+id' }, { label: '降序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        importance: '',
        content: '',
        endDate: new Date(),
        title: '',
        marketType: { id: '', typeName: '' },
        reviewer: '',
        jobPlace: '',
        employName: ''
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
        marketType: [{ required: true, message: 'marketType is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }],
        employName: [{ required: true, message: 'employName is required', trigger: 'blur' }],
        jobPlace: [{ required: true, message: 'jobPlace is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, marketStatus) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.marketStatus = marketStatus
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
        importance: '',
        content: '',
        endDate: new Date(),
        title: '',
        marketType: null,
        reviewer: '',
        jobPlace: '',
        employName: ''
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
          const formData = Object.assign({}, this.temp)
          formData.marketType = { id: types[this.temp.marketType], typeName: this.temp.marketType }
          console.log(formData)
          createMarket(formData).then(() => {
            //            this.list.unshift(this.temp)
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
    handleUpdate(row) {
      console.log(row)
      this.temp = Object.assign({}, row) // copy obj
      this.temp.marketType = row.marketType.typeName
      //      this.temp.timestamp = new Date(this.temp.timestamp)
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
          tempData.marketType = { id: types[this.temp.marketType], typeName: this.temp.marketType }
          //          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateMarket(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === tempData.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, tempData)
                break
              }
            }
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
    handleDelete(row) {
      console.log(row)
      deleteMarket(row.id).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['endDate', 'title', 'marketType', 'importance', 'sort']
          const filterVal = ['endDate', 'title', 'marketType', 'importance', 'sort']
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
        if (j === 'filterVal') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    openDetails(row) {
      console.log(row)
      console.log(row.salary)

      this.$router.push({ name: 'PageDetail', params: {
        endDate: row.endDate,
        title: row.title,
        content: row.content,
        importance: row.importance,
        employName: row.employName,
        typeName: row.marketType.typeName,
        salary: row.salary,
        education: row.education,
        experience: row.experience,
        recruitment: row.recruitment,
        jobPlace: row.jobPlace,
        welfare: row.welfare,
        company: row.company,
        urlImg: row.urlImg
      }})
    }
  }
}
</script>
