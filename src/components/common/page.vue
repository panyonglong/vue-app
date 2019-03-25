<!-- 分页组件 -->

<template>
  <div class="page" v-if="pageNum > 1">
    <!-- prev -->
    <dl :class="{'page_none': index === 1}" @click="prev"><</dl> <!--  eslint-disable-line -->

    <!-- first -->
    <dl :class="{'page_none': !showPrevMore}" @click="first">1</dl>

    <dl class="page_ellipsis" :class="{'page_none': !showPrevMore}">...</dl>

    <dl :class="{'page_now' : index === pager}" v-for="pager in pagers" :key="pager" @click="goPage(pager)">{{ pager }}</dl>

    <dl class="page_ellipsis" :class="{'page_none': !showNextMore}">...</dl>

    <!-- last -->
    <dl :class="{'page_none': !showNextMore}" @click="last">{{pageNum}}</dl>

    <!-- next -->
    <dl :class="{'page_none': !pageNum || index === pageNum}" @click="next">></dl>
  </div>
</template>

<script>
export default {
  data () {
    return {
      index: this.page,
      showPrevMore: false,
      showNextMore: false
    }
  },
  computed: {
    // 总页数
    pageNum: function () {
      return Math.ceil(this.total / this.pageSize)
    },
    // 显示页码情况
    pagers: function () {
      return this.complate()
    }
  },
  props: {
    // 总条数
    total: Number,
    // 默认页码
    page: {
      type: Number,
      default: 1
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 可见页码数量
    perPages: {
      type: Number,
      default: 5
    }
  },
  created () {
  },
  methods: {
    prev: function () {
      this.index--
    },
    first: function () {
      this.index = 1
    },
    next: function () {
      this.index++
    },
    last: function () {
      this.index = this.pageNum
    },
    goPage: function (page) {
      if (this.index !== page) {
        this.index = page
      }
    },
    complate: function () {
      let array = []
      let perPages = this.perPages
      let pageCount = this.pageNum
      let current = this.index
      let _offset = (perPages - 1) / 2

      let offset = {
        start: current - _offset,
        end: current + _offset
      }

      // -1, 3
      if (offset.start < 1) {
        offset.end = offset.end + (1 - offset.start)
        offset.start = 1
      }
      if (offset.end > pageCount) {
        offset.start = offset.start - (offset.end - pageCount)
        offset.end = pageCount
      }
      if (offset.start < 1) offset.start = 1

      this.showPrevMore = (offset.start > 1)
      this.showNextMore = (offset.end < pageCount)

      for (let i = offset.start; i <= offset.end; i++) {
        array.push(i)
      }
      return array
    }
  },
  watch: {
    index: function (val) {
      if (val < 0) {
        this.index = 0
      } else if (val > this.pageNum) {
        this.index = this.pageNum
      }
      // 当前页改变时通知change事件
      this.$emit('change', this.index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.page{
  display: flex;
  justify-content: center;
  position: relative;
  margin:0 auto 0;
  color: #2c3847;

  dl{
    margin: 0 10px;
    padding: 0 6px;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;

    &:hover{
      color: #5086e9;
    }
  }
  .page_now{
    color: #5086e9;
  }
  .page_ellipsis{
    cursor:default;
  }
  .page_none{
    display: none;
  }
}

</style>
