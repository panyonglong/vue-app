<!-- 弹框组件 -->

<template>
  <div class="modal" :style="{ zIndex: zIndex }">
    <div class="modal_bg" :style="{ opacity: opacity }" @click="bgClick"></div>
    <div class="modal_box" :style="size">
      <slot name="content">
        default content
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {
    }
  },
  computed: {
    size: function () {
      let data = {}
      if (this.width !== 0) {
        data['width'] = this.width + 'px'
      }
      if (this.height !== 0) {
        data['height'] = this.height + 'px'
      }
      return data
    }
  },
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 10
    },
    opacity: {
      type: Number,
      default: 0.4
    }
  },
  methods: {
    bgClick: function () {
      this.$emit('bgClick')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.modal{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .modal_bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 1;
  }

  .modal_box{
    position: absolute;
    background: white;
    z-index: 2;
    border-radius: 5px;
    overflow: hidden;
  }
}
</style>
