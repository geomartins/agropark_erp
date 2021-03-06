import AuthService from '../../services/auth_service'
import { snackbar, showLoading, hideLoading } from '../../repositories/plugins'
import { loginValidator } from '../../repositories/validators'
const state = {
   formData: {
      email: '',
      password: '',
   }

}
const getters = { 
     fetchEmail: (state) => {
        return state.formData.email;
     },
     fetchPassword: (state) => {
         return state.formData.password;
     }
}
const mutations = { 
    UPDATE_EMAIL(state, value){
        state.formData.email = value;
    },
    UPDATE_PASSWORD(state, value){
        state.formData.password = value;
    },
    CLEAR_FORMDATA(state){
        state.formData.email = '';
        state.formData.password = '';
    }
   
}
const actions = {
    async login({commit, state},instance){
        const email = state.formData.email;
        const password = state.formData.password;

        const result = await loginValidator(email, password);
        if(result == false){
            return ;
        }

        try{
            showLoading();
            let authService = new AuthService();
            await authService.login(email, password);
            hideLoading();
            instance.$router.push('/admin/dashboard');
           
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

