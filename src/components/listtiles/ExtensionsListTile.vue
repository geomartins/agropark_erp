<template>
    <q-list class="myFlex">
    <q-item >
        <q-item-section>
          <q-item-label>Name</q-item-label>
          <q-item-label caption lines="2">{{  row.name  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item >
        <q-item-section>
          <q-item-label>Description</q-item-label>
          <q-item-label caption lines="2">{{  row.description  }}</q-item-label>
        </q-item-section>
    </q-item>

     <q-item >
        <q-item-section>
          <q-item-label>Category</q-item-label>
          <q-item-label caption lines="2">{{  row.category.name ? row.category.name : row.category  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Approval</q-item-label>
          <q-item-label caption lines="2">{{  row.approval ? row.approval : ''  }}</q-item-label>
        </q-item-section>
    </q-item>


    <q-item>
        <q-item-section>
          <q-item-label>Timestamp</q-item-label>
          <q-item-label caption lines="2">{{  row.createdAt | toRealDate  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Author</q-item-label>
          <q-item-label caption lines="2">{{ row.creator ? row.creator  :  '' | filterAuthor }} </q-item-label>
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
import filters from '../../repositories/filters'
export default {
    name: "ExtensionsListTile",
    props: ['row'],
    mixins: [filters],
    data(){
        return {

        }
    }
}
</script>

