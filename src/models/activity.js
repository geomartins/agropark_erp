import { activityCollections } from '../boot/firebase'

class Activity{
    constructor(){}

    static fetch(cb){
        return activityCollections.orderBy('timestamp','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc) => {
                let ch = { ...doc.data() };
                ch.id = doc.id;
                data.push(ch);
                 
             });
            return cb(data,null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([], errMessage);
        });
    }

   
    static async deleteById(id){
        return activityCollections.doc(id).delete().then(()=> {
            return null;
        }).catch(err => {
            throw err;
        });
    }


}


export default Activity;