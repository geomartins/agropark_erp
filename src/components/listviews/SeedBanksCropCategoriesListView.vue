<template>
    <div class="">
                    <q-table
                    flat
                    grid
                    :data="datas"
                    :columns="columns"
                    row-key="name"
                    :filter="filter"
                     :table-header-style="{textTransform: 'uppercase'}"
                     :pagination="initialPagination"
                      :separator="separator"
                    >


                    <template v-slot:item="props">
                                    <div class="q-pa-xs col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                        
                                            <q-list bordered>
                                                <q-expansion-item
                                                    group="somegroup"
                                                    icon="gesture"
                                                    :caption="props.row.measurement"
                                                    :label="props.row.name"
                                                    header-class="text-primary"
                                                >
                                                    <q-card>
                                                    <q-card-section>
                                                        <app-seed-banks-crop-categories-list-tile  :row="props.row"></app-seed-banks-crop-categories-list-tile>
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

                  


         
                    

                    </q-table>
                </div>
</template>

<script>
import Vue from 'vue';
import SeedBanksCropCategoriesListTile from '../listtiles/SeedBanksCropCategoriesListTile'
import filters from '../../repositories/filters'
import { exportTable } from '../../repositories/plugins'
export default Vue.extend({
    name: "SeedBanksCropCategoriesListView",
    mixins: [filters],
    props: {
        datas: Array,
    },
    components: {
        "app-seed-banks-crop-categories-list-tile": SeedBanksCropCategoriesListTile
    },
    data(){
        return {
            separator: 'cell',
            filter: '',
            exportableColumns: [
                { label: 'UID', field: 'id'},
                { label: 'CATEGORY', field: row => row.name},
                { label: 'MEASUREMENT', field: row => row.measurement},
                { label: 'CREATED AT', field: row => row.createdAt, format: (val, row) => filters.filters.toRealDate(val)  }
            ],

            initialPagination: {
                sortBy: 'name',
                descending: false,
                //page: 2,
                rowsPerPage: 20
                // rowsNumber: xx if getting data from a server
            },

            columns: [
                { name: 'id', label: 'S/N', field: 'id', sortable: true, style: 'width: 5px', },
                { name: 'category', required: true, label: 'Crop Categories', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
                { name: 'measurement', required: true, label: 'Measurement', align: 'left', field: row => row.measurement, format: val => `${val}`, sortable: true },
                { name: 'timestamp', label: '', field: 'created_at', sortable: true }
            ]
        }
    },
   
   methods: {
      async deleteItem(id){
         this.$store.dispatch('seed_banks/deleteCropCategory', id);
      },
      editItem(payload){
          this.$store.commit('seed_banks/CLEAR_CROP_CATEGORIES_FORM_DATA');
          this.$store.commit('seed_banks/UPDATE_EDIT_CROP_CATEGORIES_FORM_DATA',payload);
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-seed-banks-crop-categories-update-form'); 
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true)

      },
      showCreateForm(){
          this.$store.commit('seed_banks/CLEAR_CROP_CATEGORIES_FORM_DATA');
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-seed-banks-crop-categories-create-form'); 
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true)
      },
      exportable(){
          exportTable(this.exportableColumns, this.datas,'seed-banks-crop-categories');

      }
   }
})
</script>