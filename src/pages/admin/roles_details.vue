<template>
    <q-page>
        <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-9 col-xs-12">
                  <app-skeleton :skeleton="skeleton" type="b">
                    <q-splitter
                    v-model="splitterModel"
                    style="max-height: 100%"
                    >

                    <template v-slot:before>
                        <q-tabs
                        v-model="tab"
                        vertical
                        dense
                        indicator-color="primary"
                        active-bg-color=""
                        class="text-teal"
                        align="left"
                        :breakpoint="0"
                        
                        >
                        <q-tab name="mails"  label="Module"  style="text-transform: capitalize"/>
                         <q-tab name="infos"  label="Details"  style="text-transform: capitalize"/>
                        
                        
                        </q-tabs>
                    </template>

                    <template v-slot:after>
                        <q-tab-panels
                        v-model="tab"
                        animated
                        swipeable
                        vertical
                        transition-prev="jump-up"
                        transition-next="jump-up"
                        style="background: transparent"
                        >
                        <q-tab-panel name="mails">
                            <app-roles-module-listview :datas='moduleDatas' :loading="module_is_loading"></app-roles-module-listview>
                        </q-tab-panel>

                         <q-tab-panel name="infos">
                             <app-role-information-listview :data="roleInformationFormData"></app-role-information-listview>
                        </q-tab-panel>

                        

                        
                        </q-tab-panels>
                    </template>

                    </q-splitter>
                


                    
                       
                        
                    </app-skeleton>
              </div>
              <div class="col-lg-2 col-xs-0"></div>
          </div>
        </q-pull-to-refresh>
        
    </q-page>
</template>


<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import RoleInformationListView from '../../components/listviews/details/RoleInformationListView'
import RolesModuleListView from '../../components/listviews/details/RolesModuleListView'
import Skeleton from '../../components/Skeleton';
export default {
    name: "roles_details",
    components: {
        "app-role-information-listview": RoleInformationListView,
        "app-roles-module-listview": RolesModuleListView,
        "app-skeleton": Skeleton
    },
    meta: {
        titleTemplate: title => `Role Details - ${title}  `,
    },
    data(){
        return {
             tab: 'mails',
      splitterModel: 20
        }
    },
    computed: {
        ...mapState('roles_details',['skeleton', 'roleInformationFormData','module_is_loading','moduleDatas'])
    },
    methods: {
        //MUTATION
        ...mapMutations('admin_layout', ['UPDATE_BREAD_CRUMB','UPDATE_RIGHT_DRAWER_OPEN']),
        ...mapMutations('roles_details', [
            'UPDATE_ROLE_ID','CLEAR_ROLE_INFORMATION_FORM_DATA',
        ]),

        //ACTION
        ...mapActions('roles_details',['fetchRoleInformation','unsubscribe']),

        async main(){
            this.UPDATE_BREAD_CRUMB({ prevPageTitle: 'Roles', pageTitle: 'Role Details' });
            this.UPDATE_ROLE_ID(this.$route.params.id);
            this.CLEAR_ROLE_INFORMATION_FORM_DATA();

            this.fetchRoleInformation(this).then(()=> {
                this.$store.dispatch('roles_details/fetchModules',this).then(() => {
                    this.$store.dispatch('roles_details/fetchModuleDependencies', this);
                })
            });
        },
        async refresh(done){
            this.main().then(() => done());
        }
    },

    created(){ 
        this.main();
     },
    beforeRouteLeave (to, from , next) {
        this.unsubscribe(this);
        this.UPDATE_RIGHT_DRAWER_OPEN(false);
        next();
    }
}

</script>

<style scoped>
.q-tabs__content .q-tab{
    border-bottom: 1px solid #e0e0e0 !important;
}

.q-tabs__content > .q-tab:first-child{
    border-top: 1px solid #e0e0e0 !important;
}



</style>
