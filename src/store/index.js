import Vue from 'vue'
import Vuex from 'vuex'
import login from './auth/login'
import password_reset from './auth/password_reset'
import password_confirmation from './auth/password_confirmation'
import admin_layout from './admin_layout'
import module_categories from './admin/module_categories'
import module_activities from './admin/module_activities'
import departments from './admin/departments';
import units from './admin/units';
import roles from './admin/roles'

// import example from './module-example'

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
    modules: {
      
      //auth
      login,
      password_reset,
      password_confirmation,
      admin_layout,
 
      //admin
      module_categories,
      module_activities,
      departments,
      units,
      roles,



    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
