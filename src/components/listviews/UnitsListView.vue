<template>
    <div class="q-pa-md">
                    <q-table
                    flat
                    
                    :data="datas"
                    :columns="$store.state.units.columns"
                    row-key="name"
                    :filter="filter"
                    :loading="$store.state.units.loading"
                     :table-header-style="{textTransform: 'uppercase'}"
                     :pagination="$store.state.units.initialPagination"
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
                                <q-btn flat  icon="visibility" padding="xs" class="editIcon" @click="props.expand = !props.expand">
                                    <q-tooltip>
                                      View
                                    </q-tooltip>
                                </q-btn>
                                <q-btn flat  icon="mode" padding="xs" class="editIcon" @click.prevent="editItem(props.row)" >
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
                        <q-tr v-show="props.expand" :props="props">

                            <q-td colspan="100%">
                                <div class="text-left">

                                    <app-units-list-tile  :row="props.row"></app-units-list-tile>

                                </div>
                            </q-td>
                        </q-tr>
                    </template>


                    <template v-slot:top>
                      <q-icon name="file_download" style="color: #ccc; font-size: 1.8em;" @click="exportable()">
                           <q-tooltip>
                             Export
                           </q-tooltip>
                      </q-icon>
                      <q-icon name="add" style="color: #ccc; font-size: 1.8em;" @click="showCreateForm()">
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
import UnitsListTile from '../listtiles/UnitsListTile'
export default {
    name: "UnitsListView",
    components: {
        "app-units-list-tile": UnitsListTile
    },
    data(){
        return {

        }
    },
    computed: {
     filter:  {
        get() { return this.$store.getters["units/fetchFilter"]; },
        set(value){ this.$store.commit('units/UPDATE_FILTER',value); }   
      },
      datas: {
           get: function() { return this.$store.getters["units/fetchData"]; },
           set: function(value){ this.$store.commit('units/UPDATE_DATA',value); }
      },
       columns: {
           get() { return this.$store.getters["units/fetchColumns"]; },
           set(value){ this.$store.commit('units/UPDATE_COLUMNS',value); }
      }

   },
   methods: {
      async deleteItem(id){
         this.$store.dispatch('units/delete', id);
      },
      editItem(payload){
          this.$store.commit('units/UPDATE_EDIT_FORM_DATA',payload);
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-units-update-form'); 
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true)

      },
      showCreateForm(){
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-units-create-form');
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true);
      },
      exportable(){

      }
   }
}
</script>