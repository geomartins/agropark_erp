<template>
    <div class="q-pa-md">
      <q-table grid :card-container-class="cardContainerClass" title="Treats" :data="datas" :columns="columns" row-key="name" :filter="filter" hide-header :pagination="initialPagination">
        <template v-slot:top>
            <q-icon name="file_download" style="color: #ccc; font-size: 1.8em;" @click.prevent="exportable()">
                <q-tooltip> Export </q-tooltip>
            </q-icon>
            <q-icon name="add" style="color: #ccc; font-size: 1.8em;" @click.prevent="showCreateForm()">
                <q-tooltip> Create </q-tooltip>
            </q-icon>
            <q-space />
            <q-input borderless dense debounce="300" color="primary"  placeholder="search" v-model="filter">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section style="padding: 0.5rem" >
              <q-list>
                    <q-item style="padding: 4px 8px">
                        <q-item-section avatar>
                            <q-icon color="primary" name="whatshot" />
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>{{ props.row.name.toUpperCase()}}</q-item-label>
                            <q-item-label caption>{{ props.row.category }} </q-item-label>
                        </q-item-section>

                         <q-item-section side top>
                            <q-item-label caption>&#x20A6; {{ props.row.price }} / {{ props.row.measurement }} </q-item-label>
                            
                        </q-item-section>
                    </q-item>

                
                </q-list>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-start bg-tertiary" style="padding: 0.5rem" >
                <q-icon name="more_vert" size="sm" class="absolute-bottom-right q-mr-xs q-mb-sm cursor-pointer non-selectable" style="color: #cccccc">
                    <q-menu  transition-show="flip-right" transition-hide="flip-left" >
                        <q-list dense style="min-width: 100px">
                        <q-item clickable v-close-popup disable>
                            <q-item-section>Crop Type</q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable v-close-popup @click.prevent="editItem(props.row)">
                            <q-item-section>Edit Crop</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click.prevent="deleteItem(props.row.id)">
                            <q-item-section>Delete Crop</q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable v-close-popup disable>
                            <q-item-section>Stocks</q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable v-close-popup>
                            <q-item-section>Add Stock</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section>Remove Stock</q-item-section>
                        </q-item>
                        
                        </q-list>
                    </q-menu>
                </q-icon>

                 <q-chip color="transparent">
                      <q-tooltip> Available Stock </q-tooltip>
                      <q-avatar icon="bookmark" style="background: #9e9e9e57"  text-color="white" />
                       {{ props.row.inventory_refs.available_stock }}
                </q-chip>

                <q-chip color="transparent">
                      <q-tooltip> Reserved Stock </q-tooltip>
                      <q-avatar icon="bookmark" style="background: #9e9e9e57"  text-color="white" />
                        {{ props.row.inventory_refs.reserved_stock }}
                </q-chip>
                <q-chip color="transparent">
                      <q-tooltip> Unattended Request </q-tooltip>
                      <q-avatar icon="bookmark" style="background: #9e9e9e57"  text-color="white" />
                        {{ props.row.request_refs.unattended }}
                </q-chip>

           
              <!-- <div>
                <q-btn flat  icon="visibility" size="xs" padding="xs" class="editIcon" @click.prevent="$router.push('/admin/seed_banks/'+props.row.id)" >
                    <q-tooltip>
                        View
                    </q-tooltip>
                </q-btn>
                <q-btn flat  icon="mode" padding="xs" size="xs" class="editIcon" @click.prevent="editItem(props.row)" >
                        <q-tooltip>
                        Edit
                    </q-tooltip>
                </q-btn>
                <q-btn flat  icon="delete_outline" padding="xs" size="xs" class="deleteIcon" @click.prevent="deleteItem(props.row.id)" >
                        <q-tooltip>
                        Delete
                    </q-tooltip>
                </q-btn>

              </div> -->
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>


                </div>
</template>

<script>
import Vue from 'vue';
import filters from '../../repositories/filters'
import { exportTable } from '../../repositories/plugins'
export default Vue.extend({
    name: "SeedBanksCropTypesListView",
    mixins: [filters],
    props: {
        datas: Array,
    },
    components: {
       
    },
    data(){
        return {
            filter: '',
            exportableColumns: [
                { label: 'UID', field: 'id'},
                { label: 'NAME', field: row => row.name},
                { label: 'CATEGORY', field: row => row.category},
                { label: 'PRICE', field: row => row.price},
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
                { name: 'name', required: true, label: 'Crop Types', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true },
                { name: 'category', required: true, label: 'Categories', align: 'left', field: row => row.category, format: val => `${val}`, sortable: true },
                { name: 'price', required: true, label: 'Price', align: 'left', field: row => row.price, format: val => `${val}`, sortable: true },
                { name: 'timestamp', label: '', field: 'created_at', sortable: true }
            ]
        }
    },
   
   methods: {
      async deleteItem(id){
         this.$store.dispatch('seed_banks/deleteCropType', id);
      },
      editItem(payload){
          this.$store.commit('seed_banks/CLEAR_CROP_TYPES_FORM_DATA');
          this.$store.commit('seed_banks/UPDATE_EDIT_CROP_TYPES_FORM_DATA',payload);
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-seed-banks-crop-types-update-form'); 
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true)

      },
      showCreateForm(){
          this.$store.commit('seed_banks/CLEAR_CROP_TYPES_FORM_DATA');
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-seed-banks-crop-types-create-form'); 
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true)
      },
      exportable(){
          exportTable(this.exportableColumns, this.datas,'seed-banks-crop-types');

      }
   }
})
</script>

<style lang="sass">
.grid-masonry
  flex-direction: column
  height: 700px

  &--2
    > div
      &:nth-child(2n + 1)
        order: 1
      &:nth-child(2n)
        order: 2

    &:before
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 1
  &--3
    > div
      &:nth-child(3n + 1)
        order: 1
      &:nth-child(3n + 2)
        order: 2
      &:nth-child(3n)
        order: 3

    &:before,
    &:after
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 2
</style>
