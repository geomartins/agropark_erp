import { firebaseAuth } from './firebase';
export default async ({ app, router, store, Vue, urlPath, redirect }) => {
  // router.beforeEach((to, from, next) => {
  //   const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  //   const currentUser = firebaseAuth.currentUser;

  //   if (requiresAuth && !currentUser) {
  //     next('/auth/login')
  //   } else if (!requiresAuth && currentUser) {
  //     next('/admin/dashboard')
  //   } else {
  //     console.log('Am supposed to go to next')
  //     next()
  //   }
  // })

  router.beforeEach((to, from, next) => {
    if(to.name){
      store.dispatch(to.name+'/clearAll');
      store.dispatch(to.name+'/unsubscribe');
    }
    
    if(from.name){
      store.dispatch(to.name+'/clearAll');
      store.dispatch(to.name+'/unsubscribe');
    }
    store.commit('admin_layout/UPDATE_RIGHT_DRAWER_OPEN',false)
    next()
  })
  
}
