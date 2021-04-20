<template>
    <q-list>
    <q-item>
        <q-item-section>
          <q-item-label>Name</q-item-label>
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
          <q-item-label>Timestamp</q-item-label>
          <q-item-label caption lines="2">{{  row.timestamp ? row.timestamp.toDate() : ''  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Author</q-item-label>
          <q-item-label caption lines="2">{{  row.author  }}</q-item-label>
        </q-item-section>
    </q-item>

     <q-item>
        <q-item-section>
          <q-item-label>Unique ID</q-item-label>
          <q-item-label caption lines="2">{{  row.id  }}</q-item-label>
        </q-item-section>
    </q-item>

      <q-separator spaced inset />
   </q-list>
</template>


<script>
export default {
    name: "DepartmentsListTile",
    props: ['row'],
    data(){
        return {

        }
    }
}
</script>