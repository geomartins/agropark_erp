
import SeedBankDetail from "../../models/seed_bank_detail";
import { snackbar, confirm } from 'src/repositories/plugins';
import FlexValidators from "src/repositories/flex_validators";

const state = {
    is_loading: false,
    skeleton: false,
    unsubscribe: {},


    //DOC
    docId: '',
    docFormData: {
        id: '',
        name: '',
        category: '',
        measurement: '',
        price: 0,
        inventory_refs: {}
    },
    

    //INVENTORY
    inventory_is_loading: false,
    inventoryFormData: {
        id: '',
        type: '',
        quantity: 0,
    },
    inventoryDatas: [],


    //REQUEST
    request_is_loading: false,
    requestDatas: [],

    //OTHERS
    dependencies: {
        
    }
}
const getters = {
    //INVENTORY
    fetchInventoryType: (state) => {
        return state.inventoryFormData.type;
    },
    fetchInventoryQuantity: (state) => {
        return state.inventoryFormData.quantity;
    },



}
const mutations = {
    //DOC
    UPDATE_DOC_ID(state, value){
        state.docId = value;
    },
    UPDATE_DOC_DATA(state, value){
        state.docFormData.id = value.id ?? '';
        state.docFormData.name = value.name ?? '';
        state.docFormData.category = value.category ?? '';
        state.docFormData.measurement = value.measurement ?? '';
        state.docFormData.price = value.price ?? 0;
        state.docFormData.description = value.description ?? '';
        state.docFormData.inventory_refs = value.inventory_refs ?? {};
    },
    CLEAR_DOC_FORM_DATA(state){
        state.docFormData = Object.assign({
            id: '',
            name: '',
            category: '',
            measurement: '',
            price: 0,
            description: '',
            inventory_refs: ''
         })

    },

    //INVENTORY
    UPDATE_INVENTORY_FORM_DATA(state, value){
        state.inventoryFormData.id = value.id ?? '';
        state.inventoryFormData.type = value.type ?? '';
        state.inventoryFormData.quantity = +value.quantity ?? 0;
    },
    UPDATE_INVENTORY_DATAS(state,value){
        state.inventoryDatas = Object.assign([], value)
    },
    UPDATE_INVENTORY_TYPE(state, value){
        state.inventoryFormData.type = value;
    },
    UPDATE_INVENTORY_QUANTITY(state, value){
        state.inventoryFormData.quantity = +value;
    },
    UPDATE_INVENTORY_IS_LOADING(state, value){
        state.inventory_is_loading = value;
    },
    CLEAR_INVENTORY_FORM_DATA(state){
        state.inventoryFormData = Object.assign({
            id: '',
            quantity: 0,
            type: ''
         })
    },


    //REQUEST
    UPDATE_REQUEST_DATAS(state,value){
        state.requestDatas = Object.assign([], value)
    },
    UPDATE_REQUEST_IS_LOADING(state, value){
        state.request_is_loading = value;
    },



    //OTHERS
    UPDATE_IS_LOADING(state, value){
        state.is_loading = value;
    },
    UPDATE_UNSUBSCRIBE(state,payload){
        state.unsubscribe[payload.type] = payload.value
    },
   
    //DEPENDENCY
    // UPDATE_D_MODULES(state, value){
    //     state.dependencies.modules = value;
    // },

    
    //
    UPDATE_SKELETON(state, value){
        state.skeleton = value;
    }




   

}
const actions = {

    async fetchDoc({ commit, state}){
        commit('UPDATE_SKELETON', true);
        let unsubscribe = new SeedBankDetail(state.docId).fetchDoc((data,err) => {
            if(err){ 
                snackbar('warning',err.message);
                commit('UPDATE_SKELETON', false);
                return;
            }
            commit('UPDATE_DOC_DATA',data);
            commit('UPDATE_SKELETON', false);
        })
        commit('UPDATE_UNSUBSCRIBE', { type: 'fetchDoc', value: unsubscribe});
    },

    //INVENTORIES
    async fetchInventories({commit, state}, type){

        commit('UPDATE_INVENTORY_IS_LOADING', true);
        let unsubscribe = new SeedBankDetail(state.docId).fetchInventories(type,(datas,err) => {
            if(err){ 
                snackbar('warning',err.message);
                commit('UPDATE_INVENTORY_IS_LOADING', false);
                return;
            }
            commit('UPDATE_INVENTORY_DATAS',datas);
            commit('UPDATE_INVENTORY_IS_LOADING', false);
        })
        commit('UPDATE_UNSUBSCRIBE', { type: 'fetchInventories', value: unsubscribe});
        
      
    },

    async createInventory({commit, state},instance){
        try{
            commit('UPDATE_IS_LOADING', true);

            const data = state.inventoryFormData;
            delete data.id;
            
            new FlexValidators(data).check({
                'quantity': 'required|notNull',
                'type': 'required|notNull',
            });
            
            let seedBankDetail = new SeedBankDetail(state.docId);
            await seedBankDetail.saveInventory(data);
           
            snackbar('success','item updated successfully')
            commit("CLEAR_INVENTORY_FORM_DATA");
            commit('UPDATE_IS_LOADING', false);
            instance.close();
        }catch(err){
            snackbar('warning',err.message);
            commit('UPDATE_IS_LOADING', false);
        }
    },





     //INVENTORIES
     async fetchRequests({commit, state}, type){
        commit('UPDATE_REQUEST_IS_LOADING', true);
        let unsubscribe = new SeedBankDetail(state.docId).fetchRequests(type,(datas,err) => {
            if(err){ 
                snackbar('warning',err.message);
                commit('UPDATE_REQUEST_IS_LOADING', false);
                return;
            }
            commit('UPDATE_REQUEST_DATAS',datas);
            commit('UPDATE_REQUEST_IS_LOADING', false);
        })
        commit('UPDATE_UNSUBSCRIBE', { type: 'fetchRequests', value: unsubscribe});
        
      
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
    actions
}