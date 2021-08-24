<template>
  <q-expansion-item
    expand-separator
    label="Edit Extension"
    expand-icon-class="expand"
    header-class="headerClass"
    default-opened
    style="border-bottom: 1px solid #00808057; background: #fafafa"
    class="q-pb-md"
  >
    <q-card flat>
      <div class="q-mt-md"></div>

      <q-card-section class="q-pt-none">
        <q-select
          color="grey-3"
          outlined
          :dense="dense"
          readonly
          v-model="name"
          :options="$store.state.roles_details.dependencies.extension.ids"
          label="Extension"
        >
        </q-select>
      </q-card-section>

      <div class="permission">
        <q-item v-for="(role, index) in dependencies.role" :key="role + 'dd'">
          <q-item-section>
            <!-- <q-item-label>Single line item</q-item-label> -->
            <q-item-label caption lines="10">
              <div class="q-gutter-sm">
                <q-checkbox
                  size="xs"
                  v-model="approval_box"
                  :val="role"
                  :label="role"
                  color="primary"
                />
              </div>
            </q-item-label>
          </q-item-section>

          <q-item-section side top v-if="index === 0">
            <q-item-label caption>Approval Box</q-item-label>
            <q-icon name="https" color="primary" />
          </q-item-section>
        </q-item>
      </div>

      <q-card-section class="q-pt-md">
        <div class="editFlex">
          <q-btn color="primary" label="Update" @click.prevent="update()" />
          <q-btn
            color="primary"
            outline
            label="Close"
            @click.prevent="close()"
          />
        </div>
      </q-card-section>

      <q-inner-loading :showing="$store.state.roles_details.is_loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RolesExtensionUpdateForm",
  data() {
    return {
      dense: true,
      visible: true
    };
  },
  computed: {
    ...mapState("roles_details", ["dependencies"]),
    name: {
      get() {
        return this.$store.getters["roles_details/fetchExtensionName"];
      },
      set(value) {
        this.$store.commit("roles_details/UPDATE_EXTENSION_NAME", value);
      }
    },
    approval_box: {
      get() {
        return this.$store.getters["roles_details/fetchExtensionApprovalBox"];
      },
      set(value) {
        this.$store.commit(
          "roles_details/UPDATE_EXTENSION_APPROVAL_BOX",
          value
        );
      }
    }
  },
  methods: {
    update() {
      this.$store.dispatch("roles_details/updateExtension", this);
    },
    close() {
      this.$store.commit("admin_layout/UPDATE_RIGHT_DRAWER_OPEN", false);
    }
  }
};
</script>

<style>
.editFlex {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.editFlex button {
  margin-right: 10px;
}
</style>
