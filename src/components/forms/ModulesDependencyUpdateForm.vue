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
          v-model="categories"
          label="Categories"
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
  name: "ModulesDependencyUpdateForm",
  data() {
    return {};
  },
  computed: {
    ...mapState("modules", ["moduleDependencyFormData", "is_loading"]),
    categories: {
      get() {
        return this.moduleDependencyFormData.categories;
      },
      set(value) {
        this.UPDATE_MODULE_DEPENDENCY_FORM_DATA({ categories: value});
      }
    },
    
  },
  methods: {
    ...mapMutations("modules", [
      "UPDATE_MODULE_DEPENDENCY_FORM_DATA",
    ]),
    create() {
      this.$store.dispatch("modules/updateModuleDependency", this);
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
