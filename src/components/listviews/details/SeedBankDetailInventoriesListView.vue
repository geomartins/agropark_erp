<template>
    <div class="" >
    <q-list padding >
       <q-card flat>
          <q-card-section>
            <q-table  :expanded.sync="expanded" :loading="loading" separator="cell" :data="datas" :columns="columns" flat row-key="id" :pagination="initialPagination"  :filter="filter">
                <template v-slot:top>
                    <div class="headerFlex">
                        <q-icon name="add" size="sm" style="color: #ccc; font-size: 1.8em;" class="q-pr-md" @click.prevent="showCreateForm('add')">
                            <q-tooltip>Add Stock</q-tooltip>
                        </q-icon>
                        <q-icon name="remove" size="sm" style="color: #ccc; font-size: 1.8em;" class="q-pr-md" @click.prevent="showCreateForm('remove')">
                            <q-tooltip>Remove Stock</q-tooltip>
                        </q-icon>
                        <q-space />
                       
                       <div class="stocklabel">
                            <q-chip square>
                                <q-avatar color="secondary" text-color="white">{{ docFormData.inventory_refs.available_stock }}</q-avatar>
                                Available Stock 
                            </q-chip>
                            <q-chip square>
                                <q-avatar color="red" text-color="white">{{ docFormData.inventory_refs.reserved_stock }}</q-avatar>
                                Reserved Stock 
                            </q-chip>
                       </div>
                       
                    </div>
                </template>


              

                <template v-slot:body="props">
                    <q-tr :props="props">
                       
                        <q-td key="id" :props="props">
                            {{ props.pageIndex+1 }} 
                        </q-td>
                        <q-td key="type" :props="props">

                            <q-icon name="add"  color="secondary" size="sm" v-if="props.row.type == 'add'">
                                <q-tooltip>
                                    Stock Added
                                </q-tooltip>
                            </q-icon>

                            <q-icon name="remove"  color="red" size="sm" v-if="props.row.type == 'remove'">
                                <q-tooltip>
                                    Stock Removed
                                </q-tooltip>
                            </q-icon>
                           
                        </q-td>
                        <q-td key="quantity" :props="props">
                            {{ props.row.quantity }}
                        </q-td>
                        <q-td key="available_stock" :props="props">
                            {{ props.row.new_seed_bank_refs.available_stock }}
                        </q-td>
                        <q-td key="reserved_stock" :props="props">
                            {{ props.row.new_seed_bank_refs.reserved_stock }}
                        </q-td>
                        <q-td key="createdAt" :props="props">
                            {{ props.row.createdAt | toRealDate }}

                             <q-toggle v-model="props.expand" checked-icon="add" unchecked-icon="remove" />
                        </q-td>
                    </q-tr>

                     <q-tr v-show="props.expand" :props="props">
                        <q-td colspan="100%">
                            <div class="text-left">
                                <app-seed-bank-detail-inventories-list-tile :row="props.row"></app-seed-bank-detail-inventories-list-tile>
                            </div>
                        </q-td>
                    </q-tr>
                </template>

            </q-table>
          </q-card-section>
        </q-card>

    </q-list>
  </div>
</template>

<script>

import filters from '../../../repositories/filters'
import SeedBankDetailInventoriesListTile from '../../listtiles/SeedBankDetailInventoriesListTile.vue'
export default {
    name: "SeedBankInventoriesListView",
    mixins: [filters],
    components: {
        "app-seed-bank-detail-inventories-list-tile": SeedBankDetailInventoriesListTile
    },
    props: {
      loading: Boolean,
      datas: Array,
      docFormData: Object
    },
    data(){
         return {
            expanded: [],
            initialPagination: {
              sortBy: 'name',
              descending: false,
              rowsPerPage: 25
            },
            filter: '',
            columns: [
                { name: 'id', label: 'S/N',  align: 'left', field: 'id', sortable: true, style:"width: 40px"  ,classes: 'bg-grey-2 ellipsis',},
                { name: 'type', required: true, label: 'TYPE', align: 'left', sortable: true, style:"width: 40px"  },
                { name: 'quantity', required: true, label: 'QUANTITY', align: 'left', sortable: true, style:"width: 40px", classes: 'bg-grey-2 ellipsis'  },
                { name: 'available_stock', required: true, label: 'AVAILABLE STOCK', align: 'left', sortable: true , style:"width: 40px", classes: 'bg-grey-2 ellipsis', },
                { name: 'reserved_stock', required: true, label: 'RESERVED STOCK', align: 'left',  sortable: true, style:"width: 40px",  },
                { name: 'createdAt', label: 'DATE',  align: 'right', field: 'createdAt', sortable: true, classes: 'bg-grey-1 ellipsis',}
            ],

      
      }
    },
    methods: {
       showCreateForm(type){
          
          this.$store.commit('seed_bank_details/CLEAR_INVENTORY_FORM_DATA');
          this.$store.commit('seed_bank_details/UPDATE_INVENTORY_TYPE',type);
          this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-seed-bank-inventory-create-form');
          this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true);
       },
      async showInventory(){
          this.$store.dispatch('seed_bank_details/fetchInventories',this).then(() => {
            this.$store.dispatch('seed_bank_details/fetchInventoryDependencies', this);
          })

      }
    }
}
</script>

<style>
.stocklabel{
    display: flex; 
    flex-direction: row;
}

@media (min-width: 0px) and (max-width: 600px){
    .stocklabel{
        flex-direction: column;
    }
}
</style>
