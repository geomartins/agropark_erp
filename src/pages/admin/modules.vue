<template>
    <q-page>
        <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-modules-list-view :datas="datas" :loading="is_loading"></app-modules-list-view>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
        </q-pull-to-refresh>
    </q-page>
</template>

<script>
import ModulesListView from '../../components/listviews/ModulesListView'
import { mapState } from 'vuex';
export default {
  name: "modules",
  meta: {
    titleTemplate: title => `Modules - ${title}  `,
  },
  components: {
      "app-modules-list-view": ModulesListView
  },
  data () {
    return {}
  },
  computed: {
      ...mapState('modules',['datas', 'is_loading', 'filter'])
  },
  methods: {
    async main(){
        this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Modules' })
        this.$store.commit('modules/UPDATE_FILTER','')
        this.$store.dispatch('modules/fetch', 'initial').then(() => {
          this.$store.dispatch('modules/dependencies', this);
        });
    },
     async getNextData() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          if(this.filter.length < 1){
            this.$store.dispatch('modules/fetch', 'next');
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
      this.$store.dispatch('modules/unsubscribe', this);
      this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
      next();
  }
}
</script>
