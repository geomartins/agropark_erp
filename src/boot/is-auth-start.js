import { firebaseAuth } from './firebase';
import { api, axios } from './axios';
import { setData } from '../repositories/plugins'
import PushyService from 'src/services/pushy_service';

export default async ({ app, router, store, Vue, urlPath, redirect }) => {
  
  firebaseAuth.onAuthStateChanged( async (user) => {
    
    if(user){
      
      let displayName = user.displayName ?? '';
      let avatar = user.photoURL;
      let token = await user.getIdToken();
      let role = (await user.getIdTokenResult()).claims.role;

      let modules = (await api.post('/modules', { role: role }, {
        headers: { 
          Authorization: `Bearer ${token}`
        }
      })).data ?? [];

      //////////////////////////////////////

      let pushyService = new PushyService(token);
      await pushyService.register();
      await pushyService.listener();
      ///////////////////////////////////////////
      
      setData('token', token);
      store.commit('admin_layout/UPDATE_MODULES', modules)
      store.commit('admin_layout/UPDATE_DISPLAY_NAME', displayName);
      store.commit('admin_layout/UPDATE_AVATAR', avatar);
      store.commit('admin_layout/UPDATE_ROLE', role);

      if(urlPath.includes('auth')){
        redirect('#/admin/dashboard');
      }
    }


    if(!user){
      setData('token', '');
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
