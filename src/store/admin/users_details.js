import UserDetail from "../../models/user_detail";
import { snackbar, confirm } from 'src/repositories/plugins';
import ChainValidators from '../../repositories/chain_validators'

const state = {
    userId: '',
    is_loading: false,
    unsubscribe: [],
    personalInformationFormData: {
        id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        role: '',
    },
    departmentFormData: {
        id: '',
        name: ''
    },
    departmentDatas: []
}
const getters = {
    fetchDepartmentName: (state) => {
        return state.departmentFormData.name;
    },
}
const mutations = {
    UPDATE_USER_ID(state, value){
        state.userId = value;
    },
    UPDATE_PERSONAL_INFORMATION_FORM_DATA(state,value){
        state.personalInformationFormData.id = value.id;
        state.personalInformationFormData.firstname = value.firstname;
        state.personalInformationFormData.middlename = value.middlename;
        state.personalInformationFormData.role = value.role;
    },
    UPDATE_DEPARTMENT_DATAS(state,value){
        state.departmentDatas = Object.assign([], value)
    },
    UPDATE_UNSUBSCRIBE(state,value){
        state.unsubscribe = Object.assign([], value)
    },
    CLEAR_DEPARTMENT_FORM_DATA(state){
        state.departmentData.name = '';
        state.departmentFormData.id = '';
    },
    UPDATE_IS_LOADING(state, value){
        state.is_loading = value;
    },

}
const actions = {

    async fetchPersonalInformation({ commit, state}){
        try{
            let unsubscribe = new UserDetail(state.userId).fetchPersonalInformation((data,unsubscribe) => {
                commit('UPDATE_PERSONAL_INFORMATION_FORM_DATA',data);
           })
           commit('UPDATE_UNSUBSCRIBE', [...state.unsubscribe, unsubscribe]);
          
        }catch(err){
            snackbar('warning',err.message);
        }
    },

    async fetchDepartments({commit, state}){
        try{
            let unsubscribe = new UserDetail(state.userId).fetchDepartments((datas,unsubscribe) => {
                commit('UPDATE_DEPARTMENT_DATAS',datas);
           })
           commit('UPDATE_UNSUBSCRIBE', [...state.unsubscribe, unsubscribe]);
          
        }catch(err){
            snackbar('warning',err.message);
        }
    },

    async createDepartment({commit, state},instance){
        const data = state.departmentFormData;
        delete data.id;
        const name = new ChainValidators(data.name).trim().lower().val;

        const name_validator = new ChainValidators(name,'name').notNull().validate;
        if(name_validator == false){ return ''; }


        try{
            commit('UPDATE_IS_LOADING', true);
            let userDetail = new UserDetail(state.userId);
            await userDetail.saveDepartment(data);

            snackbar('success','item created successfully')
            commit("CLEAR_DEPARTMENT_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
    },

    async updateDepartment({commit, state},instance){
        const deptId = state.departmentFormData.id;
        const data = state.departmentFormData;
        delete data.id;

        try{
            commit('UPDATE_IS_LOADING', true);
            let userDetail = new UserDetail(state.userId);
            await userDetail.saveDepartment(data,deptId);

            snackbar('success','item updated successfully')
            commit("CLEAR_DEPARTMENT_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },






    async deleteDepartmentById({commit, state},deptId){
        let x = (await confirm('Confirm','Would you like to delete the selected item?'));
        x.onOk(()=> {
            console.log(id);
            new UserDetail(state.userId).deleteDepartmentById(deptId).then().catch(err => {
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