import { snackbar } from 'src/repositories/plugins';
import ExtensionNotifier from '../../models/extension_notifier'
const state = {
   unsubscribe: {},
   loading: false,
   skeleton: false,
   datas: []
   
}
const getters = { 
    fetchExtensionNotifierCount: (state) => {
        return state.datas.reduce(function(a,b){
            if(b.seen == false){
                return a+1;
            }else{
                return a+0;
            }
        },0);
    },
    fetchData: (state) => {
        return state.datas;
    },
}
const mutations = { 
    UPDATE_UNSUBSCRIBE(state,payload){
        state.unsubscribe[payload.type] = payload.value
    },
    UPDATE_DATA(state,value){
        state.datas = Object.assign([], value)
    },
    UPDATE_SKELETON(state, value){
        state.skeleton = value;
    }
 
}
const actions = {
    async fetch({commit, state}, type){
        if(state.datas.length < 1){
            commit('UPDATE_SKELETON', true);
        }
        let unsubscribe = new ExtensionNotifier().fetch(type,(datas,err) => {
            if(err){ 
                commit('UPDATE_SKELETON', false);
                snackbar('warning',err.message);
                return;
            }
            commit('UPDATE_DATA',datas);
            commit('UPDATE_SKELETON', false);
        })
        commit('UPDATE_UNSUBSCRIBE', { type: 'fetchExtensionNotifiers', value: unsubscribe});
       
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

