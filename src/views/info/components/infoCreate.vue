<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <el-button v-loading="loading" class="publishBtn" style="margin-left: 10px;" type="success" @click="submitForm">
        发布
      </el-button>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <!--类别-->
                  <el-form-item label="类型" prop="infoType">
                    <el-select v-model="postForm.infoType" value-key="id">
                      <el-option v-for="item in infoType" :key="item.id" :label="item.typeName" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label-width="120px" label="发布时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.date" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择发布时间" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <!--正文编辑框-->
        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>
        <!--图片选择器-->
        <el-form-item prop="imgUrl" style="margin-bottom: 30px;">
          <Upload v-model="postForm.imgUrl" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput' // 标题输入框
import { createInfo } from '@/api/info'

const defaultForm = {
  title: '', // 文章题目
  infoType: { id: -1, typeName: '' }, // 文章类别
  content: '', // 文章内容
  imgUrl: '', // 文章图片
  date: undefined, // 前台展示时间
  id: undefined,
  read: 0,
  like: 0,
  favorite: 0
}

// 不变化的业务字典数据，可以定义为全局常量
const infoType = [
  { id: 1, typeName: '中标信息' }, { id: 2, typeName: '行业热点' }, { id: 3, typeName: '公司政策' }
]

export default {
  name: 'InfoCreate',
  components: { Tinymce, MDinput, Upload },
  data() {
    // 校验方法
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateType = (rule, value, callback) => {
      if (value.id === -1) {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      tableData: this.$route.params.tableData,
      infoType,
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        infoType: [{ validator: validateType }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      }
    }
  },
  methods: {
    test() {
      alert(this.postForm.content)
    },
    submitForm() {
      this.postForm.id = this.tableData[this.tableData.length - 1].id + 1
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.postForm)
          console.log(tempData)
          createInfo(tempData).then(() => {
            this.loading = true

            this.$notify({
              title: '成功',
              message: '发布文章成功',
              type: 'success',
              duration: 2000
            })
            this.loading = false
            this.$router.push({ name: 'info' })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .createPost-container {
    position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

  .postInfo-container {
    position: relative;
  @include clearfix;
    margin-bottom: 10px;

  .postInfo-container-item {
    float: left;
  }
  }
  }
  }

  .publishBtn{
    float: right;
    margin-top: 10px;
    margin-right: 50px;
  }
</style>
