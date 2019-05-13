<template>
  <div>
    <div class="filter-container">
      <el-input v-model="listQuery.product" placeholder="产品名" style="width: 145px;margin-top:7px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.regionType" placeholder="地域" clearable class="filter-item" style="margin-top:7px;width: 130px" @change="handleFilter">
        <el-option v-for="item in regionTypeOptions" :key="item.id" :label="item.typeName" :value="item.id" />
      </el-select>
      <el-date-picker
        v-model="listQuery.date"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-top:7px" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-top:7px;margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" style="margin-top:7px" icon="el-icon-download" @click="handleDownload">
        {{ $t('table.export') }}
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="tableData" border style="width: 100%">
      <el-table-column prop="product" label="产品名" width="120" align="center" />
      <el-table-column prop="regionType.typeName" label="地域" width="120" align="center" />
      <el-table-column prop="date" sortable label="时间" format="yyyy-MM-dd" width="150" align="center" />
      <el-table-column sortable prop="value1" label="产品计费收入(万)" width="160" align="center" />
      <el-table-column sortable prop="value2" label="新增用户数" width="150" align="center" />
      <el-table-column prop="hratio" sortable label="日均环比" width="180" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.hratio|readFilter">{{ scope.row.hratio }}%</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="tratio" sortable label="日均同比" width="180" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tratio|readFilter">{{ scope.row.tratio }}%</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="warning" size="mini" @click="show(row)">
            查看
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="产品名" prop="product">
          <el-input v-model="temp.product" />
        </el-form-item>
        <el-form-item label="地域" prop="regionType">
          <el-select v-model="temp.regionType" value-key="id" class="filter-item" placeholder="Please select">
            <el-option v-for="item in regionTypeOptions" :key="item.id" :label="item.typeName" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="temp.date" type="date" value-format="yyyy-MM-dd" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="产品计费收入" prop="value1">
          <el-input v-model="temp.value1" />
        </el-form-item>
        <el-form-item label="新增用户数" prop="value2">
          <el-input v-model.number="temp.value2" />
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
import { fetchNewsList, createNews, updateNews } from '@/api/analysis'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'

const regionTypeOptions = [
  { id: 1, typeName: '福州' },
  { id: 2, typeName: '厦门' },
  { id: 3, typeName: '泉州' },
  { id: 4, typeName: '漳州' },
  { id: 5, typeName: '宁德' },
  { id: 6, typeName: '莆田' },
  { id: 7, typeName: '南平' },
  { id: 8, typeName: '三明' },
  { id: 9, typeName: '龙岩' }
]

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    readFilter(read) {
      return read < 0 ? 'success' : (read > 0 ? 'danger' : 'waring')
    }
  },
  data() {
    return {
      tableData: [],
      list: null,
      total: 0,
      dialogPvVisible: false,
      dialogFormVisible: false,
      listLoading: true,
      dialogStatus: '',
      regionType: '',
      rules: {
        regionType: [{ required: true, message: '地域必填', trigger: 'change' }],
        date: [{ required: true, message: '日期必填', trigger: 'change' }],
        value1: [{ required: false, message: '需要填入数字', trigger: 'blur' }],
        value2: [{ type: 'number', required: false, message: '需要填入整数', trigger: 'blur' }],
        product: [{ required: true, message: '产品名必填', trigger: 'blur' }]
      },
      regionTypeOptions,
      listQuery: {
        page: 1,
        limit: 20,
        product: undefined,
        regionType: undefined,
        date: '',
        sort: '-date'
      },
      temp: {
        id: undefined,
        region: '',
        date: '',
        product: '',
        hratio: 0,
        tratio: 0,
        value1: '',
        value2: '',
        regionType: ''
      },
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      sortOptions: [{ label: 'Date Ascending', key: '+date' }, { label: 'Date Descending', key: '-date' }],
      downloadLoading: false
    }
  },
  watch: {
    'listQuery.date': {
      handler(val, oldVal) {
        if (val === null) {
          this.listQuery.date = ''
        }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchNewsList(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total
      })
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortByDate(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+date'
      } else {
        this.listQuery.sort = '-date'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        date: '',
        product: '',
        hratio: 0,
        tratio: 0,
        value1: '',
        value2: '',
        regionType: ''
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
          this.temp.id = parseInt(Math.random() * 100) + 1024// mock a id
          this.temp.author = 'vue-element-admin'
          createNews(this.temp).then(() => {
            this.tableData.unshift(this.temp)
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
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          //            tempData.date = +new Date(tempData.date) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateNews(tempData).then(() => {
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
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      //        this.temp.date = new Date(this.temp.date)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    show(row) {
      this.$router.push({
        path: '/analysis/dailyMap',
        name: 'DailyMap',
        query: { product: row.product }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let index = -1
        this.tableData.forEach((news, idx) => {
          if (news.id == row.id) { index = idx }//eslint-disable-line
        })
        this.tableData.splice(index, 1)
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
      })
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['产品名', '地域', '日期', '产品计费收入(万)', '新增用户数', '日均环比(%)', '日均同比(%)']
          const filterVal = ['product', 'regionType', 'date', 'value1', 'value2', 'hratio', 'tratio']
          const data = this.formatJson(filterVal, this.tableData)
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
        if (j === 'regionType') {
          return v[j].typeName
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>

</style>
