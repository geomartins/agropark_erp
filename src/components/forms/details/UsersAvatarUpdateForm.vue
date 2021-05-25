<template>
    
      <q-expansion-item
        expand-separator
        label="Update Avatar"
        expand-icon-class="expand"
        header-class="headerClass"
        default-opened
        style="border-bottom: 1px solid #00808057; background: #fafafa"
        class="q-pb-md"

      >
       <q-card flat >
              
            <div class="q-mt-md"></div>

              

               <!-- <q-card-section class="q-pt-none">
                <q-input type="textarea"  outlined v-model="address" label="Address" :dense="dense" />
              </q-card-section> -->


           

             <q-card-section class="q-pt-none">
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
    name: "UsersAvatarUpdateForm",
     data() {
    return {
       dense: true,
       visible: true,
    };
  },
  computed: {
    //  fullname:  {
    //     get() { return this.$store.getters["users_details/fetchKinFullname"]; },
    //     set(value){ this.$store.commit('users_details/UPDATE_KIN_FULLNAME',value); }   
    //   },
     
     
     
  },
  methods: {
    update(){ this.$store.dispatch('users_details/updateAvatar',this); },
    close(){ this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false) }
  }
}
</script>

<style>
.editFlex{
    display: flex;
flex-direction: row;
justify-content: flex-start;
}

.editFlex button{
    margin-right: 10px;
}
</style>