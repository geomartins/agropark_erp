import { userCollections, configurationCollections, firebaseAuth, timestamp, fs } from '../boot/firebase'
import { purifyObject, generateUid } from '../repositories/pick';
import AlgoliaService from '../services/algolia_service';

let dataRef = null;
let data = [];
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

    fetch(type, cb){

            let ref;
            if(dataRef && type == 'next'){
                // console.log('Inside old data', dataRef)
                ref = userCollections.orderBy('createdAt','desc').startAfter(dataRef).limit(25);
            }else if(type == 'initial'){
                ref = userCollections.orderBy('createdAt','desc').limit(25);
            }

            return ref.onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
                var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                if(lastVisible){
                     dataRef = lastVisible;
                }
                if(!querySnapshot.empty){
                    data = [];
                }

                querySnapshot.forEach((doc) => {
                    let ch = { ...doc.data() };
                    ch.id = doc.id;
                    data.push(ch);
                     
                 });
                 console.log(data,'yes ooo')
                return cb(data, null)
            },(err) => {
                const errMessage = {message: err.code };
                return cb([],errMessage);
                
            }); 




       
    }

    async save(){
        let data = this;

        if(!this.id){  //add
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            data.visibility = true;
            data.device_tokens = []
            data.avatar = '';
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


    static async search(newValue){
        return new AlgoliaService("users").search(newValue).then((result) => {
            return result;
        }).catch(err => {
            throw err;
        })
    }


    static async deleteById(id){
        return userCollections.doc(id).delete().then(() => {
            return ;
        }).catch(err => console.log(err));
    }



}


export default User;