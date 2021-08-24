import Vue from 'vue'
import Vuex from 'vuex'
import login from './auth/login'
import password_reset from './auth/password_reset'
import password_confirmation from './auth/password_confirmation'
import admin_layout from './admin_layout'
import module_notifiers from './admin/module_notifiers'
import extension_notifiers from './admin/extension_notifiers'
import seed_banks from './admin/seed_banks'
import seed_bank_details from './admin/seed_bank_details'
import domains from './admin/domains';
import roles from './admin/roles'
import modules from './admin/modules'
import users from './admin/users'
import users_details from './admin/users_details'
import roles_details from './admin/roles_details'
import utilities from './admin/utilities'
// import example from './module-example'

import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({
  encodingType: "aes",
  isCompression: false,
});

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    plugins: [
      // createPersistedState({
      //   storage: {
      //     getItem: key => ls.get(key),
      //     setItem: (key, value) => ls.set(key, value),
      //     removeItem: key => ls.remove(key)
      //   }
      // })
    ],
    modules: {
      
      //auth
      login,
      password_reset,
      password_confirmation,
      admin_layout,
 
      //admin
      module_notifiers,
      extension_notifiers,
      domains,
      modules,
      
      roles,
      roles_details,

      users,
      users_details,

      seed_banks,
      seed_bank_details,

      utilities,
      



    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
