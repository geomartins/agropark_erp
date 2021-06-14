<template>
    <q-page>
        <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-extensions-list-view :datas="datas" :loading="is_loading"></app-extensions-list-view>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
        </q-pull-to-refresh>
    </q-page>
</template>

<script>
import ExtensionsListView from '../../components/listviews/ExtensionsListView'
import { mapState } from 'vuex';
export default {
  name: "extensions",
  meta: {
    titleTemplate: title => `Extensions - ${title}  `,
  },
  components: {
      "app-extensions-list-view": ExtensionsListView
  },
  data () {
    return {}
  },
  computed: {
      ...mapState('extensions',['datas', 'is_loading', 'filter'])
  },
  methods: {
    async main(){
         this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Extensions' })
         this.$store.commit('extensions/UPDATE_FILTER','')
        this.$store.dispatch('extensions/fetch', 'initial').then(() => {
            this.$store.dispatch('extensions/dependencies', this);
       });
    },
    async getNextData() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          if(this.filter.length < 1){
            this.$store.dispatch('extensions/fetch', 'next');
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
      this.$store.dispatch('extensions/unsubscribe', this);
      this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
      next();
  }
}
</script>
