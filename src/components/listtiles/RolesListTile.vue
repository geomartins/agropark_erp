<template>
    <q-list class="myFlex">
    <q-item>
        <q-item-section>
          <q-item-label>Name</q-item-label>
          <q-item-label caption lines="2">{{  row.name ? row.name : '' }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Description</q-item-label>
          <q-item-label caption lines="2">{{  row.description ? row.description : ''  }}</q-item-label>
        </q-item-section>
    </q-item>


    <q-item>
        <q-item-section>
          <q-item-label>Timestamp</q-item-label>
          <q-item-label caption lines="2">{{  row.createdAt ? row.createdAt.toDate() : ''  }}</q-item-label>
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
          <q-item-label caption lines="2">{{  row.id ? row.id : ''  }}</q-item-label>
        </q-item-section>

        <q-item-section side top @click.prevent="$router.push('/admin/roles/'+row.id)">
          <q-item-label caption style="color: teal; cursor: pointer">View details</q-item-label>
          <q-icon name="arrow_right" color="primary" />
        </q-item-section>
    </q-item>

      <q-separator spaced inset />
   </q-list>
</template>


<script>
import filters from '../../repositories/filters'
export default {
    name: "RolesListTile",
    props: ['row'],
    mixins: [filters],
    data(){
        return {

        }
    }
}
</script>