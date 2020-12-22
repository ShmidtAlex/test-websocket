<script>
  import { Line } from 'vue-chartjs'
  export default {
    extends: Line,
    props: ['chartdata', 'options'],
    
    mounted () {
      this.renderChart(this.chartdata, this.options)
      console.log(this.$data._chart)
    }
  }
</script>