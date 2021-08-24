<template>
  <div class="mini_toolbar shadow-1">
    <div class="mini_toolbar__item">
      <q-icon name="settings_suggest" @click.prevent="showSettingForm()">
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          Dependencies
        </q-tooltip>
      </q-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModulesToolbar",
  data() {
    return {};
  },
  methods: {
    showSettingForm() {
      this.$store.commit(
        "admin_layout/UPDATE_COMPONENT_NAME",
        "app-modules-dependency-update-form"
      );
      this.$store.commit("admin_layout/UPDATE_RIGHT_DRAWER_OPEN", true);
    },
    
  }
};
</script>
