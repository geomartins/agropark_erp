<template>
    <q-page>
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-module-activities-list-view></app-module-activities-list-view>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
    </q-page>
</template>

<script>
import ModuleActivitiesListView from '../../components/listviews/ModuleActivitiesListView'
export default {
  name: "module_activities",
  components: {
      "app-module-activities-list-view": ModuleActivitiesListView
  },
  data () {
    return {}
  },
  methods: {
   
  },
  created(){
    this.$store.dispatch('module_activities/fetch', this);
  },
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('module_activities/unsubscribe', this);
      next();
  }
}
</script>
