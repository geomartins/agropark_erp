<template>

   <q-expansion-item
        expand-separator
        label="Add Crop Type"
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



             <div class="splitTwoFlex">
             <q-card-section class="q-pt-none">
              <q-select outlined stack-label dense v-model="category" :options="$store.state.seed_banks.dependencies.categories" label="Category"  options-selected-class="text-deep-orange">
                    <template v-slot:option="scope">
                        <q-item
                            v-bind="scope.itemProps"
                            v-on="scope.itemEvents"
                        >
                           
                            <q-item-section>
                            <q-item-label v-html="scope.opt.name" />
                            <q-item-label caption>measured in {{ scope.opt.measurement }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
             </q-card-section>


              <q-card-section class="q-pt-none">
                <q-input outlined v-model="price"  label="Price" :dense="dense" mask="#.##" fill-mask="0" reverse-fill-mask   />
              </q-card-section>

             </div>

              <q-card-section class="q-pt-none">
                <q-input outlined v-model="description" label="Description" :dense="dense" />
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
    name: "SeedBanksCropTypesCreateForm",
     data() {
    return {
       dense: true,
       visible: true,
    };
  },
  computed: {
      name:  {
        get() { return this.$store.getters["seed_banks/fetchCropTypesName"]; },
        set(value){ this.$store.commit('seed_banks/UPDATE_CROP_TYPES_NAME',value); }   
      },
      category: {
        get(){ return this.$store.getters["seed_banks/fetchCropTypesCategory"]; },
        set(value){ this.$store.commit('seed_banks/UPDATE_CROP_TYPES_CATEGORY',value); }   
      },
      price: {
        get(){ return this.$store.getters["seed_banks/fetchCropTypesPrice"]; },
        set(value){ this.$store.commit('seed_banks/UPDATE_CROP_TYPES_PRICE',value); }   
      },
      description: {
        get(){ return this.$store.getters["seed_banks/fetchCropTypesDescription"]; },
        set(value){ this.$store.commit('seed_banks/UPDATE_CROP_TYPES_DESCRIPTION',value); }   
      },
  },
  methods: {
    create(){ this.$store.dispatch('seed_banks/createCropType',this); },
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