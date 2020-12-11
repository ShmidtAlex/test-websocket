<template>
  <div class="deleted-button-pannel">
    <div class="wrapper" v-for="block in buttons" :key="block.id">
      <button @click="restore(block)">restore block #{{ block.id }}</button>
    </div>   
  </div>
</template>

<script>
  export default {
    name: 'DeletedElements',
    props: {
      buttons: {
        type: Array,
        required: true
      }
    },
    data(){
      return {
        status: null
      }
    },
    methods: {
      restore(value){
        const restorable = this.$store.state.removedBlocks.filter(elem => elem.id === value.id);
        this.$store.commit('deleteFromRemovedBlocksList', ...restorable);
        this.$emit('pushToLocalStore', ...restorable);
      }
    }
  }
</script>

<style lang="scss">
  .deleted-button-pannel, .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    width: 80%;
    max-width: 1200px;
    border-bottom: 1px solid gray;
    background-color: lightgray;
  }
  button {
    height: 25px;
    width: 25%;
    min-width: fit-content;
    max-height: 120px;    
    border-radius: 5px;
  }
  
</style>