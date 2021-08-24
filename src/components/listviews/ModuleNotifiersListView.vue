<template>
    <div class="">
        <q-table flat grid separator="cell" :data="datas" :columns="columns" row-key="id"  :loading="$store.state.module_notifiers.loading"  :table-header-style="{textTransform: 'uppercase'}" :pagination="initialPagination">
            <template v-slot:item="props">
                <div class="q-pa-xs col-xs-12 col-sm-12 col-md-12">
                    <q-card flat>
                        <q-list> <!-- class="bg-grey-2" -->
                            <q-item clickable @click.prevent="$router.push('/admin/'+props.row.module)">
                                <q-item-section>
                                    <q-item-label>{{ props.row.title.toLowerCase() }}</q-item-label>
                                    <q-item-label caption lines="2"> {{ props.row.message }} </q-item-label>
                                </q-item-section>

                                <q-item-section side top>
                                    <q-item-label caption>{{ time_ago(props.row.timestamp.toDate()) }}  </q-item-label>
                                    <q-icon v-if="props.row.seen == false" name="star" :color="props.row.seen == true ? 'bg-grey-1' : 'secondary'" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card>
                </div>
            </template>
        </q-table>
    </div>
</template>

<script>
import Vue from 'vue'
import filters from '../../repositories/filters';
import methods from '../../repositories/methods';
export default Vue.extend({
    name: "ModuleNotifiersListView",
    mixins: [filters, methods],
    components: {
       
    },
    data(){
        return {
             columns: [
                // { name: 'id', label: 'S/N', field: 'id', sortable: true, style: 'width: 5px', },
                { name: 'action', required: true, label: '', align: 'left', field: 'action', sortable: true },
                // { name: 'timestamp', label: '', field: 'created_at', sortable: true }
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
    computed: {
      datas: {
           get: function() { return this.$store.getters["module_notifiers/fetchData"]; },
           set: function(value){ this.$store.commit('module_notifiers/UPDATE_DATA',value); }
      },

   },
   methods: {
     
   }
})
</script>