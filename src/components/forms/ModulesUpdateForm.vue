<template>
  <q-expansion-item
    expand-separator
    label="Edit Module"
    expand-icon-class="expand"
    header-class="headerClass"
    default-opened
    style="border-bottom: 1px solid #00808057; background: #fafafa"
    class="q-pb-md"
  >
    <q-card flat>
      <div class="q-mt-md"></div>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="name" label="Name" :dense="dense" readonly />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="alt_name"
          label="Alternative Name"
          :dense="dense"
          readonly
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          color="grey-3"
          readonly
          outlined
          :dense="dense"
          emit-value
          v-model="category"
          :options="
            $store.state.modules.dependencies.module.categories.split(',')
          "
          label="Category"
        >
        </q-select>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          autogrow
          outlined
          v-model="description"
          label="Description"
          :dense="dense"
        />
      </q-card-section>

      <div style="border-top: 1px solid #a5d1d1" class="q-mt-md q-mb-md"></div>

      <q-list>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Pushy Channel </q-item-label>
            <q-item-label caption
              >Allow module subscriber to recieve push
              notification</q-item-label
            >
          </q-item-section>
          <q-item-section avatar>
            <q-toggle color="primary" v-model="pushy_channel" />
          </q-item-section>
        </q-item>
      </q-list>

      <q-list>
        <q-item tag="label" clickable>
          <q-item-section>
            <q-item-label>InApp Channel</q-item-label>
            <q-item-label caption
              >Allow module subscriber to recieve app alert</q-item-label
            >
          </q-item-section>
          <q-item-section avatar>
            <q-toggle color="primary" v-model="app_channel" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="whatzapp_channel"
          label="Whatzapp Channel"
          :dense="dense"
          hint="International number format only e.g +2347033400186"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="slack_channel"
          label="Slack Channel"
          :dense="dense"
          hint="Multiple slack channels should be seperated by comma e.g #agropark-erp, agropark-ict"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="sms_channel"
          label="Sms Channel"
          :dense="dense"
          hint="International number format only e.g +2347033400186"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          type="email"
          outlined
          v-model="mail_channel"
          label="Mail Channel"
          hint="Multiple mail channels should be seperated by comma "
          :dense="dense"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
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

      <q-inner-loading :showing="$store.state.modules.is_loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: "ModulesUpdateForm",
  data() {
    return {
      dense: true,
      visible: true
    };
  },
  computed: {
    name: {
      get() {
        return this.$store.getters["modules/fetchName"];
      },
      set(value) {
        this.$store.commit("modules/UPDATE_NAME", value);
      }
    },
    alt_name: {
      get() {
        return this.$store.getters["modules/fetchAltName"];
      },
      set(value) {
        this.$store.commit("modules/UPDATE_ALT_NAME", value);
      }
    },
    description: {
      get() {
        return this.$store.getters["modules/fetchDescription"];
      },
      set(value) {
        this.$store.commit("modules/UPDATE_DESCRIPTION", value);
      }
    },
    category: {
      get() {
        return this.$store.getters["modules/fetchCategory"];
      },
      set(value) {
        this.$store.commit("modules/UPDATE_CATEGORY", value);
      }
    },

    whatzapp_channel: {
      get() {
        return this.$store.getters["modules/fetchWhatzappChannel"];
      },
      set(value) {
        this.$store.commit("modules/UPDATE_WHATZAPP_CHANNEL", value);
      }
    },
    mail_channel: {
      get() {
        return this.$store.getters["modules/fetchMailChannel"];
      },
      set(value) {
        this.$store.commit("modules/UPDATE_MAIL_CHANNEL", value);
      }
    },
    slack_channel: {
      get() {
        return this.$store.getters["modules/fetchSlackChannel"];
      },
      set(value) {
        this.$store.commit("modules/UPDATE_SLACK_CHANNEL", value);
      }
    },
    sms_channel: {
      get() {
        return this.$store.getters["modules/fetchSmsChannel"];
      },
      set(value) {
        this.$store.commit("modules/UPDATE_SMS_CHANNEL", value);
      }
    },
    app_channel: {
      get() {
        return this.$store.getters["modules/fetchAppChannel"];
      },
      set(value) {
        this.$store.commit("modules/UPDATE_APP_CHANNEL", value);
      }
    },
    pushy_channel: {
      get() {
        return this.$store.getters["modules/fetchPushyChannel"];
      },
      set(value) {
        this.$store.commit("modules/UPDATE_PUSHY_CHANNEL", value);
      }
    }
  },
  methods: {
    update() {
      this.$store.dispatch("modules/update", this);
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
