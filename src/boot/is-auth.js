import { firebaseAuth } from './firebase';
export default async ({ app, router, Vue, urlPath, redirect }) => {
  

  // router.beforeEach((to, from, next) => {
  //   const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  //   const currentUser = firebaseAuth.currentUser;

  //   console.log(currentUser,'Cureent user')
  //   console.log(requiresAuth, 'Requires Auth')
  //   console.log(to.path)
  //   console.log('------------------')

  //   if (requiresAuth && !currentUser) {
  //     next('/auth/login')
  //   } else if (!requiresAuth && currentUser) {
  //     next('/admin/dashboard')
  //   } else {
  //     console.log('Am supposed to go to next')
  //     next()
  //   }
  // })


  
}
