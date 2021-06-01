import { roleCollections, firebaseAuth, timestamp, fs } from '../boot/firebase'
import { purifyObject, generateUid } from '../repositories/pick';

class Role{
    constructor(name, description, id = null){
        this.name = name;
        this.description = description;
        this.id = id;
    }

    fetch(cb){
        
        return roleCollections.orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc) => {
                let ch = { ...doc.data() };
                ch.id = doc.id;
                data.push(ch);
                 
             });
            return cb(data)
        },(err) => {
            throw err;
        });
    }

    async save(){
        let data = this;

        if(!this.id){  //add
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            delete data.id;
    
            return roleCollections.doc(generateUid(data.name)).set(purifyObject(data)).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });

        }
    }


    static async deleteById(id){
        return roleCollections.doc(id).delete().then(() => {
            return ;
        }).catch(err => console.log(err));
    }



}


export default Role;