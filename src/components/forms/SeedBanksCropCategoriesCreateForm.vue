<template>

   <q-expansion-item
        expand-separator
        label="Add Crop Category"
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
                <q-select color="grey-3" outlined :dense="dense"  v-model="measurement" :options="$store.state.seed_banks.dependencies.measurements" label="Measurement">
                </q-select>
              </q-card-section>

              


              <q-card-section class="q-pt-none">
                  <div class="editFlex">
                      <q-btn color="primary"   label="Save" @click.prevent="create()" />
                      <q-btn color="primary" outline label="Close" @click.prevent="close()" />
                  </div>
              </q-card-section>

             <q-inner-loading :showing="$store.state.seed_banks.is_loading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>

             
            </q-card>
      </q-expansion-item>
</template>


<script>
export default {
    name: "SeedBanksCropCategoriesCreateForm",
     data() {
    return {
       dense: true,
       visible: true,
    };
  },
  computed: {
      name:  {
        get() { return this.$store.getters["seed_banks/fetchCropCategoriesName"]; },
        set(value){ this.$store.commit('seed_banks/UPDATE_CROP_CATEGORIES_NAME',value); }   
      },
      measurement: {
        get(){ return this.$store.getters["seed_banks/fetchCropCategoriesMeasurement"]; },
        set(value){ this.$store.commit('seed_banks/UPDATE_CROP_CATEGORIES_MEASUREMENT',value); }   
      },
  },
  methods: {
    create(){ this.$store.dispatch('seed_banks/createCropCategory',this); },
    close(){ this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)}
  },

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