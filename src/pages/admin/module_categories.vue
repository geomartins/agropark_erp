<template>
    <q-page>
         <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-module-categories-list-view></app-module-categories-list-view>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
         </q-pull-to-refresh>
    </q-page>
</template>

<script>
import ModuleCategoriesListView from '../../components/listviews/ModuleCategoriesListView'
export default {
  name: "module_categories",
  meta: {
    titleTemplate: title => `Module Categories - ${title}  `,
  },
  components: {
      "app-module-categories-list-view": ModuleCategoriesListView
  },
  data () {
    return {}
  },
  methods: {
    async main(){
       this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Module Categories' })
       this.$store.dispatch('module_categories/fetch', this);
    },
    async refresh(done){
       this.main().then(() => done());
    }
   
  },
  created(){ this.main() },
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('module_categories/unsubscribe', this);
      this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
      next();
  }
}
</script>
