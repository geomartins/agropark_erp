import { snackbar, confirm } from 'src/repositories/plugins';
import Unit from '../../models/unit'
import ChainValidators from '../../repositories/chain_validators'
const state = {
   id: '',
   formData: {
      name: '',
      description: '',
   },
   is_loading: false,
   unsubscribe: '',



   initialPagination: {
    sortBy: 'name',
    descending: false,
    //page: 2,
    rowsPerPage: 20
    // rowsNumber: xx if getting data from a server
  },
  loading: false,
  filter: '',
  rowCount: 10,
  columns: [
    { name: 'id', label: 'S/N', field: 'id', sortable: true, style: 'width: 5px', },
    {
      name: 'name',
      required: true,
      label: 'Units',
      align: 'left',
      field: row => row.name,
      format: val => `${val}`,
      sortable: true
    },
    { name: 'timestamp', label: '', field: 'created_at', sortable: true }
  ],
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
        const name = new ChainValidators(state.formData.name).trim().lower().val;
        const description = new ChainValidators(state.formData.description).trim().lower().val;
        const id = null;


        const name_validator = new ChainValidators(name,'name').notNull().validate;
        const description_validator = new ChainValidators(description, 'description').notNull().validate;
        if(name_validator == false || description_validator == false){
            return '';
        }


        try{
            commit('UPDATE_IS_LOADING', true);
            let unit = new Unit(name,description,id);
            await unit.save();

            snackbar('success','item created successfully')
            commit("CLEAR_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

    async fetch({commit, state}){
        try{
            let unsubscribe = new Unit().fetch((datas,unsubscribe) => {
                commit('UPDATE_DATA',datas);
                console.log(state.datas,'DATA')
           })
           commit('UPDATE_UNSUBSCRIBE', unsubscribe);
          
        }catch(err){
            snackbar('warning',err.message);
        }
       
    },

    async delete({commit, state},id){
        let x = (await confirm('Confirm','Would you like to delete the selected item?'));
        x.onOk(()=> {
            console.log(id);
            Unit.deleteById(id).then().catch(err => {
                snackbar('warning',err.message);
            });
        })
    },

    async update({commit, state},instance){
        const name = state.formData.name;
        const description = state.formData.description;
        const id = state.id;

        const name_validator = new ChainValidators(name,'name').notNull().validate;
        const description_validator = new ChainValidators(description, 'description').notNull().validate;
        const id_validator = new ChainValidators(id, 'id').notNull().validate;

        if(name_validator == false || description_validator == false || id_validator == false){
            return '';
        }
        

        try{
            commit('UPDATE_IS_LOADING', true);
            let unit = new Unit(name,description,id);
            await unit.save();

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

