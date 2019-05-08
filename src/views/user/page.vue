<template>
  <div class="app-container">
    <!--用户筛选区域,el-card:卡片布局-->
    <el-card class="filter-container" shadow="hover">
      <div>
        <!--筛选区域顶部标题-->
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <!--搜索按钮-->
        <el-button
          class="filter-item"
          icon="el-icon-search"
          style="float: right"
          type="primary"
          size="small"
          @click="handleFilter"
        >
          查询结果
        </el-button>
        <!--重置按钮-->
        <el-button
          class="filter-item"
          icon="el-icon-delete"
          style="float: right;margin-right: 15px"
          size="small"
          @click="handleResetSearch()"
        >
          重置
        </el-button>
      </div>
      <!--搜索项-->
      <div style="margin-top: 15px">
        <!--表单,inline:行内表单模式(搜索框横向排列),model:表单数据对象-->
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <!--用户名搜索-->
          <el-form-item label="用户搜索：">
            <el-input v-model="listQuery.account" style="width: 200px" :placeholder="$t('userManager.account')" @keyup.native.enter="handleFilter" />
          </el-form-item>
          <!--姓名搜索-->
          <el-form-item label="姓名搜索：">
            <el-input v-model="listQuery.userName" style="width: 200px" :placeholder="$t('userManager.userName')" @keyup.native.enter="handleFilter" />
          </el-form-item>
          <!--组织机构搜索-->
          <el-form-item label="组织机构：">
            <el-input v-model="listQuery.Organization" style="width: 200px" :placeholder="$t('userManager.Organization')" @keyup.native.enter="handleFilter" />
          </el-form-item>
          <!--员工号搜索-->
          <el-form-item label="员工搜索：">
            <el-input v-model="listQuery.employeeNumber" style="width: 180px" :placeholder="$t('userManager.employeeNumber')" @keyup.native.enter="handleFilter" />
          </el-form-item>
          <!--电话搜索-->
          <el-form-item label="电话搜索：">
            <el-input v-model="listQuery.phone" style="width: 200px" :placeholder="$t('userManager.phone')" @keyup.native.enter="handleFilter" />
          </el-form-item>
          <!--职位搜索-->
          <el-form-item label="职位搜索：">
            <el-select v-model="listQuery.position" :placeholder="$t('userManager.position')" clearable style="width: 80px" @change="handleFilter">
              <el-option v-for="item in positionType" :key="item.id" :label="item.positionName" :value="item.positionName" />
            </el-select>
          </el-form-item>
          <!--时间搜索-->
          <el-form-item label="时间搜索：">
            <el-date-picker
              v-model="listQuery.timeValue"
              :picker-options="pickerOptions"
              type="datetimerange"
              start-placeholder="开始日期"
              range-separator="至"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <!--ID排序检索-->
          <el-form-item label="排序检索：">
            <el-select v-model="listQuery.sort" style="width: 100px" @change="handleFilter">
              <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-form>

        <!--姓名检索输入框-->
        <!--<el-input v-model="listQuery.title" :placeholder="$t('userManager.userName')" style="width: 200px;" class="filter-item" @keyup.native.enter="handleFilter" />-->
        <!--职位类别检索区-->
        <!--<el-select v-model="listQuery.type" :placeholder="$t('userManager.position')" clearable class="filter-item" style="width: 130px" @change="getList">-->
        <!--<el-option v-for="item in positionType" :key="item.id" :label="item.positionName" :value="item.positionName" />-->
        <!--</el-select>-->
        <!--ID排序检索-->
        <!--<el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="getList">-->
        <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />-->
        <!--</el-select>-->
        <!--搜索按钮-->
        <!--<el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">-->
        <!--{{ $t('table.search') }}-->
        <!--</el-button>-->
        <!--添加按钮-->
        <!--<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">-->
        <!--{{ $t('table.add') }}-->
        <!--</el-button>-->
        <!--导出按钮-->
        <!--<el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">-->
        <!--{{ $t('table.export') }}-->
        <!--</el-button>-->
        <!--审核人-->
        <!--<el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">-->
        <!--{{ $t('table.reviewer') }}-->
        <!--</el-checkbox>-->
      </div>
    </el-card>

    <!--数据列表区域（添加，导出）-->
    <el-card class="operate-container" shadow="hover">
      <!--标题-->
      <i class="el-icon-tickets" />
      <span>数据列表</span>
      <!--添加按钮-->
      <el-button
        class="filter-item"
        icon="el-icon-edit"
        style="float: right"
        type="primary"
        size="mini"
        @click="handleCreate()"
      >
        添加
      </el-button>
      <!--导出按钮-->
      <el-button
        class="filter-item"
        icon="el-icon-download"
        style="float: right;margin-right: 15px"
        size="mini"
        @click="handleDownload"
      >
        导出
      </el-button>
    </el-card>

    <div class="table-container">
      <!--表格区域,@selection-change:勾选，全选按钮变化时执行-->
      <el-table
        :data="tableData"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        text-align:
        center
        @selection-change="handleSelectionChange"
        @row-click="handleClick"
      >
        <!--勾选，全选按钮-->
        <el-table-column type="selection" width="60" align="center" />
        <!--1.id:序号-->
        <el-table-column :label="$t('userManager.id')" prop="id" sortable align="center" width="80" />
        <!--2.account:用户名-->
        <el-table-column :label="$t('userManager.account')" prop="account" width="90px" align="center" />
        <!--3.userName:姓名-->
        <el-table-column :label="$t('userManager.userName')" prop="userName" align="center" min-width="90px">
          <template slot-scope="scope">
            <span class="link-type" @click.stop="handleUpdate(scope.row)">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <!--4.Organization:组织机构-->
        <el-table-column :label="$t('userManager.Organization')" prop="Organization" width="180px" align="center" />
        <!--5.position:职位-->
        <el-table-column :label="$t('userManager.position')" prop="position.positionName" width="90px" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.position.positionName | typeFilter">{{ scope.row.position.positionName }}</el-tag>
          </template>
        </el-table-column>
        <!--6.employeeNumber:员工号-->
        <el-table-column :label="$t('userManager.employeeNumber')" prop="employeeNumber" class-name="status-col" width="80" />
        <!--7.phone:电话-->
        <el-table-column :label="$t('userManager.phone')" prop="phone" align="center" width="120px" />
        <!--8.lastLoginTime:最后登录时间-->
        <el-table-column :label="$t('userManager.lastLoginTime')" prop="lastLoginTime" sortable align="center" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.lastLoginTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <!--9.operate:操作-->
        <el-table-column :label="$t('userManager.operate')" prop="operate" align="center" width="155" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <!--查看详情-->
            <!--<el-button size="mini" type="success" @click="handleClick(scope.row)">-->
            <!--{{ $t('userManager.itemDetail') }}-->
            <!--</el-button>-->
            <!--编辑-->
            <el-button type="primary" size="mini" @click.stop="handleUpdate(scope.row)">
              {{ $t('table.edit') }}
            </el-button>
            <!--删除-->
            <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click.stop="handleModifyStatus(scope.row)">
              {{ $t('table.delete') }}
            </el-button>
            <!--草稿-->
            <!--<el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">-->
            <!--{{ $t('table.draft') }}-->
            <!--</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--批量操作区域（底部左侧）-->
    <div class="batch-operate-container">
      <el-select
        v-model="operateType"
        size="small"
        placeholder="批量操作"
      >
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        style="margin-left: 20px"
        type="primary"
        size="small"
        @click="handleBatchOperate()"
      >
        确定
      </el-button>
    </div>

    <!--分页组件-->
    <div class="pagination-container">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>

    <!--编辑、新增对话框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <!--对话框中的表单-->
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="110px" style="width: 400px; margin-left:80px;">
        <!--用户名-->
        <el-form-item :label="$t('userManager.account')" prop="account">
          <el-input v-model="temp.account" />
        </el-form-item>
        <!--姓名-->
        <el-form-item :label="$t('userManager.userName')" prop="userName">
          <el-input v-model="temp.userName" />
        </el-form-item>
        <!--组织机构-->
        <el-form-item :label="$t('userManager.Organization')" prop="Organization">
          <el-input v-model="temp.Organization" />
        </el-form-item>
        <!--职位-->
        <el-form-item :label="$t('userManager.position')" prop="position.positionName">
          <el-select v-model="temp.position.positionName" class="filter-item" placeholder="请选择职位">
            <el-option v-for="item in positionType" :key="item.id" :label="item.positionName" :value="item.positionName" />
          </el-select>
        </el-form-item>
        <!--员工号-->
        <el-form-item :label="$t('userManager.employeeNumber')" prop="employeeNumber">
          <el-input v-model="temp.employeeNumber" />
        </el-form-item>
        <!--电话-->
        <el-form-item :label="$t('userManager.phone')" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <!--最后登录时间-->
        <el-form-item :label="$t('userManager.lastLoginTime')" prop="lastLoginTime">
          <el-date-picker v-model="temp.lastLoginTime" type="datetime" placeholder="请选择日期和时间" />
        </el-form-item>
        <!--重要性-->
        <!--<el-form-item :label="$t('table.importance')">-->
        <!--<el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />-->
        <!--</el-form-item>-->
        <!--点评-->
        <!--<el-form-item :label="$t('table.remark')">-->
        <!--<el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />-->
        <!--</el-form-item>-->
      </el-form>

      <!--对话框的底部-->
      <div slot="footer" class="dialog-footer">
        <!--取消按钮-->
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <!--确定按钮-->
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
/* eslint-disable */
  // eslint-disable-next-line
  import {fetchUserList, updateArticle, createArticle} from '@/api/userManager'   //引入获取用户列表等函数
  import { parseTime } from '@/utils'  //引入设置时间格式的工具
  import Pagination from '@/components/Pagination'  //分页子组件
  //不变化的业务字典数据，可以定义为全局变量
  const positionType=[  //职位类别（对象数组）
    {id:1,positionName:'组长'},
    {id:2,positionName:'主办'},
    {id:3,positionName:'助理'},
  ]
  //默认搜索内容对象
  const defaultListQuery = {
    page: 1,  //当前页码
    limit: 20,  //每页条数
    userName: null,    //查询的用户姓名
    position: null,    //查询的职位类别
    sort: '+id',  //排序方式 正序+id，倒序-id
    account: null,  //用户名
    Organization: null,  //组织机构
    employeeNumber: null,  //员工号
    phone:null,  //电话
    timeValue: '',  //选取的时间（时间搜索）
  };
  //批量操作的选择项
  const operates = [
    {
      label: "删除",
      value: "deleteAll"
    },
    {
      label: "设置职位为组长",
      value: "set1"
    },
    {
      label: "设置职位为主办",
      value: "set2"
    },
    {
      label: "设置职位为助理",
      value: "set3"
    },
  ]

  export default {
    data() {
      return {
        //从后台获取的总数据
        tableData:[],
        //前台每页要呈现的数据
//        pageData:[],  //分页后，每个页面要显示的数据
        positionType,  //职位类别
        operates,  //批量操作的选项
        multipleSelection: [],  //勾选，全选的表格项
//        list: null,
        total:0,   //用户列表条数的总数
        listQuery: {  //查询项
          page: 1,  //当前页码
          limit: 20,  //每页条数
          userName: undefined,    //查询的用户姓名
          position: undefined,    //查询的职位类别
          sort: '+id',  //排序方式 正序+id，倒序-id
          account:undefined,  //用户名
          Organization:undefined,  //组织机构
          employeeNumber:undefined,  //员工号
          phone:undefined,  //电话
          timeValue: '',  //选取的时间（时间搜索）
        },
        dialogFormVisible: false,  //编辑对话框是否显示
        dialogStatus: '',  //设置对话框的标题时使用
        temp: {   //编辑或新增时，临时存放数据的对象temp
          position:{id:'',positionName:''},  //职位(一个含有id,positionName的对象)
          lastLoginTime: new Date(), //最后登录时间
          account: '',  //用户名
          userName: '', //姓名
          Organization: '', //组织机构
          employeeNumber: '', //员工号
          phone: '', //电话
          id: undefined,  //序号
        },
        textMap: {  //对话框的标题
          update: '编辑',
          create: '新增'
        },
        rules: {  //编辑对话框中的表单中使用的rules
          //表单验证，必填的项目
          lastLoginTime: [{ type: 'date', required: true, message: '请选择日期和时间', trigger: 'change' }],
          account: [{ required: true, message: '请输入用户名', trigger: 'change' }],
          userName: [{ required: true, message: '请输入姓名', trigger: 'change' }],
          Organization: [{ required: true, message: '请输入组织机构', trigger: 'blur' }],
          employeeNumber: [{ required: true, message: '请输入员工号', trigger: 'change' }],
          phone: [{ required: true, message: '请输入电话', trigger: 'change' }],
        },
        sortOptions: [   //排序选项（对象数组）
          { label: '正向排序', key: '+id' },
          { label: '逆向排序', key: '-id' }
        ],
        downloadLoading: false,  //是否导出（默认否）
        operateType: null,  //批量操作选取的操作类别
        pickerOptions: {  //快速选择时间选项
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近十年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3650);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    components: { Pagination },//注册分页组件
    filters:{  //过滤器
      //对职位数据过滤，生成不同的标签
      typeFilter(position){  //用户职位过滤器,根据职位字符串，改变tag种类
        return position == '组长' ? 'danger' : (position == '主办' ? 'warning' : 'success')
      }
    },
    created() {  //创建完Vue组件页面后
      this.getList()
    },
//    mounted(){
//      //首次挂载用户列表组件获取的用户数据
//      fetchUserList({}).then(response=>{
//        console.log(response);
//        this.tableData=response.data.items;  //获取总的用户数据列表
//        this.total=response.data.total;   //获取用户列表总数
//        //获取第一页
//        this.getList();
//      })
//    },
    methods:{
      getList() {
        //从后端获取用户数据
//        this.listLoading = true
        fetchUserList(this.listQuery).then(response => {
          this.tableData = response.data.items  //获取总的用户数据列表
          this.total = response.data.total  //获取用户列表总数

          // 模拟后端响应的延时
//          setTimeout(() => {
//            this.listLoading = false
//          }, 1.5 * 1000)
        })
      },
//      //点击页码，改变每页数时执行,以及点击搜索按钮时,和删除一条数据后执行
//      getList(){   //更新当前页面显示的新闻数据方法（查询，点击分页等时执行）
//        //获取每一页要获取的数据
//        let {page,limit,title,sort,type}=this.listQuery; //查询条件
//
//        //过滤查询结果集(先过滤，再分页)
//        // filter:循环所有的数据，return1，保留，return0，去除
//        let filterData=this.tableData.filter(item=>{
//          //item.title.indexOf(title)等于-1说明不包含title
//          if(title && item.userName.indexOf(title)<0) return false; //筛选姓名
//          if(type && item.position.positionName!=type) return false;  //筛选职位
//          return true;
//        })
//
//        //排序
//        if(sort=='-id')
//          filterData=filterData.reverse();
//
//        //从总数据中过滤出当前页要显示的数据集
//        this.pageData = filterData.filter((item,index)=>
//          index<page*limit && index>=(page-1)*limit)
//
////        this.total=filterData.length;//搜索后分页页码总数要变化
//      },
      handleFilter() {  //搜索按钮按下时的逻辑，要使结果显示在第一页
        this.listQuery.page=1;  //分页停留在第一页（为了显示搜索结果）
        this.getList()
      },
      resetTemp() {  //重置（清空）temp(新增数据时使用)
        this.temp = {
          id: undefined,  //序号
          account: '',  //用户名
          userName: '', //姓名
          Organization: '', //组织机构
          position: {id:1,positionName:'组长'},  //职位(一个含有id,positionName的对象,默认选择“组长”)
          employeeNumber: '', //员工号
          phone: '', //电话
          lastLoginTime: new Date(), //最后登录时间
        }
      },
      //点击添加按钮的逻辑
      handleCreate() {
        this.resetTemp()  //重置（清空）temp
        this.dialogStatus = 'create'   // 对话框状态设置为create
        this.dialogFormVisible = true   //显示对话框
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()  //移除校验结果
        })
      },
      //添加状态下，点击对话框的确定按钮时，添加数据的逻辑
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id (随机生成一个id序号)
//            this.temp.author = 'vue-element-admin'
            createArticle(this.temp).then(() => {
              this.tableData.unshift(this.temp)  //将temp中的数据添加至tableData中
              this.dialogFormVisible = false  //对话框消失
//              this.getList();  //新增完成后更新页面显示
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
      //点击编辑按钮时的逻辑
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // 复制要编辑的这一行,成为temp对象
        this.temp.lastLoginTime = new Date(this.temp.lastLoginTime);  //获取表格中的时间
        this.dialogStatus = 'update';   //使对话框标题为textMap[update],即“编辑”
        this.dialogFormVisible = true;  //显示编辑的对话框
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate() //移除校验结果
        })
      },
      //编辑或新增对话框中点击确定按钮时的逻辑
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp);
            tempData.lastLoginTime = +new Date(tempData.lastLoginTime) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateArticle(tempData).then(() => {
              for (const v of this.tableData) {
                if (v.id === this.temp.id) {
                  const index = this.tableData.indexOf(v)
                  this.tableData.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false; //对话框消失
//              this.getList();  //编辑完成后更新页面显示
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
      //删除按钮的逻辑
      handleModifyStatus(row){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let index=-1;
          this.tableData.forEach((user,idx)=>{
            if(user.id==row.id)
              index=idx  //通过判断id字段，获取要删除数据的索引值
          })
          this.tableData.splice(index,1);   //删除要删除的数据
//          this.getList();  //删除完成后更新页面显示
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //查看按钮的逻辑
      handleClick(row){
        //以传递参数id的方式打开用户详情页面
//        this.$router.push('userDetail/'+row.id);
        //以路由名称name和传递参数params的方式打开用户详情页面
        this.$router.push({name:'userDetail',params:
          {
            id: row.id,  //序号
            account: row.account,  //用户名
            userName: row.userName, //姓名
            Organization: row.Organization, //组织机构
            position: row.position.positionName,  //职位(一个含有{id,positionName}的对象)
            employeeNumber: row.employeeNumber, //员工号
            phone: row.phone, //电话
            lastLoginTime: row.lastLoginTime, //最后登录时间
          }
        })
      },
      //筛选区域重置按钮的逻辑
      handleResetSearch() {
//        this.selectProductCateValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
        this.handleFilter();  //清空搜索条件后，马上以空的搜索条件搜索
      },
      //导出按钮的逻辑
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['序号', '用户名', '姓名', '组织机构', '职位', '员工号', '电话', '最后登录时间',]
          const filterVal = ['id', 'account', 'userName', 'Organization', 'position', 'employeeNumber', 'phone', 'lastLoginTime',]
          const data = this.formatJson(filterVal, this.tableData)

          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '联通之家用户列表'
          })
          this.downloadLoading = false
        })
      },
      //导出时的时间及职位的数据转换
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'position'){
            return v[j].positionName
          } else if(j === 'lastLoginTime'){
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      //勾选，全选按钮变化时执行的逻辑
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //批量操作中点击确定按钮的逻辑
      handleBatchOperate() {
        if(this.operateType==null){
          this.$message({
            message: '请选择操作类型',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要操作的商品',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.$confirm('是否要进行该批量操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            ids.push(this.multipleSelection[i].id);
          }
          switch (this.operateType) {
            case this.operates[0].value:
              this.batchDelete(ids);  //批量删除
              break;
            case this.operates[1].value:
              this.batchSetfirst(ids);  //批量设置组长
              break;
            case this.operates[2].value:
              this.batchSetsecond(ids);  //批量设置主办
              break;
            case this.operates[3].value:
              this.batchSetthird(ids);  //批量设置助理
              break;
            default:
              break;
          }
//          this.getList();  //操作后刷新表格内容
        });
      },
      //批量删除方法
      batchDelete(ids){
//        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消',
//          type: 'warning'
//        }).then(() => {

        //ids:数组（所选表格项的id值数组）
        for (let i=0;i<ids.length;i++){  //循环所选中的表格项
          this.tableData.forEach((user,idx)=>{  //循环此页码面的表格数据
            if(user.id==ids[i]){   //若表格数据id与选中的id一致
              this.tableData.splice(idx,1);   //删除要删除的数据
            }
          })
        }
//          this.getList();  //删除完成后更新页面显示
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

//        }).catch(() => {
//          this.$message({
//            type: 'info',
//            message: '已取消删除'
//          });
//        });
      },
      //批量设置组长
      batchSetfirst(ids) {
        //ids:数组（所选表格项的id值数组）
        for (let i=0;i<ids.length;i++){  //循环所选中的表格项
          this.tableData.forEach((user,idx)=>{  //循环此页码面的表格数据
            if(user.id==ids[i]){   //若表格数据id与选中的id一致
              this.tableData[idx].position={id:1,positionName:'组长'}
            }
          })
        }
//          this.getList();  //删除完成后更新页面显示
        this.$message({
          type: 'success',
          message: '设置职位为组长成功!'
        });
      },
      //批量设置主办
      batchSetsecond(ids) {
        //ids:数组（所选表格项的id值数组）
        for (let i=0;i<ids.length;i++){  //循环所选中的表格项
          this.tableData.forEach((user,idx)=>{  //循环此页码面的表格数据
            if(user.id==ids[i]){   //若表格数据id与选中的id一致
              this.tableData[idx].position={id:2,positionName:'主办'}
            }
          })
        }
//          this.getList();  //删除完成后更新页面显示
        this.$message({
          type: 'success',
          message: '设置职位为主办成功!'
        });
      },
      //批量设置助理
      batchSetthird(ids) {
        //ids:数组（所选表格项的id值数组）
        for (let i=0;i<ids.length;i++){  //循环所选中的表格项
          this.tableData.forEach((user,idx)=>{  //循环此页码面的表格数据
            if(user.id==ids[i]){   //若表格数据id与选中的id一致
              this.tableData[idx].position={id:3,positionName:'助理'}
            }
          })
        }
//          this.getList();  //删除完成后更新页面显示
        this.$message({
          type: 'success',
          message: '设置职位为助理成功!'
        });
      },

    }
  }
</script>

<style>
  .filter-container {
    margin-bottom: 10px;
  }
  .operate-container {
    margin-bottom: 10px;
  }
  .batch-operate-container {
    display: inline-block;
    margin-top: 20px;
  }
  .pagination-container {
    display: inline-block;
    float: right;
    margin-top: -5px;
  }
</style>
