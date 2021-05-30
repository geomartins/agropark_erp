<template>
    <q-list class="myFlex">
    <q-item>
        <q-item-section>
          <q-item-label>Category</q-item-label>
          <q-item-label caption lines="2">{{  row.name ? row.name : ''  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Description</q-item-label>
          <q-item-label caption lines="2">{{  row.description ? row.description : '' }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Category ID</q-item-label>
          <q-item-label caption lines="2">{{  row.id ? row.id : ''  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>CreatedAt</q-item-label>
          <q-item-label caption lines="2">{{  row.createdAt ? row.createdAt.toDate() : '' }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Author</q-item-label>
          <q-item-label caption lines="2">{{ row.creator ? row.creator  :  '' | filterAuthor }}</q-item-label>
        </q-item-section>
    </q-item>

      <q-separator spaced inset />
   </q-list>
</template>


<script>
import filters from '../../repositories/filters'
export default {
    name: "ModuleCategoriesListTile",
    mixins: [filters],
    props: ['row'],
    data(){
        return {

        }
    }
}
</script>