<template>
    <q-list>
    <q-item>
        <q-item-section>
          <q-item-label>Category</q-item-label>
          <q-item-label caption lines="2">{{  row.name  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Description</q-item-label>
          <q-item-label caption lines="2">{{  row.description  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Category ID</q-item-label>
          <q-item-label caption lines="2">{{  row.id  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Timestamp</q-item-label>
          <q-item-label caption lines="2">{{  row.timestamp.toDate()  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>User</q-item-label>
          <q-item-label caption lines="2">{{  row.user  }}</q-item-label>
        </q-item-section>
    </q-item>

      <q-separator spaced inset />
   </q-list>
</template>


<script>
export default {
    name: "ModuleCategoriesListTile",
    props: ['row'],
    data(){
        return {

        }
    }
}
</script>