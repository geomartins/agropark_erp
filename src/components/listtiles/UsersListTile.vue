<template>
    <q-list class="myFlex">
    <q-item >
        <q-item-section>
          <q-item-label>Firstname</q-item-label>
          <q-item-label caption lines="2">{{  row.firstname ? row.firstname : ''  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item >
        <q-item-section>
          <q-item-label>Middlename</q-item-label>
          <q-item-label caption lines="2">{{  row.middlename ? row.middlename : ''  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item >
        <q-item-section>
          <q-item-label>Middlename</q-item-label>
          <q-item-label caption lines="2">{{  row.lastname ? row.lastname : ''  }}</q-item-label>
        </q-item-section>
    </q-item>

     <q-item >
        <q-item-section>
          <q-item-label>Role</q-item-label>
          <q-item-label caption lines="2">{{  row.role ? row.role : ''  }}</q-item-label>
        </q-item-section>
    </q-item>

     <q-item >
        <q-item-section>
          <q-item-label> Email </q-item-label>
          <q-item-label caption lines="2">{{  row.email ? row.email : ''  }}</q-item-label>
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

        <q-item-section side top @click.prevent="$router.push('/admin/users/'+row.id)">
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
    name: "UsersListTile",
    props: ['row'],
    mixins: [filters],
    data(){
        return {

        }
    }
}
</script>
