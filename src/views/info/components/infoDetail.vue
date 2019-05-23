<template>
  <div class="detailDiv">
    <h2>{{ infoData.title }}</h2>
    <span>浏览量{{ infoData.read }} | 点赞{{ infoData.like }} | 收藏{{ infoData.favorite }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布时间{{ infoData.date }}</span>
    <br>
    <img :src="infoData.imgUrl">
    <p v-html="infoData.content">{{ infoData.content }}</p>

    <div>
      <div :class="likeFlag ? 'clicked' : 'unclick'" @click="likeClick" @mouseenter="likeOver" @mouseleave="likeLeave"><p>{{ likeP }}&nbsp;</p> <img :src="likeImg"></div>
      <div :class="favoFlag ? 'clicked' : 'unclick'" @click="favoClick" @mouseenter="favoOver" @mouseleave="favoLeave"><p>{{ favoP }}&nbsp;</p> <img :src="favoImg"></div>
    </div>
  </div>
</template>

<script>
import { getInfoById, updateLikeFavo } from '@/api/info'
export default {
  data() {
    return {
      infoData: {},
      infoId: this.$route.query.id,
      likeFlag: false,
      likeImg: require('@/assets/info_image/like1.png'),
      likeP: '点赞',
      favoFlag: false,
      favoImg: require('@/assets/info_image/favo1.png'),
      favoP: '收藏'
    }
  },
  mounted() {
    this.getPage()
  },
  methods: {
    getPage() {
      getInfoById(this.infoId).then(response => {
        this.infoData = response.data
        this.infoData.imgUrl = 'http://localhost:8080/' + this.infoData.imgUrl
      })
    },
    likeOver() {
      this.likeFlag = true
      this.likeImg = require('@/assets/info_image/like2.png')
    },
    likeLeave() {
      if (this.likeP === '点赞') {
        this.likeFlag = false
        this.likeImg = require('@/assets/info_image/like1.png')
      }
    },
    likeClick() {
      if (this.likeP === '点赞') {
        updateLikeFavo({ id: this.infoId, likeFlag: true, flag: true }).then(() => {
          this.likeP = '已赞'
          this.likeOver()
          this.getPage()
        })
      } else {
        updateLikeFavo({ id: this.infoId, likeFlag: true, flag: false }).then(() => {
          this.likeP = '点赞'
          this.getPage()
        })
      }
    },
    favoOver() {
      this.favoFlag = true
      this.favoImg = require('@/assets/info_image/favo2.png')
    },
    favoLeave() {
      if (this.favoP === '收藏') {
        this.favoFlag = false
        this.favoImg = require('@/assets/info_image/favo1.png')
      }
    },
    favoClick() {
      if (this.favoP === '收藏') {
        updateLikeFavo({ id: this.infoId, likeFlag: false, flag: true }).then(() => {
          this.favoP = '已收藏'
          this.favoOver()
          this.getPage()
        })
      } else {
        updateLikeFavo({ id: this.infoId, likeFlag: false, flag: false }).then(() => {
          this.favoP = '收藏'
          this.getPage()
        })
      }
    }
  }
}
</script>

<style>
  .detailDiv{
    text-align: center;
    padding: 10px 100px 30px 100px;
    color: white;
  }
  .detailDiv h2{
    font-weight: bold;
  }
  .detailDiv span{
    font-weight: 100;
    color: #bfcbd9;
  }
  .detailDiv>img{
    margin: 10px 0;
  }
  .detailDiv>p{
    text-align: left;
    text-indent:2em;
    letter-spacing:1px;
    line-height: 2em;
  }
  .detailDiv>div{
    position: absolute;
    right: 30px;
    top:20px;
    display: flex;
  }
  .detailDiv>div>div{
    width: 100px;
    height: 40px;
    margin: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
  .detailDiv>div>div>img{
    height: 60%;
  }
  .unclick{
    border: 1px solid #bfcbd9;
    color: #bfcbd9;
  }
  .clicked{
    border: 1px solid #37474f;
    color: #37474f;
  }

</style>
