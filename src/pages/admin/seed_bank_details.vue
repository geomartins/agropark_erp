<template>
    <q-page>
        <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-9 col-xs-12">
                  
                <app-skeleton :skeleton="skeleton" type="b">
                    <q-chip class="q-mb-sm">
                        <q-avatar icon="edit" color="secondary" text-color="white" />
                       {{ docFormData.name+' '+docFormData.category }}
                    </q-chip>

                    {{ unsubscribe.doc }}

                     <q-chip class="q-mb-sm">
                        <q-avatar icon="edit" color="secondary" text-color="white" />
                       {{ '&#x20A6;'+docFormData.price +' / '+docFormData.measurement}}
                    </q-chip>

                  

                            <q-tabs v-model="tab" dense active-color="white" active-bg-color="secondary" indicator-color="transparent" align="justify" narrow-indicator no-caps  class="text-teal"  :breakpoint="0" style="background: white">
                                <q-tab name="requests"  label="Request"  style="text-transform: capitalize"/>
                                <q-tab name="inventories"  label="Inventory"  style="text-transform: capitalize"/>
                            </q-tabs>
                        

                        
                            <q-tab-panels v-model="tab" animated  transition-prev="jump-up" transition-next="jump-up" style="background: transparent">
                                <q-tab-panel name="requests" style="padding: 0px">
                                    <app-seed-bank-detail-requests-listview></app-seed-bank-detail-requests-listview>
                                </q-tab-panel>
                                 <q-tab-panel name="inventories" style="padding: 0px">
                                     <app-seed-bank-detail-inventories-listview :datas="inventoryDatas" :docFormData="docFormData"></app-seed-bank-detail-inventories-listview>
                                </q-tab-panel>
                            </q-tab-panels>
                       

                </app-skeleton>

                
              </div>
              <div class="col-lg-2 col-xs-0"></div>
          </div>
        </q-pull-to-refresh>
        
    </q-page>
</template>


<script>
import { mapState} from 'vuex';
import SeedBankDetailInventoriesListView from '../../components/listviews/details/SeedBankDetailInventoriesListView'
import SeedBankDetailRequestsListView from '../../components/listviews/details/SeedBankDetailRequestsListView'
import Skeleton from '../../components/Skeleton';
import filters from '../../repositories/filters'
export default {
    name: "seed_bank_details",
    components: {
        "app-seed-bank-detail-inventories-listview": SeedBankDetailInventoriesListView,
        "app-seed-bank-detail-requests-listview": SeedBankDetailRequestsListView,
        "app-skeleton": Skeleton
    },
    mixins: [filters],
    meta: {
        titleTemplate: title => `Seed Bank Details - ${title}  `,
    },
    data(){
        return {
             tab: 'inventories',
             splitterModel: 20
        }
    },
    computed: {
        ...mapState('seed_bank_details',['skeleton','unsubscribe', 'docFormData','inventory_is_loading','inventoryDatas', 'request_is_loading', 'requestDatas'])
    },
    methods: {
        async main(){
            
            this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB',{ prevPageTitle: 'Seed Banks', pageTitle: 'Seed Bank Details' })
            this.$store.commit('seed_bank_details/UPDATE_DOC_ID',this.$route.params.id)
            this.$store.commit('seed_bank_details/CLEAR_DOC_FORM_DATA')
            this.$store.dispatch('seed_bank_details/fetchDoc',this).then(()=> {
                this.$store.dispatch('seed_bank_details/fetchInventories','initial').then(() => {
                    console.log('Inventory DOc')
                })
                this.$store.dispatch('seed_bank_details/fetchRequests','initial').then(() => {})
            });
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
                    if(this.tab == 'requests'){
                        this.$store.dispatch('seed_bank_details/fetchRequests', 'next');
                    }
                    if(this.tab == 'inventories'){
                        this.$store.dispatch('seed_bank_details/fetchInventories', 'next');
                    }
                }
            }
        },
        async refresh(done){
            this.main().then(() => done());
            
        }
    },
    beforeMount() {
        this.tabCheck()
        this.main();
    },
    mounted() {
        this.getNextData();
    },
    beforeRouteLeave (to, from , next) {
        this.$store.dispatch('seed_bank_details/unsubscribe',this)
        this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
        next();
    }
}

</script>


