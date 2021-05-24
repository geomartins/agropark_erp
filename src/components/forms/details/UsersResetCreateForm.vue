<template>
    
      <q-expansion-item
        expand-separator
        label="Change Password"
        expand-icon-class="expand"
        header-class="headerClass"
        default-opened
        style="border-bottom: 1px solid #00808057; background: #fafafa"
        class="q-pb-md"
      >
       <q-card flat >
              
            <div class="q-mt-md"></div>

             <q-card-section class="q-pt-none">
                <q-input type="password" outlined v-model="password" label="Password" :dense="dense" />
              </q-card-section>

               <q-card-section class="q-pt-none">
                <q-input type="password" outlined v-model="confirm_password" label="Confirm Password" :dense="dense" />
              </q-card-section>

              


            <q-card-section class="q-pt-none">
                  <div class="editFlex">
                      <q-btn color="primary"   label="Update" @click.prevent="create()" />
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
    name: "UsersResetCreateForm",
     data() {
    return {
       dense: true,
       visible: true,
    };
  },
  computed: {
      password:  {
        get() { return this.$store.getters["users_details/fetchResetPassword"]; },
        set(value){ this.$store.commit('users_details/UPDATE_RESET_PASSWORD',value); }   
      },
      confirm_password:  {
        get() { return this.$store.getters["users_details/fetchResetConfirmPassword"]; },
        set(value){ this.$store.commit('users_details/UPDATE_RESET_CONFIRM_PASSWORD',value); }   
      },
     
  },
  methods: {
    create(){ this.$store.dispatch('users_details/createReset',this); },
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