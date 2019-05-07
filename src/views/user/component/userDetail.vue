<template>
  <!--用户信息详情-->
  <div class="info_container">
    <el-button @click="goBack">返回</el-button>
    <!--个人信息栏,el-row：行布局,gutter:栅格间隔-->
    <el-row class="info_row row" :gutter="10">
      <!--列布局，span	:栅格占据的列数-->
      <el-col :span="7">
        <div class="area">
          <!--头像-->
          <div class="imgarea">
            <img src="../../../assets/img/profile.jpg">
            <!-- <el-upload
                 class="upload-demo"
                 :action="uploadaction"
                 multipl='false'
                 accept="image/*"
                 :limit="1"
                 :on-exceed="handleExceed"
                 :on-success="handSuccess"
                 :on-error="handError"
                 :before-upload="beforeAvatarUpload"
                 :file-list="fileList">
                 <el-button type="success" size="mini">上传<i class="el-icon-upload el-icon--right"></i></el-button>
             </el-upload> -->
            <!--上传头像按钮-->
            <el-button type="success" size="mini">上传<i class="el-icon-upload el-icon--right" /></el-button>
          </div>
        </div>
      </el-col>

      <el-col :span="9">
        <div class="area">
          <!--姓名等信息区-->
          <div class="namearea">
            <p>姓名：{{ this.$route.params.userName }}</p>
            <p>用户名：{{ this.$route.params.account }}</p>
            <p>组织机构：{{ this.$route.params.Organization }}</p>
            <p>职位：{{ this.$route.params.position }}</p>
            <p>员工号：{{ this.$route.params.employeeNumber }}</p>
            <p>绑定手机：{{ this.$route.params.phone }}</p>
            <p>绑定邮箱：9061446xx@qq.com</p>
            <p>最后登录时间：{{ this.$route.params.lastLoginTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</p>
            <p class="awards"><i class="el-icon-date el-icon--left" />签到有奖</p>
          </div>
        </div>
      </el-col>

      <!--可用现金-->
      <!--<el-col :span="9">-->
      <!--<div class="area">-->
      <!--<div class="moneyarea">-->
      <!--<p class="title">可用现金:</p>-->
      <!--<p class="title"><span class="money">0.00</span><span class="yuan">元</span></p>-->
      <!--</div>-->
      <!--<div class="chongzhiarea">-->
      <!--<img src=""/>-->
      <!--<p class="chongzhi">-->
      <!--<el-button type="success" size="">我要出借</el-button>-->
      <!--<el-button type="warning" size="">充值</el-button>-->
      <!--<el-button type="danger" size="">提现</el-button>-->
      <!--</p>-->
      <!--</div>-->
      <!--<div class="tipsarea">-->
      <!--<p>您的每笔交易资金，都将接受银行全程存管   <a href="http://www.baidu.com" target="_blank">了解资金存管 》</a></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-col>-->

      <!--个人数据-->
      <el-col :span="8">
        <div class="area">
          <div class="dataarea">
            <p class="gtitle"><i class="el-icon-date el-icon--left" />个人数据</p>
            <div class="gdataarea clear">
              <div class="gdata left">
                <p class="num">20</p>
                <p class="title">投资数量</p>
              </div>
              <div class="gdata left">
                <p class="num">200</p>
                <p class="title">关注的人</p>
              </div>
              <div class="gdata left">
                <p class="num">3000</p>
                <p class="title">粉丝</p>
              </div>
            </div>
            <p class="morearea">谢谢您的关注，<a href="http://www.baidu.com" target="_blank">了解我的更多个人信息 》</a></p>
          </div>
        </div>
      </el-col>
    </el-row>

    <!--员工简介-->
    <el-row class="data_row row" :gutter="10">
      <el-col :span="24">
        <div class="area">
          <p class="title"><i class="fa fa-cog" />员工简介</p>
          <!--<p class="num"><span class="symbol">￥</span>78.00</p>-->
          <!--<a class="detail dbgcolor">查看详情&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></a>-->
          <p>本人获浙江大学新闻系学士学位，后进入暨南大学企业管理专业在职研究生班。本人获浙江大学宁波理工学院新闻系学士学位，
            后进入暨南大学企业管理专业在职研究生班。2015年9月我进入到中国联通公司,光荣地
            成为中国联通的职员。进入公司以来，在公司各级领导的关心下,在同事们的帮助下我较好的完成了公司所安排的各项工作任务。
            爱我联通、做自豪的联通人。</p>
        </div>
      </el-col>
    </el-row>

    <!--分享内容-->
    <el-row class="data_row row" :gutter="10">
      <el-col :span="24">
        <div class="area">
          <p class="title"><i class="fa fa-cog" />分享内容</p>
          <!--<p class="num"><span class="symbol">￥</span>78.00</p>-->
          <!--<a class="detail dbgcolor">查看详情&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></a>-->
        </div>
      </el-col>
    </el-row>

    <!--底部广告信息栏-->
    <el-row class="ban_row row" :gutter="10">
      <el-col :span="24">
        <div class="area">
          <ul class="banarea">
            <li v-for="(item,index) in bandata" :key="index">
              <a :href="item.url" target="_blank" :style="{backgroundPosition:0 +' -'+ item.data+'px'}" />
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>

export default {
  data() {
    return {
      msg: '用户详情',
      bandata: [
        { url: 'http://www.baidu.com', data: 300 },
        { url: 'http://www.sina.com', data: 200 },
        { url: 'http://www.360.com', data: 100 },
        { url: 'http://www.weibo.com', data: 0 },
        { url: 'http://www.hao123.com', data: 100 }
      ]
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
  .title{
    text-align:center;
    width:100%;
    height:30px;
    line-height:30px;
    cursor: pointer;
    background-color: #3bc5ff;
    border:1px solid #3bc5ff;
    color: white;
    display: block;
  }
  .title .fa{
    margin-right:5px;
  }

  .row{
    margin:20px;
  }
  .info_row{}
  .area {
    border: 1px solid #dfdfdf;
    height: 400px;
    overflow: hidden;
  }
  .imgarea {
  text-align: center;
  padding: 10px;
  }
  img {
  width:120px;
  height:120px;
  border-radius: 50%;
  }

  .namearea{
  padding:10px;
  font-size:14px;
  }
  .namearea p{
  line-height:24px;
  }
</style>
