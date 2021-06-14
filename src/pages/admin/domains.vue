<template>
    <q-page>
      <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                   <app-skeleton :skeleton="skeleton" type="a">
                        <app-domains-list-view :datas="datas" :loading="is_loading"></app-domains-list-view>
                   </app-skeleton>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
      </q-pull-to-refresh>
    </q-page>
</template>

<script>

import { mapState } from 'vuex';
import DomainsListView from '../../components/listviews/DomainsListView'
import Skeleton from '../../components/Skeleton'
export default {
  name: "domains",
  meta: {
    titleTemplate: title => `Domains - ${title}  `,
  },
  components: {
      "app-domains-list-view": DomainsListView,
       "app-skeleton": Skeleton
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('domains',['skeleton', 'filter', 'datas', 'is_loading'])
  },
  methods: {
    async main(){
        this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Domains' })
        this.$store.commit('domains/UPDATE_FILTER','')
        this.$store.dispatch('domains/fetch', 'initial');
    },
    async getNextData() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          if(this.filter.length < 1){
            this.$store.dispatch('domains/fetch', 'next');
          }
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
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('domains/unsubscribe', this);
      this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
      next();
  }
}
</script>
