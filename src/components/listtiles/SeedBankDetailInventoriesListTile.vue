<template>
  <q-list class="myFlex">
    <q-item>
      <q-item-section>
        <q-item-label>Type</q-item-label>
        <q-item-label caption lines="2">{{
          row.type ? row.type : ""
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Quantity</q-item-label>
        <q-item-label caption lines="2">{{
          row.quantity ? row.quantity : ""
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Available Stock</q-item-label>
        <q-item-label caption lines="2">{{
          row.new_seed_bank_refs ? row.new_seed_bank_refs.available_stock : ""
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Reserved Stock</q-item-label>
        <q-item-label caption lines="2">{{
          row.new_seed_bank_refs ? row.new_seed_bank_refs.reserved_stock : ""
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Previous Available Stock</q-item-label>
        <q-item-label caption lines="2">{{
          row.old_seed_bank_refs ? row.old_seed_bank_refs.available_stock : ""
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Previous Reserved Stock</q-item-label>
        <q-item-label caption lines="2">{{
          row.old_seed_bank_refs ? row.old_seed_bank_refs.reserved_stock : ""
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>Unique ID</q-item-label>
        <q-item-label caption lines="2">{{
          row.id ? row.id : ""
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>CreatedAt</q-item-label>
        <q-item-label caption lines="2">{{
          row.createdAt | toRealDate
        }}</q-item-label>
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

    <q-separator spaced inset />
  </q-list>
</template>

<script>
import filters from "../../repositories/filters";
export default {
  name: "SeedBankDetailInventoriesListTile",
  mixins: [filters],
  props: ["row"],
  data() {
    return {};
  }
};
</script>
