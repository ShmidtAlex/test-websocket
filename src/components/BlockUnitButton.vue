<template>
  <div class="positionButton" >
    <div class="title">
       block # {{id}}
    </div>
    <div class="buttons">
      <div class="manage-row">
        <button @click="moveUp(id)" class="direction">UP</button>
      </div>
       <div class="manage-row middle-row">
        <button @click="moveLeft(id)" class="direction">LEFT</button>
        <button @click="moveRight(id)" class="direction">RIGHT</button>
      </div>
       <div class="manage-row">
        <button @click="moveDown(id)" class="direction">DOWN</button>
      </div>
    </div>        
  </div>
</template>
<script>
  export default {
    name: 'BlockUnitButton',
    props: {
      id: {
        type: Number,
        required: true
      },
      lastChangedElemId: {
        type: Number,
        required: false
      }      
    },
    data() {
      return {
        localChangedElemId: this.lastChangedElemId
      }
    },
    methods: {
      moveUp(id){
      let index = id;
      this.localChangedElemId = id;
      this.$store.commit('moveUp', index);
    },
    moveDown(id){
      let index = id;
      this.localChangedElemId = id;
      this.$store.commit('moveDown', index);
    },
    moveLeft(id){
      let index = id;
      this.localChangedElemId = id;
      this.$store.commit('moveLeft', index);
    },
    moveRight(id){
      let index = id;
      this.localChangedElemId = id;
      this.$store.commit('moveRight', index);
    },
    }
  }
</script>
<style>
  .positionButton {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 180px;
    height: 40px;
  }
  .manage-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 180px;
  }
  .middle-row {
    justify-content: space-between;
  }
  .direction {
    width: 60px;
  }
  .unit {
    z-index: 0;
  }
</style>