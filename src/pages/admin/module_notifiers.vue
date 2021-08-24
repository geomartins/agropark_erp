<template>
    <q-page>
       <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-skeleton :skeleton="skeleton" type="b">
                    <app-module-notifiers-list-view></app-module-notifiers-list-view>
                  </app-skeleton>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
       </q-pull-to-refresh>
    </q-page>
</template>

<script>
import ModuleNotifiersListView from '../../components/listviews/ModuleNotifiersListView'
import Skeleton from '../../components/Skeleton'
import { mapState } from 'vuex';
export default {
  name: "module_notifiers",
  meta: {
    titleTemplate: title => `Module Notifiers - ${title}  `,
  },
  components: {
      "app-module-notifiers-list-view": ModuleNotifiersListView,
      "app-skeleton": Skeleton
  },
  data () {
    return {}
  },
  computed: {
      ...mapState('module_notifiers',['skeleton'])
  },
  methods: {
     async main(){
        this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Module Notifiers' })
        this.$store.dispatch('module_notifiers/fetch', 'initial');
    },
    async getNextData() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
            this.$store.dispatch('module_notifiers/fetch', 'next');
        }
      }
    },
    async refresh(done){
       this.main().then(() => done());
    }
   
  },
  beforeMount() {
    this.main();
  },
  mounted() {
    this.getNextData();
  },
}
</script>
