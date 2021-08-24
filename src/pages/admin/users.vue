<template>
    <q-page>
        <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-skeleton :skeleton="skeleton" type="a">
                     <app-users-toolbar></app-users-toolbar>
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
import FirestoreService from '../../services/firestore_service'
import UsersToolbar from '../../components/toolbar/UsersToolbar'

export default {
  name: "users",
  meta: {
    titleTemplate: title => `Users - ${title}  `,
  },
  components: {
      "app-users-list-view": UsersListView,
      "app-users-toolbar": UsersToolbar,
      "app-skeleton": Skeleton
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('users',['skeleton','filter'])
  },
  methods: {
    async main(){
        this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Users' })
        this.$store.commit('users/UPDATE_FILTER','')
        this.$store.dispatch('users/fetch', 'initial')
        this.$store.dispatch('users/fetchUserDependency', this);
        this.$store.dispatch('users/fetchRoleDependency', this);
       
    },
    async getNextData() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          if(this.filter.length < 1){
            this.$store.dispatch('users/fetch', 'next');
          }
        }
      }
    },
    async refresh(done){
       this.main().then(() => done());
    }
  },
  beforeMount() {
    new FirestoreService().moduleNotifierCleaner("users");
    this.main();
  },
  mounted() {
    this.getNextData();
  },
}
</script>
