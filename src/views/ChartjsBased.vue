<template>
  <div class="wrapper-main">
    <line-charts ref="chart" :options="options" :chartdata="computedChartdata"></line-charts>
    <data-set :entries="chartdata" @changeMonthValue="setMonthData"/>
  </div>
</template>
<script>
  import LineCharts from '../components/LineCharts.vue'
  import DataSet from '../components/DataSet.vue'
  export default {
    components: {
      LineCharts,
      DataSet
    },
    data() {
      return {
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        chartdata: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'commits on GH',
              backgroundColor: '#f87989',
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
            }
          ]
        }
        
      }
      
    },
    methods: {
      setMonthData(obj) {
        console.log(+obj.val)
        console.log(this.$data._chart)
        this.chartdata.datasets[0].data[obj.index] = +obj.val
        
        this.$refs.chart.renderChart(this.computedChartdata, this.computedOptionsdata)
      }
    },
    computed: {
      computedChartdata(){
        return this.chartdata
      },
      computedOptionsdata() {
        return this.options
      }
    }
  }
</script>
<style scoped lang="scss">
  .wrapper-main {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 800px;
    border: 1px solid pink;
  }
</style>
