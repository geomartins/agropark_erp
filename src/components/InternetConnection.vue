<template>
  <offline @detected-condition="handleConnectivityChange">
    <div slot="online">
       <span v-if='internet_status == false'  class="" >
          <div  class="animated lightSpeedIn delay-2s">
               <q-banner  >
                <template v-slot:avatar>
                    <q-icon name="signal_wifi_off" size="md" color="red" />
                </template>
                You have lost connection to the internet. This software is offline.
            </q-banner>
          </div>
      </span>
    </div>
  </offline>
</template>

<script>
import offline from 'v-offline';

export default {
  name: "InternetConnection",
  components: {
    offline
  },
  data(){
      return {
          internet_status: true
      }
  },
  watch:{
      internet_status(newV, oldV){
          console.log('Status  mehhhhhhh',newV )
      }
  },
  methods: {
    handleConnectivityChange(status) {
        this.internet_status =status;
    }
  },
}
</script>