import { firebaseAuth } from './firebase';
export default async ({ app, router, Vue, urlPath, redirect }) => {

  firebaseAuth.onAuthStateChanged((user) => {
    if(!user){
      app = new Vue({
        //store,
        router,
        //i18n,
       // render: h => h(App)
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
