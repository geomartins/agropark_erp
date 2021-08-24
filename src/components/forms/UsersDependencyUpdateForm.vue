<template>
  <q-expansion-item
    expand-separator
    label="Update Dependencies"
    expand-icon-class="expand"
    header-class="headerClass"
    default-opened
    style="border-bottom: 1px solid #00808057; background: #fafafa"
    class="q-pb-md"
  >
    <q-card flat>
      <div class="q-mt-md"></div>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          autogrow
          v-model="religions"
          label="Religions"
          dense
          hint="## input should be seperated by commas"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          autogrow
          v-model="banks"
          label="Banks"
          dense
          hint="## input should be seperated by commas"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          autogrow
          v-model="relationships"
          label="Relationships"
          dense
          hint="## input should be seperated by commas"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          autogrow
          v-model="blood_types"
          label="Blood Types"
          dense
          hint="## input should be seperated by commas"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          autogrow
          v-model="nationalities"
          label="Nationalities"
          dense
          hint="## input should be seperated by commas"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          autogrow
          v-model="marital_status"
          label="Marital Status"
          dense
          hint="## input should be seperated by commas"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          autogrow
          v-model="genders"
          label="Gender"
          dense
          hint="## input should be seperated by commas"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          autogrow
          v-model="document_types"
          label="Document Types"
          dense
          hint="## input should be seperated by commas"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          autogrow
          v-model="departments"
          label="Departments"
          dense
          hint="## input should be seperated by commas"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          autogrow
          v-model="units"
          label="Units"
          dense
          hint="## input should be seperated by commas"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          autogrow
          v-model="occupations"
          label="Occupations"
          dense
          hint="## input should be seperated by commas"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="editFlex">
          <q-btn
            color="primary"
            outline
            label="Update"
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

      <q-inner-loading :showing="is_loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "UsersDependencyUpdateForm",
  data() {
    return {};
  },
  computed: {
    ...mapState("users", ["userDependencyFormData", "is_loading"]),
    relationships: {
      get() {
        return this.userDependencyFormData.relationships;
      },
      set(value) {
        this.UPDATE_USER_DEPENDENCY_FORM_DATA({ relationships: value});
      }
    },
    banks: {
      get() {
        return this.userDependencyFormData.banks;
      },
      set(value) {
        this.UPDATE_USER_DEPENDENCY_FORM_DATA({ banks: value});;
      }
    },
    religions: {
      get() {
        return this.userDependencyFormData.religions;
      },
      set(value) {
        this.UPDATE_USER_DEPENDENCY_FORM_DATA({ religions: value});
      }
    },
    blood_types: {
      get() {
        return this.userDependencyFormData.blood_types;
      },
      set(value) {
        this.UPDATE_USER_DEPENDENCY_FORM_DATA({ blood_types: value});
      }
    },

    nationalities: {
      get() {
        return this.userDependencyFormData.nationalities;
      },
      set(value) {
         this.UPDATE_USER_DEPENDENCY_FORM_DATA({ nationalities: value});;
      }
    },
    marital_status: {
      get() {
        return this.userDependencyFormData.marital_status;
      },
      set(value) {
         this.UPDATE_USER_DEPENDENCY_FORM_DATA({ marital_status: value});
      }
    },
    genders: {
      get() {
        return this.userDependencyFormData.genders;
      },
      set(value) {
         this.UPDATE_USER_DEPENDENCY_FORM_DATA({ genders: value});
      }
    },
    document_types: {
      get() {
        return this.userDependencyFormData.document_types;
      },
      set(value) {
         this.UPDATE_USER_DEPENDENCY_FORM_DATA({ document_types: value});
      }
    },
    departments: {
      get() {
        return this.userDependencyFormData.departments;
      },
      set(value) {
         this.UPDATE_USER_DEPENDENCY_FORM_DATA({ departments: value});
      }
    },
    units: {
      get() {
        return this.userDependencyFormData.units;
      },
      set(value) {
         this.UPDATE_USER_DEPENDENCY_FORM_DATA({ units: value});
      }
    },
    occupations: {
      get() {
        return this.userDependencyFormData.occupations;
      },
      set(value) {
         this.UPDATE_USER_DEPENDENCY_FORM_DATA({ occupations: value});
      }
    }
  },
  methods: {
    ...mapMutations("users", [
      "UPDATE_USER_DEPENDENCY_FORM_DATA",
    ]),
    create() {
      this.$store.dispatch("users/updateUserDependency", this);
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
