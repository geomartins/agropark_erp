<template>
    <q-list>
    <q-item>
        <q-item-section>
          <q-item-label>Name</q-item-label>
          <q-item-label caption lines="2">{{  row.name ? row.name : ''  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Module Details</q-item-label>
          <q-item-label caption lines="2">{{  row.modules ? row.modules : ''  }}</q-item-label>
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
          <q-item-label>Timestamp</q-item-label>
          <q-item-label caption lines="2">{{  row.timestamp.toDate() ? row.timestamp.toDate() : ''  }}</q-item-label>
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
          <q-item-label>Notify Departments</q-item-label>
          <q-item-label caption lines="2">{{  row.notify_departments ? row.notify_departments : ''  }}</q-item-label>
        </q-item-section>
    </q-item>

    <q-item>
        <q-item-section>
          <q-item-label>Notify Units</q-item-label>
          <q-item-label caption lines="2">{{  row.notify_units ? row.notify_units : ''  }}</q-item-label>
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
          <q-item-label caption lines="2">{{  row.author ? row.author : ''  }}</q-item-label>
        </q-item-section>
    </q-item>

      <q-separator spaced inset />
   </q-list>
</template>


<script>
export default {
    name: "ModuleActivitiesListTile",
    props: ['row'],
    data(){
        return {

        }
    }
}
</script>