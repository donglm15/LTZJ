<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {
    this.$store.dispatch('pushNotice')
    this.$router.push({ path: '/dashboard' })
  }
}
</script>
