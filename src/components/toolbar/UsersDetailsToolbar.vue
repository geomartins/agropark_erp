<template>
     <div class="mini_toolbar shadow-1">
                      <div class="mini_toolbar__item">
                         <q-icon name="settings_suggest"  @click.prevent="showSettingForm()" >
                             <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                                 Settings
                             </q-tooltip>
                         </q-icon>
                      </div>
                      <div class="mini_toolbar__item">
                         <q-icon name="add_moderator" @click.prevent="showResetForm()">
                             <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                                 Change Password
                             </q-tooltip>
                         </q-icon>
                      </div>

                      <div class="mini_toolbar__item" @click="showAvatarForm">
                         <q-icon name="face" >
                             <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                                Update Avatar
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
    },
    methods: {
        showResetForm(){
            this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-users-reset-create-form');
            this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true);
        },
        showSettingForm(){
            this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-users-setting-update-form');
            this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true);
        },
        showAvatarForm(){
            this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-users-avatar-update-form');
            this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true);
        }
    }
}
</script>