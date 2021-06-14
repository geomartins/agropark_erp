<template>
    <q-list class="myFlex">
    <q-item>
        <q-item-section>
          <q-item-label>Module</q-item-label>
          <q-item-label caption lines="2">{{  row.module | filterModule  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Event</q-item-label>
          <q-item-label caption lines="2">{{  row.action  }}</q-item-label>
        </q-item-section>
    </q-item>


    <q-item>
        <q-item-section>
          <q-item-label>Activity</q-item-label>
          <q-item-label caption lines="2">{{  row.activity ? row.activity : ''  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Module Activity ID</q-item-label>
          <q-item-label caption lines="2">{{  row.id  }}</q-item-label>
        </q-item-section>
    </q-item>

   


      <q-item>
        <q-item-section>
          <q-item-label>Notify Roles</q-item-label>
          <q-item-label caption lines="2">{{  row.notify_roles ? row.notify_roles : ''  }}</q-item-label>
        </q-item-section>
    </q-item>


    <q-item>
        <q-item-section>
          <q-item-label>Recieved Notification</q-item-label>
          <q-item-label caption lines="2">{{  row.recieved_notification ? row.recieved_notification : ''  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Author</q-item-label>
          <q-item-label caption lines="2">{{  row.author | filterAuthor  }}</q-item-label>
        </q-item-section>
    </q-item>

     <q-item>
        <q-item-section>
          <q-item-label>Timestamp</q-item-label>
          <q-item-label caption lines="2">{{  row.timestamp.toDate() ? row.timestamp.toDate() : ''  }}</q-item-label>
        </q-item-section>
    </q-item>

      <q-separator spaced inset />
   </q-list>
</template>


<script>
import filters from '../../repositories/filters'
export default {
    name: "ActivitiesListTile",
    props: ['row'],
    mixins: [filters],
    data(){
        return {

        }
    }
}
</script>