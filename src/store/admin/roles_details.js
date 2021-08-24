
import RoleDetail from "../../models/role_detail";
import { snackbar, confirm } from 'src/repositories/plugins';
import FlexValidators from "src/repositories/flex_validators";

const state = {
    roleId: '',
    is_loading: false,
    skeleton: false,
    unsubscribe: {},

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


    //EXTENSION
    extension_is_loading: false,
    extensionFormData: {
        id: '',
        name: '',
        approval_box: [],
    },
    extensionDatas: [],

    

    //OTHERS
    dependencies: {
        module: {},
        extension: {},
        role: {}
    },
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


     //EXTENSION
    fetchExtensionName: (state) => {
        return state.extensionFormData.name;
    },
    fetchExtensionApprovalBox: (state) => {
        return state.extensionFormData.approval_box;
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
    UPDATE_D_MODULE(state, value) {
        state.dependencies.module = value;
    },
    UPDATE_D_EXTENSION(state, value) {
        state.dependencies.extension = value;
    },
    UPDATE_D_ROLE(state, value) {
        state.dependencies.role = value;
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




    //EXTENSION
    UPDATE_EXTENSION_FORM_DATA(state, value){
        state.extensionFormData.id = value.id;
        state.extensionFormData.name = value.name;
        state.extensionFormData.approval_box = value.approval_box ?? [];
    },
    UPDATE_EXTENSION_DATAS(state,value){
        state.extensionDatas = Object.assign([], value)
    },
    UPDATE_EXTENSION_NAME(state, value){
        state.extensionFormData.name = value;
    },
    UPDATE_EXTENSION_APPROVAL_BOX(state, value){
        state.extensionFormData.approval_box = value;
    },
    UPDATE_EXTENSION_IS_LOADING(state, value){
        state.extension_is_loading = value;
    },
    CLEAR_EXTENSION_FORM_DATA(state){
        state.extensionFormData = Object.assign({
            id: '',
            name: '',
            approval_box: [],
         })
    },

  

    //OTHERS
    UPDATE_IS_LOADING(state, value){
        state.is_loading = value;
    },
    UPDATE_UNSUBSCRIBE(state,payload){
        state.unsubscribe[payload.type] = payload.value
    },
   


    //
    UPDATE_SKELETON(state, value){
        state.skeleton = value;
    }




   

}
const actions = {

    async fetchModuleDependency({ commit, state }) {
        let unsubscribe = await RoleDetail.fetchModuleDependency((module, err) => {
          if (err) {
            snackbar("warning", err.message);
            return;
          }
          commit("UPDATE_D_MODULE", module);
        });
        commit("UPDATE_UNSUBSCRIBE", {
          type: "fetchModuleDependency",
          value: unsubscribe
        });
    },
    async fetchExtensionDependency({ commit, state }) {
        let unsubscribe = await RoleDetail.fetchExtensionDependency((extension, err) => {
          if (err) {
            snackbar("warning", err.message);
            return;
          }
          commit("UPDATE_D_EXTENSION", extension);
        });
        commit("UPDATE_UNSUBSCRIBE", {
          type: "fetchExtensionDependency",
          value: unsubscribe
        });
    },

    async fetchRoleDependency({ commit, state }) {
        let unsubscribe = await RoleDetail.fetchRoleDependency((role, err) => {
          if (err) {
            snackbar("warning", err.message);
            return;
          }
          commit("UPDATE_D_ROLE", role);
          
        });
        commit("UPDATE_UNSUBSCRIBE", {
          type: "fetchRoleDependency",
          value: unsubscribe
        });
    },

    //ROLEINFORMATION
    async fetchRoleInformation({ commit, state}){
     
        commit('UPDATE_SKELETON', true);
        let unsubscribe = new RoleDetail(state.roleId).fetchRoleInformation((data,err) => {
            if(err){ 
                snackbar('warning',err.message);
                commit('UPDATE_SKELETON', false);
                return;
            }
            commit('UPDATE_ROLE_INFORMATION_FORM_DATA',data);
            commit('UPDATE_SKELETON', false);
        })
        
       commit('UPDATE_UNSUBSCRIBE', { type: 'fetchInformation', value: unsubscribe})
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
      
        commit('UPDATE_MODULE_IS_LOADING', true);
        let unsubscribe = new RoleDetail(state.roleId).fetchModules((datas,err) => {
            if(err){ 
                snackbar('warning',err.message);
                commit('UPDATE_MODULE_IS_LOADING', false);
                return;
            }
            commit('UPDATE_MODULE_DATAS',datas);
            commit('UPDATE_MODULE_IS_LOADING', false);
        })
        commit('UPDATE_UNSUBSCRIBE', { type: 'fetchModules', value: unsubscribe});
        
      
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





    //EXTENSION
    async fetchExtensions({commit, state}){
      
        commit('UPDATE_EXTENSION_IS_LOADING', true);
        let unsubscribe = new RoleDetail(state.roleId).fetchExtensions((datas,err) => {
            if(err){ 
                snackbar('warning',err.message);
                commit('UPDATE_EXTENSION_IS_LOADING', false);
                return;
            }
            commit('UPDATE_EXTENSION_DATAS',datas);
            commit('UPDATE_EXTENSION_IS_LOADING', false);
        })
       commit('UPDATE_UNSUBSCRIBE', { type: 'fetchExtensions', value: unsubscribe});
        
      
    },

   

    async createExtension({commit, state},instance){
        try{
            commit('UPDATE_IS_LOADING', true);

            const data = state.extensionFormData;
            delete data.id;
            
            new FlexValidators(data).check({
                'name': 'required|notNull',
            });
            
           
            let roleDetail = new RoleDetail(state.roleId);
            await roleDetail.saveExtension(data);
           
            snackbar('success','item created successfully')
            commit("CLEAR_EXTENSION_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
    },

    async updateExtension({commit, state},instance){
       
        try{
            commit('UPDATE_IS_LOADING', true);
            const extensionId = state.extensionFormData.id;
            const data = state.extensionFormData;
            delete data.id;

            
            new FlexValidators(data).check({
                'name': 'required|notNull',
            });
            
            let roleDetail = new RoleDetail(state.roleId);
            await roleDetail.saveExtension(data,extensionId);

            snackbar('success','item updated successfully')
            commit("CLEAR_EXTENSION_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },


    async deleteExtensionById({commit, state},extensionId){
        let x = (await confirm('Confirm','Would you like to delete the selected item?'));
        x.onOk(()=> {
           
            new RoleDetail(state.roleId).deleteExtensionById(extensionId).then().catch(err => {
                snackbar('warning',err.message);
            });
        })
    },




   async clearAll({commit, state},instance){
       commit("UPDATE_SKELETON", false)
       commit("UPDATE_IS_LOADING", false);
       commit("CLEAR_EXTENSION_FORM_DATA")
       commit("CLEAR_MODULE_FORM_DATA")
       commit("CLEAR_ROLE_INFORMATION_FORM_DATA")
       commit("UPDATE_MODULE_DATAS", []);
       commit("UPDATE_EXTENSION_DATAS", []);

   },

    async unsubscribe({commit, state},instance){
        for(let x in state.unsubscribe){
            let endListener = await state.unsubscribe[x];
            endListener();
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