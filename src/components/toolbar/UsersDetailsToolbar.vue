<template>
     <div class="mini_toolbar shadow-1">
                      <div class="mini_toolbar__item">
                         <q-icon name="settings_power"  >
                             <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                                 Download
                             </q-tooltip>
                         </q-icon>
                      </div>
                      <div class="mini_toolbar__item">
                         <q-icon name="settings_suggest"  >
                             <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                                 Upload
                             </q-tooltip>
                         </q-icon>
                      </div>
                      <div class="mini_toolbar__item">
                         <q-icon name="settings_power" >
                             <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                                 Change Password
                             </q-tooltip>
                         </q-icon>
                      </div>

                      <div class="mini_toolbar__item">
                         <q-icon name="settings_power" >
                             <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                                Block Account
                             </q-tooltip>
                         </q-icon>
                      </div>
                      
                      
                  </div>
</template>


<script>
export default {
    name: "UsersDetailsToolbar",
    data(){
        return {

        }
    }
}
</script>