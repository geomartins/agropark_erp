import { snackbar, confirm } from 'src/repositories/plugins';
import User from '../../models/user'
import FlexValidators from 'src/repositories/flex_validators';

const state = {
   id: '',
   skeleton: false,
   formData: {
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
      role: '',
   },
   is_loading: false,
   unsubscribe: '',

  loading: false,
  filter: '',
  rowCount: 10,
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
        state.formData.firstname = value.toLowerCase().trim();
    },
    UPDATE_MIDDLENAME(state, value){
        state.formData.middlename = value.toLowerCase().trim();
    },
    UPDATE_LASTNAME(state, value){
        state.formData.lastname = value.toLowerCase().trim();
    },
    UPDATE_ROLE(state, value){
        state.formData.role = value.toLowerCase().trim();
    },
    UPDATE_EMAIL(state, value){
        state.formData.email = value.toLowerCase().trim();
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

     //
     UPDATE_SKELETON(state, value){
        state.skeleton = value;
    }
    


   
}
const actions = {
    async create({commit, state},instance){
        try{
            commit('UPDATE_IS_LOADING', true);

            new FlexValidators(state.formData).check({
                'firstname': 'required|notNull',
                'middlename': 'required|notNull',
                'lastname': 'required|notNull',
                'role': 'required|notNull',
                'email': 'required|notNull|email'
            });

            const { firstname, middlename, lastname, role, email } = state.formData;
            const id = null;

            let user = new User(firstname,middlename,lastname,role, email ,id);
            await user.save();

            snackbar('success','user created successfully')
            commit("CLEAR_FORM_DATA");
            instance.close();
            commit('UPDATE_IS_LOADING', false);
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

    async fetch({commit, state}, type){
            if(state.datas.length < 1){
                commit('UPDATE_SKELETON', true);
            }
            let unsubscribe = new User().fetch(type, (datas, err) => {
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
            await new User().dependencies((roles) => {
                console.log(roles)
                commit('UPDATE_D_ROLES', roles);
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
        
        User.search(value).then((datas) => {
            commit('UPDATE_DATA',datas);
        }).catch(err => {
            snackbar('warning',err.message);
        });
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
        try{
            commit('UPDATE_IS_LOADING', true);

            const data = state.formData;
            data.id = state.id;
        
            new FlexValidators(data).check({
                'firstname': 'required|notNull',
                'middlename': 'required|notNull',
                'lastname': 'required|notNull',
                'role': 'required|notNull',
                'email': 'required|notNull|email',
                'id': 'required|notNull',
            });

            const { firstname, middlename, lastname, role, email, id } = data;
            let user = new User(firstname,middlename,lastname, role, email, id);
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

