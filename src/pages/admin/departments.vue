<template>
    <q-page>
      <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-departments-list-view></app-departments-list-view>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
      </q-pull-to-refresh>
    </q-page>
</template>

<script>
import DepartmentsListView from '../../components/listviews/DepartmentsListView'
export default {
  name: "departments",
  meta: {
    titleTemplate: title => `Departments - ${title}  `,
  },
  components: {
      "app-departments-list-view": DepartmentsListView
  },
  data () {
    return {}
  },
  methods: {
    async main(){
        this.$store.dispatch('departments/fetch', this);
    },
    async refresh(done){
       this.main().then(() => done());
    }
  },
  created(){ this.main() },
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('departments/unsubscribe', this);
      this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
      next();
  }
}
</script>
