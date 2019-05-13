<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4"><i class="el-icon-back" @click="back()">返回</i></el-col>
        <el-col :span="6" :offset="12">
          <ul>
            <li>
              <el-button type="text" @click="open"><i class=" el-icon-warning" /></el-button>
            </li>
            <li>
              <el-button type="text"><i class=" el-icon-star-off" /></el-button>
            </li>
            <li> <el-button type="text"><i class="el-icon-share" /></el-button></li>
          </ul>
        </el-col>
      </el-row>
      <div class="Page-detail">
        <h3>{{ this.$route.params.title }}</h3>
        <p><span style="color:orange;font-size: 24px">{{ this.$route.params.salary }}</span>元/月</p>
        <p>学历：{{ this.$route.params.education }} | 经验：{{ this.$route.params.experience }} | 招聘人数：{{ this.$route.params.recruitment }}</p>
        <p>
          岗位级别：
          <svg-icon v-for="o in (this.$route.params.importance)" :key="o" icon-class="star" class="meta-item__icon" />
        </p>
        <el-row>
          <el-col :span="10">岗位序列：{{ this.$route.params.type }}</el-col>
          <el-col :span="6" :offset="8">
            <el-button type="primary" icon="el-icon-apply">
              申请
            </el-button>
          </el-col>
        </el-row>
        <span>防骗指南：又到一年求职旺季，网络求职需要谨慎，精心挑选的防骗精华，找工作一定要看哦！</span>
      </div>

    </el-card>
    <el-row>
      <el-col :span="16">
        <el-card class="box-card-left">
          <h3>{{ this.$route.params.employName }}</h3>
          <p>公司福利：{{ this.$route.params.welfare }}</p>
          <p style="line-height: 40px">职位描述：{{ this.$route.params.remark }}</p>
          <p>截止时间：{{ this.$route.params.display_time }}</p>
          <p>工作地点：{{ this.$route.params.jobPlace }}</p>
          <div width="800" :closable="false" :mask-closable="false" @on-cancel="cancel">
            <baidu-map
              v-model="showMapComponent"
              :style="mapStyle"
              class="bm-view"
              ak="你的密钥"
              :center="center"
              :zoom="zoom"
              :scroll-wheel-zoom="true"
              @click="getClickInfo"
              @moving="syncCenterAndZoom"
              @moveend="syncCenterAndZoom"
              @zoomend="syncCenterAndZoom"
            >
              <bm-view style="width: 100%; height:400px;" />
              <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" />
              <bm-control>
                <bm-auto-complete v-model="keyword" :sug-style="{zIndex: 999999}">
                  <input type="text" placeholder="请输入搜索关键字" class="serachinput">
                </bm-auto-complete>
              </bm-control>
              <bm-local-search :keyword="keyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;" />
            </baidu-map>
            <div slot="footer" style="margin-top: 0px; display:none;">
              <Button
                type="ghost"
                style="width: 60px;height: 36px;"
                @click="cancel"
              >取消
              </Button>
              <Button type="primary" style="width: 60px;height: 36px;" @click="confirm">确定</Button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card-right">
          <img src="http://5b0988e595225.cdn.sohucs.com/images/20190113/728ef8b5aafc48559db22598289262f4.jpeg" class="image">
          <div style="padding: 14px;">
            <p>{{ this.$route.params.employName }}</p>
            <p>公司地点：{{ this.$route.params.jobPlace }}</p>
            <div style="line-height: 40px">公司简介：{{ this.$route.params.company }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>
<script>
import { BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker } from 'vue-baidu-map'
export default {
  components: {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker
  },
  props: {
    value: Boolean,
    mapHeight: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      chart: null,
      showMapComponent: this.value,
      keyword: '',
      mapStyle: {
        width: '100%',
        height: this.mapHeight + 'px'
      },
      center: { lng: 116.404, lat: 39.915 },
      zoom: 15
    }
  },
  watch: {
    value: function(currentValue) {
      this.showMapComponent = currentValue
      if (currentValue) {
        this.keyword = ''
      }
    }
  },
  methods: {
    back() {
      //            返回上一页，如果没有上一页返回首页
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' })
        return false
      } else {
        this.$router.go(-1)
      }
    },
    open() {
      const h = this.$createElement
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '该职位的问题? '),
          h('i', { style: 'color: teal' }, '职位虚假')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: '已提交待审核 ' + action
        })
      })
    },
    /** *
       * 地图点击事件。
       */
    getClickInfo(e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    /** *
       * 确认
       */
    confirm: function() {
      this.showMapComponent = false
      this.$emit('map-confirm', this.center)
    },
    /** *
       * 取消
       */
    cancel: function() {
      this.showMapComponent = false
      this.$emit('cancel', this.showMapComponent)
    }
  }
}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
  .image {
    width: 100%;
    display: block;
  }
  .box-card {
    width: 95%;
    margin:20px 20px 10px 20px
  }
  .box-card-left{
    /*width: 75%;*/
    margin:10px 10px 50px 20px;
    height: 700px;
  }
  .box-card-right{
    /*width: 20%;*/
    margin:10px 45px 10px 10px
  }
  .box-card li{
    float: right;
    list-style: none;
    margin-left: 30px;
  }
  .serachinput{
    width: 300px;
    box-sizing: border-box;
    padding: 9px;
    border: 1px solid #dddee1;
    line-height: 20px;
    font-size: 16px;
    height: 38px;
    color: #333;
    position: relative;
    border-radius: 4px;
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
  }
</style>
