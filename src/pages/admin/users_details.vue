<template>
    <q-page>
        <q-pull-to-refresh @refresh="refresh">
          
           
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-users-details-skeleton :skeleton="skeleton">
                        <app-users-details-toolbar></app-users-details-toolbar>
                        <app-users-personal-information-listview></app-users-personal-information-listview>
                        <app-users-department-listview :datas='departmentDatas' :loading="department_is_loading"></app-users-department-listview>
                        <app-users-kin-listview :datas='kinDatas' :loading="kin_is_loading"></app-users-kin-listview>
                        <app-users-bank-listview></app-users-bank-listview>
                        <app-users-document-listview :datas='documentDatas' :loading="document_is_loading"></app-users-document-listview>
                  </app-users-details-skeleton>


                  

                  
                  <!-- {{ $route.params.id }} -->
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
        </q-pull-to-refresh>
        
    </q-page>
</template>


<script>
import { mapState } from 'vuex';
import UsersPersonalInformationListView from '../../components/listviews/UsersPersonalInformationListView'
import UsersDepartmentListView from '../../components/listviews/UsersDepartmentListView'
import UsersKinListView from '../../components/listviews/details/UsersKinListView'
import UsersBankListView from '../../components/listviews/details/UsersBankListView'
import UsersDetailsToolbar from '../../components/toolbar/UsersDetailsToolbar'
import UsersDetailsSkeleton from '../../components/skeletons/details/UsersDetailsSkeleton'
import UsersDocumentListView from '../../components/listviews/details/UsersDocumentListView'
export default {
    name: "users_details",
    components: {
        "app-users-personal-information-listview": UsersPersonalInformationListView,
        "app-users-department-listview": UsersDepartmentListView,
        "app-users-kin-listview": UsersKinListView,
        "app-users-bank-listview": UsersBankListView,
        "app-users-details-toolbar": UsersDetailsToolbar,
        "app-users-details-skeleton": UsersDetailsSkeleton,
        "app-users-document-listview": UsersDocumentListView,
    },
    meta: {
        titleTemplate: title => `Users Details - ${title}  `,
    },
    data(){
        return {
                
        }
    },
    computed: {
        ...mapState('users_details',['skeleton', 'departmentDatas', 'department_is_loading', 'kin_is_loading', 'kinDatas', 'document_is_loading', 'documentDatas'])
    },
    methods: {
        async main(){
            this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { prevPageTitle: 'Users', pageTitle: 'User Details' })
            this.$store.commit('users_details/UPDATE_USER_ID',this.$route.params.id)
            this.$store.dispatch('users_details/fetchPersonalInformation', this)
            this.$store.dispatch('users_details/fetchUserDependency', this);
            this.$store.dispatch('users_details/fetchRoleDependency', this);
        },
        async refresh(done){
            this.main().then(() => done());
        }
    },

    created(){ 
        this.main();
     },
}


// mapState({
//         skeleton: state => state.users_details.skeleton,
//         skeletonAlias(state){
//             return this.skelo;
//         }, 

//     })

</script>

<style scoped>
.pageFlex{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

}

.pageFlex > .center{
    width: 80%;
    height: 100%;
    
}

@media (min-width: 0px) and (max-width: 400px){
    .pageFlex > .center{
        width: 100%;
        height: 100%;
        
    }

}

@media (min-width: 401px) and (max-width: 1000px){
    .pageFlex > .center{
        width: 100%;
        height: 100%;
        
    }

}

@media (min-width: 10001px) and (max-width: 1200px){
    .pageFlex > .center{
        width: 100%;
        height: 100%;
        
    }

}


</style>
