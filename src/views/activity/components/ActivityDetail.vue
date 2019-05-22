<template>
  <div class="app-container" :class="{classA:temp.activityType.type=='doing', classB:temp.activityType.type=='done' , classC:temp.activityType.type == 'do'}">
    <!--<el-form ref="dataForm" :model="temp" label-position="left" label-width="80px" style="width: 600px; margin-left:200px; margin-top: 40px">-->

    <!--<el-form-item label="活动名称" prop="title">-->
    <!--<el-input v-model="temp.title" readonly="true"/>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="活动内容" prop="content">-->
    <!--<el-input v-model="temp.content" rows="6" type="textarea" readonly="true"/>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="活动时间" prop="startTime">-->
    <!--<el-date-picker v-model="temp.startTime" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" readonly="true"/> — —-->
    <!--<el-date-picker v-model="temp.endTime" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" readonly="true"/>-->
    <!--</el-form-item>-->
    <!---->
    <!--<el-form-item label="人数" prop="people">-->
    <!--<el-input v-model="temp.people" />-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <div class="div1">
      <div :class="{div2:temp.activityType.type=='doing', div2p:temp.activityType.type=='done' , div2g:temp.activityType.type == 'do'}">
        活动名称
      </div>
      <div class="div3">{{ temp.title }}</div>
      <div class="divType">{{ typeTag }}</div>
    </div>

    <div class="divA">
      <div :class="{div2:temp.activityType.type=='doing', div2p:temp.activityType.type=='done' , div2g:temp.activityType.type == 'do'}">
        活动内容
      </div>
      <div style="margin: 10px 0px 10px 40px; text-indent: 2em; line-height: 2em">{{ temp.content }}</div>
    </div>

    <div class="divA">
      <div :class="{div2:temp.activityType.type=='doing', div2p:temp.activityType.type=='done' , div2g:temp.activityType.type == 'do'}">
        活动地点
      </div>
      <div style="margin: 10px 0px 10px 40px; text-indent: 2em; line-height: 2em">{{ temp.address }}</div>
    </div>

    <div class="divA">
      <div :class="{div2:temp.activityType.type=='doing', div2p:temp.activityType.type=='done' , div2g:temp.activityType.type == 'do'}">
        活动时间
      </div>
      <div style="margin: 10px 0px 10px 40px; text-indent: 2em; line-height: 2em">{{ temp.startTime }} -- {{ temp.endTime }}</div>
    </div>

    <div class="divA">
      <div :class="{div2:temp.activityType.type=='doing', div2p:temp.activityType.type=='done' , div2g:temp.activityType.type == 'do'}">
        活动人数及奖品
      </div>
      <div style="margin: 10px 0px 10px 40px; text-indent: 2em; line-height: 2em">人数有{{ temp.people }} —— 奖品为{{ temp.prize }}</div>
    </div>

  </div>

</template>
<script>

export default {
  data() {
    return {
      temp: {
        id: undefined,
        content: '',
        startTime: '',
        endTime: '',
        title: '',
        people: '',
        prize: '',
        activityType: []
      },
      typeTag: ''
    }
  },
  mounted() {
    this.temp = Object.assign({}, this.$route.query)
    console.log(this.temp)
    if (this.temp.activityType.type == 'doing') {//eslint-disable-line
      this.typeTag = '进行中'
    } else if (this.temp.activityType.type == 'done') {//eslint-disable-line
      this.typeTag = '已结束'
    } else {
      this.typeTag = '未开始'
    }
  }
}
</script>
<style scoped>
  .app-container{
    display: flex;
    flex-flow: column;
    background-image: url("header.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .classA{
    color: red;
    font-weight: bold;
  }
  .classB{
    color: #909399;
    font-weight: bold;
  }
  .classC{
    color: #409eff;
    font-weight: bold;
  }
  .div1{
    display: flex;
    flex-flow: row;
    height: 40px;
    width: 100%;
    background-color: #ffffff;
  }
  .div2{
    height: 40px;
    width: 200px;
    background-image: url("listbg.png");
    background-repeat: no-repeat;
    background-size: 100% 40px;
    color: white;
    text-align: center;
    line-height: 40px;
    font-size: 22px;
  }
  .div2p{
    height: 40px;
    width: 200px;
    background-image: url("grey.png");
    background-repeat: no-repeat;
    background-size: 100% 40px;
    color: white;
    text-align: center;
    line-height: 40px;
    font-size: 22px;
  }
  .div2g{
    height: 40px;
    width: 200px;
    background-image: url("blue.png");
    background-repeat: no-repeat;
    background-size: 100% 40px;
    color: white;
    text-align: center;
    line-height: 40px;
    font-size: 22px;
  }
  .div3{
    flex: 1;
    line-height: 40px;
    font-weight: bold;
    text-align: center;
  }
  .divType{
    line-height: 40px;
    width: 80px;
    text-align: center;
  }
  .divA{
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    margin-top: 40px;
  }

</style>
