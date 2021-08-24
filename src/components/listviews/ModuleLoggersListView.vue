<template>
    <div class="">
        <q-table flat grid separator="cell" :data="datas" :columns="columns" row-key="id"  :loading="loading" :pagination="initialPagination" :table-header-style="{textTransform: 'uppercase'}" hide-pagination  >
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
                                    <q-icon  name="star" color="secondary" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card>
                </div>
            </template>
             <template v-slot:top>
        
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          color="primary"
          placeholder="search"
          v-model="filter"
          disable
        >
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
import filters from '../../repositories/filters';
import methods from '../../repositories/methods';
export default Vue.extend({
    name: "ModuleLoggersListView",
    mixins: [filters, methods],
    props: {
        datas: Array,
        loading: Boolean
    },
    components: {},
    data(){
        return {
             columns: [
                // { name: 'id', label: 'S/N', field: 'id', sortable: true, style: 'width: 5px', },
                { name: 'action', required: true, label: '', align: 'left', field: 'action', sortable: true },
                // { name: 'timestamp', label: '', field: 'created_at', sortable: true }
            ],
            initialPagination: {
                sortBy: "name",
                descending: false,
                //page: 2,
                rowsPerPage: 0
                // rowsNumber: xx if getting data from a server
            },

        }
    },
     watch: {
        filter(newValue, oldValue) {
            this.$store.dispatch("modules/searchModuleNotifier", newValue);
        }
    },
    computed: {
    filter: {
      get() {
        return this.$store.getters["modules/fetchModuleNotifierFilter"];
      },
      set(value) {
        this.$store.commit("modules/UPDATE_MODULE_NOTIFIER_FILTER", value);
      }
    }
  },

    
   methods: {
     
   }
})
</script>