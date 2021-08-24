<template>
    <div class="">

                    <q-table
                    flat
                    grid
                    
                    :data="datas"
                    :columns="columns"
                    row-key="id"
                    separator="cell"
                   
                    :loading="$store.state.users.loading"
                     :table-header-style="{textTransform: 'uppercase'}"
                     :pagination="initialPagination"
                     hide-pagination
                    >


                       ///////////


                     <template v-slot:item="props">
                                    <div class="q-pa-xs col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        
                                            <q-list bordered>
                                                <q-expansion-item
                                                    group="somegroup"
                                                    icon="person_outline"
                                                    :label="props.row.firstname+' '+ props.row.middlename+' '+props.row.lastname"
                                                    :caption="props.row.role"
                                                    :header-style="{textTransform: 'capitalize'}"
                                                    header-class="text-primary"
                                                >
                                                    <q-card>
                                                    <q-card-section>
                                                       
                                                        <app-users-list-tile  :row="props.row"></app-users-list-tile>
                                                        <div style="position: absolute; top: 10px; right: 0px">
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
                                                        </div>

                                                    </q-card-section>
                                                    </q-card>
                                                </q-expansion-item>                                               
                                            </q-list>
                                        
                                        <q-separator/>
                                    </div>
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

                  








                    //////////////


                  
                  


         
                    

                    </q-table>
                </div>
</template>

<script>
import Vue from 'vue';
import UsersListTile from '../listtiles/UsersListTile'
import { exportTable } from '../../repositories/plugins'
import filters from '../../repositories/filters'
export default Vue.extend({
    name: "UsersListView",
    mixins: [filters],
    components: {
        "app-users-list-tile": UsersListTile
    },
    data(){
        return {
            exportableColumns: [
                { label: 'UID', field: 'id'},
                { label: 'FIRSTNAME', field: row => row.firstname},
                { label: 'MIDDLENAME', field: row => row.middlename},
                { label: 'LASTNAME', field: row => row.lastname},
                { label: 'EMAIL', field: row => row.email},
                { label: 'ROLE', field: row => row.role },
                { label: 'CREATED AT', field: row => row.createdAt, format: (val, row) => filters.filters.toRealDate(val)  }
            ],
            columns: [
                { name: 'id', label: 'S/N', field: 'id', sortable: true, style: 'width: 5px', align: 'left'},
                {
                name: 'name',
                required: true,
                label: 'Fullname',
                align: 'left',
                field: row => row.firstname,
                format: val => `${val}`,
                sortable: true
                },
                { name: 'role', label: 'Role', field: 'role', sortable: true, align: 'left', },
                { name: 'timestamp', label: '', field: 'created_at', sortable: true, align: 'left', }
            ],
            initialPagination: {
                sortBy: 'name',
                descending: false,
                //page: 2,
                rowsPerPage: 0
                // rowsNumber: xx if getting data from a server
            },

        }
    },
    watch: {
        filter(newValue, oldValue) {
            this.$store.dispatch('users/search',newValue);
        }
    },
    computed: {
      filter: {
           get: function() { return this.$store.getters["users/fetchFilter"]; },
           set: function(value){ this.$store.commit('users/UPDATE_FILTER',value); }
      },
      datas: {
           get: function() { return this.$store.getters["users/fetchData"]; },
           set: function(value){ this.$store.commit('users/UPDATE_DATA',value); }
      },

   },
   methods: {
      async deleteItem(id){
         this.$store.dispatch('users/delete', id);
      },
      editItem(payload){
          this.$store.commit('users/CLEAR_FORM_DATA');
          this.$store.commit('users/UPDATE_EDIT_FORM_DATA',payload);
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-users-update-form'); 
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true)

      },
      showCreateForm(){
          this.$store.commit('users/CLEAR_FORM_DATA');
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-users-create-form');
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true);
      },
      exportable(){
          exportTable(this.exportableColumns, this.datas,'users-list');

      }
   }
})
</script>