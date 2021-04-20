import { departmentCollections, firebaseAuth, timestamp } from '../boot/firebase'
import { purifyObject, generateUid } from '../repositories/pick';

class Department{
    constructor(name, description, id = null){
        this.name = name;
        this.description = description;
        this.id = id;
        this.author = firebaseAuth.currentUser ? firebaseAuth.currentUser.uid : null;
    }

    fetch(cb){
        
        return departmentCollections.orderBy('timestamp','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
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
            data.timestamp = timestamp;
            delete data.id;
    
            return departmentCollections.doc(generateUid(data.name)).set(purifyObject(data)).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            let id = data.id;
            delete data.id;
           
            return departmentCollections.doc(id).update(purifyObject(data)).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }
        
    }


    static async deleteById(id){
        return departmentCollections.doc(id).delete().then(()=> {
            return null;
        }).catch(err => {
            throw err;
        });
    }


}


export default Department;