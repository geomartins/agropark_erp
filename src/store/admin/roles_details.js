import UserDetail from "../../models/user_detail";
import RoleDetail from "../../models/role_detail";
import { snackbar, confirm } from 'src/repositories/plugins';
import FlexValidators from "src/repositories/flex_validators";
import ChainValidators from '../../repositories/chain_validators'

const state = {
    roleId: '',
    is_loading: false,
    skeleton: false,
    unsubscribe: [],

    //PERSONAL
    role_information_is_loading: false,
    roleInformationFormData: {
        id: '',
        name: '',
        description: '',
    },

    //MODULE
    module_is_loading: false,
    moduleFormData: {
        id: '',
        name: '',
        primary_access: [],
        secondary_access: [],
        tertiary_access: [],
    },
    moduleDatas: [],

    

    //OTHERS
    dependencies: {
        modules: [],
    }
}
const getters = {
    //MODULE
    fetchModuleName: (state) => {
        return state.moduleFormData.name;
    },
    fetchModulePrimaryAccess: (state) => {
        return state.moduleFormData.primary_access;
    },
    fetchModuleSecondaryAccess: (state) => {
        return state.moduleFormData.secondary_access;
    },
    fetchModuleTertiaryAccess: (state) => {
        return state.moduleFormData.tertiary_access;
    },



    //ROLEINFORMATION
    fetchRoleInformationName: (state) => {
        return state.roleInformationFormData.name;
    },
    fetchRoleInformationDescription: (state) => {
        return state.roleInformationFormData.description;
    },

    

   



}
const mutations = {
    UPDATE_ROLE_ID(state, value){
        state.roleId = value;
    },
    //PERSONAL INFORMATION
    UPDATE_ROLE_INFORMATION_FORM_DATA(state,value){
        state.roleInformationFormData.id = value.id ?? '';
        state.roleInformationFormData.name = value.name ?? '';
        state.roleInformationFormData.description = value.description ?? ''; 
    },
    UPDATE_ROLE_INFORMATION_NAME(state, value){
        state.roleInformationFormData.name = value;
    },
    UPDATE_ROLE_INFORMATION_DESCRIPTION(state, value){
        state.roleInformationFormData.description = value;
    },
  
    CLEAR_ROLE_INFORMATION_FORM_DATA(state){
        state.roleInformationFormData = Object.assign({
            id: '',
            name: '',
            description: ''
        })
        
    },


    //MODULE
    UPDATE_MODULE_FORM_DATA(state, value){
        state.moduleFormData.id = value.id;
        state.moduleFormData.name = value.name;
        state.moduleFormData.primary_access = value.primary_access ?? [];
        state.moduleFormData.secondary_access = value.secondary_access ?? [];
        state.moduleFormData.tertiary_access = value.tertiary_access ?? [];
        
    },
    UPDATE_MODULE_DATAS(state,value){
        state.moduleDatas = Object.assign([], value)
    },
    UPDATE_MODULE_NAME(state, value){
        state.moduleFormData.name = value;
    },
    UPDATE_MODULE_PRIMARY_ACCESS(state, value){
        state.moduleFormData.primary_access = value;
    },
    UPDATE_MODULE_SECONDARY_ACCESS(state, value){
        state.moduleFormData.secondary_access = value;
    },
    UPDATE_MODULE_TERTIARY_ACCESS(state, value){
        state.moduleFormData.tertiary_access = value;
    },
    UPDATE_MODULE_IS_LOADING(state, value){
        state.module_is_loading = value;
    },
    CLEAR_MODULE_FORM_DATA(state){
        state.moduleFormData = Object.assign({
            id: '',
            name: '',
            primary_access: [],
            secondary_access: [],
            tertiary_access: []
         })
    },

  

    //OTHERS
    UPDATE_IS_LOADING(state, value){
        state.is_loading = value;
    },
    UPDATE_UNSUBSCRIBE(state,value){
        state.unsubscribe = Object.assign([], value)
    },
   
    //DEPENDENCY
    UPDATE_D_MODULES(state, value){
        state.dependencies.modules = value;
    },
   

    //
    UPDATE_SKELETON(state, value){
        state.skeleton = value;
    }




   

}
const actions = {

    //ROLEINFORMATION
    async fetchRoleInformation({ commit, state}){
        try{
            commit('UPDATE_SKELETON', true);
            let unsubscribe = new RoleDetail(state.roleId).fetchRoleInformation((data,unsubscribe) => {
                commit('UPDATE_ROLE_INFORMATION_FORM_DATA',data);
                commit('UPDATE_SKELETON', false);
           })
           
           commit('UPDATE_UNSUBSCRIBE', [...state.unsubscribe, unsubscribe]);
          
        }catch(err){
            snackbar('warning',err.message);
        }
    },

    async updateRoleInformation({commit, state},instance){
        
        try{
            commit('UPDATE_IS_LOADING', true);
            const roleInformationId = state.roleInformationFormData.id;
            const data = state.roleInformationFormData;
            new FlexValidators(data).check({
                'name': 'required|notNull',
                'description': 'required|notNull',
                'id': 'required|notNull'
            });

            delete data.id;
            let roleDetail = new RoleDetail(state.roleId);
            await roleDetail.saveRoleInformation(data,roleInformationId);

            snackbar('success','item updated successfully')
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },



    //MODULE
    async fetchModules({commit, state}){
        try{
            commit('UPDATE_MODULE_IS_LOADING', true);
            let unsubscribe = new RoleDetail(state.roleId).fetchModules((datas,unsubscribe) => {
                commit('UPDATE_MODULE_DATAS',datas);
           })
           commit('UPDATE_UNSUBSCRIBE', [...state.unsubscribe, unsubscribe]);
           commit('UPDATE_MODULE_IS_LOADING', false);
          
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_MODULE_IS_LOADING', false);
        }
    },

    async fetchModuleDependencies({commit, state}){
        try{
            await new RoleDetail(state.roleId).moduleDependencies((modules) => {
                commit('UPDATE_D_MODULES', modules);
           });
        }catch(err){
            snackbar('warning',err.message);
        }
       
    },

    async createModule({commit, state},instance){
        



        try{
            commit('UPDATE_IS_LOADING', true);

            const data = state.moduleFormData;
            delete data.id;
            
            new FlexValidators(data).check({
                'name': 'required|notNull',
                'primary_access': 'required|notNull',
            });
            
           
            let roleDetail = new RoleDetail(state.roleId);
            await roleDetail.saveModule(data);
           
            snackbar('success','item created successfully')
            commit("CLEAR_MODULE_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
    },

    async updateModule({commit, state},instance){
       
        try{
            commit('UPDATE_IS_LOADING', true);
            const moduleId = state.moduleFormData.id;
            const data = state.moduleFormData;
            delete data.id;

            
            new FlexValidators(data).check({
                'name': 'required|notNull',
                'primary_access': 'required|notNull',
            });
            
            let roleDetail = new RoleDetail(state.roleId);
            await roleDetail.saveModule(data,moduleId);

            snackbar('success','item updated successfully')
            commit("CLEAR_MODULE_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

    async deleteModuleById({commit, state},moduleId){
        let x = (await confirm('Confirm','Would you like to delete the selected item?'));
        x.onOk(()=> {
           
            new RoleDetail(state.roleId).deleteModuleById(moduleId).then().catch(err => {
                snackbar('warning',err.message);
            });
        })
    },



  

    async unsubscribe({commit, state},instance){
        for(let x in state.unsubscribe){
            x.unsubscribe();
        }
    },

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}