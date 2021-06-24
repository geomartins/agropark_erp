<template>
    <q-page>
      <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                <div class="q-gutter-y-md" style="max-width: 100%">
      
                    <q-tabs v-model="tab" inline-label class="text-grey"  active-color="white" active-bg-color="secondary" indicator-color="transparent" align="justify" narrow-indicator no-caps>
                        <q-tab name="mails" label="Crop Types"  />
                        <q-tab name="alarms" label="Crop Categories" />
                        <q-tab name="movies" label="Requests" />
                        <!-- <q-tab name="inventories" label="Inventories" /> -->
                    </q-tabs>
                    
                    <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="mails">
                            <app-seed-banks-crop-types-list-view :datas="cropTypesDatas"></app-seed-banks-crop-types-list-view>
                        </q-tab-panel>

                        <q-tab-panel name="alarms">
                            <app-seed-banks-crop-categories-list-view :datas="cropCategoriesDatas"></app-seed-banks-crop-categories-list-view>
                        </q-tab-panel>

                        <q-tab-panel name="movies">
                            <div class="text-h6">Movies</div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </q-tab-panel>

                        <!-- <q-tab-panel name="inventories">
                            <div class="text-h6">Movies</div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </q-tab-panel> -->
                    </q-tab-panels>

                



                </div>

<!-- 
                  <app-departments-list-view></app-departments-list-view> -->
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
      </q-pull-to-refresh>
    </q-page>
</template>

<script>
import SeedBanksCropCategoriesListView from '../../components/listviews/SeedBanksCropCategoriesListView'
import SeedBanksCropTypesListView from '../../components/listviews/SeedBanksCropTypesListView'
import { mapState } from 'vuex';
export default {
  name: "seed_banks",
  meta: {
    titleTemplate: title => `Seed Banks - ${title}  `,
  },
  components: {
    "app-seed-banks-crop-categories-list-view": SeedBanksCropCategoriesListView,
    "app-seed-banks-crop-types-list-view": SeedBanksCropTypesListView,

  },
  data () {
    return {
        tab: 'mails'
    }
  },
  computed: {
      ...mapState('seed_banks',['cropCategoriesDatas','cropRequestsDatas','cropInventoriesDatas', 'cropTypesDatas'])
  },
  methods: {
    async main(){
        this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { pageTitle: 'Seed Banks' })
        this.$store.dispatch('seed_banks/fetchCropCategories', this);
        this.$store.dispatch('seed_banks/fetchCropTypes', this);
    },
    async refresh(done){
       this.main().then(() => done());
    }
  },
  created(){ this.main() },
  beforeRouteLeave (to, from , next) {
      this.$store.dispatch('seed_banks/unsubscribe', this);
      this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
      next();
  }
}
</script>

