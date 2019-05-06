<template>
  <div>
    {{ this.$route.params.id }}<br>
    <el-button @click="goBack">返回123</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return { msg: '用户详情' }
  },
  methods: {
    goBack() {
      this.$router.go(-1) // 返回上一个页面
    }
  }
}
</script>

<style>

</style>
