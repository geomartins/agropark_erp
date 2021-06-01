import { snackbar, confirm } from 'src/repositories/plugins';
import Role from '../../models/role'
import ChainValidators from '../../repositories/chain_validators'
import FlexValidators from 'src/repositories/flex_validators';
const state = {
   id: '',
   skeleton: false,
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
      label: 'Roles',
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

     //
     UPDATE_SKELETON(state, value){
        state.skeleton = value;
    }
    


   
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
            });

            const { name, description, id } = data;
            let role = new Role(name,description,id);
            await role.save();

            snackbar('success','item created successfully')
            commit("CLEAR_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

    async fetch({commit, state}){
        try{
            commit('UPDATE_SKELETON', true);
            let unsubscribe = new Role().fetch((datas,unsubscribe) => {
                commit('UPDATE_DATA',datas);
                console.log(state.datas,'DATA')
                commit('UPDATE_SKELETON', false);
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
            Role.deleteById(id).then().catch(err => {
                snackbar('warning',err.message);
            });
        })
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

