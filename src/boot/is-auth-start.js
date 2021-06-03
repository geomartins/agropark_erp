import { firebaseAuth } from './firebase';
import { api, axios } from './axios';
export default async ({ app, router, store, Vue, urlPath, redirect }) => {

  firebaseAuth.onAuthStateChanged((user) => {
   user.getIdTokenResult().then(result => {
      if(result.claims.role == 'admin'){
        api.get('/login').then(result => {
          store.commit('admin_layout/UPDATE_MODULES', result.data)
        })
      }
      return result.claims.role;
    });

    if(!user){
      app = new Vue({
        store,
        router,
        //i18n,
        render: h => h(app)
      })
    }

  })

  
  // if(urlPath){
  //   console.log(urlPath,'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
  //   urlPath = urlPath.replace('#/','');
  //   firebaseAuth.onAuthStateChanged((user) => {
  //       if(!user){ //if not authenticated
  //         if(urlPath != '/' || urlPath != '/auth/login' || urlPath != '/auth/password_reset' || !urlPath.contain('password_confirmation')){ //if url is not login,welcome or register page
  //           redirect('#/auth/login');
            
  //         }
  //       }else{
  //         //if authenticated
  //         if(urlPath == '/' || urlPath == '/auth/login' || urlPath == '/auth/password_reset' || urlPath.contain('password_confirmation')){
  //           redirect('#/admin/dashboard');
  //         }
  //       }
    
  //   })
  // }
 
}
