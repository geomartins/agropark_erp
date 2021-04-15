import AuthService from '../../services/auth_service'
import { snackbar, showLoading, hideLoading } from '../../repositories/plugins'
import { passwordResetValidator } from '../../repositories/validators'

const state = {
   formData: {
       email: '',
   }

}
const getters = { 
    fetchEmail: (state) => {
        return state.formData.email;
    },
   
    
}
const mutations = {

    UPDATE_EMAIL(state, value){
        state.formData.email = value;
    },
    CLEAR_FORM_DATA(state){
        state.formData.email = '';
    }

}
const actions = {

    async login({commit, state},instance){
        const email = state.formData.email;

        const result = await passwordResetValidator(email);
        if(result == false){
            return ;
        }

        try{
            showLoading();
            let authService = new AuthService();
            await authService.password_reset(email);
            commit('CLEAR_FORM_DATA');
            hideLoading();
            snackbar('success','Password reset mail sent successfully');

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

