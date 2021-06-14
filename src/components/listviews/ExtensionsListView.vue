<template>
    <div class="q-pa-md">
                    <q-table
                    flat :data="datas" :columns="columns" row-key="name" :filter="filter" :loading="loading" :table-header-style="{textTransform: 'uppercase'}" :pagination="initialPagination" >

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

                                    <app-extensions-list-tile  :row="props.row"></app-extensions-list-tile>

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
import ExtensionsListTile from '../listtiles/ExtensionsListTile'
import filters from '../../repositories/filters'
import { exportTable } from '../../repositories/plugins'
export default Vue.extend({
    name: "ExtensionsListView",
    props: {
        datas: Array,
        loading: Boolean,
    },
    mixins: [filters],
    components: {
        "app-extensions-list-tile": ExtensionsListTile
    },
    data(){
        return {
             exportableColumns: [
                { label: 'UID', field: 'id'},
                { label: 'NAME', field: row => row.name},
                 { label: 'CATEGORY', field: row => row.category},
                { label: 'DESCRIPTION', field: row => row.description},
                { label: 'CREATED AT', field: row => row.createdAt, format: (val, row) => filters.filters.toRealDate(val)  }
            ],
            initialPagination: {
                sortBy: 'name',
                descending: false,
                //page: 2,
                rowsPerPage: 0
                // rowsNumber: xx if getting data from a server
            },
            columns: [
                { name: 'id', label: 'S/N', field: 'id', sortable: true, style: 'width: 5px', },
                { name: 'name', required: true, label: 'Extension', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true},
                { name: 'timestamp', label: '', field: 'created_at', sortable: true }
            ],


        }
    },
     watch: {
        filter(newValue, oldValue) {
            this.$store.dispatch('extensions/search',newValue);
        }
    },
    computed: {
     filter:  {
        get() { return this.$store.getters["extensions/fetchFilter"]; },
        set(value){ this.$store.commit('extensions/UPDATE_FILTER',value); }   
      },
   },
   methods: {
      async deleteItem(id){
         this.$store.dispatch('extensions/delete', id);
      },
      editItem(payload){
          this.$store.commit('extensions/CLEAR_FORM_DATA');
          this.$store.commit('extensions/UPDATE_EDIT_FORM_DATA',payload);
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-extensions-update-form'); 
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true)

      },
      showCreateForm(){
          this.$store.commit('extensions/CLEAR_FORM_DATA');
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-extensions-create-form');
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true);
      },
      exportable(){
          exportTable(this.exportableColumns, this.datas,'extensions');
      }
   }
})
</script>