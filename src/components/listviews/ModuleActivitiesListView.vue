<template>
    <div class="q-pa-md">
                    <q-table
                    flat
                    
                    :data="datas"
                    :columns="$store.state.module_activities.columns"
                    row-key="id"
                    :filter="filter"
                    :loading="$store.state.module_activities.loading"
                     :table-header-style="{textTransform: 'uppercase'}"
                     :pagination="$store.state.module_activities.initialPagination"
                    >

                    

                    <template v-slot:body="props">
                      

                        <q-tr :props="props" >
                            <q-td key="id" :props="props">
                                {{ props.pageIndex+1 }} 
                            </q-td>
                            <q-td key="name" :props="props"> 
                                {{ props.row.module | filterModule }} 
                            </q-td>
                            <q-td key="action" :props="props">
                                {{ props.row.action }} 
                            </q-td>
                            <q-td key="activity" :props="props">
                                {{ props.row.activity }} 
                            </q-td>
                            <q-td key="author" :props="props">
                                {{ props.row.author | filterAuthor }} 
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

                                    <app-module-activities-list-tile  :row="props.row"></app-module-activities-list-tile>

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
import Vue from 'vue'
import ModuleActivitiesListTile from '../listtiles/ModuleActivitiesListTile'
import filters from '../../repositories/filters';
export default Vue.extend({
    name: "ModuleActivitiesListView",
    mixins: [filters],
    components: {
        "app-module-activities-list-tile": ModuleActivitiesListTile
    },
    data(){
        return {

        }
    },
    computed: {
     filter:  {
        get() { return this.$store.getters["module_activities/fetchFilter"]; },
        set(value){ this.$store.commit('module_activities/UPDATE_FILTER',value); }   
      },
      datas: {
           get: function() { return this.$store.getters["module_activities/fetchData"]; },
           set: function(value){ this.$store.commit('module_activities/UPDATE_DATA',value); }
      },
       columns: {
           get() { return this.$store.getters["module_activities/fetchColumns"]; },
           set(value){ this.$store.commit('module_activities/UPDATE_COLUMNS',value); }
      }

   },
   methods: {
      async deleteItem(id){
         this.$store.dispatch('module_activities/delete', id);
      },
      exportable(){

      }
   }
})
</script>