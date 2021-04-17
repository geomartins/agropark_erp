<template>
    <q-page>
        <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab
              icon="add"
              direction="up"
              color="accent"
            >
              <q-fab-action  color="primary" icon="person_add" @click="$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true)" />
              <q-fab-action  color="primary" icon="mail" />
            </q-fab>
          </q-page-sticky> -->


          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <div class="q-pa-md">
                    <q-table
                    flat
                    
                    :data="data"
                    :columns="columns"
                    row-key="name"
                    :filter="filter"
                    :loading="loading"
                     :table-header-style="{textTransform: 'uppercase'}"
                     :pagination="initialPagination"
                    >

                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="category" :props="props">
                                {{ props.row.name }} 
                            </q-td>
                           
                            <q-td key="created_at" :props="props">
                                <q-btn flat  icon="visibility" padding="xs" class="editIcon" @click="props.expand = !props.expand">
                                    <q-tooltip>
                                      View
                                    </q-tooltip>
                                </q-btn>
                                <q-btn flat  icon="mode" padding="xs" class="editIcon"  >
                                     <q-tooltip>
                                      Edit
                                    </q-tooltip>
                                </q-btn>
                                <q-btn flat  icon="delete_outline" padding="xs" class="deleteIcon" >
                                     <q-tooltip>
                                       Delete
                                    </q-tooltip>
                                </q-btn>
                                 <!-- <q-btn flat   color="primary" padding="xs" icon="mode_outline" />
                                 <q-btn flat   color="primary" padding="xs" icon="delete_outline" /> -->

                                <!-- <q-icon name="delete" size="xs" class="text-negative"  />
                                 <q-icon name="edit" size="xs" class="text-primary"  /> -->
                            </q-td>
                        </q-tr>
                        <q-tr v-show="props.expand" :props="props">

                            <q-td colspan="100%">
                                <div class="text-left">This is  {{ props.pageIndex }} expand slot for row above: {{  props.row.name  }}.</div>
                            </q-td>
                        </q-tr>
                    </template>


                    <template v-slot:top>
                      <q-icon name="file_download" style="color: #ccc; font-size: 1.8em;" @click="$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-module-categories-update-form')">
                           <q-tooltip>
                             Export
                           </q-tooltip>
                      </q-icon>
                      <q-icon name="add" style="color: #ccc; font-size: 1.8em;" @click="$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-module-categories-create-form')">
                           <q-tooltip>
                             Create
                           </q-tooltip>
                      </q-icon>
                         <q-space />
                        <q-input borderless dense debounce="300" color="primary" v-model="filter">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                        </q-input>
                    </template>

                  


         
                    

                    </q-table>
                </div>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
    </q-page>
</template>

<script>
import { exportFile } from 'quasar'

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}
export default {
  data () {
    return {
      initialPagination: {
        sortBy: 'name',
        descending: false,
        // page: 2,
        rowsPerPage: 3
        // rowsNumber: xx if getting data from a server
      },
      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'category',
          required: true,
          label: 'Module Categories',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'created_at', label: '', field: 'created_at', sortable: true }
      ],
      data: [
        {
         name: 'Website',
         description: 'Website related modues',
         created_at: '2020-04-01',
        },
         {
         name: 'Accounting',
         description: 'Accounting related modues',
         created_at: '2020-04-01',
        },
         {
         name: 'Administrative',
         description: 'Admin related modues',
         created_at: '2020-04-01',
        },
       
      ],
      original: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ]
    }
  },

  methods: {
   
     exportTable () {
      // naive encoding to csv format
      const content = [ this.columns.map(col => wrapCsvValue(col.label)) ].concat(
        this.data.map(row => this.columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        'table-export.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    },

    // emulate fetching data from server
    addRow () {
      this.loading = true
      setTimeout(() => {
        const
          index = Math.floor(Math.random() * (this.data.length + 1)),
          row = this.original[Math.floor(Math.random() * this.original.length)]
        if (this.data.length === 0) {
          this.rowCount = 0
        }
        row.id = ++this.rowCount
        const addRow = { ...row } // extend({}, row, { name: `${row.name} (${row.__count})` })
        this.data = [ ...this.data.slice(0, index), addRow, ...this.data.slice(index) ]
        this.loading = false
      }, 500)
    },

    removeRow () {
      this.loading = true
      setTimeout(() => {
        const index = Math.floor(Math.random() * this.data.length)
        this.data = [ ...this.data.slice(0, index), ...this.data.slice(index + 1) ]
        this.loading = false
      }, 500)
    }
  }
}
</script>


<style scoped>
.q-table thead tr, .q-table tbody td {
    height: 54px;
}

.deleteIcon, .editIcon{
    /* color: #898989; */
    color: #ccc;
    font-size: .65rem;
    cursor: pointer;
}

.deleteIcon:hover{
    color: red;
}

.editIcon:hover{
    color: teal;
}
</style>