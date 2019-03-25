<template>
  <div class="router">
    <div>home</div>
  </div>
</template>

<script>
import Page from '@/components/common/page.vue'

export default {
  components: { Page },
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
    let data = {
      source: 'huobi'
    }
    this.$http({
      url: '/user/btcusdt',
      method: 'get', 
      params: data
    }).then(res => {
    })
  },
  methods: {
  }
}
</script>
<style scoped lang="less">
.router{
  min-width: 100%
}
</style>
