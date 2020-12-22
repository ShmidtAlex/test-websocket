<template>
  <div style="width: 100%">
    <div class="wrapper-main">
      <LineCharts :width="800" :height="500" ref="chart" :options="options" :chartdata="computedChartdata" />
      <DataSet :entries="chartdata" @changeMonthValue="setMonthData"/>
    </div>
    <div class="wrapper-main">
      <PieCharts :width="800" :options="chartOptions" :chartdata="chartData"/>
      <DataSet :entries="chartData" @changeMonthValue="setMonthData"/>
    </div>
  </div>
  
</template>
<script>
  import LineCharts from '../components/LineCharts.vue'
  import PieCharts from '../components/PieCharts.vue'
  import DataSet from '../components/DataSet.vue'
  export default {
    components: {
      LineCharts,
      PieCharts,
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
        },
        chartOptions: {
          hoverBorderWidth: 20
        },
        chartData: {
          hoverBackgroundColor: "red",
          hoverBorderWidth: 10,
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: "Data One",
              backgroundColor: ["#41B883", "#E46651", "#00D8FF", 
              "#ffc0cb", "#cbcba9", "#407294", 
              "#065535", "#ffd700", "#008080", "#003366", "#800000", "#fa8072"],
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
            }
          ]
        }        
      }      
    },

    methods: {
      setMonthData(obj) {
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
