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
                <q-input outlined v-model="name" label="Name" :dense="dense"  readonly/>
              </q-card-section>

              <q-card-section class="q-pt-none">
                 <div v-if="typeof category === 'string' ">
                      <q-select color="grey-3" readonly  outlined :dense="dense" emit-value v-model="category" :options="$store.state.modules.dependencies.categories" label="Category">
                      </q-select>
                 </div>

                 <div v-if="typeof category == 'object' ">
                      <q-select color="grey-3"  readonly outlined :dense="dense" emit-value v-model="category.id" :options="$store.state.modules.dependencies.categories" label="Category">
                      </q-select>
                 </div>
               
                  
               
              </q-card-section>

              <q-card-section class="q-pt-none">
                 
                <q-select color="grey-3"  outlined :dense="dense" emit-value v-model="approval" :options="$store.state.modules.dependencies.approvals" label="Approval">
                </q-select>
               
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

             <q-inner-loading :showing="$store.state.modules.is_loading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>

             
            </q-card>
      </q-expansion-item>



      
</template>


<script>
export default {
    name: "ModulesUpdateForm",
     data() {
    return {
       dense: true,
       visible: true,
    };
  },
  computed: {
      name:  {
        get() { return this.$store.getters["modules/fetchName"]; },
        set(value){ this.$store.commit('modules/UPDATE_NAME',value); }   
      },
      description: {
        get(){ return this.$store.getters["modules/fetchDescription"]; },
        set(value){ this.$store.commit('modules/UPDATE_DESCRIPTION',value); }   
      },
      category: {
        get(){ return this.$store.getters["modules/fetchCategory"]; },
        set(value){ this.$store.commit('modules/UPDATE_CATEGORY',value); }   
      },
       approval: {
        get(){ return this.$store.getters["modules/fetchApproval"]; },
        set(value){ this.$store.commit('modules/UPDATE_APPROVAL',value); }   
      },
      
  },
  methods: {
    update(){ this.$store.dispatch('modules/update',this); },
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