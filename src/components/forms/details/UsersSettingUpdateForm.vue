<template>
    
      <q-expansion-item
        expand-separator
        label="Update Settings"
        expand-icon-class="expand"
        header-class="headerClass"
        default-opened
        style="border-bottom: 1px solid #00808057; background: #fafafa"
        class="q-pb-md"
       

      >
       <q-card flat >
              
            <div class="q-mt-md"></div>

            <q-list >
                
                <q-item tag="label" v-ripple>
                    <q-item-section>
                    <q-item-label>Visibility</q-item-label>
                    <q-item-label caption>Allow users login and search</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                    <q-toggle color="primary" v-model="visibility" />
                    </q-item-section>
                </q-item>

                
            </q-list>

             
             <q-card-section class="q-pt-md">
                  <div class="editFlex">
                      <q-btn color="primary"   label="Update" @click.prevent="update()" />
                      <q-btn color="primary" outline label="Close" @click.prevent="$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)" />
                  </div>
              </q-card-section>


              <q-inner-loading :showing="$store.state.users_details.is_loading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>

             
            </q-card>
      </q-expansion-item>
</template>


<script>
export default {
    name: "UsersPersonalInformationUpdateForm",
     data() {
    return {
       dense: true,
       visible: true,
       notifications: true
    };
  },
  computed: {
      visibility:  {
        get() { return this.$store.getters["users_details/fetchSettingVisibility"]; },
        set(value){ this.$store.commit('users_details/UPDATE_SETTING_VISIBILITY',value); }   
      },
      
  },
  methods: {
    update(){ this.$store.dispatch('users_details/updateSetting',this); },
    close(){ this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false) },
  }
}
</script>

<style>

</style>