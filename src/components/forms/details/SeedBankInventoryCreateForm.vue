<template>
    
      <q-expansion-item expand-separator  :label="type == 'add' ? 'Add Stock' : 'Remove Stock'" expand-icon-class="expand" :header-class="type == 'add' ? 'text-primary' : 'text-red'" default-opened style="border-bottom: 1px solid #00808057; background: #fafafa" class="q-pb-md">
       <q-card flat >
            <div class="q-mt-md"></div>
            <q-card-section class="q-pt-none">
                  <q-input outlined v-model="quantity"  label="Quantity" :dense="dense" mask="#.##" fill-mask="0"  reverse-fill-mask  >
                    <template v-slot:append>
                      <q-btn round dense flat :icon="type == 'add' ? 'add' : 'remove'" />
                    </template>
                  </q-input>
            </q-card-section>

              <q-card-section class="q-pt-md">
                  <div class="editFlex">
                      <q-btn :color="type == 'add' ? 'primary' : 'red'"   :label="type == 'add' ? 'Add' : 'Remove'" @click.prevent="create()" />
                      <q-btn :color="type == 'add' ? 'primary' : 'red'"  outline label="Close" @click.prevent="close()" />
                  </div>
              </q-card-section>

              <q-inner-loading :showing="$store.state.seed_bank_details.is_loading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>

             
            </q-card>
      </q-expansion-item>
</template>


<script>
export default {
    name: "SeedBankInventoryCreateForm",
     data() {
    return {
       dense: true,
       visible: true,
       
    };
  },
  computed: {
      quantity:  {
        get() { return this.$store.getters["seed_bank_details/fetchInventoryQuantity"]; },
        set(value){ 
            this.$store.commit('seed_bank_details/UPDATE_INVENTORY_QUANTITY',+value);
        }   
      },
      type:  {
        get() { return this.$store.getters["seed_bank_details/fetchInventoryType"]; },
        set(value){ this.$store.commit('seed_bank_details/UPDATE_INVENTORY_TYPE',value); }   
      },
     
  },
  methods: {
    create(){ this.$store.dispatch('seed_bank_details/createInventory',this); },
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