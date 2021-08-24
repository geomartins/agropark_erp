import { roleCollections, firebaseAuth, timestamp, dependencyCollections, fs } from '../boot/firebase'
import { purifyObject, generateUid } from '../repositories/pick';
import AlgoliaService from '../services/algolia_service';

let dataRef = null;
let data = [];

class Role{
    constructor(name, description, id = null){
        this.name = name;
        this.description = description;
        this.id = id;
    }
    static async fetchRoleDependency(cb){
        return dependencyCollections.doc('roles').onSnapshot((querySnapshot) => {
            if(querySnapshot.exists){
               return cb(querySnapshot.data(), null);
            }else{
                return cb({}, null);
            }

        }, (err) => {
            const errMessage = {message: err.code };
            return cb({},errMessage);
        })
    }

    

    fetch(type, cb){

            let ref;
            if(dataRef && type == 'next'){
                // console.log('Inside old data', dataRef)
                ref = roleCollections.orderBy('createdAt','desc').startAfter(dataRef).limit(25);
            }else if(type == 'initial'){
                data = [];
                ref = roleCollections.orderBy('createdAt','desc').limit(25);
            }

            return ref.onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
                var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                if(lastVisible){
                     dataRef = lastVisible;
                }
                if(!querySnapshot.empty){
                    data = [];
                    querySnapshot.forEach((doc) => {
                        let ch = { ...doc.data() };
                        ch.id = doc.id;
                        data.push(ch);
                         
                    });
                }else{
                    console.log('No data available');
                }

                querySnapshot.docChanges().forEach((change) => {
                    if(querySnapshot.empty && change.type === "removed"){
                        data = [];
                    }
                });
                
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
            delete data.id;
            
            //fs.collection('roles').where('name','=','admin').

            var checkDuplicate = (await roleCollections.doc(generateUid(data.name)).get()).exists;
            if(checkDuplicate){ throw new Error('Duplicate Data Entry') }
            await roleCollections.doc(generateUid(data.name)).set(purifyObject(data)).then(()=> {
                return ;
            }).catch(err => {
                throw err;
            });

        }
    }

    static async search(newValue){
        return new AlgoliaService("roles").search(newValue).then((result) => {
            return result;
        }).catch(err => {
            throw err;
        })
    }


    static async deleteById(id){
        let data = {};
        data.deletedAt = timestamp; data.deleter = firebaseAuth.currentUser.displayName;
        await roleCollections.doc(id).update(data);

        return roleCollections.doc(id).delete().then(() => {
            return ;
        }).catch(err => console.log(err));
    }



}


export default Role;