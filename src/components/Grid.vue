<template>
  <div class="grid">
    <div class="unit" v-for="unit in computedUnits" :key="unit.id">
      <BlockUnit @size-changed="updateSize" @position-changed="updatePosition" @remove-block="updateRemoved" :block-id="unit.id" :totally="computedUnits" :computed-unit="unit"/>       
    </div>
    <div class="button-block">
      <div class="positionButton" v-for="unit in computedUnits" :key="unit.id">
        <div class="title">
           block # {{unit.id}}
        </div>
        <div class="buttons">
          <div class="manage-row">
            <button @click="moveUp(unit.id)" class="direction">UP</button>
          </div>
           <div class="manage-row middle-row">
            <button @click="moveLeft(unit.id)" class="direction">LEFT</button>
            <button @click="moveRight(unit.id)" class="direction">RIGHT</button>
          </div>
           <div class="manage-row">
            <button @click="moveDown(unit.id)" class="direction">DOWN</button>
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
import BlockUnit from './BlockUnit.vue'
export default {
  name: 'Grid',
  components: {
    BlockUnit
  },
  props: {
    msg: String
  },
  data() {
    return {
      top: null,
      left: null,
      windowWidth: 0,
      windowHeight: 0,
      gridWidth: 0,
      lastChangedElemId: null
    }
  },
  created(){
    const localStorageData = JSON.parse(localStorage.getItem('lastSessionData'));
    const removedData = JSON.parse(localStorage.getItem('removedBlocksList'));
    if(localStorageData){
      this.$store.commit('setRestBlocksFromLocalStorage', localStorageData);
    }
    if(removedData){
      this.$store.commit('setRemovedBlocksFromLocalStorage', removedData);
    }    
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);
      this.getWindowWidth()
      this.getWindowHeight()
    })
  },
  methods: {
    moveUp(id){
      let index = id;
      this.lastChangedElemId = id;
      this.$store.commit('moveUp', index);
    },
    moveDown(id){
      let index = id;
      this.lastChangedElemId = id;
      this.$store.commit('moveDown', index);
    },
    moveLeft(id){
      let index = id;
      this.lastChangedElemId = id;
      this.$store.commit('moveLeft', index);
    },
    moveRight(id){
      let index = id;
      this.lastChangedElemId = id;
      this.$store.commit('moveRight', index);
    },
    getWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth;
      //we need to add commits or actions on this event, which will initiate changing of blocks position on grid.
    },
    getWindowHeight() {
      this.windowHeight = document.documentElement.clientHeight;
    },
    
    setBlockData(value) {
      this.lastChangedElemId = value;
    },
    updateSize(value) {
      this.$store.dispatch('renewCoordsAndPushToLocalStorage', value);   
    },
    updatePosition(value) {
      this.$store.dispatch('renewCoordsAndPushToLocalStorage', value);
    },
    updateRemoved(value){
      this.$store.commit('removeBlockFromList', value);
      this.resetRemovedBlock(value);
      this.updateLastSessionData();
    },
    updateLastSessionData() {
      localStorage.setItem('lastSessionData', JSON.stringify(this.computedUnits));
    },
    addPreviousDeletedBlock(value){
      if(value){
        this.$store.commit('addPreviousDeletedBlock', value);
      }
    },
    resetRemovedBlock(id){
      const grid = document.querySelector('.grid');
      const verticalCoords = +window.getComputedStyle(grid).height.match(/\d*/) / 2 - 100;
      const horisontalCoords = +window.getComputedStyle(grid).width.match(/\d*/) /2 - 150;
      const value = {width: 300, height: 100, top: verticalCoords, left: horisontalCoords};
      value.id = id;
      this.$store.commit('resetRemovedBlock', value);
    }
  },
  computed: {
    computedUnits() {
      return this.$store.getters.computedUnits;
    },
  },
  watch: {    
    windowWidth(val){
      let width = (val - 16) / 100 * 80;
      this.$store.commit('changeGridSize', width);
    }    
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
    window.removeEventListener('resize', this.getWindowHeight);
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .grid {
    display: block;
    position: relative;
    height: 800px;
    width: 80%;
    max-width: 1200px;
    background-color: lightgray;
  }
  .button-block {
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      height: 180px;
      border-top: 1px solid gray;
    }
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
