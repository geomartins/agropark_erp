<template>
    <q-page>
         <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-extension-categories-list-view :datas="datas" :loading="is_loading"></app-extension-categories-list-view>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
         </q-pull-to-refresh>
    </q-page>
</template>

<script>
import { mapState } from 'vuex'
import ExtensionCategoriesListView from '../../components/listviews/ExtensionCategoriesListView'
export default {
  name: "extension_categories",
  meta: {
    titleTemplate: title => `Extension Categories - ${title}  `,
  },
  components: {
      "app-extension-categories-list-view": ExtensionCategoriesListView
  },
  data () {
    return {}
  },
  computed: {
      ...mapState('extension_categories',[ 'datas','is_loading'])
  },
  methods: {
    async main(){
       this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Extension Categories' })
       this.$store.dispatch('extension_categories/fetch', this);
    },
    async refresh(done){
       this.main().then(() => done());
    }
   
  },
  created(){ this.main() },
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('extension_categories/unsubscribe', this);
      this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
      next();
  }
}
</script>
