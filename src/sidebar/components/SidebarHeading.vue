<template>
  <div class="sidebar-heading-container">
    <transition name="sidebarHeadingFade">
      <img
        v-if="collapse"
        class="sidebar-heading-collapse-logo"
        src="@/assets/logo.png"
      />
      <img v-else class="sidebar-heading-logo" src="@/assets/logo.png" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarHeading',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.sidebarHeadingFade-enter-active {
  transition: opacity 1.5s;
}
.sidebarHeadingFade-enter,
.sidebarHeadingFade-leave-to {
  opacity: 0;
}

.sidebar-heading-container {
  position: relative;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  text-align: center;
  border-bottom: 1px solid #f2f2f2;

  .sidebar-heading-collapse-logo {
    height: 30px;
    vertical-align: middle;
  }
  .sidebar-heading-logo {
    height: 32px;
    vertical-align: middle;
    margin-right: 12px;
  }
}
</style>
