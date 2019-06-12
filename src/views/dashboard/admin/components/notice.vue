<template>
  <el-card class="box-card">
    <div class="clearfix">
      <span style="padding-left: 20px" icon="el-icon-chat-line-square">公司公告</span>
      <p />
    </div>
    <div v-for="(item, index) in tableData" :key="index" class="text item show" @click=" detail(index)">
      <li>{{ item.noticeTitle }}</li>
      <p />
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
  .text {
    font-size: 19px;
    font-weight: 500;
  }
  .clearfix {
    font-size: 22px;
    font-weight: 600;
    margin: 20px 0;
  }
  .clearfix>p{
    height: 3px;
    width: 400px;
    background-color: red;
  }
  .show {
    padding: 0 5%;
  }
  .show>li:hover { color: #F00 }
  .show>li {
    padding-right: 5%;
    overflow: hidden; /*自动隐藏文字*/
    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
    white-space: nowrap;/*强制不换行*/
    width: 20em;/*不允许出现半汉字截断*/
  }
  .show>p {
    height: 2px;
    background-color: #8c939d;
    padding: 0 20px;
  }
  .box-card {
    width: 400px;
    margin: 0;
    padding: 0;
  }
  .box-card > div,li,ul {
    margin: 0;
    padding: 0;
  }
</style>
