<template>
  <div class="">
    <q-table
      flat
      grid
      :data="datas"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :loading="loading"
      :table-header-style="{ textTransform: 'uppercase' }"
      :pagination="initialPagination"
      hide-pagination
    >
      //////////////////////////////////////////

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-12 col-md-12 col-lg-6">
          <q-list bordered>
            <q-expansion-item
              group="somegroup"
              icon="public_off"
              :caption="props.row.provider"
              :label="props.row.name"
              header-class="text-primary"
            >
              <q-card>
                <q-card-section>
                  <app-domains-list-tile
                    :row="props.row"
                  ></app-domains-list-tile>
                  <div style="position: absolute; top: 10px; right: 0px">
                    <q-btn
                      flat
                      icon="delete_outline"
                      padding="xs"
                      class="deleteIcon"
                      @click.prevent="deleteItem(props.row.id)"
                    >
                      <q-tooltip>
                        Delete
                      </q-tooltip>
                    </q-btn>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>

          <q-separator />
        </div>
      </template>

      <template v-slot:top>
        <q-icon
          name="file_download"
          style="color: #ccc; font-size: 1.8em;"
          @click.prevent="exportable()"
        >
          <q-tooltip>
            Export
          </q-tooltip>
        </q-icon>
        <q-icon
          name="add"
          style="color: #ccc; font-size: 1.8em;"
          @click.prevent="showCreateForm()"
        >
          <q-tooltip>
            Create
          </q-tooltip>
        </q-icon>
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          color="primary"
          placeholder="search"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      ////////////////////////////////////////////
    </q-table>
  </div>
</template>

<script>
import Vue from "vue";
import DomainsListTile from "../listtiles/DomainsListTile";
import { exportTable } from "../../repositories/plugins";
import filters from "../../repositories/filters";
import methods from "../../repositories/methods";
export default Vue.extend({
  name: "DomainsListView",
  mixins: [filters, methods],
  props: {
    datas: Array,
    loading: Boolean
  },
  components: {
    "app-domains-list-tile": DomainsListTile
  },
  data() {
    return {
      exportableColumns: [
        { label: "UID", field: "id" },
        { label: "DOMAIN", field: row => row.name },
        { label: "PROVIDER", field: row => row.provider },
        { label: "NAMESERVER", field: row => row.nameserver },
        {
          label: "EXPIRY DATE",
          field: row => row.expiry_date,
          format: (val, row) => filters.filters.toRealDate(val)
        },
        {
          label: "CREATED AT",
          field: row => row.createdAt,
          format: (val, row) => filters.filters.toRealDate(val)
        }
      ],

      initialPagination: {
        sortBy: "name",
        descending: false,
        //page: 2,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },

      columns: [
        {
          name: "id",
          label: "S/N",
          field: "id",
          sortable: true,
          style: "width: 5px"
        },
        {
          name: "name",
          required: true,
          label: "Domains",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: "timestamp", label: "", field: "created_at", sortable: true }
      ]
    };
  },
  watch: {
    filter(newValue, oldValue) {
      this.$store.dispatch("domains/search", newValue);
    }
  },
  computed: {
    filter: {
      get() {
        return this.$store.getters["domains/fetchFilter"];
      },
      set(value) {
        this.$store.commit("domains/UPDATE_FILTER", value);
      }
    }
  },
  methods: {
    async deleteItem(id) {
      this.$store.dispatch("domains/delete", id);
    },
    showCreateForm() {
      this.$store.commit("domains/CLEAR_FORM_DATA");
      this.$store.commit(
        "admin_layout/UPDATE_COMPONENT_NAME",
        "app-domains-create-form"
      );
      this.$store.commit("admin_layout/UPDATE_RIGHT_DRAWER_OPEN", true);
    },
    exportable() {
      exportTable(this.exportableColumns, this.datas, "domains-list");
    }
  }
});
</script>
