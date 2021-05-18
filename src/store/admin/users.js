import { snackbar, confirm } from 'src/repositories/plugins';
import User from '../../models/user'
import ChainValidators from '../../repositories/chain_validators'
const state = {
   id: '',
   formData: {
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
      role: '',
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
    { name: 'id', label: 'S/N', field: 'id', sortable: true, style: 'width: 5px', align: 'left'},
    {
      name: 'name',
      required: true,
      label: 'Fullname',
      align: 'left',
      field: row => row.firstname,
      format: val => `${val}`,
      sortable: true
    },
    { name: 'role', label: 'Role', field: 'role', sortable: true, align: 'left', },
    { name: 'timestamp', label: '', field: 'created_at', sortable: true, align: 'left', }
  ],
  datas: [],
  dependencies: {
    roles: [],
  }
   
}
const getters = { 
     fetchFirstname: (state) => {
        return state.formData.firstname;
     },
     fetchMiddlename: (state) => {
        return state.formData.middlename;
     },
     fetchLastname: (state) => {
        return state.formData.lastname;
     },
     fetchRole: (state) => {
         return state.formData.role;
     },
     fetchEmail: (state) => {
        return state.formData.email;
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
    UPDATE_FIRSTNAME(state, value){
        state.formData.firstname = value;
    },
    UPDATE_MIDDLENAME(state, value){
        state.formData.middlename = value;
    },
    UPDATE_LASTNAME(state, value){
        state.formData.lastname = value;
    },
    UPDATE_ROLE(state, value){
        state.formData.role = value;
    },
    UPDATE_EMAIL(state, value){
        state.formData.email = value;
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
        state.formData.firstname = payload.firstname;
        state.formData.middlename = payload.middlename;
        state.formData.lastname = payload.lastname;
        state.formData.role = payload.role
        state.formData.email = payload.email
        state.id = payload.id;
    },
    UPDATE_DATA(state,value){
        state.datas = Object.assign([], value)
    },
    UPDATE_D_ROLES(state,value){
       state.dependencies.roles = value; 
    },
    CLEAR_FORM_DATA(state){
        state.formData.firstname = '';
        state.formData.middlename = '';
        state.formData.lastname = '';
        state.formData.role = '';
        state.formData.email = '';
        state.id = '';
    },
    


   
}
const actions = {
    async create({commit, state},instance){
        console.log(state.formData,'gggggggggggggggg')
        const firstname = new ChainValidators(state.formData.firstname).trim().lower().val;
        const middlename = new ChainValidators(state.formData.middlename).trim().lower().val;
        const lastname = new ChainValidators(state.formData.lastname).trim().lower().val;
        const role = new ChainValidators(state.formData.role).trim().lower().val;
        const email = new ChainValidators(state.formData.email).trim().lower().val;
        const id = null;


        const firstname_validator = new ChainValidators(firstname,'firstname').notNull().validate;
        const middlename_validator = new ChainValidators(middlename, 'middlename').notNull().validate;
        const lastname_validator = new ChainValidators(lastname, 'lastname').notNull().validate;
        const role_validator = new ChainValidators(role, 'role').notNull().validate;
        const email_validator = new ChainValidators(email, 'email').notNull().validateEmail().validate;

        if(firstname_validator == false || middlename_validator == false || lastname_validator == false || role_validator == false || email_validator == false){
            return '';
        }


        try{
            commit('UPDATE_IS_LOADING', true);
            let user = new User(firstname,middlename,lastname,role, email ,id);
            await user.save();

            snackbar('success','user created successfully')
            commit("CLEAR_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

    async fetch({commit, state}){
        try{
            let unsubscribe = new User().fetch((datas,unsubscribe) => {
                commit('UPDATE_DATA',datas);
                console.log(state.datas,'DATA')
           })
           commit('UPDATE_UNSUBSCRIBE', unsubscribe);
          
        }catch(err){
            snackbar('warning',err.message);
        }
       
    },

    async dependencies({commit, state}){
        try{
            
            await new User().dependencies((roles) => {
                console.log(roles)
                commit('UPDATE_D_ROLES', roles);
           });
        }catch(err){
            snackbar('warning',err.message);
        }
       
    },

    async delete({commit, state},id){
        let x = (await confirm('Confirm','Would you like to delete the selected user?'));
        x.onOk(()=> {
            console.log(id);
            User.deleteById(id).then().catch(err => {
                snackbar('warning',err.message);
            });
        })
    },

    async update({commit, state},instance){
        const firstname = state.formData.firstname;
        const middlename = state.formData.middlename;
        const lastname = state.formData.lastname;
        const role = state.formData.role;
        const email = state.formData.email;
        const id = state.id;


        const firstname_validator = new ChainValidators(firstname,'firstname').notNull().validate;
        const middlename_validator = new ChainValidators(middlename, 'middlename').notNull().validate;
        const lastname_validator = new ChainValidators(lastname, 'lastname').notNull().validate;
        const role_validator = new ChainValidators(role, 'role').notNull().validate;
        const email_validator = new ChainValidators(email, 'email').notNull().validateEmail().validate;
        const id_validator = new ChainValidators(id, 'id').notNull().validate;

        if(firstname_validator == false || middlename_validator == false || lastname_validator == false || role_validator == false || email_validator == false || id_validator == false){
            return '';
        }
        

        try{
            commit('UPDATE_IS_LOADING', true);
            let user = new User(firstname,middlename,lastname, role, email,id);
            await user.save();

            snackbar('success','user updated successfully')
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

