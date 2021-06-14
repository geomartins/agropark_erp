import { snackbar, confirm } from 'src/repositories/plugins';
import Module from '../../models/module'
import FlexValidators from 'src/repositories/flex_validators';
const state = {
   id: '',
   formData: {
      name: '',
      description: '',
      category: '',
   },
   is_loading: false,
   unsubscribe: '',
   skeleton: false,


  loading: false,
  filter: '',
  rowCount: 10,
  datas: [],
  dependencies: {
    categories: [],
  }
   
}
const getters = { 
     fetchName: (state) => {
        return state.formData.name;
     },
     fetchDescription: (state) => {
         return state.formData.description;
     },
     fetchCategory: (state) => {
        return state.formData.category;
     },
     fetchFilter: (state) => {
        return state.filter;
    },
    fetchData: (state) => {
        //.sort(sortBy('name'))
        return state.datas;
     },
     fetchColumns: (state) => {
        return state.columns;
     },
}
const mutations = { 
    UPDATE_NAME(state, value){
        state.formData.name = value;
    },
    UPDATE_DESCRIPTION(state, value){
        state.formData.description = value;
    },
    UPDATE_CATEGORY(state, value){
        state.formData.category = value;
    },
    UPDATE_IS_LOADING(state, value){
        state.is_loading = value;
    },
    UPDATE_FILTER(state, value){
        state.filter = value;
    },
    UPDATE_COLUMNS(state, value){
        state.columns = value;
    },
    UPDATE_UNSUBSCRIBE(state,value){
        state.unsubscribe = value;
    },
    UPDATE_EDIT_FORM_DATA(state, payload){
        state.formData.name = payload.name;
        state.formData.description = payload.description;
        state.formData.category = payload.category;
        state.id = payload.id;
    },
    UPDATE_DATA(state,value){
        state.datas = Object.assign([], value)
        // state.datas.length = 0;
        // state.datas.push(...value);
    },
    UPDATE_D_CATEGORIES(state,value){
       state.dependencies.categories = value; 
    },
    UPDATE_SKELETON(state, value){
        state.skeleton = value;
    },
    CLEAR_FORM_DATA(state){
        state.formData.name = '';
        state.formData.description = '';
        state.formData.category = '';
        state.id = '';
    },
    


   
}
const actions = {
    async create({commit, state},instance){
        try{
            commit('UPDATE_IS_LOADING', true);
            const data = state.formData;
            data.id = null;
           
            new FlexValidators(data).check({
                'name': 'required|notNull',
                'description': 'required|notNull',
                'category': 'required|notNull',
            });

            const { name, description, category, id } = data;
            let module = new Module(name,description,category ,id);
            await module.save();

            snackbar('success','item created successfully')
            commit("CLEAR_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

    async fetch({commit, state}, type){
        if(state.datas.length < 1){
            commit('UPDATE_SKELETON', true);
        }
        let unsubscribe = new Module().fetch(type, (datas, err) => {
            if(err){ 
                snackbar('warning',err.message);
                commit('UPDATE_SKELETON', false);
                return;
            }
            commit('UPDATE_DATA',datas);
            console.log(state.datas,'NEW DATA')
            commit('UPDATE_SKELETON', false);
       })
       commit('UPDATE_UNSUBSCRIBE', unsubscribe);
       
    },

    async dependencies({commit, state}){
        try{
            
            await new Module().dependencies((categories) => {
                console.log(categories)
                commit('UPDATE_D_CATEGORIES', categories);
           });
        }catch(err){
            snackbar('warning',err.message);
        }
       
    },

    async search({commit,dispatch, state},value){
        if(value.length < 1){
            dispatch('fetch','initial');
            return ;
        }
        
        Module.search(value).then((datas) => {
            commit('UPDATE_DATA',datas);
        }).catch(err => {
            snackbar('warning',err.message);
        });
    },

    async delete({commit, state},id){
        let x = (await confirm('Confirm','Would you like to delete the selected item?'));
        x.onOk(()=> {
            console.log(id);
            Module.deleteById(id).then().catch(err => {
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
                'category': 'required|notNull',
                'id': 'required|notNull',
            });

            const { name, description, category, id } = data;
            let module = new Module(name,description,category,id);
            await module.save();

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

