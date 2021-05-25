<template>
    
      <q-expansion-item
        expand-separator
        label="Edit Next Of Kin"
        expand-icon-class="expand"
        header-class="headerClass"
        default-opened
        style="border-bottom: 1px solid #00808057; background: #fafafa"
        class="q-pb-md"
       

      >
       <q-card flat >
              
            <div class="q-mt-md"></div>

              <q-card-section class="q-pt-none">
                <q-input outlined v-model="fullname" label="Fullname" :dense="dense" />
              </q-card-section>

               <q-card-section class="q-pt-none">
                  <q-input outlined v-model="telephone" label="Telephone" :dense="dense" mask="(###) ### - #####"
                fill-mask
                unmasked-value
                hint="Mask: (###) ### - ####" />
              </q-card-section>

               <q-card-section class="q-pt-none">
                <q-input outlined v-model="occupation" label="Occupation" :dense="dense" />
              </q-card-section>

               <q-card-section class="q-pt-none">
                <q-input type="textarea"  outlined v-model="address" label="Address" :dense="dense" />
              </q-card-section>


            <q-card-section class="q-pt-none">
                <q-select color="grey-3" outlined :dense="dense"  v-model="relationship" :options="$store.state.users_details.dependencies.relationships" label="Relationship">
                </q-select>
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
    name: "UsersKinUpdateForm",
     data() {
    return {
       dense: true,
       visible: true,
    };
  },
  computed: {
     fullname:  {
        get() { return this.$store.getters["users_details/fetchKinFullname"]; },
        set(value){ this.$store.commit('users_details/UPDATE_KIN_FULLNAME',value); }   
      },
      telephone:  {
        get() { return this.$store.getters["users_details/fetchKinTelephone"]; },
        set(value){ this.$store.commit('users_details/UPDATE_KIN_TELEPHONE',value); }   
      },
      relationship:  {
        get() { return this.$store.getters["users_details/fetchKinRelationship"]; },
        set(value){ this.$store.commit('users_details/UPDATE_KIN_RELATIONSHIP',value); }   
      },
      address:  {
        get() { return this.$store.getters["users_details/fetchKinAddress"]; },
        set(value){ this.$store.commit('users_details/UPDATE_KIN_ADDRESS',value); }   
      },
      occupation:  {
        get() { return this.$store.getters["users_details/fetchKinOccupation"]; },
        set(value){ this.$store.commit('users_details/UPDATE_KIN_OCCUPATION',value); }   
      },
     
     
  },
  methods: {
    update(){ this.$store.dispatch('users_details/updateKin',this); },
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