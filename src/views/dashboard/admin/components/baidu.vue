<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card-left">
          <div width="500" :closable="false" :mask-closable="false">
            <baidu-map
              v-model="showMapComponent"
              :style="mapStyle"
              class="bm-view"
              ak="你的密钥"
              :center="center"
              :zoom="zoom"
              :scroll-wheel-zoom="true"
            >
              <bm-view style="width:100%; height:350px;" />
              <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" />
            </baidu-map>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>
<script>
import { BaiduMap, BmView, BmMarker } from 'vue-baidu-map'
export default {
  components: {
    BaiduMap,
    BmView,
    BmMarker
  },
  props: {
    value: Boolean,
    mapHeight: {
      type: Number,
      default: 357
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
      center: { lng: 119.257411, lat: 26.079674 },
      zoom: 16
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
    getClickInfo(e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    }
  }
}
</script>
