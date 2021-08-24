import { snackbar, confirm } from 'src/repositories/plugins';
import Domain from '../../models/domain'
import FlexValidators from 'src/repositories/flex_validators';
import SeedBank from 'src/models/seed_bank';
const state = {
   skeleton: false,
   is_loading: false,
   unsubscribe: {},

   //CROP_TYPES
   cropTypesFormData: {
      id: '',
      name: '',
      category: '',
      measurement: '',
      description: '',
      price: 0,
   },
   cropTypesDatas: [],

   //CROP_CATEGORIES
   cropCategoriesFormData: {
      id: '',
      name: '',
      measurement: '',
   },
   cropCategoriesDatas: [],

   //CROP_REQUESTS
   cropRequestsDatas: [],

   //CROP_INVENTORIES
   cropInventoriesDatas: [],


   dependencies: {
    measurements: ['unit','bundle','kg'],
    names: ['seeds','seedlings','mustard'],
    category: [],
  }

  
   
}
const getters = { 
    //CROP_TYPES
    fetchCropTypesName: (state) => {
        return state.cropTypesFormData.name;
    },
    fetchCropTypesCategory: (state) => {
        return state.cropTypesFormData.category;
    },
    fetchCropTypesDescription: (state) => {
        return state.cropTypesFormData.description;
    },
    fetchCropTypesPrice: (state) => {
        return state.cropTypesFormData.price;
    },
    fetchCropTypesData: (state) => {
        return state.cropTypesDatas;
    },


    //CROP_CATEGORIES
    fetchCropCategoriesName: (state) => {
        return state.cropCategoriesFormData.name;
    },
    fetchCropCategoriesMeasurement: (state) => {
        return state.cropCategoriesFormData.measurement;
    },

}
const mutations = { 
    UPDATE_SKELETON(state, value){
        state.skeleton = value;
    },
    UPDATE_IS_LOADING(state, value){
        state.is_loading = value;
    },
    UPDATE_UNSUBSCRIBE(state,payload){
        state.unsubscribe[payload.type] = payload.value
    },

    //CROP_TYPES
    UPDATE_CROP_TYPES_NAME(state, value){
        state.cropTypesFormData.name = value.trim().toLowerCase();
    },
    UPDATE_CROP_TYPES_DESCRIPTION(state, value){
        state.cropTypesFormData.description = value.trim().toLowerCase();
    },
    UPDATE_CROP_TYPES_CATEGORY(state, value){
        if(typeof value === "string"){
            state.cropTypesFormData.category = value.trim().toLowerCase();
        }else{
            state.cropTypesFormData.category = value.name;
            state.cropTypesFormData.measurement = value.measurement;
        }
       
    },
    UPDATE_CROP_TYPES_PRICE(state, value){
        state.cropTypesFormData.price = +value;
    },
    UPDATE_CROP_TYPES_DATA(state,value){
        state.cropTypesDatas = Object.assign([], value)
    },
    UPDATE_EDIT_CROP_TYPES_FORM_DATA(state, payload){
        state.cropTypesFormData.name = payload.name ?? '';
        state.cropTypesFormData.id = payload.id ?? '';
        state.cropTypesFormData.category = payload.category ?? '';
        state.cropTypesFormData.description = payload.description ?? '';
        state.cropTypesFormData.price = payload.price ?? 0;
        state.cropTypesFormData.measurement = payload.measurement ?? '';

    },
    CLEAR_CROP_TYPES_FORM_DATA(state){
        state.cropTypesFormData.name = '';
        state.cropTypesFormData.id = '';
        state.cropTypesFormData.category = '';
        state.cropTypesFormData.price = 0;
        state.cropTypesFormData.description = '';
        state.cropTypesFormData.measurement = '';
    },




    //CROP_CATEGORIES
    UPDATE_CROP_CATEGORIES_NAME(state, value){
        state.cropCategoriesFormData.name = value.trim().toLowerCase();
    },
    UPDATE_CROP_CATEGORIES_MEASUREMENT(state, value){
        state.cropCategoriesFormData.measurement = value.trim().toLowerCase();
    },
    UPDATE_CROP_CATEGORIES_DATA(state,value){
        state.cropCategoriesDatas = Object.assign([], value)
    },
    UPDATE_CROP_CATEGORIES_DATA(state,value){
        state.cropCategoriesDatas = Object.assign([], value)
    },
    UPDATE_EDIT_CROP_CATEGORIES_FORM_DATA(state, payload){
        state.cropCategoriesFormData.name = payload.name ?? '';
        state.cropCategoriesFormData.id = payload.id ?? '';
        state.cropCategoriesFormData.measurement = payload.measurement ?? '';
    },
    CLEAR_CROP_CATEGORIES_FORM_DATA(state){
        state.cropCategoriesFormData.name = '';
        state.cropCategoriesFormData.id = '';
        state.cropCategoriesFormData.measurement = '';
    },



    //CROP_REQUESTS
    UPDATE_CROP_REQUESTS_DATA(state,value){
        state.cropRequestsDatas = Object.assign([], value)
    },

     //CROP_INVENTORIES
     UPDATE_CROP_INVENTORIES_DATA(state,value){
        state.cropInventoriesDatas = Object.assign([], value)
    },


    //DEPENDENCY
    UPDATE_D_CATEGORIES(state, value){
        state.dependencies.categories = value;
    },

   
    


   
}
const actions = {

    //CROP_REQUESTS
    async fetchCropRequests({commit, state}, type){
        let unsubscribe = SeedBank.fetchCropRequests(type, (datas, err) => {
            if(err){ 
                snackbar('warning',err.message);
                return;
            }
            commit('UPDATE_CROP_REQUESTS_DATA',datas);
       })
       commit('UPDATE_UNSUBSCRIBE', { type: 'fetchCropRequests', value: unsubscribe});

       
    },


    //CROP_INVENTORIES
    async fetchCropInventories({commit, state}, type){
        
        let unsubscribe = SeedBank.fetchCropInventories(type, (datas, err) => {
            if(err){ 
                snackbar('warning',err.message);
                return;
            }
            commit('UPDATE_CROP_INVENTORIES_DATA',datas);
       })
       commit('UPDATE_UNSUBSCRIBE', { type: 'fetchCropInventories', value: unsubscribe});
    },


    //CROP_CATEGORIES
    async createCropCategory({commit, state},instance){
       
        try{
            commit('UPDATE_IS_LOADING', true);
            const data = state.cropCategoriesFormData;
            delete data.id;
    
            new FlexValidators(data).check({
                'name': 'required|notNull',
                'measurement': 'required|notNull',
            });

            await SeedBank.saveCropCategory(data);

            snackbar('success','item created successfully')
            commit("CLEAR_CROP_CATEGORIES_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

    async fetchCropCategories({commit, state}, type){
        // commit('UPDATE_SKELETON', true);
        let unsubscribe = SeedBank.fetchCropCategories(type,(datas, err) => {
            if(err){ 
                snackbar('warning',err.message);
                //commit('UPDATE_SKELETON', false);
                return;
            }
            commit('UPDATE_CROP_CATEGORIES_DATA',datas);
            commit('UPDATE_D_CATEGORIES', datas);
            //commit('UPDATE_SKELETON', false);
       })
       commit('UPDATE_UNSUBSCRIBE', { type: 'fetchCropCategories', value: unsubscribe});
    },

    async updateCropCategory(p){
        try{
            commit('UPDATE_IS_LOADING', true);
            const data = state.cropCategoriesFormData;
           
            new FlexValidators(data).check({
                'name': 'required|notNull',
                'id': 'required|notNull',
                'measurement': 'required|notNull',
            });

            await new SeedBank.saveCropCategory(data);

            snackbar('success','item updated successfully')
            commit("CLEAR_CROP_CATEGORIES_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
            
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

    async deleteCropCategory({commit, state},id){
        let x = (await confirm('Confirm','Would you like to delete the selected item?'));
        x.onOk(()=> {
            SeedBank.deleteCropCategoryById(id).then().catch(err => {
                snackbar('warning',err.message);
            });
        })
    },



    //CROP_TYPES
    async createCropType({commit, state},instance){
       
        try{
            commit('UPDATE_IS_LOADING', true);
            const data = state.cropTypesFormData;
            delete data.id;
    
            new FlexValidators(data).check({
                'name': 'required|notNull',
                'category': 'required|notNull',
                'price': 'required|notNull',
                'description': 'required|notNull',
                'measurement': 'required|notNull',
            });

            await SeedBank.saveCropType(data);

            snackbar('success','item created successfully')
            commit("CLEAR_CROP_TYPES_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

    async fetchCropTypes({commit, state}, type){
        commit('UPDATE_SKELETON', true);
        let unsubscribe = SeedBank.fetchCropTypes(type, (datas, err) => {
            if(err){ 
                snackbar('warning',err.message);
                commit('UPDATE_SKELETON', false);
                return;
            }
            commit('UPDATE_CROP_TYPES_DATA',datas);
            commit('UPDATE_SKELETON', false);
       })
       commit('UPDATE_UNSUBSCRIBE', { type: 'fetchCropTypes', value: unsubscribe});
    },

    async updateCropType({commit, state},instance){
        try{
            commit('UPDATE_IS_LOADING', true);
            const data = state.cropTypesFormData;
           
            new FlexValidators(data).check({
                'name': 'required|notNull',
                'id': 'required|notNull',
                'category': 'required|notNull',
                'price': 'required|notNull',
                'measurement': 'required|notNull',
                'description': 'required|notNull'

            });

            await new SeedBank.saveCropType(data);

            snackbar('success','item updated successfully')
            commit("CLEAR_CROP_TYPES_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
            
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
        
    },

    async deleteCropType({commit, state},id){
        let x = (await confirm('Confirm','Would you like to delete the selected item?'));
        x.onOk(()=> {
            SeedBank.deleteCropTypeById(id).then().catch(err => {
                snackbar('warning',err.message);
            });
        })
    },




    // async search({commit,dispatch, state},value){
    //     if(value.length < 1){
    //         dispatch('fetch','initial');
    //         return ;
    //     }
        
    //     Domain.search(value).then((datas) => {
    //         commit('UPDATE_DATA',datas);
    //     }).catch(err => {
    //         snackbar('warning',err.message);
    //     });
    // },

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

