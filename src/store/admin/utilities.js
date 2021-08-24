import { snackbar, confirm } from 'src/repositories/plugins';
import Utility from '../../models/utility'
const state = {
   id: '',
   is_loading: false,
   feedbackFormData: {
       type: '',
       message: '',
   },
   dependencies: {
    feedbackTypes: ['suggestion','complain'],
  }

}
const getters = { 
    fetchFeedbackType: (state) => {
        return state.feedbackFormData.type;
    },
    fetchFeedbackMessage: (state) => {
        return state.feedbackFormData.message;
    },
   
}
const mutations = { 
    UPDATE_IS_LOADING(state, value){
        state.is_loading = value;
    },
    UPDATE_FEEDBACK_TYPE(state, value){
        state.feedbackFormData.type = value;
    },
    UPDATE_FEEDBACK_MESSAGE(state, value){
        state.feedbackFormData.message = value;
    },
    CLEAR_FEEDBACK_FORM_DATA(state){
        state.feedbackFormData = {
            type: '',
            message: '',
        }
    }
}
const actions = {
    async updateFeedback({commit, state},instance){
        const data = state.feedbackFormData;
        try{
            commit('UPDATE_IS_LOADING', true);
            new FlexValidators(data).check({
                'type': 'required|notNull',
                'message': 'required|notNull',
            });
            let utilty = new Utility();
            await utilty.saveFeedback(data);

            snackbar('success','item updated successfully')
            commit('UPDATE_IS_LOADING', false);
            commit('CLEAR_FEEDBACK_FORM_DATA');
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
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

