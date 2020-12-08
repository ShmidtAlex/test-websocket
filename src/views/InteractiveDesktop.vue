<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <DeletedElements :buttons="buttons" @pushToLocalStore="updateLocalStore"/>
    <Grid ref="gridMethods" />
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue'
import DeletedElements from '@/components/DeletedElements.vue'
export default {
  name: 'InteractiveDesktop',
  components: {
    Grid,
    DeletedElements
  },
  data(){
    return {
      buttons: this.$store.state.removedBlocks ? this.$store.state.removedBlocks : []
    }
  },
  methods: {
    updateLocalStore(value) {
      this.$refs.gridMethods.addPreviousDeletedBlock(value);
    }
  }
}
</script>
<style scoped lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
</style>
