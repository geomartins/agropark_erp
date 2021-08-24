<template>
  <q-page class="flex flex-center">
     <p @click="sendMessage('hello world')"> Dashboard Under Construction</p>
  </q-page>
</template>

<script>
export default {
  name: 'Dashboard',
  meta: {
    titleTemplate: title => `Dashboard - ${title}  `,
  },
  data(){
    return {
      connection: null
    }
  },
  methods: {
     async main(){
        this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Dashboard' })
    },
    sendMessage(message){
      console.log(this.connection)
      this.connection.send(message);
    }

  },
  beforeMount() {
    this.main();
  },
  created(){
    
    console.log("Starting connection to websocket server")
    this.connection = new WebSocket("wss://echo.websocket.org")

    this.connection.onopen = function(event) {
      console.log(event);
      console.log("successfully connected to websocket server")
    }

    this.connection.onmessage = function(event) {
      console.log(event);
      console.log("yeeeeeeeeeeeeeee")
    }
  }
}
</script>
