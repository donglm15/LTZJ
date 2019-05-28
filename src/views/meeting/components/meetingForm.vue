<template>
  <div class="app-container">
    <div class="filter-container">

      <el-form ref="formName" :model="form" class="demo-form-inline">

        <el-card class="operate-container" shadow="never" style="margin-bottom: 20px;">
          <i class="el-icon-tickets" style="margin-top: 5px" />
          <span style="margin-top: 5px">新建信息</span>
          <!--<el-row type="flex" justify="end" style="margin-bottom:10px;">-->

          <el-button size="mini" style="float: right" @click="resetForm('formName')">重置</el-button>

          <el-button size="mini" type="primary" style="float: right;margin-right: 10px" @click="backForm('formName')">返回</el-button>
          <el-button size="mini" type="primary" style="float: right;" @click="createData">保存</el-button>

          <!--</el-row>-->
        </el-card>

        <div style="margin-bottom:15px;">
          <el-card>
            <fieldset class="accessory">
              <legend class="border">基本信息</legend>
              <table class="view-table">
                <tbody>
                  <tr>
                    <td>
                      <!--会议通知ID-->

                      <el-form-item :label="$t('Announcement.meetingID')" style="margin-bottom: 0;">
                        <span class="c-red">*</span>
                      <!--<el-input  readonly="true" v-model="form.meetingID" placeholder="保存时自动生成"></el-input>-->
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item label="" required prop="meetingID" style="margin-bottom: 0;color: #333;">
                        <el-input v-model="form.meetingID" required placeholder="保存时自动生成" />
                      </el-form-item>
                    </td>
                    <td>
                      <!--会议类型-->
                      <el-form-item :label="$t('Announcement.meetingType')" style="margin-bottom: 0;" />
                    </td>
                    <td>
                      <el-form-item label="" prop="meetingType" style="margin-bottom: 0;">
                        <!--<el-select v-model="form.meetingType" value-key="id" placeholder="请选择" style="width: 100%;">-->
                        <!--<el-option v-for="idx in meetingType" :key="idx.id" :label="idx.typeName" :value="idx" />-->
                        <!--</el-select>-->
                        <el-input v-model="form.meetingType" placeholder="保存时自动生成" />
                      </el-form-item>
                    </td>
                    <td>
                      <!--会议地点-->
                      <el-form-item :label="$t('Announcement.meetingPosition')" style="margin-bottom: 0;">
                        <span class="c-red">*</span>
                      </el-form-item>
                    </td>
                    <td>
                      <!--<el-form-item label="" prop="meetingPosition" required style="margin-bottom: 0;">-->
                      <!--<el-select v-model="form.meetingPosition" value-key="id" placeholder="请选择" style="width: 100%;">-->
                      <!--<el-option v-for="p in meetingPosition" :key="p.id" :label="p.positionName" :value="p" />-->
                      <!--</el-select>-->
                      <!--</el-form-item>-->
                      <el-form-item label="" prop="meetingPosition" required style="margin-bottom: 0;">
                        <el-select v-model="form.meetingPosition" placeholder="请选择" style="width: 100%;">
                          <el-option v-for="(p,index) in meetingPosition" :key="index" :label="p" :value="p" />
                        </el-select>
                      </el-form-item>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <!--召集人-->
                      <!--<span class="c-red" >*</span>-->
                      <el-form-item :label="$t('Announcement.user')" style="margin-bottom: 0;" />
                    </td>
                    <td>
                      <el-form-item label="" prop="user" style="margin-bottom: 0;">
                        <el-input v-model="form.user" placeholder="请输入" />
                      </el-form-item>
                    </td>
                    <td>
                      <!--招开部门-->
                      <!--<span class="c-red" >*</span>-->
                      <el-form-item :label="$t('Announcement.department')" style="margin-bottom: 0;">
                        <span class="c-red">*</span>
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item label="" prop="department" required style="margin-bottom: 0;">
                        <el-input v-model="form.department" placeholder="请输入" />
                      </el-form-item>
                    </td>
                    <td>
                      <!--会议状态-->
                      <!--<span class="c-red" style="visibility: hidden;">*</span>-->
                      <el-form-item :label="$t('Announcement.meetingStatus')" style="margin-bottom: 0;">
                        <span class="c-red">*</span>
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item label="" prop="announcementMeetingStatus.id" required style="margin-bottom: 0;">
                        <el-select v-model="form.announcementMeetingStatus.id" value-key="id" placeholder="请选择" style="width: 100%;">
                          <el-option v-for="s in announcementMeetingStatus" :key="s.id" :label="s.statusName" :value="s.id" />
                        </el-select>
                      </el-form-item>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <!--参会人员-->
                      <!--<span class="c-red" >*</span>-->
                      <el-form-item :label="$t('Announcement.meetingPeople')" style="margin-bottom: 0;">
                        <!--<span class="c-red">*</span>-->
                      </el-form-item>
                    </td>
                    <td colspan="5">
                      <el-form-item label="" prop="meetingPeople" style="margin-bottom: 0;">
                        <el-input v-model="form.meetingPeople" type="textarea" />
                      </el-form-item>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <!--开始时间-->
                      <!--<span class="c-red" >*</span>-->
                      <el-form-item label="开会时间" style="margin-bottom: 0;">
                        <span class="c-red">*</span>
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item prop="meetingDate" label="" required style="margin-bottom: 0;">
                        <el-date-picker v-model="form.meetingDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入" style="width: 100%;" />
                      </el-form-item>
                    </td>
                    <td>
                      <!--时长(小时)-->
                      <el-form-item :label="$t('Announcement.dateLong')" style="margin-bottom: 0;">
                      <!--<span class="c-red" >*</span>-->
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item label="" prop="dateLong" style="margin-bottom: 0;">
                        <el-input v-model="form.dateLong" placeholder="请输入" />
                      </el-form-item>
                    </td>
                    <td>
                      <!--主讲人-->
                      <el-form-item :label="$t('Announcement.Presenter')" style="margin-bottom: 0;" />
                    </td>
                    <td>
                      <el-form-item label="" prop="Presenter" style="margin-bottom: 0;">
                        <el-input v-model="form.Presenter" placeholder="请输入" />
                      </el-form-item>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <!--会议主题-->
                      <!--<span class="c-red" >*</span>-->
                      <el-form-item :label="$t('Announcement.meetingTheme')" style="margin-bottom: 0;">
                        <span class="c-red">*</span>
                      </el-form-item>
                    </td>
                    <td colspan="5">
                      <el-form-item label="" prop="meetingTheme" required style="margin-bottom: 0;">
                        <el-input v-model="form.meetingTheme" placeholder="请输入" />
                      </el-form-item>
                    </td>

                  </tr>

                  <tr>
                    <td>
                      <!--资料准备-->
                      <el-form-item :label="$t('Announcement.Data')" style="margin-bottom: 0;" />
                    </td>
                    <td colspan="5">
                      <el-form-item label="" prop="Data" style="margin-bottom: 0;">
                        <el-input v-model="form.Data" type="textarea" />
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <!--会议内容-->
                      <!--<span class="c-red" >*</span>-->
                      <el-form-item :label="$t('Announcement.meetingContent')" style="margin-bottom: 0;" />
                    </td>
                    <td colspan="5">
                      <el-form-item label="" prop="meetingContent" style="margin-bottom: 0;">
                        <el-input v-model="form.meetingContent" type="textarea" />
                      </el-form-item>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </el-card>

        </div>
        <el-card>
          <fieldset class="accessory">
            <legend class="border">短信通知</legend>
            <table class="view-table">
              <tbody>
                <tr>
                  <td style="width: 120px;">
                    <!--是否手机短信通知-->
                    <el-form-item :label="$t('Announcement.checked')" style="margin-bottom: 0;" />
                  </td>
                  <td>
                    <el-checkbox v-model="checked" />
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td class="">
                    <!--短信内容-->
                    <!--<span class="c-red" >*</span>-->
                    <el-form-item :label="$t('Announcement.Msg')" style="margin-bottom: 0;" />
                  </td>
                  <td colspan="5">
                    <el-input v-model="form.Msg" type="textarea" />
                  </td>

                </tr>
              </tbody>
            </table>
          </fieldset>
        </el-card>

      </el-form>

    </div>
  </div>
</template>
<script>
import { createAnnouncement, meetingPlace } from '@/api/announcement'
// const meetingType = [
//  { id: 1, typeName: '工作汇报' },
//  { id: 2, typeName: '月度汇报' },
//  { id: 3, typeName: '季度汇报' },
//  { id: 4, typeName: '半年度汇报' },
//  { id: 5, typeName: '年终汇报' }
// ]
// const meetingPosition = [
//  { id: 1, positionName: '7楼会议室' },
//  { id: 2, positionName: '8楼会议室' },
//  { id: 3, positionName: '9楼会议室' },
//  { id: 4, positionName: '10楼会议室' },
//  { id: 5, positionName: '11楼会议室' },
//  { id: 6, positionName: '15楼会议室' }
// ]
const announcementMeetingStatus = [
  { id: 1, statusName: '草稿' },
  { id: 2, statusName: '已通知' },
  { id: 3, statusName: '延期' },
  { id: 4, statusName: '取消' }

]
export default {
  data() {
    return {
      //      meetingType,
      meetingPosition: undefined,
      announcementMeetingStatus,
      checked: false,
      form: {
        meetingID: '',
        meetingType: '',
        meetingPosition: undefined,
        user: '',
        department: '',
        announcementMeetingStatus: { id: 1 },
        meetingPeople: '',
        meetingDate: '',
        dateLong: '',
        meetingTheme: '',
        Presenter: '',
        Data: '',
        meetingContent: '',
        msg: ''
      }
      //        rules: {
      //          meetingPosition: [
      //            { required: true, message: '请选择会议地点', trigger: 'change' }
      //          ],
      // //          meetingDate: [
      // //            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
      // //          ],
      //          department: [
      //            { required: true, message: '请输入', trigger: 'blur' }
      //          ],
      //          meetingPeople: [
      //            { required: true, message: '请填写参会人员', trigger: 'blur' }
      //          ],
      //          meetingTheme: [
      //            { required: true, message: '请填写会议主题', trigger: 'blur' }
      //          ],
      //          meetingContent: [
      //            { required: true, message: '请填写会议内容', trigger: 'blur' }
      //          ]
      //        }
    }
  },
  created() {
    this.getPlace()
  },
  methods: {
    backForm(row) {
      this.$router.go(-1)
    },
    //        submitForm(formName) {
    //          this.$refs[formName].validate((valid) => {
    //            if (valid) {
    //              alert('submit!');
    //            } else {
    //              console.log('error submit!!');
    //              return false;
    //            }
    //          });
    //        },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 获取会议地址
    getPlace() {
      meetingPlace().then(response => {
        console.log(response.data.items)
        this.meetingPosition = response.data.items
        this.total = response.data.total
      })
    },
    //
    createData() {
      console.log(this.form.meetingDate)
      this.$refs['formName'].validate((valid) => {
        if (valid) {
          //          this.form.id = parseInt(Math.random() * 100) + 1024 // mock a id
          //              this.temp.author = 'vue-element-admin'
          console.log(this.form)
          createAnnouncement(this.form).then(() => {
            this.$router.push({
              path: '/meeting/announcement'
              //              query: this.form
            })
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
  body, th, td, button, input, select, textarea {
    font-family: "微软雅黑";
    font-size: 14px;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .el-form-item__label{
    padding-right: 3px ;
  }
  .el-form-item__error{
    z-index: 10;
  }
  .el-form-item__error{
    left: 16px;
    font-size: 11px;
    line-height: 0;

  }
  /*table {*/
  /*empty-cells: show;*/
  /*background-color: transparent;*/
  /*border-collapse: collapse;*/
  /*border-spacing: 0;*/
  /*width: 100%;*/
  /*margin: 5px auto;*/
  /*}*/

  table td {
    white-space: nowrap;

  }

  .view-table {
    width: 98%;
    border: 1px solid #ccc;
    margin: 10px auto;
    empty-cells: show;
    background-color: transparent;
    border-collapse: collapse;
    border-spacing: 0;
  }

  .view-table td:nth-child(odd) {
    background: #efefef;
  }

  .view-table td {
    border: 1px solid #ccc;
    padding: 5px;
  }
  .c-red, .c-red a, a.c-red {
    color: red;
  }
  fieldset {
    padding: .35em .625em .75em;
    /*margin: 20px;*/
    border: 1px solid #DCDFe6;
  }
  legend {
    width: auto;
    font-size: 16px;
    line-height: 20px;
    border: 0;
    padding: 0 5px;
  }
  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }
  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

</style>
