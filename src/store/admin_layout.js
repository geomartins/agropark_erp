
import { fasGlobeAmericas, fasFlask } from '@quasar/extras/fontawesome-v5'
const state = {
    
        leftDrawerOpen: true,
        search: '',
        showAdvanced: false,
        showDateOptions: false,
       
        byDate: 'Any time',
        links1: [
          { icon: 'web', text: 'Top stories' },
          { icon: 'person', text: 'For you' },
          { icon: 'star_border', text: 'Favourites' },
          { icon: 'search', text: 'Saved searches' }
        ],
        links2: [
          { icon: 'flag', text: 'Canada' },
          { icon: fasGlobeAmericas, text: 'World' },
          { icon: 'place', text: 'Local' },
          { icon: 'domain', text: 'Business' },
          { icon: 'memory', text: 'Technology' },
          { icon: 'local_movies', text: 'Entertainment' },
          { icon: 'directions_bike', text: 'Sports' },
          { icon: fasFlask, text: 'Science' },
          { icon: 'fitness_center', text: 'Health ' }
        ],
        links3: [
          { icon: '', text: 'Language & region' },
          { icon: '', text: 'Settings' },
          { icon: 'open_in_new', text: 'Get the Android app' },
          { icon: 'open_in_new', text: 'Get the iOS app' },
          { icon: '', text: 'Send feedback' },
          { icon: 'open_in_new', text: 'Help' }
        ]
      

}
const getters = { 
   
    fetchLeftDrawerOpen: (state) => {
        return state.leftDrawerOpen;
    },

    fetchSearch: (state) => {
        return state.search;
    },
   
    
}
const mutations = {

    UPDATE_LEFT_DRAWER_OPEN(state, value){
        state.leftDrawerOpen = value;
    },
    UPDATE_SEARCH(state, value){
        state.search = value;
    },

   TOGGLE_LEFT_DRAWER(state){
        state.leftDrawerOpen = !state.leftDrawerOpen;
    },

}
const actions = {


   

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}

