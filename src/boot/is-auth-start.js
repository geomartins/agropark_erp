import { firebaseAuth } from './firebase';
import { api, axios } from './axios';
export default async ({ app, router, store, Vue, urlPath, redirect }) => {
  
  firebaseAuth.onAuthStateChanged( async (user) => {
    
    if(user){
      let displayName = user.displayName ?? '';
      let avatar = user.photoURL;
      let role = (await user.getIdTokenResult()).claims.role;
      let modules = (await api.post('/modules', { role: role })).data ?? [];
      
      store.commit('admin_layout/UPDATE_MODULES', modules)
      store.commit('admin_layout/UPDATE_DISPLAY_NAME', displayName);
      store.commit('admin_layout/UPDATE_AVATAR', avatar);
      store.commit('admin_layout/UPDATE_ROLE', role);

      if(urlPath.includes('auth')){
        redirect('#/admin/dashboard');
      }
    }


    if(!user){
      store.commit('admin_layout/UPDATE_MODULES',[])
      store.commit('admin_layout/UPDATE_DISPLAY_NAME', '');
      store.commit('admin_layout/UPDATE_AVATAR', '');
      store.commit('admin_layout/UPDATE_ROLE', '');

      if(urlPath.includes('admin')){
         redirect('#/auth/login');
      }
    }

  })
 
}
