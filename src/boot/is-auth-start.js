import { firebaseAuth } from './firebase';
import { setData,getData } from '../repositories/plugins'
import PushyService from 'src/services/pushy_service';
import FirestoreService from 'src/services/firestore_service';

export default async ({ app, router, store, Vue, urlPath, redirect }) => {
  
  firebaseAuth.onAuthStateChanged( async (user) => {
    
    if(user){
      
      let displayName = user.displayName ?? '';
      let avatar = user.photoURL;
      let token = await user.getIdToken();
      let role = (await user.getIdTokenResult()).claims.role;

      setData('token', token);
      setData('role', role)
      setData("uid", user.uid)
     

      ///////////////[PUSHER]///////////////////////
      let modules = (await new FirestoreService(token, role).fetchModuleRefs()).data ?? []
      let pushyService = new PushyService(token, role);
      await pushyService.register();
      await pushyService.listener();
      ///////////////////////////////////////////
      
      
      store.dispatch('module_notifiers/fetch', 'initial')
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
      setData('role', '');
      setData('uid', '')

      store.dispatch('module_notifiers/unsubscribe')

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
