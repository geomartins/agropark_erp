<template>
    
      <q-expansion-item
        expand-separator
        label="Edit Bank Details"
        expand-icon-class="expand"
        header-class="headerClass"
        default-opened
        style="border-bottom: 1px solid #00808057; background: #fafafa"
        class="q-pb-md"
       

      >
       <q-card flat >
              
            <div class="q-mt-md"></div>

              <q-card-section class="q-pt-none">
                <q-select color="grey-3" outlined :dense="dense"  v-model="name" :options="$store.state.users_details.dependencies.banks" label="Bank Name">
                </q-select>
            </q-card-section>

             <q-card-section class="q-pt-none">
                <q-input outlined v-model="account_number" label="Account Number" :dense="dense" />
              </q-card-section>


               <q-card-section class="q-pt-none">
                <q-input outlined v-model="account_holder_name" label="Account Holder Name" :dense="dense" />
              </q-card-section>

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
    name: "UsersBankUpdateForm",
     data() {
    return {
       dense: true,
       visible: true,
    };
  },
  computed: {
      name:  {
        get() { return this.$store.getters["users_details/fetchBankName"]; },
        set(value){ this.$store.commit('users_details/UPDATE_BANK_NAME',value); }   
      },
      account_number:  {
        get() { return this.$store.getters["users_details/fetchBankAccountNumber"]; },
        set(value){ this.$store.commit('users_details/UPDATE_BANK_ACCOUNT_NUMBER',value); }   
      },
      account_holder_name:  {
        get() { return this.$store.getters["users_details/fetchBankAccountHolderName"]; },
        set(value){ this.$store.commit('users_details/UPDATE_BANK_ACCOUNT_HOLDER_NAME',value); }   
      },

     
     
  },
  methods: {
    update(){ this.$store.dispatch('users_details/updateBank',this); },
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