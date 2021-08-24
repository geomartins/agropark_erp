<template>
  <q-expansion-item
    expand-separator
    label="Add User"
    expand-icon-class="expand"
    header-class="headerClass"
    default-opened
    style="border-bottom: 1px solid #00808057; background: #fafafa"
    class="q-pb-md"
  >
    <q-card flat>
      <div class="q-mt-md"></div>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="firstname" label="Firstname" dense />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="middlename" label="Middlename" dense />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="lastname" label="Lastname" dense />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="email" label="email" dense />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          color="grey-3"
          outlined
          dense
          v-model="role"
          :options="$store.state.users.dependencies.role.ids"
          label="Role"
        >
        </q-select>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="editFlex">
          <q-btn
            color="primary"
            outline
            label="Create"
            @click.prevent="create()"
          />
          <q-btn
            color="negative"
            outline
            label="Close"
            @click.prevent="close()"
          />
        </div>
      </q-card-section>

      <q-inner-loading :showing="$store.state.users.is_loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "UsersCreateForm",
  data() {
    return {};
  },
  computed: {
    ...mapState("users", ["formData", "is_loading"]),
    firstname: {
      get() {
        return this.formData.firstname;
      },
      set(value) {
        this.UPDATE_FORM_DATA({ firstname: value });
      }
    },
    middlename: {
      get() {
        return this.formData.middlename;
      },
      set(value) {
        this.UPDATE_FORM_DATA({ middlename: value });
      }
    },
    lastname: {
      get() {
        return this.formData.lastname;
      },
      set(value) {
        this.UPDATE_FORM_DATA({ lastname: value });
      }
    },
    email: {
      get() {
        return this.formData.email;
      },
      set(value) {
        this.UPDATE_FORM_DATA({ email: value });
      }
    },
    role: {
      get() {
        return this.formData.role;
      },
      set(value) {
        this.UPDATE_FORM_DATA({ role: value });
      }
    }
  },
  methods: {
    ...mapMutations("users", ["UPDATE_FORM_DATA"]),
    create() {
      this.$store.dispatch("users/create", this);
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
