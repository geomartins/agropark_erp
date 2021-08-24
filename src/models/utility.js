import { feedbackCollections, firebaseAuth, timestamp } from '../boot/firebase'
import { purifyObject, generateUid } from '../repositories/pick';
class Utility{
    constructor(){
        
    }

    static async saveFeedback(obj){
        let data = obj;
        data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
        data.deletedAt = null; data.editedAt = null; //default

        await feedbackCollections.add(purifyObject(data)).then(()=> {
            return ;
        }).catch(err => {
            throw err;
        });

       
    }

}

export default Utility;