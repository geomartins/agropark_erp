<template>
    <q-page>
        <q-pull-to-refresh @refresh="refresh">
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-9 col-xs-12">
                  
                  
     
                <app-skeleton :skeleton="skeleton" type="b">

                    <q-chip class="q-mb-sm">
                        <q-avatar icon="edit" color="primary" text-color="white" @click.prevent="showEditForm()"/>
                        {{ roleInformationFormData.name | capitalize }} Role
                    </q-chip>

                    <q-splitter v-model="splitterModel" style="max-height: 100%;">
                        <template v-slot:before>
                            <q-tabs v-model="tab" vertical dense indicator-color="primary"  class="text-teal" align="left" :breakpoint="0" style="background: white">
                                <q-tab name="modules"  label="Modules"  style="text-transform: capitalize"/>
                                <q-tab name="extensions"  label="Extensions"  style="text-transform: capitalize"/>
                            </q-tabs>
                        </template>

                        <template v-slot:after>
                            <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up" style="background: transparent">
                                <q-tab-panel name="modules">
                                    <app-roles-module-listview :datas='moduleDatas' :loading="module_is_loading"></app-roles-module-listview>
                                </q-tab-panel>
                                 <q-tab-panel name="extensions">
                                    <app-roles-extension-listview :datas='extensionDatas' :loading="extension_is_loading"></app-roles-extension-listview>
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
import RolesModuleListView from '../../components/listviews/details/RolesModuleListView'
import RolesExtensionListView from '../../components/listviews/details/RolesExtensionListView'
import Skeleton from '../../components/Skeleton';

import filters from '../../repositories/filters'
export default {
    name: "roles_details",
    components: {
        "app-roles-module-listview": RolesModuleListView,
        "app-roles-extension-listview": RolesExtensionListView,
        "app-skeleton": Skeleton
    },
    mixins: [filters],
    meta: {
        titleTemplate: title => `Role Details - ${title}  `,
    },
    data(){
        return {
             tab: 'modules',
             splitterModel: 20
        }
    },
    computed: {
        ...mapState('roles_details',['skeleton', 'roleInformationFormData','module_is_loading','moduleDatas', 'extension_is_loading', 'extensionDatas'])
    },
    methods: {
        //MUTATION
        ...mapMutations('admin_layout', ['UPDATE_BREAD_CRUMB','UPDATE_RIGHT_DRAWER_OPEN']),
        ...mapMutations('roles_details', [
            'UPDATE_ROLE_ID','CLEAR_ROLE_INFORMATION_FORM_DATA',
        ]),

        //ACTION
        ...mapActions('roles_details',['fetchRoleInformation','unsubscribe']),

        showEditForm(){
             this.$store.commit('admin_layout/UPDATE_COMPONENT_NAME','app-role-information-update-form'); 
             this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',true)
        },
        async main(){
            this.UPDATE_BREAD_CRUMB({ prevPageTitle: 'Roles', pageTitle: 'Role Details' });
            this.UPDATE_ROLE_ID(this.$route.params.id);
            this.CLEAR_ROLE_INFORMATION_FORM_DATA();

            this.fetchRoleInformation(this);
            this.$store.dispatch('roles_details/fetchModules',this);
            this.$store.dispatch('roles_details/fetchModuleDependency');

            this.$store.dispatch('roles_details/fetchExtensions',this)
            this.$store.dispatch('roles_details/fetchExtensionDependency');

            this.$store.dispatch('roles_details/fetchRoleDependency');
               
            
        },
        async refresh(done){
            this.main().then(() => done());
        }
    },

    created(){ 
        this.main();
    },
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
