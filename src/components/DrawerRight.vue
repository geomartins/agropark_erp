<template>
    <q-drawer
     v-model="rightDrawerOpen"
     behavior="default"
      show-if-above
      bordered
      :width="width"
      class="rightDrawer"
      side="right"
      
     v-if="rightDrawerOpen == true">
      <q-scroll-area class="fit">
          <component :is="$store.state.admin_layout.component_name"></component>
      </q-scroll-area>
    </q-drawer>

</template>


<script>
import Vue from 'vue'
import DomainsCreateForm from "./forms/DomainsCreateForm"

import RolesCreateForm from "./forms/RolesCreateForm"
import RolesUpdateForm from "./forms/RolesUpdateForm"

import ModulesCreateForm from "./forms/ModulesCreateForm"
import ModulesUpdateForm from "./forms/ModulesUpdateForm"

import UsersCreateForm from "./forms/UsersCreateForm"
import UsersUpdateForm from "./forms/UsersUpdateForm"

import UsersDepartmentCreateForm from "./forms/details/UsersDepartmentCreateForm"
import UsersDepartmentUpdateForm from "./forms/details/UsersDepartmentUpdateForm"

import UsersKinCreateForm from "./forms/details/UsersKinCreateForm"
import UsersKinUpdateForm from "./forms/details/UsersKinUpdateForm"

import UsersBankCreateForm from "./forms/details/UsersBankCreateForm"
import UsersBankUpdateForm from "./forms/details/UsersBankUpdateForm"


import UsersPersonalInformationUpdateForm from "./forms/details/UsersPersonalInformationUpdateForm"
import UsersResetCreateForm from "./forms/details/UsersResetCreateForm"
import UsersAvatarUpdateForm from "./forms/details/UsersAvatarUpdateForm"
import UsersDocumentCreateForm from "./forms/details/UsersDocumentCreateForm"


import RoleInformationUpdateForm from "./forms/details/RoleInformationUpdateForm"
import RolesModuleCreateForm from "./forms/details/RolesModuleCreateForm"
import RolesModuleUpdateForm from "./forms/details/RolesModuleUpdateForm"
import RolesExtensionCreateForm from "./forms/details/RolesExtensionCreateForm"
import RolesExtensionUpdateForm from "./forms/details/RolesExtensionUpdateForm"



import SeedBanksCropCategoriesCreateForm from "./forms/SeedBanksCropCategoriesCreateForm"
import SeedBanksCropCategoriesUpdateForm from "./forms/SeedBanksCropCategoriesUpdateForm"



import SeedBanksCropTypesCreateForm from "./forms/SeedBanksCropTypesCreateForm"
import SeedBanksCropTypesUpdateForm from "./forms/SeedBanksCropTypesUpdateForm"


import SeedBankInventoryCreateForm from "./forms/details/SeedBankInventoryCreateForm.vue"


import FeedbackCreateForm from "./forms/utilities/FeedbackCreateForm.vue"
import UsersDependencyUpdateForm from './forms/UsersDependencyUpdateForm'
import ModulesDependencyUpdateForm from './forms/ModulesDependencyUpdateForm'



export default Vue.extend({
    name: 'Drawer',
    components: {
        "app-domains-create-form": DomainsCreateForm,
        "app-roles-create-form": RolesCreateForm,
        "app-roles-update-form": RolesUpdateForm,
        "app-modules-create-form": ModulesCreateForm,
        "app-modules-update-form": ModulesUpdateForm,
        "app-users-create-form": UsersCreateForm,
        "app-users-update-form": UsersUpdateForm,
        "app-users-department-create-form": UsersDepartmentCreateForm,
        "app-users-department-update-form": UsersDepartmentUpdateForm,
        "app-users-kin-create-form": UsersKinCreateForm,
        "app-users-kin-update-form": UsersKinUpdateForm,
        "app-users-bank-create-form": UsersBankCreateForm,
        "app-users-bank-update-form": UsersBankUpdateForm,
        "app-users-personal-information-update-form": UsersPersonalInformationUpdateForm,
        "app-users-reset-create-form": UsersResetCreateForm,
        "app-users-avatar-update-form": UsersAvatarUpdateForm,
        "app-users-document-create-form": UsersDocumentCreateForm,
        "app-role-information-update-form": RoleInformationUpdateForm,
        "app-roles-module-create-form": RolesModuleCreateForm,
        "app-roles-module-update-form": RolesModuleUpdateForm,
        "app-roles-extension-create-form": RolesExtensionCreateForm,
        "app-roles-extension-update-form": RolesExtensionUpdateForm,
        "app-seed-banks-crop-categories-create-form": SeedBanksCropCategoriesCreateForm,
        "app-seed-banks-crop-categories-update-form": SeedBanksCropCategoriesUpdateForm,
        "app-seed-banks-crop-types-create-form": SeedBanksCropTypesCreateForm,
        "app-seed-banks-crop-types-update-form": SeedBanksCropTypesUpdateForm,
        "app-seed-bank-inventory-create-form": SeedBankInventoryCreateForm,
        "app-feedback-create-form": FeedbackCreateForm,
        "app-users-dependency-update-form": UsersDependencyUpdateForm,
        "app-modules-dependency-update-form": ModulesDependencyUpdateForm
    },
    data(){
        return {
            width: 350,
            overlay: true,
            breakpoint: 300,
        //    name: 'app-module-categories-create-form'
        }
    },
    watch: {
        rightDrawerOpen: function (newValue, oldValue) {
            console.log('-----------------')
           this.width = 250;
         if(this.$q.screen.lt.md){
                console.log('Medium')
                this.width = 300;
         }else if(this.$q.screen.lt.lg){
                console.log('Large')
                this.width = 440;
         }else if(this.$q.screen.lt.sm){
                console.log('small')
                this.width = 200;
         }else if(this.$q.screen.lt.xs){
                console.log('Xtra small')
                 this.width = 200;
         }else{
              console.log('Xtra Xtra large')
               this.width = 480;
         }
      }
    },
    methods: {
       
       
    },
    computed: {
        rightDrawerOpen:  {
        get() { return this.$store.getters["admin_layout/fetchRightDrawerOpen"]; },
        set(value){ this.$store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',value); }   
      },
    },
    methods: {
       
    }
})
</script>

<style >
/* 
@media (min-width: 0px) and (max-width: 400px){
    .q-drawer--right{
        width: calc(80%)!important;
    }
}

@media (min-width: 400px) and (max-width: 600px){
    .q-drawer--right{
        width: calc(70%)!important;
    }
}

@media (min-width: 601px) and (max-width: 800px){
    .q-drawer--right{
        width: calc(60%)!important;
    }
}

@media (min-width: 801px) and (max-width: 1200px){
    .q-drawer--right{
        width: calc(30%)!important;
    }
} */

/* 
--q-size-xs: 0;
--q-size-sm: 600px;
--q-size-md: 1024px;
--q-size-lg: 1440px;
--q-size-xl: 1920px; */


</style>