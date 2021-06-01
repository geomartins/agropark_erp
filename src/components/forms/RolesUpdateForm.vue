<template>
    <q-expansion-item
        expand-separator
        label="Edit Role"
        expand-icon-class="expand"
        header-class="headerClass"
        default-opened
        style="border-bottom: 1px solid #00808057; background: #fafafa"
        class="q-pb-md"
       

      >
       <q-card flat >
              
            <div class="q-mt-md"></div>

            
              <q-card-section class="q-pt-none">
                <q-input outlined v-model="name" label="Name" :dense="dense" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input type="textarea" outlined v-model="description" label="Description" :dense="dense" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                  <div class="editFlex">
                      <q-btn color="primary"   label="Update" @click.prevent="update()" />
                      <q-btn color="primary" outline label="Close" @click.prevent="close()" />
                  </div>
              </q-card-section>

              <q-inner-loading :showing="$store.state.roles.is_loading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>

             
            </q-card>
      </q-expansion-item>
      
</template>


<script>
export default {
    name: "RolesUpdateForm",
     data() {
    return {
       dense: true,
       visible: true,
    };
  },
  computed: {
      name:  {
        get() { return this.$store.getters["roles/fetchName"]; },
        set(value){ this.$store.commit('roles/UPDATE_NAME',value); }   
      },
      description: {
        get(){ return this.$store.getters["roles/fetchDescription"]; },
        set(value){ this.$store.commit('roles/UPDATE_DESCRIPTION',value); }   
      },
  },
  methods: {
    update(){ this.$store.dispatch('roles/update',this); },
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