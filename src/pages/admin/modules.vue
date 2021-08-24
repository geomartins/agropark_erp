<template>
   <q-page>
      <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                 <app-skeleton :skeleton="skeleton" type="b">
                  <div class="q-gutter-y-md" style="max-width: 100%">
                  
                    <app-modules-toolbar></app-modules-toolbar>
        
                      <q-tabs v-model="tab" inline-label class="text-grey"  active-color="white" active-bg-color="secondary" indicator-color="transparent" align="justify" narrow-indicator no-caps>
                          <q-tab name="module" label="Modules"  />
                          <q-tab name="module_notifier" label="Notifier" />
                      </q-tabs>

                      
                      <q-tab-panels v-model="tab" animated>
                          <q-tab-panel name="module">
                              <app-modules-list-view :datas="datas" :loading="is_loading"></app-modules-list-view>
                          </q-tab-panel>

                          
                        

                          <q-tab-panel name="module_notifier">
                          
                          <app-module-loggers-list-view  :datas="moduleNotifierDatas" :loading="is_loading" ></app-module-loggers-list-view>
                          </q-tab-panel>
                      </q-tab-panels>

                  



                  </div>
                 </app-skeleton>

              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
      </q-pull-to-refresh>
    </q-page>
  
</template>

<script>
import ModulesListView from '../../components/listviews/ModulesListView'
import ModuleLoggersListView from '../../components/listviews/ModuleLoggersListView'

import Skeleton from '../../components/Skeleton'
import ModulesToolbar from '../../components/toolbar/ModulesToolbar'
import { mapState } from 'vuex';
import FirestoreService from '../../services/firestore_service'
export default {
  name: "modules",
  meta: {
    titleTemplate: title => `Modules - ${title}  `,
  },
  components: {
      "app-modules-list-view": ModulesListView,
        "app-module-loggers-list-view": ModuleLoggersListView,
          "app-modules-toolbar": ModulesToolbar,
          "app-skeleton": Skeleton
  },
  data () {
    return {
      tab: "module"
    }
  },
  computed: {
      ...mapState('modules',['datas', 'is_loading','skeleton','filter','moduleNotifierFilter', 'moduleNotifierDatas'])
  },
  methods: {
    async main(){
        this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Modules' })
        this.$store.commit('modules/UPDATE_FILTER','')
        this.$store.commit('modules/UPDATE_MODULE_NOTIFIER_FILTER','')
        this.$store.dispatch('modules/fetchModuleDependency', this);
        this.$store.dispatch('modules/fetch', 'initial')
        this.$store.dispatch('modules/fetchModuleNotifiers', 'initial')
        
    },
    async tabCheck(){
        if(this.$route.query.tab){
            this.tab = this.$route.query.tab;
        }
    },
     async getNextData() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
           if(this.tab == 'module'){
              if(this.filter.length < 1){
                this.$store.dispatch('modules/fetch', 'next');
              }
           }

         

           if(this.tab == 'module_notifier'){
              if(this.moduleNotifierFilter.length < 1){
                this.$store.dispatch('modules/fetchModuleNotifiers', 'next');
              }
           }
        }
      }
    },
    async refresh(done){
       this.main().then(() => done());
    }
  },

  beforeMount() {
    new FirestoreService().moduleNotifierCleaner("modules");
    this.main();
    this.tabCheck();
  },
  mounted() {
    this.getNextData();
  },
}
</script>
