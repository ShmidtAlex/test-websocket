<template>
  <div class="wrapper">
    <div class="inputs" v-for="(input, index) in entries.datasets[0].data" :key="index">
      <data-set-input :index="index" :label="entries.labels[index]" :input="input" @changeMonthValue="replaceValue"/> 
    </div>
  </div>
</template>
<script>
  import DataSetInput from './DataSetInput.vue'
  export default {
    name: 'DataSet',
    components: {
      DataSetInput
    },
    props: {
      entries: {
        type: Object,
        required: false
      }   
    },
    data() {
      return {
        
      }
    },
    methods: {
      replaceValue(obj){
        this.$emit('changeMonthValue', obj)
      }
    }
    
  }
</script>
<style scoped lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    .inputs {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
</style>