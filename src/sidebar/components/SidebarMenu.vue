<template>
  <el-menu
    :default-active="$route.name"
    :collapse="collapse"
    :collapse-transition="false"
  >
    <router-link v-for="item in menuList" :key="item.name" :to="item.path">
      <el-menu-item :index="item.name">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
export default {
  name: 'SidebarMenu',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      menuList: []
    }
  },
  created() {
    this.menuList = this.$router.options.routes
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  height: calc(100% - 90px);
  .el-menu-item {
    text-align: left;
    span {
      margin-left: 10px;
    }
  }
}
</style>
