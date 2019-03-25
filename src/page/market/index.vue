<template>
  <div class="router">
    <div class="filter_box">
      <dl>
        <label>币对</label>
        <label><input type="radio" name="symbol" value="btcusdt" v-model="params.symbol">BTC_USDT</label>
        <label><input type="radio" name="symbol" value="ethusdt" v-model="params.symbol">ETH_USDT</label>
        <label><input type="radio" name="symbol" value="bchusdt" v-model="params.symbol">BCH_USDT</label>
      </dl>
      <dl>
        <label>平台1</label>
        <label><input type="radio" name="source1" value="huobi" v-model="params.source1">huobi</label>
        <label><input type="radio" name="source1" value="binance" v-model="params.source1">binance</label>
        <label><input type="radio" name="source1" value="okex" v-model="params.source1">okex</label>
      </dl>
      <dl>
        <label>平台2</label>
        <label><input type="radio" name="source2" value="huobi" v-model="params.source2">huobi</label>
        <label><input type="radio" name="source2" value="binance" v-model="params.source2">binance</label>
        <label><input type="radio" name="source2" value="okex" v-model="params.source2">okex</label>
      </dl>
      <dl>
        <label>时间周期</label>
        <label><input type="radio" name="time" value="sec" v-model="params.time">1s</label>
        <label><input type="radio" name="time" value="min" v-model="params.time">1min</label>
      </dl>
    </div>

    <div class="echarts" id="echarts"></div>
  </div>
</template>

<script>
let echarts = require('echarts');

export default {
  components: { },
  data () {
    return {
      // 数据
      list1: [],
      list2: [],

      // 参数
      params: {
        symbol: 'btcusdt',
        source1: 'huobi',
        source2: 'binance',
        time: 'sec',
      },
      loading: false
    }
  },
  computed: {
    legend () {
      return [this.params.source1, this.params.source2]
    },
    dimensions () {
      return ['time', this.params.source1, this.params.source2]
    },
    source () {
      // 数据处理
      let data = []
      let timeMap = {}
      for(let dd of this.list1) {
        timeMap[dd.ctime] = [dd.ctime*1000, dd.price]
      }
      for(let dd of this.list2) {
        timeMap[dd.ctime].push(dd.price)
      }
      let list = Object.values(timeMap).sort((a, b) => a[0] -b[0])
      console.log(list.length)
      return list
    }
  },
  created () {
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList () {
      let data = {
        source1: this.params.source1,
        source2: this.params.source2
      }
      this.$http({
        url: `/user/${this.params.symbol}`,
        method: 'get', 
        params: data
      }).then(r => {
        if(r.result == 0){
          this.list1 = r.data.list1
          this.list2 = r.data.list2
          this.drawEchart()
        } else {
          alert(r.reason)
        }
      })
    },
    drawEchart() {
      let myChart = echarts.init(document.getElementById('echarts'))
      let option = {
        title: {
          text: '组合k线'
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
        },
        dataset: {
          dimensions: this.dimensions,
          source: this.source
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 90,
            end: 100
          },
          {
            type: 'inside',
            realtime: true,
            start: 90,
            end: 100
          }
        ],
        xAxis: {
          type: 'time',
          boundaryGap: false,
        },
        yAxis: {
          scale: true,
        },
        series: [
          {
            type: 'line',
            encode: {x: 'time', seriesName:1, y: 1}
          },
          {
            type: 'line',
            encode: {x: 'time', seriesName:2, y: 2}
          }
        ]
      }
      myChart.setOption(option, true);
    }
  },
  watch: {
    params: {
      deep: true,
      handler(val) {
        this.getList()
      }
    } 
  },
}
</script>
<style scoped lang="less">
.echarts{
  width: 100%;
  height: 500px;
}
</style>
