<template>
    <div >
    <q-banner inline-actions rounded class="bg-transparent">
      Users Detail
      <!-- You have lost connection to the internet. This app is offline. -->

      <template v-slot:action>
        <q-breadcrumbs gutter="xs">
      <q-breadcrumbs-el label="Home" icon="home" />
      <q-breadcrumbs-el label="Components" />
      <q-breadcrumbs-el label="Breadcrumbs" />
    </q-breadcrumbs>
      </template>
    </q-banner>
  </div>
     
</template>

<script>
export default {
    name: "BreadCrumb",
    data(){
        return {}
    },

}
</script>