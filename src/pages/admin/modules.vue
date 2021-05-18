<template>
    <q-page>
        <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-modules-list-view></app-modules-list-view>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
        </q-pull-to-refresh>
    </q-page>
</template>

<script>
import ModulesListView from '../../components/listviews/ModulesListView'
export default {
  name: "modules",
  meta: {
    titleTemplate: title => `Modules - ${title}  `,
  },
  components: {
      "app-modules-list-view": ModulesListView
  },
  data () {
    return {}
  },
  methods: {
    async main(){
        this.$store.dispatch('modules/fetch', this).then(() => {
        this.$store.dispatch('modules/dependencies', this);
       });
    },
    async refresh(done){
       this.main().then(() => done());
    }
  },

  created(){ this.main(); },
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('modules/unsubscribe', this);
      this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
      next();
  }
}
</script>
