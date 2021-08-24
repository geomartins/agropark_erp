<template>
  <div class="q-pt-sm">
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
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <q-list bordered>
            <q-expansion-item
              group="somegroup"
              icon="gesture"
              :caption="props.row.category"
              :label="props.row.name"
              header-class="text-primary"
            >
              <q-card>
                <q-card-section>
                  <app-modules-list-tile
                    :row="props.row"
                  ></app-modules-list-tile>
                  <div style="position: absolute; top: 10px; right: 0px">
                    <q-btn
                      flat
                      icon="mode"
                      padding="xs"
                      class="editIcon"
                      @click.prevent="editItem(props.row)"
                    >
                      <q-tooltip>
                        Edit
                      </q-tooltip>
                    </q-btn>
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
    </q-table>
  </div>
</template>

<script>
import Vue from "vue";
import ModulesListTile from "../listtiles/ModulesListTile";
import filters from "../../repositories/filters";
import { exportTable } from "../../repositories/plugins";
export default Vue.extend({
  name: "ModulesListView",
  props: {
    datas: Array,
    loading: Boolean
  },
  mixins: [filters],
  components: {
    "app-modules-list-tile": ModulesListTile
  },
  data() {
    return {
      exportableColumns: [
        { label: "UID", field: "id" },
        { label: "NAME", field: row => row.name },
        { label: "CATEGORY", field: row => row.category },
        { label: "DESCRIPTION", field: row => row.description },
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
          label: "Modules",
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
      this.$store.dispatch("modules/search", newValue);
    }
  },
  computed: {
    filter: {
      get() {
        return this.$store.getters["modules/fetchFilter"];
      },
      set(value) {
        this.$store.commit("modules/UPDATE_FILTER", value);
      }
    }
  },
  methods: {
    async deleteItem(id) {
      this.$store.dispatch("modules/delete", id);
    },
    editItem(payload) {
      this.$store.commit("modules/CLEAR_FORM_DATA");
      this.$store.commit("modules/UPDATE_EDIT_FORM_DATA", payload);
      this.$store.commit(
        "admin_layout/UPDATE_COMPONENT_NAME",
        "app-modules-update-form"
      );
      this.$store.commit("admin_layout/UPDATE_RIGHT_DRAWER_OPEN", true);
    },
    showCreateForm() {
      this.$store.commit("modules/CLEAR_FORM_DATA");
      this.$store.commit(
        "admin_layout/UPDATE_COMPONENT_NAME",
        "app-modules-create-form"
      );
      this.$store.commit("admin_layout/UPDATE_RIGHT_DRAWER_OPEN", true);
    },
    exportable() {
      exportTable(this.exportableColumns, this.datas, "modules");
    }
  }
});
</script>
