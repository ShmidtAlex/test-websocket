<template>
  <div class="main">
    <div class="action-block">
      <button @click='sendMessage' class="start">Запуск</button>
      <button @click="stopConnection" class="stop">Остановка</button>
      <button @click="resetData" class="reset">Сброс</button>
    </div>
    <div class="data">
      <table>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Sum</th>
        </tr>
        <tr v-for="(item, index) in items" :key="index">
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Connection',
    data(){
      return {
        items: [],
        connection: null
      }
    },
    created() {
      console.log("Starting connection to WebSocket Server")
      this.connection = new WebSocket("wss://ws.blockchain.info/inv")

      this.connection.onmessage = (event) => {
        console.log('onmessage', JSON.parse(event.data));
        this.items.push(event.data)
      }

      
      // this.connection.onclose = function(evt) { console.log('evt', evt); this.onClose(evt) };
    },
    methods: {
      sendMessage() {
        // console.log('start')
        // this.connection.onopen = (event) => {
        //   console.log(event)
        // }
        this.connection.send(JSON.stringify({"op":"unconfirmed_sub"}))
          console.log("Successfully connected to the echo websocket server...")
      },
      stopConnection(){
        console.log('stopped')
        this.connection.close()
        // this.connection.onclose = function(evt) { console.log('evt', evt); this.onClose(evt) };
      },
      resetData(){
        console.log('data reseted')
      }
    }
  }
</script>
<style lang="scss">
  .main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    max-width: 1200px;
    height: 800px;
    background-color: lightgray;
    .action-block {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 100px;
      button{
        border-radius: 5px;
        min-width: fit-content;
        width: 15%;
        outline: none;
        border: 1px solid black;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }
      .start {
        background-color: seagreen;
      }
      .stop {
        background-color: firebrick;
      }
      .reset {
        background-color: darkorange;
      }
    }
    .data {
      display: flex;
      width: 95%;
      height: 85%;
      table {
        width: 100%;
        height: fit-content;
        border: 1px solid black;
        border-collapse: collapse;
      }
      tr, th, td {
        border: 1px solid black;
      }
      tr {
        height: 100px;
      }
      th, td {
        width: 40%;
      }
      th:last-child, td:last-child {
        width: 20%;
      }
    }
    
  }
</style>

