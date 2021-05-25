<template>
    <div >
    <q-banner inline-actions rounded class="bg-transparent">
      <div style="font-size: 16px;">
       {{ $store.state.admin_layout.breadCrumb.pageTitle}}
      </div>
      <!-- You have lost connection to the internet. This app is offline. -->

      <template v-slot:action>
        <q-breadcrumbs gutter="xs">
      <q-breadcrumbs-el label="Home" style="cursor: pointer"  icon="home" @click.prevent="$router.push('/admin/dashboard')"/>
       <q-breadcrumbs-el  style="cursor: pointer" v-if="$store.state.admin_layout.breadCrumb.prevPageTitle" :label="$store.state.admin_layout.breadCrumb.prevPageTitle" @click.prevent="$router.go(-1)" />
      <q-breadcrumbs-el v-if="$store.state.admin_layout.breadCrumb.pageTitle"  :label="$store.state.admin_layout.breadCrumb.pageTitle" />
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