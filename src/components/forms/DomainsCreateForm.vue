<template>

 <q-expansion-item
        expand-separator
        label="Add Domain"
        expand-icon-class="expand"
        header-class="headerClass"
        default-opened
        style="border-bottom: 1px solid #00808057; background: #fafafa"
        class="q-pb-md"
       

      >
       <q-card flat >
              
            <div class="q-mt-md"></div>
            <q-card-section class="q-pt-none">
                <q-input outlined v-model="name" label="Name" :dense="dense" hint="Hint: Kindly follow this pattern: google.com, facebook.com " />
              </q-card-section>

        


              <q-card-section class="q-pt-none">
                  <div class="editFlex">
                      <q-btn color="primary"   label="Save" @click.prevent="create()" />
                      <q-btn color="primary" outline label="Close" @click.prevent="close()" />
                  </div>
              </q-card-section>

               <q-inner-loading :showing="$store.state.domains.is_loading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>

             
            </q-card>
      </q-expansion-item>




</template>


<script>
export default {
    name: "DomainsCreateForm",
     data() {
    return {
       dense: true,
       visible: true,
    };
  },
  computed: {
      name:  {
        get() { return this.$store.getters["domains/fetchName"]; },
        set(value){ this.$store.commit('domains/UPDATE_NAME',value); }   
      },
  },
  methods: {
    create(){ this.$store.dispatch('domains/create',this); },
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