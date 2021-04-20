<template>
       <q-card flat >
              
              <q-card-section>
                  <q-list bordered padding style="background: #cccccc52">
                    <q-item>
                      <q-item-section>
                           <q-item-label>Unit Edit Form</q-item-label>
                        <q-item-label overline>Kindly edit the unit details</q-item-label>
                       
                      </q-item-section>
                    </q-item>
                  </q-list>
              </q-card-section>

              <q-card-section class="q-pt-none">
               
                <q-input outlined v-model="name" label="Name" :dense="dense" />
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

              <q-inner-loading :showing="$store.state.units.is_loading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>

             
            </q-card>
</template>


<script>
export default {
    name: "UnitsUpdateForm",
     data() {
    return {
       dense: true,
       visible: true,
    };
  },
  computed: {
      name:  {
        get() { return this.$store.getters["units/fetchName"]; },
        set(value){ this.$store.commit('units/UPDATE_NAME',value); }   
      },
      description: {
        get(){ return this.$store.getters["units/fetchDescription"]; },
        set(value){ this.$store.commit('units/UPDATE_DESCRIPTION',value); }   
      },
  },
  methods: {
    update(){ this.$store.dispatch('units/update',this); },
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