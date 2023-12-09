<template>
  <el-aside :width="collapse ? '64px' : '200px'">
    <sidebar-heading :collapse="collapse"></sidebar-heading>
    <sidebar-menu :collapse="collapse"></sidebar-menu>
    <sidebar-bottom
      :isActive="!collapse"
      @toggle-click="toggleSideBar"
    ></sidebar-bottom>
  </el-aside>
</template>

<script>
import SidebarHeading from './components/SidebarHeading'
import SidebarBottom from './components/SidebarBottom'
import SidebarMenu from './components/SidebarMenu'
export default {
  name: 'TheSidebar',
  components: {
    SidebarHeading,
    SidebarBottom,
    SidebarMenu
  },
  data() {
    return {
      collapse: true
    }
  },
  methods: {
    toggleSideBar() {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style lang="less" scoped>
.el-aside {
  overflow: hidden;
}
</style>
