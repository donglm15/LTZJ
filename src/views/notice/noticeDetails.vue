<template>
  <div class="app-container">
    <el-button type="primary" style="position: relative; left: 10px; top:10px " @click="backNotice">返回</el-button>
    <div class="createPost-container">
      <div style="text-align: center; margin-top:25px">
        <h1>{{ this.temp.noticeTitle }}</h1>
      </div>
      <div style="text-align: center;">
        <span>时间：{{ this.temp.noticeDate }}</span>
        <span style="padding-left: 20px">发布：{{ this.temp.noticePublish }}</span>
        <span style="padding-left: 20px">点击：{{ this.temp.noticeReadNum }}</span>
      </div>
      <div style="width: 100%; height: 5px; background-color: #d4d4d4;margin: 20px 0" />
      <div style=" text-indent:35px; font-size: 20px; line-height: 28px" v-html="this.temp.noticeContent">{{ this.temp.noticeContent }}</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getOneNotice, updateNoticeOne } from '@/api/notice'
export default {
  data() {
    return {
      page: 0,
      temp: {
        noticeId: '',
        noticeDate: '',
        noticePublish: '',
        noticeTitle: '',
        noticeContent: '',
        noticeReadNum: 0,
        noticeStatus: 'draft'
      },
      showFlag: false
    }
  },
  computed: {
    ...mapState(['notice'])
  },
  mounted() {
    if (this.$route.query.id > 0) {
      this.page = this.$route.query.pageNext
      getOneNotice(this.$route.query.id).then(response => {
        response.data.noticeReadNum += 1
        updateNoticeOne(response.data).then(response => {
          console.log('更新点击量')
        })
        this.temp = response.data
      })
      this.showFlag = true
    } else {
      this.pushTemp()
    }
  },

  methods: {
    backNotice() {
      this.$router.push({ path: '/notice/page', query: { page: this.page }})
    },
    ...mapActions(['addNotice', 'updateNotice']),
    pushTemp() {
      this.temp.noticeDate = '2019-5-20'
      this.temp.noticePublish = '办公厅'
      this.temp.noticeReadNum = 20
      this.temp.noticeTitle = '关于智慧门户、云门户停服演练的公告'
      this.temp.noticeContent = '<p>为做好云门户系统至智慧门户系统的平滑割接，集团信息化部计划分两批开展割接演练工作，时间分别是2019年5月9日（周四）凌晨0点至4点和5月15日（周三）凌晨0点至4点。割接演练期间智慧门户、云门户以及集成在门户内部的所有应用均无法正常访问，请您提前安排好相关工作。</p>' +
        '<p>给您带来不便，深表歉意，敬请谅解！</p>' +
        '<p>演练联系人：</p>' +
        '<p>信息化部，王城，18601101111，wangc3@chinaunicom.cn；</p> ' +
        '<P>集成公司，唐三，18500668866，tangs5@chinaunicom.cn；（智慧门户）</P>' +
        '<p>集成公司，陈丹，18618291236，chend121@chinaunicom.cn；（云门户）</p>'
    }
  }

}
</script>
<style>
  .createPost-container{
    margin: 0 8%;
  }
  .app-container{
    color: #fff;
  }
</style>
