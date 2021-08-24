<template>
    <q-page>
       <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-skeleton :skeleton="skeleton" type="b">
                    <app-extension-notifiers-list-view></app-extension-notifiers-list-view>
                  </app-skeleton>
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
       </q-pull-to-refresh>
    </q-page>
</template>

<script>
import ExtensionNotifiersListView from '../../components/listviews/ExtensionNotifiersListView'
import Skeleton from '../../components/Skeleton'
import { mapState } from 'vuex';
export default {
  name: "extension_notifiers",
  meta: {
    titleTemplate: title => `Extension Notifiers - ${title}  `,
  },
  components: {
      "app-extension-notifiers-list-view": ExtensionNotifiersListView,
      "app-skeleton": Skeleton
  },
  data () {
    return {}
  },
  computed: {
      ...mapState('extension_notifiers',['skeleton'])
  },
  methods: {
     async main(){
        this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Extension Notifiers' })
        this.$store.dispatch('extension_notifiers/fetch', 'initial');
    },
    async getNextData() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
            this.$store.dispatch('extension_notifiers/fetch', 'next');
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
