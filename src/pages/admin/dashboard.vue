<template>
  <q-page class="flex flex-center">
     <p @click="$router.push('/admin/seed_banks')"> Dashboard Under Construction</p>
  </q-page>
</template>

<script>
export default {
  name: 'Dashboard',
  meta: {
    titleTemplate: title => `Dashboard - ${title}  `,
  },
  methods: {
     async main(){
        this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Dashboard' })
    },
  },
  beforeMount() {
    this.main();
  },
}
</script>
