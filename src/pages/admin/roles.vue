<template>
    <q-page>
       <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-skeleton :skeleton="skeleton" type="a">
                    <app-roles-list-view></app-roles-list-view>
                  </app-skeleton>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
       </q-pull-to-refresh>
    </q-page>
</template>

<script>


import { mapState } from 'vuex';
import RolesListView from '../../components/listviews/RolesListView'
import Skeleton from '../../components/Skeleton'
import FirestoreService from '../../services/firestore_service'

export default {
  name: "roles",
  meta: {
    titleTemplate: title => `Roles - ${title}  `,
  },
  components: {
      "app-roles-list-view": RolesListView,
       "app-skeleton": Skeleton
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('roles',['skeleton', 'filter'])
  },
  methods: {
    async main(){
        this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Roles' })
        this.$store.commit('roles/UPDATE_FILTER','')
        this.$store.dispatch('roles/fetch', 'initial');
    },
    async getNextData() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          if(this.filter.length < 1){
            this.$store.dispatch('roles/fetch', 'next');
          }
        }
      }
    },
    async refresh(done){
       this.main().then(() => done());
    }
   
  },
   beforeMount() {
    new FirestoreService().moduleNotifierCleaner("roles").catch(err => {
           console.log(err.message);
    });
    this.main();
  },
  mounted() {
    this.getNextData();
  },
}
</script>
