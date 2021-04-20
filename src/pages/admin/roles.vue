<template>
    <q-page>
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-roles-list-view></app-roles-list-view>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
    </q-page>
</template>

<script>
import RolesListView from '../../components/listviews/RolesListView'
export default {
  name: "roles",
  components: {
      "app-roles-list-view": RolesListView
  },
  data () {
    return {}
  },
  methods: {
   
  },
  created(){
    this.$store.dispatch('roles/fetch', this);
  },
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('roles/unsubscribe', this);
      next();
  }
}
</script>
