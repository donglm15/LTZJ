<template>
  <el-card class="box-card">
    <div class="clearfix">
      <span style="padding-left: 20px; color: white; height: 50px; line-height: 50px" icon="el-icon-chat-line-square">公司公告</span>
    </div>
    <div v-for="(item, index) in tableData" :key="index" class="text item show" @click=" detail(index)">
      <li>{{ item.noticeTitle }}</li>
    </div>
  </el-card>
</template>
<script>
import { fetchNoticeBack } from '@/api/notice'
export default {
  data() {
    return {
      tableData: null
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      fetchNoticeBack().then(response => {
        for (var index in response.data.list) {
          if (response.data.list[index].noticeStatus === 'draft') {
            response.data.list.splice(index, 1)
          }
        }
        this.tableData = response.data.list.slice(0, 5)
      })
    },
    detail(index) {
      var id = this.tableData[index].noticeId
      this.$router.push({ path: '/notice/noticeDetails', query: { id: id, pageNext: 1 }})
    }
  }
}
</script>
<style>
  li{
    list-style: none;
  }
  .clearfix {
    font-weight: bold;
    background-image: url("3.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .clearfix>p{
    height: 3px;
    width: 100%;
    background-color: red;
  }
  .show{
    padding: 0 5%;
  }
  .show>li:hover { color: #F00 }
  .show li:nth-child(1){
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .show>li {
    padding-right: 5%;
    overflow: hidden; /*自动隐藏文字*/
    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
    white-space: nowrap;/*强制不换行*/
    width: 100%;/*不允许出现半汉字截断*/
    border-bottom: solid 1px #ccc;
  }
  .show li:nth-last-child{
    border-bottom: none;
  }
  .show>p {
    border: solid 1px #8c939d;
  }
  .box-card {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .box-card > div,li,ul {
    margin: 0;
    padding: 0;
  }
</style>
