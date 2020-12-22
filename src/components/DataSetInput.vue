<template>
  <div class="row-wrapper">
    <label>{{ label }}</label>
    <input type="text" :placeholder="input" v-model="settedVal" @keyup.enter="setValue">
  </div>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        required: true
      },
      input: {
        type: Number,
        required: false
      },
      index: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        settedVal: null
      }
    },
    computed: {
      computedValue() {
        return this.settedVal;
      }
    },
    methods: {
      setValue(){
        const obj = {
          val: this.settedVal,
          index: this.index
        }
        this.$emit('changeMonthValue', obj)
      }
    }
  }
</script>
<style scoped lang="scss">
  .row-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 60%;
    height: 30px;
  }
</style>