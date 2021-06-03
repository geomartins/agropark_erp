<template>
    <q-page>
        <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-skeleton :skeleton="skeleton" type="a">
                     <app-users-list-view></app-users-list-view>
                  </app-skeleton>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
        </q-pull-to-refresh>
    </q-page>
</template>

<script>

import { mapState } from 'vuex';
import UsersListView from '../../components/listviews/UsersListView'
import Skeleton from '../../components/Skeleton'

export default {
  name: "users",
  meta: {
    titleTemplate: title => `Users - ${title}  `,
  },
  components: {
      "app-users-list-view": UsersListView,
      "app-skeleton": Skeleton
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('users',['skeleton'])
  },
  methods: {
    async main(){
        this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Users' })
        this.$store.dispatch('users/fetch', this).then(() => {
        this.$store.dispatch('users/dependencies', this);
       });
    },
    async refresh(done){
       this.main().then(() => done());
    }
  },

  async created(){ this.main(); },
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('users/unsubscribe', this);
      this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
      next();
  }
}
</script>
