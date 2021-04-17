import { snackbar } from 'src/repositories/plugins';
import ModuleCategory from '../../models/module_category'
const state = {
   id: '',
   formData: {
      name: '',
      description: '',
   },
   mode: 'create',
   is_loading: false,
   datas: [],
   
}
const getters = { 
     fetchName: (state) => {
        return state.formData.name;
     },
     fetchDescription: (state) => {
         return state.formData.description;
     }
}
const mutations = { 
    UPDATE_NAME(state, value){
        state.formData.name = value;
    },
    UPDATE_DESCRIPTION(state, value){
        state.formData.description = value;
    },
    UPDATE_IS_LOADING(state, value){
        state.is_loading = value;
    },
    CLEAR_FORM_DATA(state){
        state.formData.email = '';
        state.formData.password = '';
        state.id = '';
    }
   
}
const actions = {
    async create({commit, state},instance){
        const name = state.formData.name;
        const description = state.formData.description;
        const id = '';

        // const result = await loginValidator(email, password);
        // if(result == false){
        //     return ;
        // }

        try{
            commit('UPDATE_IS_LOADING', true);
            let moduleCategory = new ModuleCategory(name,description,id);
            await moduleCategory.save();

            snackbar('success','item created successfully')
            commit("CLEAR_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

    async fetch({commit, state},instance){
        try{
            ModuleCategory.fetch((data) => {
                state.datas = data;
           })
        }catch(err){
            snackbar('warning',err.message);
        }
    },

    async delete({commit, state},instance){
        try{
            await ModuleCategory.deleteById(state.id);
            snackbar('success','item deleted successfully')
        }catch(err){
            snackbar('warning',err.message);
        }
    },

    async update({commit, state},instance){
        const name = state.formData.name;
        const description = state.formData.description;
        const id = state.id;

        // const result = await loginValidator(email, password);
        // if(result == false){
        //     return ;
        // }

        try{
            commit('UPDATE_IS_LOADING', true);
            let moduleCategory = new ModuleCategory(name,description,id);
            await moduleCategory.save();

            snackbar('success','item updated successfully')
            commit("CLEAR_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
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

