<template>
    
      <q-expansion-item
        expand-separator
        label="Edit Module"
        expand-icon-class="expand"
        header-class="headerClass"
        default-opened
        style="border-bottom: 1px solid #00808057; background: #fafafa"
        class="q-pb-md"
       

      >
       <q-card flat >
              
            <div class="q-mt-md"></div>

            <q-card-section class="q-pt-none">
                <q-select color="grey-3" outlined :dense="dense"  v-model="name" :options="$store.state.roles_details.dependencies.modules" label="Module">
                </q-select>
              </q-card-section>

            
             <div class="permission">
                <q-item>
                <q-item-section>
                  <!-- <q-item-label>Single line item</q-item-label> -->
                  <q-item-label caption lines="10">
                    <div class="q-gutter-sm">
                            <q-checkbox size="xs" v-model="primary_access" val="create" label="Create" color="primary" />
                            <q-checkbox size="xs" v-model="primary_access" val="read" label="Read" color="primary" />
                            <q-checkbox  size="xs" v-model="primary_access" val="edit" label="Edit" color="primary" />
                            <q-checkbox size="xs" v-model="primary_access" val="delete" label="Delete" color="primary" />
                          </div>
                  </q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>Primary Access</q-item-label>
                  <q-icon name="star" color="primary" />
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                
                  <!-- <q-item-label>Single line item</q-item-label> -->
                  <q-item-label caption lines="2">
                    <div class="q-gutter-sm">
                            <q-checkbox size="xs" v-model="secondary_access" val="create" label="Create" color="secondary" />
                            <q-checkbox size="xs" v-model="secondary_access" val="read" label="Read" color="secondary" />
                            <q-checkbox  size="xs" v-model="secondary_access" val="edit" label="Edit" color="secondary" />
                            <q-checkbox size="xs" v-model="secondary_access" val="delete" label="Delete" color="secondary" />
                    </div>
                  </q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>Secondary Access</q-item-label>
                  <q-icon name="star" color="secondary" />
                </q-item-section>
              </q-item>

                 <q-item>
                <q-item-section>
                  <!-- <q-item-label>Single line item</q-item-label> -->
                  <q-item-label caption lines="10">
                    <div class="q-gutter-sm">
                             <q-checkbox size="xs" v-model="tertiary_access" val="create" label="Create" color="info" />
                            <q-checkbox size="xs" v-model="tertiary_access" val="read" label="Read" color="info" />
                            <q-checkbox  size="xs" v-model="tertiary_access" val="edit" label="Edit" color="info" />
                            <q-checkbox size="xs" v-model="tertiary_access" val="delete" label="Delete" color="info" />
                    </div>
                  </q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>Tertiary Access</q-item-label>
                  <q-icon name="star" color="info" />
                </q-item-section>
              </q-item>
             </div>



              


              

              <q-card-section class="q-pt-md">
                  <div class="editFlex">
                      <q-btn color="primary"   label="Update" @click.prevent="update()" />
                      <q-btn color="primary" outline label="Close" @click.prevent="close()" />
                  </div>
              </q-card-section>

              <q-inner-loading :showing="$store.state.roles_details.is_loading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>

             
            </q-card>
      </q-expansion-item>
</template>


<script>
export default {
    name: "RolesModuleUpdateForm",
     data() {
    return {
       dense: true,
       visible: true,
    };
  },
  computed: {
      name:  {
        get() { return this.$store.getters["roles_details/fetchModuleName"]; },
        set(value){ this.$store.commit('roles_details/UPDATE_MODULE_NAME',value); }   
      },
      primary_access:  {
        get() { return this.$store.getters["roles_details/fetchModulePrimaryAccess"]; },
        set(value){ this.$store.commit('roles_details/UPDATE_MODULE_PRIMARY_ACCESS',value); }   
      },
      secondary_access:  {
        get() { return this.$store.getters["roles_details/fetchModuleSecondaryAccess"]; },
        set(value){ this.$store.commit('roles_details/UPDATE_MODULE_SECONDARY_ACCESS',value); }   
      },
      tertiary_access:  {
        get() { return this.$store.getters["roles_details/fetchModuleTertiaryAccess"]; },
        set(value){ this.$store.commit('roles_details/UPDATE_MODULE_TERTIARY_ACCESS',value); }   
      },
     
  },
  methods: {
    update(){ this.$store.dispatch('roles_details/updateModule',this); },
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