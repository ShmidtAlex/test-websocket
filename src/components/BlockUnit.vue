<template>
  <vue-resizable 
    v-show="windowVisible"
    @resize:end="handleResize" 
    @drag:end="handlePosition" 
    :top="computedTop" 
    :left="computedLeft"     
    :width="computedWidth" 
    :height="computedHeight" 
    :min-height="initialSize.height" 
    :min-width="initialSize.width" 
    resizable 
    drag-selector=".title" 
  >
    <div class="block" 
      :id="blockId"
      :style="{ 
        border: `2px solid ${this.computedBorderColor}`, 
        backgroundColor: computedBorderColor, 
        zIndex: blockId 
      }"
    >
      <div class="title">some block # {{ blockId }}</div>
      <div class="text">top:{{computedTop}}
      </div>
      <div class="text">left:{{computedLeft}}
      </div>
      <div class="text">width:{{computedWidth}} 
      </div>
      <div class="text">height:{{computedHeight}} 
      </div>
      <span  @click.self="emitRemoveBlock" class="close"></span>
    </div>
  </vue-resizable>
</template>
<script>
  import VueResizable from 'vue-resizable'
  export default {

    name: 'BlockUnit',
    components: { VueResizable },

    props: {
      blockId: {
        type: Number,
        required: true
      },

      computedUnit: {
        type: Object,
        required: true,
        validator: (value) => {
          return Object.entries(value).every(elem => typeof elem[1] === 'number')
        }
      },

      totally: {
        type: Array,
        required: true,
        validator: (value) => {
          return value.every(unit => typeof unit === 'object')
        }
      }
    },

    data(){
      return {
        colors: ['red', 'green', 'blue', 'white', 'purple'],
        initialSize: this.$store.state.blockSize,
        windowVisible: true,
        localCoordsObj: {
          id: this.blockId
        },
        zIndex: 1    
      }
    }, 

    methods: {
      handleResize(obj){
        this.localCoordsObj = Object.assign(this.localCoordsObj, obj);
        delete this.localCoordsObj.eventName;
        this.$emit('sizeChanged', this.localCoordsObj);
      },
       
      handlePosition(obj) {
        const normalizedObj =  this.normalizeObj(obj);
        // this.returnToTheGrid(this.normalizeObj(obj));
        const returnedToGrid = this.returnToTheGrid(normalizedObj)
        this.returnToTheGrid(normalizedObj)
        this.localCoordsObj = Object.assign(this.localCoordsObj, returnedToGrid);
        delete this.localCoordsObj.eventName;
        this.changeZIndex();
        this.$emit('positionChanged', this.localCoordsObj); 
      },

      normalizeObj(obj) {
        for (let key in obj){
          if (key !== 'id' && obj[key]%10 !== 0 && typeof obj[key] === 'number'){
            while(obj[key] % 10 !== 0) {
              obj[key] = obj[key]-1;
            }
          }
        }
        return obj;
      },

      returnToTheGrid(obj){
        const greedElem = document.querySelector('.horizontal-grid-lines');
        console.log(window.getComputedStyle(greedElem).width)
        const greedCoords = {
          top: 0,
          right: Math.round(+window.getComputedStyle(greedElem).width.match(/\d*/)),
          left: 0,
          bottom: Math.round(+window.getComputedStyle(greedElem).height.match(/\d*/)),
        }
        console.log(greedCoords, obj)
        if(obj.left < greedCoords.left) {
          obj.left = 0;
        }
        if(obj.top < greedCoords.top) {
          obj.top = 0;
        }
        if((obj.left + obj.width) > greedCoords.right) {
          obj.left = greedCoords.right - obj.width;
        }
        if ((obj.top + obj.height) > greedCoords.bottom) {
          obj.top = greedCoords.bottom - obj.height
        }
        console.log(obj)
        return obj;
      },

      changeZIndex() {
        let elems = document.querySelectorAll('.resizable-component');
        let runningElemsCoords = [];
        let higherElem; 
        elems.forEach(elem => {

          if(!this.isEqualToClickedBlock(elem)) {
            let objFromElem = {
              top: this.removeUnitsOfMeasure(elem.style.top),
              bottom: this.removeUnitsOfMeasure(elem.style.top) + this.removeUnitsOfMeasure(elem.style.height),
              left: this.removeUnitsOfMeasure(elem.style.left),
              right: this.removeUnitsOfMeasure(elem.style.left) + this.removeUnitsOfMeasure(elem.style.width)
            }
            runningElemsCoords.push(objFromElem);
          } else {
            higherElem = elem;
          }
        });
        let localTop = this.localCoordsObj.top;
        let localBottom = this.localCoordsObj.top+this.localCoordsObj.height;
        let localLeft = this.localCoordsObj.left;
        let localRight = this.localCoordsObj.left +this.localCoordsObj.width;
        let shouldBeLowerBlockCoords = runningElemsCoords.filter(elem => 
          ((localTop >= elem.top && localBottom >= elem.bottom) && (localLeft >= elem.left && localLeft <= elem.right)) 
          || ((localBottom >= elem.top && localBottom <= elem.bottom) && (localRight  >= elem.left && localRight <= elem.right))
          || ((localTop >= elem.top && localTop <= elem.bottom) && (localRight >= elem.left && localRight <= elem.right))
          || ((localBottom >= elem.top && localBottom <= elem.bottom) && (localLeft >= elem.left && localLeft <= elem.right))
          || ((localTop <= elem.top && localBottom >= elem.bottom)) && ((localLeft <= elem.left) &&  (localRight >= elem.right))
          || ((localTop >= elem.top) && (localBottom <= elem.bottom)) && ((localLeft >= elem.left) && (localRight <= elem.right))
          || ((localTop <= elem.top) && (localBottom >= elem.bottom)) && ((localLeft >= elem.left) && (localRight <= elem.right))
          || ((localTop >= elem.top) && (localBottom <= elem.bottom)) && ((localLeft <= elem.left) && (localRight >= elem.right))
           )
        if(shouldBeLowerBlockCoords.length){
          let shouldBeLowerBlock = Array.from(elems).filter(elem => 
            this.removeUnitsOfMeasure(elem.style.top) == shouldBeLowerBlockCoords[0].top 
            && this.removeUnitsOfMeasure(elem.style.left) == shouldBeLowerBlockCoords[0].left 
            && (+this.removeUnitsOfMeasure(elem.style.width) + this.removeUnitsOfMeasure(elem.style.left)) == shouldBeLowerBlockCoords[0].right
            && (this.removeUnitsOfMeasure(elem.style.height) + this.removeUnitsOfMeasure(elem.style.top) == shouldBeLowerBlockCoords[0].bottom));
            
            shouldBeLowerBlock[0].style.zIndex = 4;
            this.reCountZIndexes(higherElem, shouldBeLowerBlock[0]);
        }
      },

      reCountZIndexes(higher, lower) {
        if(higher && lower) {
          let elems = document.querySelectorAll('.resizable-component');
          elems.forEach(elem => elem.style.zIndex = 0);
          higher.style.zIndex = 5;
          lower.style.zIndex = 4;
        }
      },

      isEqualToClickedBlock(arrLikeElem){
        return this.removeUnitsOfMeasure(arrLikeElem.style.left) === Math.trunc(this.localCoordsObj.left) && this.removeUnitsOfMeasure(arrLikeElem.style.top) === Math.trunc(this.localCoordsObj.top);
      },

      removeUnitsOfMeasure(unit){
        return +unit.match(/\d*/);
      },

      emitRemoveBlock() {
        this.$emit('removeBlock', this.blockId);
      }
    },  

    computed: {
      computedBorderColor() {
        return this.colors[this.blockId];
      },

      computedTop() {
        return this.computedUnit.top;
      },

      computedLeft() {
        return this.computedUnit.left;
      },

      computedHeight() {
        return this.computedUnit.height;
      },

      computedWidth() {
        return this.computedUnit.width;
      },
    },
 }
  
</script>
<style scoped lang="scss">
  .vue-resizable {
    z-index: 0;
  }
  .block {
    position: absolute;
    width: 100%;
    height: 100%;
    color: black;
    font-size: 20px;
    font-weight: 600;
    opacity: 0.8;
    z-index: auto;
    border-radius: 5px;
  }
  .title {
    height: 25px;
    width: 100%;
    border-bottom: 1px solid black;
  }
  .resizable-component {
    position: absolute!important;
    left: 0
  }
  .text {
    font-size: 14px;
  }
  .close {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    right: 5px;
    bottom: 5px;
    width: 32px;
    height: 32px;
    border: 1px solid black;   
    border-radius: 5px;
  }
  .close:hover {
    opacity: 1;
  }
  .close:before, .close:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 15px;
    width: 2px;
    background-color: black;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
</style>