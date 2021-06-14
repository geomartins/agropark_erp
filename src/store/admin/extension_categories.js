import { snackbar, confirm } from 'src/repositories/plugins';
import ExtensionCategory from '../../models/extension_category'
import FlexValidators from 'src/repositories/flex_validators';
const state = {
   id: '',
   formData: {
      name: '',
      description: '',
   },
   is_loading: false,
   unsubscribe: '',

  loading: false,
  filter: '',
  rowCount: 10,
  datas: []
   
}
const getters = { 
     fetchName: (state) => {
        return state.formData.name;
     },
     fetchDescription: (state) => {
         return state.formData.description;
     },
     fetchFilter: (state) => {
        return state.filter;
    },
    fetchData: (state) => {
        //.sort(sortBy('name'))
        return state.datas;
     },
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
    UPDATE_FILTER(state, value){
        state.filter = value;
    },
    UPDATE_UNSUBSCRIBE(state,value){
        state.unsubscribe = value;
    },
    UPDATE_EDIT_FORM_DATA(state, payload){
        state.formData.name = payload.name;
        state.formData.description = payload.description;
        state.id = payload.id;
    },
    UPDATE_DATA(state,value){
        state.datas = Object.assign([], value)
        // state.datas.length = 0;
        // state.datas.push(...value);
    },
    CLEAR_FORM_DATA(state){
        state.formData.name = '';
        state.formData.description = '';
        state.id = '';
    },
    


   
}
const actions = {
    async create({commit, state},instance){

        try{
            commit('UPDATE_IS_LOADING', true);

            new FlexValidators(state.formData).check({
                'name': 'required|notNull',
                'description': 'required|notNull'
            });

            const { name, description } = state.formData;
            const id = null;
            
            let extensionCategory = new ExtensionCategory(name,description,id);
            await extensionCategory.save();

            snackbar('success','item created successfully')
            commit("CLEAR_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
        }catch(err){
            console.log(err.code);
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

    async fetch({commit, state}, vueInstance){
        
        let unsubscribe = new ExtensionCategory().fetch((datas,err) => {
            if(err){ 
                snackbar('warning',err.message);
                return;
            }
            commit('UPDATE_DATA',datas);
            console.log(state.datas,'DATA')
        })
        commit('UPDATE_UNSUBSCRIBE', unsubscribe);
        
       
    },

    async delete({commit, state},id){
        let x = (await confirm('Confirm','Would you like to delete the selected item?'));
        x.onOk(()=> {
            console.log(id);
            ExtensionCategory.deleteById(id).then().catch(err => {
                snackbar('warning',err.message);
            });
        })
    },

    async update({commit, state},instance){
        try{
            commit('UPDATE_IS_LOADING', true);
            const data = state.formData;
            data.id = state.id;

            new FlexValidators(data).check({
                'name': 'required|notNull',
                'description': 'required|notNull',
                'id': 'required|notNull'
            });
            const { name, description, id } = data;

            let extensionCategory = new ExtensionCategory(name,description,id);
            await extensionCategory.save();

            snackbar('success','item updated successfully')
            commit("CLEAR_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

    async unsubscribe({commit, state},instance){
        if(state.unsubscribe){
            state.unsubscribe();
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

