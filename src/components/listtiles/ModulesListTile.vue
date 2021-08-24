<template>
  <q-list class="myFlex">
    <q-item>
      <q-item-section>
        <q-item-label>Name</q-item-label>
        <q-item-label caption lines="2">{{ row.name }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Alternative Name </q-item-label>
        <q-item-label caption lines="2">{{
          row.alt_name ? row.alt_name : ""
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Description </q-item-label>
        <q-item-label caption lines="2">{{ row.description }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Category</q-item-label>
        <q-item-label caption lines="2">{{
          row.category.name ? row.category.name : row.category
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Timestamp</q-item-label>
        <q-item-label caption lines="2"
          >{{ row.createdAt ? row.createdAt : "" | toRealDate }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Author</q-item-label>
        <q-item-label caption lines="2"
          >{{ row.creator ? row.creator : "" | filterAuthor }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Unique ID</q-item-label>
        <q-item-label caption lines="2">{{ row.id }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Notification Channel</q-item-label>
        <q-item-label caption lines="2">
          <span v-if="row.whatzapp_channel">
            <q-icon name="ion-logo-whatsapp" color="" size="sm">
              <q-tooltip>
                Whatzapp Channel
              </q-tooltip>
            </q-icon>
          </span>

          <span v-if="row.app_channel">
            <q-icon name="ion-notifications-outline" color="" size="sm">
              <q-tooltip>
                App Channel
              </q-tooltip>
            </q-icon>
          </span>

          <span v-if="row.pushy_channel">
            <q-icon name="ion-logo-rss" color="" size="sm">
              <q-tooltip>
                Pushy Channel
              </q-tooltip>
            </q-icon>
          </span>

          <span v-if="row.mail_channel">
            <q-icon name="ion-mail-open" color="" size="sm">
              <q-tooltip>
                Mail Channel
              </q-tooltip>
            </q-icon>
          </span>

          <span v-if="row.sms_channel">
            <q-icon name="ion-recording" color="" size="sm">
              <q-tooltip>
                Sms Channel
              </q-tooltip>
            </q-icon>
          </span>

          <!-- <span v-if="row.slack_channel">
            <q-icon name="ion-logo-slack" color="" size="sm"></q-icon>
          </span> -->
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced inset />
  </q-list>
</template>

<script>
import filters from "../../repositories/filters";
export default {
  name: "ModulesListTile",
  props: ["row"],
  mixins: [filters],
  data() {
    return {};
  }
};
</script>
