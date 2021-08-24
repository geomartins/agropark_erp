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
        <q-item-label>Expiry Date</q-item-label>
        <q-item-label caption lines="2">{{
          row.expiry_date ? row.expiry_date : "" | toRealDate
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Provider</q-item-label>
        <q-item-label caption lines="2">{{
          row.provider ? row.provider : ""
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>NameServer</q-item-label>
        <q-item-label caption lines="2">
          <span v-if="row.nameserver">
            <span
              v-for="(name, index) in row.nameserver"
              :key="index + '343'"
              class="q-ml-xs"
            >
              <q-badge color="secondary" outline>{{ name }}</q-badge>
            </span>
          </span>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Author</q-item-label>
        <q-item-label caption lines="2">{{
          row.creator ? row.creator : "" | filterAuthor
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Unique ID</q-item-label>
        <q-item-label caption lines="2">{{ row.id }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced inset />
  </q-list>
</template>

<script>
import filters from "../../repositories/filters";
export default {
  name: "DomainsListTile",
  props: ["row"],
  mixins: [filters],
  data() {
    return {};
  }
};
</script>
