import AuthService from '../../services/auth_service'
import { snackbar, showLoading, hideLoading } from '../../repositories/plugins'
import { confirmPasswordValidator, passwordMatchValidator } from '../../repositories/validators'

const state = {
   formData: {
       code: '',
       password: '',
       confirm_password: '',
   }

}
const getters = { 
    fetchCode: (state) => {
        return state.formData.code;
    },
    fetchPassword: (state) => {
        return state.formData.password;
    },
    fetchConfirmPassword: (state) => {
        return state.formData.confirm_password;
    },
    
}
const mutations = {

    UPDATE_CODE(state, value){
        state.formData.code = value;
    },
    UPDATE_PASSWORD(state, value){
        state.formData.password = value;
    },
    UPDATE_CONFIRM_PASSWORD(state, value){
        state.formData.confirm_password = value;
    },
    CLEAR_FORM_DATA(state){
        state.formData.code = '';
        state.formData.password = '';
        state.formData.confirm_password = '';
    },
}
const actions = {
    async confirm({commit, state},instance){
        const password = state.formData.password;
        const confirm_password = state.formData.confirm_password;
        const code = state.formData.code;


        const checkMatch = await passwordMatchValidator(password, confirm_password);
        if(checkMatch == false){ return ; }

        const result = await confirmPasswordValidator(code,password);
        if(result == false){ return ; }

        try{
            showLoading();
            let authService = new AuthService();
            await authService.password_reset_confirmation(code,password);
            commit('CLEAR_FORM_DATA');
            hideLoading();
            snackbar('success','Password Update Successful.. Kindly log in ')
            instance.$router.push('/auth/login');

        }catch(err){
            snackbar('warning',err.message);
            hideLoading();
        }
        
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}

