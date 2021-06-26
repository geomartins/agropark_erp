
import Pushy from 'pushy-sdk-web';
import { fcmSnackbar, getData } from '../repositories/plugins'
import FirestoreService from './firestore_service';
class PushyService{
    constructor(token = null, role = null){
        this.token = token ?? getData('token');
        this.role = role ?? getData('role')
    }

    async register(){
        // Register visitor's browser for push notifications
        return Pushy.register({ appId: '60d3d019be50e00f1b8f5924' }).then((deviceToken) =>{
            console.log('Pushy device token: ' + deviceToken);
            return new FirestoreService().subscribeDevice(deviceToken);
        }).then(response => {
            console.log(response,'yeeeeeeeeeee')
        }).catch(function (err) {
            console.log(err);
        });

    }

    async listener(){
        return Pushy.setNotificationListener(function (data) {
            // Print notification payload data
            console.log('Received notification: ' + JSON.stringify(data));
            // Attempt to extract the "message" property from the payload: {"message":"Hello World!"}
            let title = data.title || "No title";
            let message = data.message || 'No message';
            fcmSnackbar(title,message)
            // Display an alert with message sent from server
            //alert('Received notification 3: ' + message);
        });

    }

   

   

          

  
  
 
    
}

export default PushyService;