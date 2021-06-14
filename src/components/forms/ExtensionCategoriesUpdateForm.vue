<template>

  <q-expansion-item
        expand-separator
        label="Edit Extension Category"
        expand-icon-class="expand"
        header-class="headerClass"
        default-opened
        style="border-bottom: 1px solid #00808057; background: #fafafa"
        class="q-pb-md"
       

      >
       <q-card flat >
              
            <div class="q-mt-md"></div>

             <q-card-section class="q-pt-none">
                <q-input outlined v-model="name" label="Name" :dense="dense" readonly />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input type="textarea" outlined v-model="description" label="Description" :dense="dense" />
              </q-card-section>



              <q-card-section class="q-pt-none">
                  <div class="editFlex">
                     <q-btn color="primary" outline  label="Update" @click.prevent="update()" />
                      <q-btn color="negative" outline label="Close" @click.prevent="close()" />
                  </div>
              </q-card-section>

              <q-inner-loading :showing="$store.state.extension_categories.is_loading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>

             
            </q-card>
      </q-expansion-item>
      
</template>


<script>
export default {
    name: "ExtensionCategoriesUpdateForm",
     data() {
    return {
       dense: true,
       visible: true,
    };
  },
  computed: {
      name:  {
        get() { return this.$store.getters["extension_categories/fetchName"]; },
        set(value){ this.$store.commit('extension_categories/UPDATE_NAME',value); }   
      },
      description: {
        get(){ return this.$store.getters["extension_categories/fetchDescription"]; },
        set(value){ this.$store.commit('extension_categories/UPDATE_DESCRIPTION',value); }   
      },
  },
  methods: {
    update(){ this.$store.dispatch('extension_categories/update',this); },
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