import { api } from '../boot/axios'
import { getData } from '../repositories/plugins'
class FirestoreService{
    constructor(token = null, role = null){
        this.token = token ?? getData('token');
        this.role = role ?? getData('role')
    }

    async moduleNotifierCleaner(module_name){
        return api.post('/module_notifier_cleaner', { module_name: module_name, role: this.role }, { headers: { Authorization: `Bearer ${this.token}`}})
    }

    async extensionNotifierCleaner(extension_name){
        return api.post('/module_notifier_cleaner', { extension_name: extension_name }, { headers: { Authorization: `Bearer ${this.token}`}})
    }

    async subscribeDevice(deviceToken){
        return api.post('/subscribe', { deviceToken: deviceToken }, { headers: { Authorization: `Bearer ${this.token}`}})
    }

    async fetchModuleRefs(){
        return api.post('/modules', { role: this.role }, {
            headers: { 
              Authorization: `Bearer ${this.token}`
            }
          })
    }
}

export default FirestoreService;