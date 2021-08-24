<template>
  <div class="q-pb-sm">
    <q-list padding bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        label="Documents"
        expand-icon-class="expand"
        header-class="headerClass"
        @show="showDocuments()"
        dense
        icon="widgets"
      >
        <q-card>
          <q-card-section>
            <q-table
              :loading="loading"
              :data="datas"
              :columns="columns"
              flat
              row-key="name"
            >
              <template v-slot:top>
                <div class="headerFlex">
                  <q-icon
                    name="add"
                    size="sm"
                    class="q-pr-md"
                    @click.prevent="showCreateForm()"
                  >
                    <q-tooltip>Add</q-tooltip>
                  </q-icon>
                </div>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="id" :props="props">
                    {{ props.pageIndex + 1 }}
                  </q-td>
                  <q-td key="type" :props="props">
                    {{ props.row.type }}
                  </q-td>
                  <q-td key="description" :props="props">
                    {{ props.row.description }}
                  </q-td>

                  <q-td key="createdAt" :props="props">
                    <q-btn
                      flat
                      icon="visibility"
                      padding="xs"
                      class="editIcon"
                      @click.prevent="downloadItem(props.row)"
                    >
                      <q-tooltip>
                        View
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      icon="delete_outline"
                      padding="xs"
                      class="deleteIcon"
                      @click.prevent="deleteItem(props.row)"
                    >
                      <q-tooltip>
                        Delete
                      </q-tooltip>
                    </q-btn>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import { openURL } from "quasar";
export default {
  name: "UsersDocumentListView",
  props: {
    loading: Boolean,
    datas: Array
  },
  data() {
    return {
      columns: [
        {
          name: "id",
          label: "S/N",
          align: "left",
          field: "id",
          sortable: true,
          style: "width: 40px"
        },
        {
          name: "type",
          required: true,
          label: "Document Type",
          align: "left",
          field: row => row.type,
          format: val => `${val}`,
          sortable: true,
          style: "width: 150px"
        },

        {
          name: "description",
          required: true,
          label: "Description",
          align: "left",
          field: row => row.description,
          format: val => `${val}`,
          sortable: true
        },

        {
          name: "createdAt",
          label: "",
          align: "right",
          field: "createdAt",
          sortable: true
        }
      ]
    };
  },
  methods: {
    async deleteItem(row) {
      this.$store.dispatch("users_details/deleteDocumentById", {
        docId: row.id,
        url: row.url
      });
    },
    showCreateForm() {
      this.$store.commit("users_details/CLEAR_DOCUMENT_FORM_DATA");
      this.$store.commit(
        "admin_layout/UPDATE_COMPONENT_NAME",
        "app-users-document-create-form"
      );
      this.$store.commit("admin_layout/UPDATE_RIGHT_DRAWER_OPEN", true);
    },

    async downloadItem(row) {
      openURL(row.url);
    },
    async showDocuments() {
      this.$store.dispatch("users_details/fetchDocuments", this);
    }
  }
};
</script>

<style></style>
