<template>
  <q-expansion-item
    expand-separator
    label="Add Feedback"
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
          v-model="type"
          :options="$store.state.utilities.dependencies.feedbackTypes"
          label="Feedback Type"
        >
        </q-select>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="message"
          type="textarea"
          label="Enter your feedback"
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
            @click.prevent="close()"
          />
        </div>
      </q-card-section>

      <q-inner-loading :showing="$store.state.utilities.is_loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: "FeedbackCreateForm",
  data() {
    return {
      dense: true,
      visible: true
    };
  },
  computed: {
    type: {
      get() {
        return this.$store.getters["utilities/fetchFeedbackType"];
      },
      set(value) {
        this.$store.commit("utilities/UPDATE_FEEDBACK_TYPE", value);
      }
    },
    message: {
      get() {
        return this.$store.getters["utilities/fetchFeedbackMessage"];
      },
      set(value) {
        this.$store.commit("utilities/UPDATE_FEEDBACK_MESSAGE", value);
      }
    }
  },
  methods: {
    create() {
      this.$store.dispatch("utilities/saveFeedback", this);
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
