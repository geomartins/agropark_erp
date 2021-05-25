import UserDetail from "../../models/user_detail";
import { snackbar, confirm } from 'src/repositories/plugins';
import ChainValidators from '../../repositories/chain_validators'
import { passwordMatchValidator } from '../../repositories/validators'

const state = {
    userId: '',
    is_loading: false,
    skeleton: false,
    unsubscribe: [],


    //RESET
    resetFormData: {
        password: '',
        confirm_password: ''
    },

    //SETTING
    settingFormData: {
        visibility: true,
    },

    //PERSONAL
    personal_information_is_loading: false,
    personalInformationFormData: {
        id: '',
        email: '',
        firstname: '',
        middlename: '',
        lastname: '',
        role: '',
        gender: '',
        dob: '',
        pob: '',
        telephone: '',
        marital_status: '',
        nationality: '',
        religion: '',
        height: '',
        weight: '',
        blood_type: '',
    },

    //DEPARTMENT
    department_is_loading: false,
    departmentFormData: {
        id: '',
        name: ''
    },
    departmentDatas: [],

    //KIN
    kin_is_loading: false,
    kinFormData: {
        id: '',
        fullname: '',
        relationship: '',
        occupation: '',
        address: '',
        telephone: '',
    },
    kinDatas: [],

    //BANK
    bank_is_loading: false,
    bankFormData: {
        id: '',
        name: '',
        account_number: '',
        account_holder_name: ''
    },
    bankDatas: [],

    //OTHERS
    dependencies: {
        departments: [],
        relationships: [],
        banks: [],

        religions: [],
        blood_types: [],
        nationalities: [],
        marital_status: [],
        roles: [],
        genders: [],
    }
}
const getters = {
    //DEPARTMENT
    fetchDepartmentName: (state) => {
        return state.departmentFormData.name;
    },

    //PERSONALINFORMATION
    fetchPersonalInformationEmail: (state) => {
        return state.personalInformationFormData.email;
    },
    fetchPersonalInformationFirstname: (state) => {
        return state.personalInformationFormData.firstname;
    },
    fetchPersonalInformationMiddlename: (state) => {
        return state.personalInformationFormData.middlename;
    },
    fetchPersonalInformationLastname: (state) => {
        return state.personalInformationFormData.lastname;
    },
    fetchPersonalInformationRole: (state) => {
        return state.personalInformationFormData.role;
    },
    fetchPersonalInformationGender: (state) => {
        return state.personalInformationFormData.gender;
    },
    fetchPersonalInformationDob: (state) => {
        return state.personalInformationFormData.dob;
    },
    fetchPersonalInformationPob: (state) => {
        return state.personalInformationFormData.pob;
    },
    fetchPersonalInformationTelephone: (state) => {
        return state.personalInformationFormData.telephone;
    },
    fetchPersonalInformationMaritalStatus: (state) => {
        return state.personalInformationFormData.marital_status;
    },
    fetchPersonalInformationNationality: (state) => {
        return state.personalInformationFormData.nationality;
    },
    fetchPersonalInformationReligion: (state) => {
        return state.personalInformationFormData.religion;
    },
    fetchPersonalInformationHeight: (state) => {
        return state.personalInformationFormData.height;
    },
    fetchPersonalInformationWeight: (state) => {
        return state.personalInformationFormData.weight;
    },
    fetchPersonalInformationBloodType: (state) => {
        return state.personalInformationFormData.blood_type;
    },

    //KIN
    fetchKinFullname: (state) => {
        return state.kinFormData.fullname;
    },
    fetchKinRelationship: (state) => {
        return state.kinFormData.relationship;
    },
    fetchKinOccupation: (state) => {
        return state.kinFormData.occupation;
    },
    fetchKinAddress: (state) => {
        return state.kinFormData.address;
    },
    fetchKinTelephone: (state) => {
        return state.kinFormData.telephone;
    },


    //BANK
    fetchBankName: (state) => {
        return state.bankFormData.name;
    },
    fetchBankAccountNumber: (state) => {
        return state.bankFormData.account_number;
    },
    fetchBankAccountHolderName: (state) => {
        return state.bankFormData.account_holder_name;
    },

    //RESET
    fetchResetPassword: (state) => {
        return state.resetFormData.password;
    },
    fetchResetConfirmPassword: (state) => {
        return state.resetFormData.confirm_password;
    },

    //SETTING
    fetchSettingVisibility: (state) => {
        return state.settingFormData.visibility;
    },



}
const mutations = {
    UPDATE_USER_ID(state, value){
        state.userId = value;
    },
    //PERSONAL INFORMATION
    UPDATE_PERSONAL_INFORMATION_FORM_DATA(state,value){
        state.personalInformationFormData.id = value.id ?? '';
        state.personalInformationFormData.email = value.email ?? '';
        state.personalInformationFormData.firstname = value.firstname ?? ''; 
        state.personalInformationFormData.middlename = value.middlename ?? '';
        state.personalInformationFormData.lastname = value.lastname ?? '';
        state.personalInformationFormData.gender = value.gender ?? '';
        state.personalInformationFormData.dob = value.dob ?? '';
        state.personalInformationFormData.pob = value.pob ?? '';
        state.personalInformationFormData.telephone = value.telephone ?? '';
        state.personalInformationFormData.marital_status = value.marital_status ?? '';
        state.personalInformationFormData.nationality = value.nationality ?? '';
        state.personalInformationFormData.religion = value.religion ?? '';
        state.personalInformationFormData.height = value.height ?? '';
        state.personalInformationFormData.weight = value.weight ?? '';
        state.personalInformationFormData.blood_type = value.blood_type ?? '';
        state.personalInformationFormData.role = value.role ?? '';
    },
    UPDATE_PERSONAL_INFORMATION_EMAIL(state, value){
        state.personalInformationFormData.email = value;
    },
    UPDATE_PERSONAL_INFORMATION_FIRSTNAME(state, value){
        state.personalInformationFormData.firstname = value;
    },
    UPDATE_PERSONAL_INFORMATION_MIDDLENAME(state, value){
        state.personalInformationFormData.middlename = value;
    },
    UPDATE_PERSONAL_INFORMATION_LASTNAME(state, value){
        state.personalInformationFormData.lastname = value;
    },
    UPDATE_PERSONAL_INFORMATION_ROLE(state, value){
        state.personalInformationFormData.role = value;
    },
    UPDATE_PERSONAL_INFORMATION_GENDER(state, value){
        state.personalInformationFormData.gender = value;
    },
    UPDATE_PERSONAL_INFORMATION_DOB(state, value){
        state.personalInformationFormData.dob = value;
    },
    UPDATE_PERSONAL_INFORMATION_POB(state, value){
        state.personalInformationFormData.pob = value;
    },
    UPDATE_PERSONAL_INFORMATION_TELEPHONE(state, value){
        state.personalInformationFormData.telephone = value;
    },
    UPDATE_PERSONAL_INFORMATION_MARITAL_STATUS(state, value){
        state.personalInformationFormData.marital_status = value;
    },
    UPDATE_PERSONAL_INFORMATION_NATIONALITY(state, value){
        state.personalInformationFormData.nationality = value;
    },
    UPDATE_PERSONAL_INFORMATION_RELIGION(state, value){
        state.personalInformationFormData.religion = value;
    },
    UPDATE_PERSONAL_INFORMATION_HEIGHT(state, value){
        state.personalInformationFormData.height = value;
    },
    UPDATE_PERSONAL_INFORMATION_WEIGHT(state, value){
        state.personalInformationFormData.weight = value;
    },
    UPDATE_PERSONAL_INFORMATION_BLOOD_TYPE(state, value){
        state.personalInformationFormData.blood_type = value;
    },
    CLEAR_PERSONAL_INFORMATION_FORM_DATA(state){
        state.bankFormData = Object.assign({
            id: '',
            email: '',
            firstname: '',
            middlename: '',
            lastname: '',
            role: '',
            gender: '',
            dob: '',
            pob: '',
            telephone: '',
            marital_status: '',
            nationality: '',
            religion: '',
            height: '',
            weight: '',
            blood_type: '',
        })
        
    },


    //DEPARTMENT
    UPDATE_DEPARTMENT_FORM_DATA(state, value){
        state.departmentFormData.id = value.id;
        state.departmentFormData.name = value.name;
    },
    UPDATE_DEPARTMENT_DATAS(state,value){
        state.departmentDatas = Object.assign([], value)
    },
    UPDATE_DEPARTMENT_NAME(state, value){
        state.departmentFormData.name = value;
    },
    UPDATE_DEPARTMENT_IS_LOADING(state, value){
        state.department_is_loading = value;
    },
    CLEAR_DEPARTMENT_FORM_DATA(state){
        state.departmentFormData = Object.assign({
            id: '',
            name: '',
         })
    },

    //KIN
    UPDATE_KIN_FORM_DATA(state, value){
        state.kinFormData.id = value.id;
        state.kinFormData.fullname = value.fullname;
        state.kinFormData.occupation = value.occupation;
        state.kinFormData.address = value.address;
        state.kinFormData.relationship = value.relationship;
        state.kinFormData.telephone = value.telephone;
    },
    UPDATE_KIN_DATAS(state,value){
        state.kinDatas = Object.assign([], value)
    },
    UPDATE_KIN_FULLNAME(state, value){
        state.kinFormData.fullname = value;
    },
    UPDATE_KIN_RELATIONSHIP(state, value){
        state.kinFormData.relationship = value;
    },
    UPDATE_KIN_OCCUPATION(state, value){
        state.kinFormData.occupation = value;
    },
    UPDATE_KIN_ADDRESS(state, value){
        state.kinFormData.address = value;
    },
    UPDATE_KIN_TELEPHONE(state, value){
        state.kinFormData.telephone = value;
    },
    UPDATE_KIN_IS_LOADING(state, value){
        state.kin_is_loading = value;
    },
    CLEAR_KIN_FORM_DATA(state){
        state.kinFormData = Object.assign({
            id: '',
            fullname: '',
            relationship: '',
            occupation: '',
            address: '',
            telephone: '',
         })
    },


    //BANK
    UPDATE_BANK_FORM_DATA(state, value){
        state.bankFormData.id = value.id;
        state.bankFormData.name = value.name;
        state.bankFormData.account_number = value.account_number;
        state.bankFormData.account_holder_name = value.account_holder_name;
    },
    UPDATE_BANK_DATAS(state,value){
        state.bankDatas = Object.assign([], value)
    },
    UPDATE_BANK_NAME(state, value){
        state.bankFormData.name = value;
    },
    UPDATE_BANK_ACCOUNT_NUMBER(state, value){
        state.bankFormData.account_number = value;
    },
    UPDATE_BANK_ACCOUNT_HOLDER_NAME(state, value){
        state.bankFormData.account_holder_name = value;
    },
    UPDATE_BANK_IS_LOADING(state, value){
        state.bank_is_loading = value;
    },
    CLEAR_BANK_FORM_DATA(state){
        state.bankFormData = Object.assign({
            id: '',
            name: '',
            account_number: '',
            account_holder_name: ''
        })
       
    },


    //RESET
    UPDATE_RESET_PASSWORD(state, value){
        state.resetFormData.password = value;
    },
    UPDATE_RESET_CONFIRM_PASSWORD(state, value){
        state.resetFormData.confirm_password = value;
    },
    CLEAR_RESET_FORM_DATA(state){
        state.resetFormData = Object.assign({
           password: '',
           confirm_password: ''
        })
    },

    //SETTING
    UPDATE_SETTING_VISIBILITY(state, value){
        state.settingFormData.visibility = value;
    },
    UPDATE_SETTING_FORM_DATA(state, value){
        state.settingFormData.visibility = value.visibility ?? false;
    },


    //OTHERS
    UPDATE_IS_LOADING(state, value){
        state.is_loading = value;
    },
    UPDATE_UNSUBSCRIBE(state,value){
        state.unsubscribe = Object.assign([], value)
    },
   
    //DEPENDENCY
    UPDATE_D_DEPARTMENTS(state, value){
        state.dependencies.departments = value;
    },
    UPDATE_D_RELATIONSHIPS(state, value){
        state.dependencies.relationships = value;
    },
    UPDATE_D_BANKS(state, value){
        state.dependencies.banks = value;
    },

    UPDATE_D_RELIGIONS(state, value){
        state.dependencies.religions = value;
    },

    UPDATE_D_BLOOD_TYPES(state, value){
        state.dependencies.blood_types = value;
    },
    
    UPDATE_D_NATIONALITIES(state, value){
        state.dependencies.nationalities = value;
    },
    UPDATE_D_MARITAL_STATUS(state, value){
        state.dependencies.marital_status = value;
    },
    UPDATE_D_ROLES(state, value){
        state.dependencies.roles = value;
    },
    UPDATE_D_GENDERS(state, value){
        state.dependencies.genders = value;
    },


    //
    UPDATE_SKELETON(state, value){
        state.skeleton = value;
    }




   

}
const actions = {

    //PERSONALINFORMATION
    async fetchPersonalInformation({ commit, state}){
        try{
            commit('UPDATE_SKELETON', true);
            let unsubscribe = new UserDetail(state.userId).fetchPersonalInformation((data,unsubscribe) => {
                commit('UPDATE_PERSONAL_INFORMATION_FORM_DATA',data);
                commit('UPDATE_SETTING_FORM_DATA', data);
                commit('UPDATE_SKELETON', false);
           })
           
           commit('UPDATE_UNSUBSCRIBE', [...state.unsubscribe, unsubscribe]);
          
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_SKELETON', false);
           
        }
    },

    async fetchPersonalInformationDependencies({commit, state}){
        try{
            await new UserDetail(state.userId).personalInformationDependencies((nationalities, religions, blood_types, marital_status, roles, genders) => {
                commit('UPDATE_D_NATIONALITIES', nationalities);
                commit('UPDATE_D_RELIGIONS', religions);
                commit('UPDATE_D_BLOOD_TYPES', blood_types);
                commit('UPDATE_D_MARITAL_STATUS', marital_status);
                commit('UPDATE_D_ROLES', roles);
                commit('UPDATE_D_GENDERS', genders);
           });
        }catch(err){
            snackbar('warning',err.message);
        }
       
    },

    async updatePersonalInformation({commit, state},instance){
        const personalInformationId = state.personalInformationFormData.id;
        const data = state.personalInformationFormData;
        delete data.id;
        try{
            commit('UPDATE_IS_LOADING', true);
            let userDetail = new UserDetail(state.userId);
            await userDetail.savePersonalInformation(data,personalInformationId);

            snackbar('success','item updated successfully')
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },



    //DEPARTMENT
    async fetchDepartments({commit, state}){
        try{
            commit('UPDATE_DEPARTMENT_IS_LOADING', true);
            let unsubscribe = new UserDetail(state.userId).fetchDepartments((datas,unsubscribe) => {
                commit('UPDATE_DEPARTMENT_DATAS',datas);
           })
           commit('UPDATE_UNSUBSCRIBE', [...state.unsubscribe, unsubscribe]);
           commit('UPDATE_DEPARTMENT_IS_LOADING', false);
          
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_DEPARTMENT_IS_LOADING', false);
        }
    },

    async fetchDepartmentDependencies({commit, state}){
        try{
            await new UserDetail(state.userId).departmentDependencies((departments) => {
                commit('UPDATE_D_DEPARTMENTS', departments);
           });
        }catch(err){
            snackbar('warning',err.message);
        }
       
    },

    async createDepartment({commit, state},instance){
        const data = state.departmentFormData;
        delete data.id;

        const name = new ChainValidators(data.name).trim().lower().val;
        data.name = name;

        const name_validator = new ChainValidators(name,'name').notNull().validate;
        if(name_validator == false){ return ''; }


        try{
            commit('UPDATE_IS_LOADING', true);
            let userDetail = new UserDetail(state.userId);
            await userDetail.saveDepartment(data);

            snackbar('success','item created successfully')
            commit("CLEAR_DEPARTMENT_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
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
           
            new UserDetail(state.userId).deleteDepartmentById(deptId).then().catch(err => {
                snackbar('warning',err.message);
            });
        })
    },



    //KIN
    async fetchKins({commit, state}){
        try{
            commit('UPDATE_KIN_IS_LOADING', true);
            let unsubscribe = new UserDetail(state.userId).fetchKins((datas,unsubscribe) => {
                commit('UPDATE_KIN_DATAS',datas);
           })
           commit('UPDATE_UNSUBSCRIBE', [...state.unsubscribe, unsubscribe]);
           commit('UPDATE_KIN_IS_LOADING', false);
          
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_KIN_IS_LOADING', false);
        }
    },
    async fetchKinDependencies({commit, state}){
        try{
            await new UserDetail(state.userId).kinDependencies((relationships) => {
                console.log(relationships, 'Relationship')
                commit('UPDATE_D_RELATIONSHIPS', relationships);
           });
        }catch(err){
            snackbar('warning',err.message);
        }
       
    },
    async createKin({commit, state},instance){
        const data = state.kinFormData;
        delete data.id;

        const fullname = new ChainValidators(data.fullname).trim().lower().val;
        data.fullname = fullname;


        const fullname_validator = new ChainValidators(fullname,'fullname').lower().notNull().validate;
        if(fullname_validator == false){ return ''; }


        console.log(data, state.userId);


        try{
            commit('UPDATE_IS_LOADING', true);
            let userDetail = new UserDetail(state.userId);
            await userDetail.saveKin(data);

            snackbar('success','item created successfully')
            commit("CLEAR_KIN_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
    },

    async updateKin({commit, state},instance){
        const kinId = state.kinFormData.id;
        const data = state.kinFormData;
        delete data.id;

        try{
            commit('UPDATE_IS_LOADING', true);
            let userDetail = new UserDetail(state.userId);
            await userDetail.saveKin(data,kinId);

            snackbar('success','item updated successfully')
            commit("CLEAR_KIN_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },
    async deleteKinById({commit, state},kinId){
        let x = (await confirm('Confirm','Would you like to delete the selected item?'));
        x.onOk(()=> {
           
            new UserDetail(state.userId).deleteKinById(kinId).then().catch(err => {
                snackbar('warning',err.message);
            });
        })
    },



    //BANK
    async fetchBanks({commit, state}){
        try{
            commit('UPDATE_BANK_IS_LOADING', true);
            let unsubscribe = new UserDetail(state.userId).fetchBanks((datas,unsubscribe) => {
                commit('UPDATE_BANK_DATAS',datas);
           })
           commit('UPDATE_UNSUBSCRIBE', [...state.unsubscribe, unsubscribe]);
           commit('UPDATE_BANK_IS_LOADING', false);
          
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_BANK_IS_LOADING', false);
        }
    },
    async fetchBankDependencies({commit, state}){
        try{
            await new UserDetail(state.userId).bankDependencies((banks) => {
                commit('UPDATE_D_BANKS', banks);
           });
        }catch(err){
            snackbar('warning',err.message);
        }
       
    },

    async createBank({commit, state},instance){
        const data = state.bankFormData;
        delete data.id;

        const account_holder_name = new ChainValidators(data.account_holder_name).trim().lower().val;
        data.account_holder_name = account_holder_name;

        try{
            commit('UPDATE_IS_LOADING', true);
            let userDetail = new UserDetail(state.userId);
            await userDetail.saveBank(data);

            snackbar('success','item created successfully')
            commit("CLEAR_BANK_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
    },
    async updateBank({commit, state},instance){
        const bankId = state.bankFormData.id;
        const data = state.bankFormData;
        delete data.id;

        try{
            commit('UPDATE_IS_LOADING', true);
            let userDetail = new UserDetail(state.userId);
            await userDetail.saveBank(data,bankId);

            snackbar('success','item updated successfully')
            commit("CLEAR_BANK_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },
    async deleteBankById({commit, state},bankId){
        let x = (await confirm('Confirm','Would you like to delete the selected item?'));
        x.onOk(()=> {
           
            new UserDetail(state.userId).deleteBankById(bankId).then().catch(err => {
                snackbar('warning',err.message);
            });
        })
    },


    //RESET
    async createReset({commit, state},instance){
        const data = state.resetFormData;
       
        const checkMatch = await passwordMatchValidator(data.password, data.confirm_password);
        if(checkMatch == false){ return ; }

        try{
            commit('UPDATE_IS_LOADING', true);
            let userDetail = new UserDetail(state.userId);
            await userDetail.saveReset(data);

            snackbar('success','item updated successfully')
            commit("CLEAR_RESET_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
    },


    //
    async updateSetting({commit, state},instance){
        const data = state.settingFormData;
        try{
            commit('UPDATE_IS_LOADING', true);
            let userDetail = new UserDetail(state.userId);
            await userDetail.saveSetting(data);

            snackbar('success','item updated successfully')
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
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