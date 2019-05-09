<template>
  <div class="app-container" style="text-align: center" padding="10px 100px 10px 100px">
    <!--<h1>{{this.temp.title}}</h1>-->
    <h1 style="text-align: center" padding="10px">{{ this.member.title }}</h1>
    <span>阅读数：{{ member.pageviews }} | 发布时间：{{ member.timestamp }} | 作者：{{ member.author }}</span>
    <br>

    <p align="left">{{ member.content }}</p>

  </div>
</template>
<script>
export default {
  data() {
    return {
      member: {
        id: undefined,
        timestamp: new Date(),
        title: '',
        type: ''
      }
      //          /this.$route.params.row,
      //          temp:{
      //            memberId:'',
      //            memberTitle:'',
      //            memberContent:''
      //
      //          },
      //          showFlag:false
    }
  },
  mounted() {
    if (this.$route.params.row == null) {
      this.member.title = '热烈庆祝中国共产党成立98周年'
      this.member.timestamp = '2019-07-01'
      this.member.author = '刘华'
      this.member.content = '不忘初心，牢记使命，高举中国特色社会主义伟大旗帜，决胜全面建成小康社会，夺取新时代中国特色社会主义伟大胜利，为实现中华民族伟大复兴的中国梦不懈奋斗。'
      this.member.pageviews = '1314521'
    } else {
      this.member = this.$route.params.row
    }
    console.log(this.$route.params.row)
  }
//      methods(){
//        if(this.$route.query.id>0){
//          for(const v of this.member.member){
//            if(v.memberId===this.$route.query.id){
//              this.temp = v
//              this.temp.memberReading+=1
//
//              break
//            }
//          }
//          this.showFlag = true
//        }
//      }
}
</script>

<style>

</style>
