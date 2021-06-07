import { moduleActivityCollections } from '../boot/firebase'

class ModuleActivity{
    constructor(){}

    static fetch(cb){
        return moduleActivityCollections.orderBy('timestamp','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
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
        return moduleActivityCollections.doc(id).delete().then(()=> {
            return null;
        }).catch(err => {
            throw err;
        });
    }


}


export default ModuleActivity;