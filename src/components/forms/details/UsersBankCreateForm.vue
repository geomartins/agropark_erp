<template>
  <q-expansion-item
    expand-separator
    label="Add Bank Details"
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
          v-model="name"
          :options="
            $store.state.users_details.dependencies.user.banks.split(',')
          "
          label="Bank Name"
        >
        </q-select>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="account_number"
          label="Account Number"
          :dense="dense"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="account_holder_name"
          label="Account Holder Name"
          :dense="dense"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="editFlex">
          <q-btn color="primary" label="Save" @click.prevent="create()" />
          <q-btn
            color="primary"
            outline
            label="Close"
            @click.prevent="
              $store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN', false)
            "
          />
        </div>
      </q-card-section>

      <q-inner-loading :showing="is_loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "UsersBankCreateForm",
  data() {
    return {
      dense: true,
    };
  },
  computed: {
    ...mapState("users_details", ["bankFormData", "is_loading"]),
    name: {
      get() {
        return this.bankFormData.name;
      },
      set(value) {
        this.UPDATE_BANK_FORM_DATA({ name: value });
      }
    },
    account_number: {
      get() {
        return this.bankFormData.account_number;
      },
      set(value) {
        this.UPDATE_BANK_FORM_DATA({ account_number: value });
      }
    },
    account_holder_name: {
      get() {
        return this.bankFormData.account_holder_name;
      },
      set(value) {
        this.UPDATE_BANK_FORM_DATA({ account_holder_name: value });
      }
    }
  },
  methods: {
    ...mapMutations("users_details", ["UPDATE_BANK_FORM_DATA"]),
    create() {
      this.$store.dispatch("users_details/createBank", this);
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
