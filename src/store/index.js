import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blocks: [
      { id: 0, top: 100, left: 120, width: 300, height: 100 },
      { id: 1, top: 10, left: 220, width: 300, height: 100 },
      { id: 2, top: 343, left: 129, width: 300, height: 100 },
      { id: 3, top: 400, left: 343, width: 300, height: 100 },
      { id: 4, top: 290, left: 277, width: 300, height: 100 }
    ],
    gridSize: { width: null, height: null },
    blockSize: { width: 300, height: 100 },
    removedBlocks: []
  },
  mutations: {
    moveUp(state, value) {
      let elem = state.blocks[value];
      if (elem.top > 10) {
        elem.top -= 10;
      } else {
        elem.top = 0;
      }
      localStorage.setItem('lastSessionData', JSON.stringify(state.blocks));      
    },
    moveDown(state, value) {
      let elem = state.blocks[value];
      if (elem.top < 520) {
        elem.top += 10;
      } else {
        elem.top = 515;
      }
      localStorage.setItem('lastSessionData', JSON.stringify(state.blocks));  
    },
    moveLeft(state, value) {
      let elem = state.blocks[value];
      if (elem.left > 10) {
        elem.left -= 10;
      } else {
        elem.left = 0;
      } 
      localStorage.setItem('lastSessionData', JSON.stringify(state.blocks)); 
    },
    moveRight(state, value) {
      let elem = state.blocks[value];
      if (elem.left < state.gridSize.width-state.blockSize.width) {
        elem.left += 10;
      } else {
        elem.left = state.gridSize.width-state.blockSize.width;
      } 
      localStorage.setItem('lastSessionData', JSON.stringify(state.blocks)); 
    },
    changeGridSize(state, value) {
      state.gridSize.width = Math.round(value)
    },
    rewriteBlockSettings(state, value) {
      let assignGoal;
      state.blocks.forEach((elem, index) => {
        if (elem.id === value.id) {
          assignGoal = index;
        }
      });
        state.blocks[assignGoal] = Object.assign(state.blocks[assignGoal], value);
    },
    addPreviousDeletedBlock(state, value){
      state.blocks.forEach(elem => {        
        if(elem.id === value.id) {
          Object.assign(elem, value);
        }
      })
      let alreadyExists = state.blocks.some(elem => elem.id === value.id);
      if(!alreadyExists){
        state.blocks.push(value);
      }
        localStorage.setItem('lastSessionData', JSON.stringify(state.blocks));
    },
    removeBlockFromList(state, value) {
      let removableBlock;
      let deleteFrom;
      state.blocks.forEach((elem, index) => {
        if (elem.id === value){
          removableBlock = elem;
          deleteFrom = index;
        }
      })
      state.blocks.splice(deleteFrom, 1);

      let alreadyExists = state.removedBlocks.some(elem => elem.id === value);
       if(!alreadyExists){
        state.removedBlocks.push(removableBlock);
      }
      localStorage.setItem('lastSessionData', JSON.stringify(state.blocks));
      localStorage.setItem('removedBlocksList', JSON.stringify(state.removedBlocks));
    },
    resetRemovedBlock(state, value) {
      state.removedBlocks.forEach(elem => {        
        if(elem.id === value.id) {
          Object.assign(elem, value);
        }
      })
    },
    setRestBlocksFromLocalStorage(state, value) {
        state.blocks.splice(0, 5, ...value);
    },
    setRemovedBlocksFromLocalStorage(state, value) {
      state.removedBlocks.splice(0, 5, ...value);
    },
    addUpdatedBlocksToLocalStorage(state) {
      localStorage.setItem('lastSessionData', JSON.stringify(state.blocks));
    },
    addUpdatedRemovedListToLocalStorage(state) {
      localStorage.setItem('removedBlocksList', JSON.stringify(state.removedBlocks));
    },
    deleteFromRemovedBlocksList(state, value) {
      let removeFromIndex;
      state.removedBlocks.forEach((elem,index) => {
        if(elem.id === value.id) {
          removeFromIndex = index;
        }
      })
      state.removedBlocks.splice(removeFromIndex, 1)
      localStorage.setItem('removedBlocksList', JSON.stringify(state.removedBlocks));
    } 
  },
  actions: {
    setFromLocalStorage({commit}, value){
      if(localStorage.getItem('lastSessionData')){
        commit('rewriteBlockSettings', value);
      }      
    },
    renewCoordsAndPushToLocalStorage({commit}, value){
      commit('rewriteBlockSettings', value);
      commit('addUpdatedBlocksToLocalStorage');      
    },
    removeAction({commit}, value) {
      commit('removeBlockFromList', value);
      commit('addUpdatedRemovedListToLocalStorage');
    }
  },
  modules: {
  },
  getters: {
    computedUnits: state => {
      return state.blocks;
    },
    removedUnits: state => {
      return state.removedBlocks;
    }
  }
})
