<template>
    <q-page>
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-departments-list-view></app-departments-list-view>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
    </q-page>
</template>

<script>
import DepartmentsListView from '../../components/listviews/DepartmentsListView'
export default {
  name: "departments",
  components: {
      "app-departments-list-view": DepartmentsListView
  },
  data () {
    return {}
  },
  methods: {
   
  },
  created(){
    this.$store.dispatch('departments/fetch', this);
  },
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('departments/unsubscribe', this);
      next();
  }
}
</script>
