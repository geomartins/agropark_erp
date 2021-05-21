<template>
    <q-page>

        <q-pull-to-refresh @refresh="refresh">
           <app-users-details-toolbar></app-users-details-toolbar>
           
          <div class="row">
              <div class="col-lg-1 col-xs-0"></div>
              <div class="col-lg-8 col-xs-12">
                  <app-users-personal-information-listview></app-users-personal-information-listview>
                  <app-users-department-listview></app-users-department-listview>
                  <app-users-kin-listview></app-users-kin-listview>
                  <app-users-bank-listview></app-users-bank-listview>


                  

                  
                  <!-- {{ $route.params.id }} -->
              </div>
              <div class="col-lg-3 col-xs-0"></div>
          </div>
        </q-pull-to-refresh>
    </q-page>
</template>


<script>
import UsersPersonalInformationListView from '../../components/listviews/UsersPersonalInformationListView'
import UsersDepartmentListView from '../../components/listviews/UsersDepartmentListView'
import UsersKinListView from '../../components/listviews/details/UsersKinListView'
import UsersBankListView from '../../components/listviews/details/UsersBankListView'
import UsersDetailsToolbar from '../../components/toolbar/UsersDetailsToolbar'
export default {
    name: "users_details",
    components: {
        "app-users-personal-information-listview": UsersPersonalInformationListView,
        "app-users-department-listview": UsersDepartmentListView,
        "app-users-kin-listview": UsersKinListView,
         "app-users-bank-listview": UsersBankListView,
         "app-users-details-toolbar": UsersDetailsToolbar

    },
    meta: {
        titleTemplate: title => `Users Details - ${title}  `,
    },
    data(){
        return {

        }
    },
    methods: {
        async main(){
            this.$store.commit('users_details/UPDATE_USER_ID',this.$route.params.id)
            this.$store.dispatch('users_details/fetchPersonalInformation', this).then(() => {
                //this.$store.dispatch('users/dependencies', this);
            });
        },
        async refresh(done){
            this.main().then(() => done());
        }
    },

    created(){ this.main(); },
    beforeRouteLeave (to, from , next) {
        this.$store.dispatch('users_details/unsubscribe', this);
        this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
        next();
    }
}
</script>
