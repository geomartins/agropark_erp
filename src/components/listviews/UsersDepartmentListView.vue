<template>
  <div class="q-pb-sm">
    <q-list padding bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        label="Department"
        expand-icon-class="expand"
        header-class="headerClass"
        @show="showDepartments()"
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
                  <q-td key="name" :props="props">
                    {{ props.row.name }}
                  </q-td>
                  <q-td key="calories" :props="props">
                    <q-badge color="green">
                      {{ props.row.calories }}
                    </q-badge>
                  </q-td>

                  <q-td key="createdAt" :props="props">
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
export default {
  name: "UsersDepartmentListView",
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
          name: "name",
          required: true,
          label: "Department Name",
          align: "left",
          field: row => row.name,
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
    async deleteItem(id) {
      this.$store.dispatch("users_details/deleteDepartmentById", id);
    },
    editItem(payload) {
      this.$store.commit("users_details/CLEAR_DEPARTMENT_FORM_DATA");
      this.$store.commit("users_details/UPDATE_DEPARTMENT_FORM_DATA", payload);
      this.$store.commit(
        "admin_layout/UPDATE_COMPONENT_NAME",
        "app-users-department-update-form"
      );
      this.$store.commit("admin_layout/UPDATE_RIGHT_DRAWER_OPEN", true);
    },
    showCreateForm() {
      this.$store.commit("users_details/CLEAR_DEPARTMENT_FORM_DATA");
      this.$store.commit(
        "admin_layout/UPDATE_COMPONENT_NAME",
        "app-users-department-create-form"
      );
      this.$store.commit("admin_layout/UPDATE_RIGHT_DRAWER_OPEN", true);
    },
    async showDepartments() {
      this.$store.dispatch("users_details/fetchDepartments", this);
    }
  }
};
</script>

<style></style>
