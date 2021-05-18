<template>
    <q-page>
       <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-module-activities-list-view></app-module-activities-list-view>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
       </q-pull-to-refresh>
    </q-page>
</template>

<script>
import ModuleActivitiesListView from '../../components/listviews/ModuleActivitiesListView'
export default {
  name: "module_activities",
  meta: {
    titleTemplate: title => `Module Activities - ${title}  `,
  },
  components: {
      "app-module-activities-list-view": ModuleActivitiesListView
  },
  data () {
    return {}
  },
  methods: {
     async main(){
        this.$store.dispatch('module_activities/fetch', this);
    },
    async refresh(done){
       this.main().then(() => done());
    }
   
  },
  created(){ this.main() },
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('module_activities/unsubscribe', this);
      this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
      next();
  }
}
</script>
