<template>
  <div class="app-container">
    <el-card style="width: 100%; height: 100%">
      <el-steps :active="active" finish-status="success" process-status="wait" align-center>
        <el-step title="活动设置" />
        <el-step title="活动内容" />
        <el-step title="备注信息" />
      </el-steps>

      <el-row v-if="active==1" type="flex" justify="center" style="margin-top: 40px">
        <el-col :span="12">
          <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px">
            <el-form-item label="活动时间" required>
              <el-col :span="11">
                <el-form-item prop="startTime">
                  <el-date-picker v-model="temp.startTime" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col style="text-align: center" :span="2">至</el-col>
              <el-col :span="11">
                <el-form-item prop="endTime">
                  <el-date-picker v-model="temp.endTime" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" style="width: 100%" />
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="人数" prop="people">
              <el-input key="people" v-model.number="temp.people" />
            </el-form-item>

            <el-form-item label="活动奖品" prop="prize">
              <el-input key="prize" v-model="temp.prize" />
            </el-form-item>

            <el-form-item label="活动地址" prop="address">
              <el-input key="address" v-model="temp.address" />
              <!--<v-distpicker province="福建省" city="福州市" area="长乐市" @selected='selected'></v-distpicker>-->
            </el-form-item>

            <el-form-item style="text-align: center">

              <el-button style="margin-top: 12px;" @click="next">下一步</el-button>

            </el-form-item>

          </el-form>
        </el-col>
      </el-row>

      <el-row v-if="active==2" type="flex" justify="center" style="margin-top: 40px">
        <el-col :span="12">
          <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px">

            <el-form-item />

            <el-form-item label="活动名称" prop="title">
              <el-input key="title" v-model="temp.title" placeholder="请输入活动名称" />
            </el-form-item>

            <el-form-item label="活动内容" prop="content">
              <el-input key="content" v-model="temp.content" rows="8" type="textarea" placeholder="请输入活动内容" />
            </el-form-item>

            <el-form-item style="text-align: center">
              <el-row>
                <el-col :span="12">
                  <el-button @click="last">上一步</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button @click="next">下一步</el-button>
                </el-col>
              </el-row>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>

      <el-row v-if="active==3" type="flex" justify="center" style="margin-top: 40px">
        <el-col :span="12">
          <el-form v-if="active==3" ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px">

            <el-form-item label="活动ID" prop="uid">
              <el-input key="uid" v-model="temp.uid" />
            </el-form-item>

            <el-form-item label="组织方" prop="master">
              <el-input key="master" v-model="temp.master" />
            </el-form-item>

            <el-form-item label="活动备注" prop="message">
              <el-input key="message" v-model="temp.message" rows="3" type="textarea" />
            </el-form-item>

            <el-form-item label="其他" prop="other">
              <el-input key="other" v-model="temp.other" rows="4" type="textarea" />
            </el-form-item>

            <el-form-item style="text-align: center">
              <el-row>
                <el-col :span="12">
                  <el-button @click="last">上一步</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button v-if="active==3" @click="finish">完成</el-button>
                </el-col>
              </el-row>
            </el-form-item>

            <!--<el-form-item label="活动名称" prop="title">-->
            <!--<el-input v-model="temp.title" />-->
            <!--</el-form-item>-->

            <!--<el-form-item label="活动内容" prop="content">-->
            <!--<el-input v-model="temp.content" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入内容" />-->
            <!--</el-form-item>-->
          </el-form>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>
<script>
import ElRow from 'element-ui/packages/row/src/row'
import { createActivity } from '@/api/activity'
export default {
  components: { ElRow },
  data() {
    return {
      active: 1,
      rules: {
        title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }, { min: 3, message: '长度需大于 3 字符', trigger: 'blur' }],
        content: [{ required: true, message: '请输入活动内容' }],
        startTime: [{ required: true, message: '请输入活动开始时间', trigger: 'change' }],
        endTime: [{ required: true, message: '请输入活动结束时间', trigger: 'change' }],
        people: [{ required: true, message: '请输入活动人数' }, { type: 'number', message: '年龄必须为数字值' }],
        prize: [{ required: true, message: '请输入活动奖品' }],
        address: [{ required: true, message: '请输入活动地址' }]
      },
      temp: {
        id: undefined,
        content: '',
        startTime: '',
        endTime: '',
        title: '',
        people: undefined,
        prize: '',
        address: '',
        other: '',
        message: '',
        master: '',
        uid: undefined,
        type: 'do'
      }
    }
  },
  methods: {
    next() {
      if (new Date(this.temp.startTime) > new Date(this.temp.endTime)) {
        this.$message.error('错了哦，活动结束时间不能比活动开始时间小')
        return
      } else if (new Date(this.temp.startTime) < new Date()) {
        this.$message.error('活动开始时间输入错误')
        return
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.active++
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }
      })
    },
    last() {
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      --this.active
      if (this.active <= 0) { this.active = 1 }
      console.log(this.temp.address)
    },
    finish() {
      this.temp.id = parseInt(Math.random() * 100) + 1024
      console.log(this.temp)
      //            createActivity(this.temp).then(() => {
      //              this.$notify({
      //                title: '成功',
      //                message: '创建成功',
      //                type: 'success',
      //                duration: 2000
      //              })
      //            })
      // this.temp.startTime.Format("yyyy-MM-dd hh:mm")
      createActivity(this.temp).then(() => {
        this.$router.push({
          path: '/activity/activityList',
          query: this.temp
        })
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
<style>
</style>
