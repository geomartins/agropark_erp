<template>
    <q-page>
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-module-categories-list-view></app-module-categories-list-view>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
    </q-page>
</template>

<script>
import ModuleCategoriesListView from '../../components/listviews/ModuleCategoriesListView'
export default {
  name: "module_categories",
  components: {
      "app-module-categories-list-view": ModuleCategoriesListView
  },
  data () {
    return {}
  },
  methods: {
   
  },
  created(){
    this.$store.dispatch('module_categories/fetch', this);
  },
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('module_categories/unsubscribe', this);
      next();
  }
}
</script>
