<template>
    <q-page>
       <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-activities-list-view></app-activities-list-view>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
       </q-pull-to-refresh>
    </q-page>
</template>

<script>
import ActivitiesListView from '../../components/listviews/ActivitiesListView'
export default {
  name: "activities",
  meta: {
    titleTemplate: title => `Activities - ${title}  `,
  },
  components: {
      "app-activities-list-view": ActivitiesListView
  },
  data () {
    return {}
  },
  methods: {
     async main(){
        this.$store.dispatch('activities/fetch', this);
    },
    async refresh(done){
       this.main().then(() => done());
    }
   
  },
  created(){ this.main() },
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('activities/unsubscribe', this);
      this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
      next();
  }
}
</script>
