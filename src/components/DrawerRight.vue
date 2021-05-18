<template>
    <q-drawer
     v-model="rightDrawerOpen"
      
      show-if-above
      bordered
      content-class="bg-white"
      :width="480"
      side="right"
      
     v-if="rightDrawerOpen == true">
      <q-scroll-area class="fit">

          <component :is="$store.state.admin_layout.component_name"></component>
         
      
      </q-scroll-area>
    </q-drawer>

</template>


<script>
import Vue from 'vue'
import ModuleCategoriesCreateForm from "./forms/ModuleCategoriesCreateForm"
import ModuleCategoriesUpdateForm from "./forms/ModuleCategoriesUpdateForm"

import DepartmentsCreateForm from "./forms/DepartmentsCreateForm"
import DepartmentsUpdateForm from "./forms/DepartmentsUpdateForm"

import UnitsCreateForm from "./forms/UnitsCreateForm"
import UnitsUpdateForm from "./forms/UnitsUpdateForm"

import RolesCreateForm from "./forms/RolesCreateForm"
import RolesUpdateForm from "./forms/RolesUpdateForm"

import ModulesCreateForm from "./forms/ModulesCreateForm"
import ModulesUpdateForm from "./forms/ModulesUpdateForm"

import UsersCreateForm from "./forms/UsersCreateForm"
import UsersUpdateForm from "./forms/UsersUpdateForm"


export default Vue.extend({
    name: 'Drawer',
    components: {
        "app-module-categories-create-form": ModuleCategoriesCreateForm,
        "app-module-categories-update-form": ModuleCategoriesUpdateForm,
        "app-departments-create-form": DepartmentsCreateForm,
        "app-departments-update-form": DepartmentsUpdateForm,
        "app-units-create-form": UnitsCreateForm,
        "app-units-update-form": UnitsUpdateForm,
        "app-roles-create-form": RolesCreateForm,
        "app-roles-update-form": RolesUpdateForm,
        "app-modules-create-form": ModulesCreateForm,
        "app-modules-update-form": ModulesUpdateForm,
        "app-users-create-form": UsersCreateForm,
        "app-users-update-form": UsersUpdateForm,
    },
    data(){
        return {
        //    name: 'app-module-categories-create-form'
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