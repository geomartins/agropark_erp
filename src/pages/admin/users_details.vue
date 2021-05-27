<template>
    <q-page>
        


        <q-pull-to-refresh @refresh="refresh">
           <div class="row">
            
              <div class="col-lg-8 offset-lg-2  col-md-12">
                  
                  <app-users-details-skeleton :skeleton="skeleton">
                        <app-users-details-toolbar></app-users-details-toolbar>
                        <app-users-personal-information-listview></app-users-personal-information-listview>
                        <app-users-department-listview :datas='departmentDatas' :loading="department_is_loading"></app-users-department-listview>
                        <app-users-kin-listview :datas='kinDatas' :loading="kin_is_loading"></app-users-kin-listview>
                        <app-users-bank-listview></app-users-bank-listview>
                  </app-users-details-skeleton>
              </div>
              
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
export default {
    name: "users_details",
    components: {
        "app-users-personal-information-listview": UsersPersonalInformationListView,
        "app-users-department-listview": UsersDepartmentListView,
        "app-users-kin-listview": UsersKinListView,
         "app-users-bank-listview": UsersBankListView,
         "app-users-details-toolbar": UsersDetailsToolbar,
         "app-users-details-skeleton": UsersDetailsSkeleton
    },
    meta: {
        titleTemplate: title => `Users Details - ${title}  `,
    },
    data(){
        return {
                
        }
    },
    computed: {
        ...mapState('users_details',['skeleton', 'departmentDatas', 'department_is_loading', 'kin_is_loading', 'kinDatas'])
    },
    methods: {
        async main(){
            this.$store.commit('admin_layout/UPDATE_BREAD_CRUMB', { prevPageTitle: 'Users', pageTitle: 'User Details' })
            this.$store.commit('users_details/UPDATE_USER_ID',this.$route.params.id)
            this.$store.commit('users_details/CLEAR_PERSONAL_INFORMATION_FORM_DATA');
            this.$store.dispatch('users_details/fetchPersonalInformation', this).then(() => {
                
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
        this.$store.dispatch('users_details/unsubscribe', this);
        this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
        next();
    }
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
