<template>
    <div class="q-pa-md">
                    <q-table
                    flat
                    
                    :data="datas"
                    :columns="$store.state.roles.columns"
                    row-key="name"
                    :filter="filter"
                    :loading="$store.state.roles.loading"
                     :table-header-style="{textTransform: 'uppercase'}"
                     :pagination="$store.state.roles.initialPagination"
                    >

                    

                    <template v-slot:body="props">
                      

                        <q-tr :props="props">
                            <q-td key="id" :props="props">
                                {{ props.pageIndex+1 }} 
                            </q-td>
                            <q-td key="name" :props="props">
                                {{ props.row.name }} 
                            </q-td>
                           
                            <q-td key="timestamp" :props="props">
                                <q-btn flat  icon="visibility" padding="xs" class="editIcon" @click.prevent="props.expand = !props.expand">
                                    <q-tooltip>
                                      View
                                    </q-tooltip>
                                </q-btn>
                                <q-btn flat  icon="delete_outline" padding="xs" class="deleteIcon" @click.prevent="deleteItem(props.row.id)" >
                                     <q-tooltip>
                                       Delete
                                    </q-tooltip>
                                </q-btn>

                            </q-td>
                        </q-tr>
                        <q-tr v-show="props.expand" :props="props">

                            <q-td colspan="100%">
                                <div class="text-left">

                                    <app-roles-list-tile  :row="props.row"></app-roles-list-tile>

                                </div>
                            </q-td>
                        </q-tr>
                    </template>


                    <template v-slot:top>
                      <q-icon name="file_download" style="color: #ccc; font-size: 1.8em;" @click.prevent="exportable()">
                           <q-tooltip>
                             Export
                           </q-tooltip>
                      </q-icon>
                      <q-icon name="add" style="color: #ccc; font-size: 1.8em;" @click.prevent="showCreateForm()">
                           <q-tooltip>
                             Create
                           </q-tooltip>
                      </q-icon>
                         <q-space />
                        <q-input borderless dense debounce="300" color="primary"  placeholder="search" v-model="filter">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                        </q-input>
                    </template>

                  


         
                    

                    </q-table>
                </div>
</template>

<script>
import Vue from 'vue';
import RolesListTile from '../listtiles/RolesListTile'
export default Vue.extend({
    name: "RolesListView",
    components: {
        "app-roles-list-tile": RolesListTile
    },
    data(){
        return {

            
        }
    },
    computed: {
     filter:  {
        get() { return this.$store.getters["roles/fetchFilter"]; },
        set(value){ this.$store.commit('roles/UPDATE_FILTER',value); }   
      },
      datas: {
           get: function() { return this.$store.getters["roles/fetchData"]; },
           set: function(value){ this.$store.commit('roles/UPDATE_DATA',value); }
      },
       columns: {
           get() { return this.$store.getters["roles/fetchColumns"]; },
           set(value){ this.$store.commit('roles/UPDATE_COLUMNS',value); }
      }

   },
   methods: {
      async deleteItem(id){
         this.$store.dispatch('roles/delete', id);
      },
     
      showCreateForm(){
          this.$store.commit('roles/CLEAR_FORM_DATA');
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-roles-create-form');
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true);
      },
      exportable(){

      }
   }
})
</script>