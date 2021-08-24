<template>
    <div class="q-pa-sm" >
    <q-list padding >
      <q-expansion-item
        expand-separator
        label="Extensions"
        expand-icon-class="expand"
        header-class="headerClass"
        dense
        icon="widgets"
        default-opened
        
      >
     
      
        <q-card>
          <q-card-section>
             <q-table :loading="loading" :data="datas" :columns="columns" flat row-key="name" :pagination="initialPagination"  :filter="filter"
    >

    <template v-slot:top>
          <div class="headerFlex">
              <q-icon name="add" size="sm" style="color: #ccc; font-size: 1.8em;" class="q-pr-md" @click.prevent="showCreateForm()">
                   <q-tooltip>Add</q-tooltip>
              </q-icon>

                <q-space />
                        <q-input borderless dense debounce="300" color="primary"  placeholder="search" v-model="filter">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                        </q-input>

          </div>
    </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.pageIndex+1 }} 
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>

           <q-td key="approval_box" :props="props">
               <span v-for="(box, index) in props.row.approval_box" :key="index+'333'" class="q-ml-xs">
                   <q-badge color="secondary" outline>{{ box }}</q-badge>
               </span>
             
            
          </q-td>

          
         
          
          <q-td key="createdAt" :props="props">
            <q-btn flat  icon="mode" padding="xs" class="editIcon"  @click.prevent="editItem(props.row)">
                    <q-tooltip>
                    Edit
                </q-tooltip>
            </q-btn>
            <q-btn flat  icon="delete_outline" padding="xs" class="deleteIcon" @click.prevent="deleteItem(props.row.id)" >
                    <q-tooltip>
                    Delete 
                </q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>


       



    </q-table>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      
    </q-list>
  </div>
</template>

<script>
export default {
    name: "RolesExtensionListView",
    props: {
      loading: Boolean,
      datas: Array,
    },
    data(){
         return {
            initialPagination: {
              sortBy: 'name',
              descending: false,
              //page: 2,
              rowsPerPage: 25
              // rowsNumber: xx if getting data from a server
            },
            filter: '',
            columns: [
                { name: 'id', label: 'S/N',  align: 'left', field: 'id', sortable: true, style:"width: 40px" },
                { name: 'name', required: true, label: 'Extension Name', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
                { name: 'approval_box', required: true, label: 'Approval Box', align: 'left', field: row => row.approval_box, format: val => `${val}`, sortable: true },
                { name: 'createdAt', label: '',  align: 'right', field: 'createdAt', sortable: true }
            ],

      
      }
    },
    methods: {
        async deleteItem(id){
         this.$store.dispatch('roles_details/deleteExtensionById',id);
        },
        editItem(payload){
          this.$store.commit('roles_details/CLEAR_EXTENSION_FORM_DATA');
          this.$store.commit('roles_details/UPDATE_EXTENSION_FORM_DATA', payload);
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-roles-extension-update-form'); 
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true)

        },
        showCreateForm(){
          this.$store.commit('roles_details/CLEAR_EXTENSION_FORM_DATA');
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-roles-extension-create-form');
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true);
       },
      
    }
}
</script>

<style>


</style>