<template>
  <div name="m-index">
    <Header></Header>
    <transition name="tran">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
/* 页面基本框架 */

import Header from '@/components/home/header'
import Footer from '@/components/home/footer'

export default {
  name: 'm-index',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      isMain: false
    }
  },
  created() {
    // 初始化页面
    this.$store.dispatch('getUser')
  }
}
</script>

<style lang="less">
.tran-enter-active{
  transition: all 0.2s 0.2s;
}
.tran-leave-active{
  transition: all 0.2s 0s;
}
.tran-enter, .tran-leave-to{
  opacity: 0;
}
</style>
