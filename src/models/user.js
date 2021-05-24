import { userCollections, configurationCollections, firebaseAuth, timestamp, fs } from '../boot/firebase'
import { purifyObject, generateUid } from '../repositories/pick';

class User{
    constructor(firstname, middlename, lastname,role, email, id = null){
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
        this.role = role;
        this.email = email;
        this.id = id;
    }

    async dependencies(cb){
        return configurationCollections.doc('roles').get().then(doc => {
            if(!doc.exists){
               return cb([])
            }        
            return cb(doc.data().ids);
        })
    }

    fetch(cb){
        return userCollections.orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
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
            data.visibility = true;
            delete data.id;
    
            return userCollections.add(purifyObject(data)).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            let id = data.id;
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;

            return userCollections.doc(id).update(purifyObject(data)).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }
    }


    static async deleteById(id){
        var ref = userCollections.doc(id);
        return fs.runTransaction(async (transaction) => {
            return transaction.get(ref).then((doc) => {
                if (!doc.exists) {
                    throw "Document does not exist!";
                }
                transaction.update(ref,  { deletedAt: timestamp, createdAt: null, deleter: firebaseAuth.currentUser.uid  });
                transaction.delete(ref);
            });
        }).then(() => {
            return ;
        }).catch((err) => {
            console.error(err);
        });

    }



}


export default User;