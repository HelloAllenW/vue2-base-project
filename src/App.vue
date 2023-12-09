<template>
  <div id="main-app">
    <el-container>
      <TheSidebar />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import TheSidebar from '@/sidebar'
export default {
  components: {
    TheSidebar
  },
  mounted() {}
}
</script>

<style lang="less">
.el-container {
  height: 100%;
  .el-main {
    padding: 0;
    margin: 0;
  }
}
</style>
