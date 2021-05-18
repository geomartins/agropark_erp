import { snackbar, confirm } from 'src/repositories/plugins';
import ModuleActivity from '../../models/module_activity'
const state = {
   id: '',
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
      label: 'Modules',
      align: 'left',
      field: 'module',
      sortable: true
    },
    {
        name: 'action',
        required: true,
        label: 'Events',
        align: 'left',
        field: 'action',
        sortable: true
      },
    {
        name: 'activity',
        required: true,
        label: 'Activities',
        align: 'left',
        field: 'activity',
        sortable: true
      },

      {
        name: 'author',
        required: true,
        label: 'Authors',
        align: 'left',
        field: 'author',
        sortable: true
      },

    { name: 'timestamp', label: '', field: 'created_at', sortable: true }
  ],
  datas: []
   
}
const getters = { 
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
    
    


   
}
const actions = {
   
    async fetch({commit, state}){
        try{
            let unsubscribe = new ModuleActivity.fetch((datas,unsubscribe) => {
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
            ModuleActivity.deleteById(id).then().catch(err => {
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

