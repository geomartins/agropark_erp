import { snackbar, confirm } from 'src/repositories/plugins';
import Module from '../../models/module'
import FlexValidators from 'src/repositories/flex_validators';
const state = {
   id: '',
    moduleDependencyFormData: {
        categories: "",
    },
    dependencies: {
        module: {}
    },
   formData: {
      name: '',
      alt_name: '',
      description: '',
      category: '',
      
      whatzapp_channel: '',
      mail_channel: '',
      slack_channel: '',
      sms_channel: '',
      app_channel: false,
      pushy_channel: false,
   },
   is_loading: false,
   unsubscribe: {},
   skeleton: false,


  loading: false,
  filter: '',
  datas: [],
  

  
 //MODULE_NOTIFIER
 moduleNotifierFilter: '',
 moduleNotifierDatas: []
   
}
const getters = { 
     fetchName: (state) => {
        return state.formData.name;
     },
     fetchAltName: (state) => {
        return state.formData.alt_name;
     },
     fetchDescription: (state) => {
         return state.formData.description;
     },
     fetchCategory: (state) => {
        return state.formData.category;
     },
     
     fetchWhatzappChannel: (state) => {
         return state.formData.whatzapp_channel;
     },
     fetchMailChannel: (state) => {
        return state.formData.mail_channel;
     },
     fetchSlackChannel: (state) => {
        return state.formData.slack_channel;
     },
     fetchSmsChannel: (state) => {
        return state.formData.sms_channel;
     },
     fetchPushyChannel: (state) => {
        return state.formData.pushy_channel;
     },
     fetchAppChannel: (state) => {
        return state.formData.app_channel;
     },

     fetchFilter: (state) => {
        return state.filter;
    },
    fetchData: (state) => {
        return state.datas;
    },


     //MODULE_NOTIFIER
    fetchModuleNotifierData: (state) => {
        return state.moduleNotifierDatas;
    },
    fetchModuleNotifierFilter: (state) => {
        return state.moduleNotifierFilter;
    },


}
const mutations = { 
    UPDATE_UNSUBSCRIBE(state,payload){
        state.unsubscribe[payload.type] = payload.value
    },
    UPDATE_D_MODULE(state,value){
        state.dependencies.module = value; 
    },
    UPDATE_MODULE_DEPENDENCY_FORM_DATA(state, payload) {
        const [key, value] = Object.entries(payload)[0];
        state.moduleDependencyFormData[key] = value.toLowerCase().trim();
    },
    UPDATE_EDIT_MODULE_DEPENDENCY_FORM_DATA(state, payload) {
        state.moduleDependencyFormData = {
          categories: payload.categories ?? "",
        };
    },
    CLEAR_MODULE_DEPENDENCY_FORM_DATA(state) {
        state.moduleDependencyFormData = {
          categories: "",
         
        };
    },

    UPDATE_NAME(state, value){
        state.formData.name = value;
    },
    UPDATE_ALT_NAME(state, value){
        state.formData.alt_name = value;
    },
    UPDATE_DESCRIPTION(state, value){
        state.formData.description = value;
    },
    UPDATE_CATEGORY(state, value){
        state.formData.category = value;
    },

    UPDATE_WHATZAPP_CHANNEL(state, value){
        state.formData.whatzapp_channel = value;
    },
    UPDATE_MAIL_CHANNEL(state, value){
        state.formData.mail_channel = value;
    },
    UPDATE_SLACK_CHANNEL(state, value){
        state.formData.slack_channel = value;
    },
    UPDATE_SMS_CHANNEL(state, value){
        state.formData.sms_channel = value;
    },
    UPDATE_APP_CHANNEL(state, value){
        state.formData.app_channel = value;
    },
    UPDATE_PUSHY_CHANNEL(state, value){
        state.formData.pushy_channel = value;
    },


    UPDATE_IS_LOADING(state, value){
        state.is_loading = value;
    },
    UPDATE_FILTER(state, value){
        state.filter = value;
    },
  
    UPDATE_EDIT_FORM_DATA(state, payload){
        state.formData = {
            name: payload.name ?? '',
            alt_name: payload.alt_name ?? '',
            description: payload.description ?? '',
            category:  payload.category ?? '',
            whatzapp_channel: payload.whatzapp_channel ?? '',
            mail_channel: payload.mail_channel ?? '',
            slack_channel: payload.slack_channel ?? '',
            sms_channel: payload.sms_channel ?? '',
            app_channel: payload.app_channel ?? false,
            pushy_channel: payload.pushy_channel ?? false,
        }
        state.id = payload.id;
    },
    UPDATE_DATA(state,value){
        state.datas = Object.assign([], value)
    },
   
    UPDATE_SKELETON(state, value){
        state.skeleton = value;
    },
    CLEAR_FORM_DATA(state){
        state.id = '';
        state.formData =  {
            name: '',
            alt_name: '',
            description: '',
            category: '',
            whatzapp_channel: '',
            mail_channel: '',
            slack_channel: '',
            sms_channel: '',
            app_channel: false,
            pushy_channel: false,
         };
    },

    
    //MODULE CATEGORY
    UPDATE_MODULE_NOTIFIER_FILTER(state, value){
        state.moduleNotifierFilter = value;
    },
    UPDATE_MODULE_NOTIFIER_DATA(state,value){
        state.moduleNotifierDatas = Object.assign([], value)
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
                'alt_name': 'required|notNull',
                'description': 'required|notNull',
                'category': 'required|notNull',
                'pushy_channel': 'required|notNull',
                'app_channel': 'required|notNull'
            });

            let module = new Module();
            await module.save(data);

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
            commit('UPDATE_SKELETON', false);
       })
       commit('UPDATE_UNSUBSCRIBE', { type: 'fetchModules', value: unsubscribe});
      
       
    },

    async fetchModuleDependency({ commit, state }) {
        let unsubscribe = await Module.fetchModuleDependency((module, err) => {
          if (err) {
            snackbar("warning", err.message);
            return;
          }
          console.log("modueeeeeeeee",module)
          commit("UPDATE_D_MODULE", module);
          commit("UPDATE_EDIT_MODULE_DEPENDENCY_FORM_DATA", module);
        });
        commit("UPDATE_UNSUBSCRIBE", {
          type: "fetchModuleDependency",
          value: unsubscribe
        });
    },

    
  async updateModuleDependency({ commit, state }, instance) {
    let data = state.moduleDependencyFormData;
    data.id = "modules";
    try {
      commit("UPDATE_IS_LOADING", true);

      new FlexValidators(data).check({
        categories: "required|notNull",
        id: "required|notNull"
      });

      await Module.updateModuleDependency(data);

      snackbar("success", "item updated successfully");
      commit("CLEAR_MODULE_DEPENDENCY_FORM_DATA");
      commit("UPDATE_IS_LOADING", false);
      instance.close();
    } catch (err) {
      snackbar("warning", err.message);
      commit("UPDATE_IS_LOADING", false);
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
                'alt_name': 'required|notNull',
                'description': 'required|notNull',
                'category': 'required|notNull',
                'pushy_channel': 'required|notNull',
                'app_channel': 'required|notNull',
                'id': 'required|notNull',
            });

        
            let module = new Module();
            await module.save(data);

            snackbar('success','item updated successfully')
            commit("CLEAR_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },




    async createModuleCategory({commit, state},instance){

        try{
            commit('UPDATE_IS_LOADING', true);
            let data = state.moduleCategoryFormData;
            delete data.id;
            new FlexValidators(data).check({
                'name': 'required|notNull',
                'description': 'required|notNull'
            });

            console.log(data);
            let moduleCategory = Module.saveModuleCategory(data);
            await moduleCategory.save();


            snackbar('success','item created successfully')
            commit("CLEAR_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

   

   


    //MODULE_NOTIFIER
    async searchModuleNotifier({commit,dispatch, state},value){
        console.log('inside life', value)
        if(value.length < 1){
            dispatch('fetchModuleNotifiers','initial');
            return ;
        }
        
        Module.searchModuleNotifier(value).then((datas) => {
            commit('UPDATE_MODULE_NOTIFIER_DATA',datas);
        }).catch(err => {
            snackbar('warning',err.message);
        });
    },

    async fetchModuleNotifiers({commit, state}, type){
        
        let unsubscribe = Module.fetchModuleNotifiers(type, (datas,err) => {
            if(err){ 
                snackbar('warning',err.message);
                commit('UPDATE_SKELETON', false);
                return;
            }
            commit('UPDATE_MODULE_NOTIFIER_DATA',datas);
            commit('UPDATE_SKELETON', false);
        })
        commit('UPDATE_UNSUBSCRIBE', { type: 'fetchModuleNotifiers', value: unsubscribe});
        
       
    },


    async clearAll({commit, state}){
        commit("CLEAR_FORM_DATA");
        commit("CLEAR_MODULE_DEPENDENCY_FORM_DATA");
        commit("UPDATE_DATA", []);
        //commit("UPDATE_IS_LOADING", false);
        commit("UPDATE_D_MODULE", {});
    },

    async unsubscribe({commit, state},instance){
        for(let x in state.unsubscribe){
            let endListener = await state.unsubscribe[x];
            endListener();
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

