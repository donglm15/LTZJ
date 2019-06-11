<template>
  <!--用户信息详情-->
  <div class="info_container">

    <!--一行-->
    <el-row :gutter="12" style="margin-bottom: 20px;">
      <!--卡片布局-->
      <el-card shadow="always" style="padding-bottom: 20px;">
        <!--卡片布局头部信息-->
        <div slot="header" class="clearfix">
          <el-button type="text" style="float: left; padding: 3px 0" icon="el-icon-arrow-left" @click="goBack">返回</el-button>
          <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
        </div>
        <!--左侧头像区域-->
        <el-col :span="9">
          <img src="../../../assets/img/profile.jpg" class="image">
          <div style="padding: 10px;">
            <h2 class="userName">{{ this.$route.params.userName }}</h2>
            <div class="bottom">
              <el-button type="success" size="mini">上传<i class="el-icon-upload el-icon--right" /></el-button>
            </div>
          </div>
        </el-col>
        <!--右侧详情区域-->
        <el-col :span="15">
          <div class="text item">
            <p><strong>姓名：</strong>&nbsp;&nbsp;{{ this.$route.params.userName }}</p>
            <p><strong>用户名：</strong>&nbsp;&nbsp;{{ this.$route.params.account }}</p>
            <p><strong>组织机构：</strong>&nbsp;&nbsp;{{ this.$route.params.Organization }}</p>
            <p><strong>职位：</strong>&nbsp;&nbsp;{{ this.$route.params.position }}</p>
            <p><strong>员工号：</strong>&nbsp;&nbsp;{{ this.$route.params.employeeNumber }}</p>
            <p><strong>绑定手机：</strong>&nbsp;&nbsp;{{ this.$route.params.phone }}</p>
            <p><strong>最后登录时间：</strong>&nbsp;&nbsp;{{ this.$route.params.lastLoginTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</p>
          </div>
        </el-col>
      </el-card>
    </el-row>

    <!--员工简介-->
    <el-row :gutter="12" style="margin-bottom: 20px;">
      <el-card shadow="always">
        <!--卡片布局头部信息-->
        <div slot="header" class="clearfix">
          <svg-icon icon-class="people" />
          <span>员工简介</span>
          <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
        </div>
        <p>暂无数据，待添加</p>
      </el-card>
    </el-row>

    <!--业务专长-->
    <el-row :gutter="12" style="margin-bottom: 20px;">
      <el-card shadow="always">
        <!--卡片布局头部信息-->
        <div slot="header" class="clearfix">
          <i class="el-icon-goods" />
          <span>业务专长</span>
          <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
        </div>
        <p>暂无数据，待添加</p>
      </el-card>
    </el-row>

    <!--参加活动-->
    <el-row :gutter="12" style="margin-bottom: 20px;">
      <el-card shadow="always">
        <!--卡片布局头部信息-->
        <div slot="header" class="clearfix">
          <i class="el-icon-share" />
          <span>参加活动</span>
          <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
        </div>
        <p>暂无数据，待添加</p>
      </el-card>
    </el-row>

  </div>
</template>

<script>

export default {
  data() {
    return {
      msg: '用户详情'
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1) // 返回上一个页面
    }
  }
}
</script>

<style>
  .info_container{
    padding: 10px;
    margin: 0 10px;
    overflow: auto;
  }
  .image {
    width:120px;
    height:120px;
    margin: 0 auto;
    border-radius: 50%;
    display: block;
  }
  .bottom {
    text-align: center;
    margin-top: 13px;
    line-height: 12px;
  }
  .userName {
    text-align: center;
  }
</style>
