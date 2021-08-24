import { moduleCollections, notifierCollectionGroups,  dependencyCollections, firebaseAuth, timestamp, fs } from '../boot/firebase'
import { purifyObject, generateUid } from '../repositories/pick';
import AlgoliaService from '../services/algolia_service';

let dataRef = null;
let data = [];


let moduleNotifierDataRef = null;
let moduleNotifierData = [];
class Module{
    constructor(){}

    //[ModuleDependency] => (Fetch)
    static async fetchModuleDependency(cb){
        return dependencyCollections.doc('modules').onSnapshot((querySnapshot) => {
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

    //[ModuleDependency] => (Update)
    static async updateModuleDependency(data){
        let id = data.id;
        delete data.id;
        data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;
        return dependencyCollections.doc(id).set(purifyObject(data),{ merge: true}).then((docRef) => {
            return docRef;
        }).catch(err => {
            throw err;
        });
    }

    fetch(type, cb){
        let ref;
        if(dataRef && type == 'next'){
            ref = moduleCollections.orderBy('createdAt','desc').startAfter(dataRef).limit(25);
        }else if(type == 'initial'){
            data = [];
            ref = moduleCollections.orderBy('createdAt','desc').limit(25);
        }

        return ref.onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            if(lastVisible){
                 dataRef = lastVisible;
            }
            
            // console.log('Last Visible', lastVisible)
            if(!querySnapshot.empty){
                data = [];
            }

            querySnapshot.forEach((doc) => {
                let ch = { ...doc.data() };
                ch.id = doc.id;
                data.push(ch);
                 
             });

             querySnapshot.docChanges().forEach((change) => {
                if(querySnapshot.empty && change.type === "removed"){
                    data = [];
                }
            });
             console.log(data,'yes ooo')
            return cb(data, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([],errMessage);
            
        }); 
        
    }

    async save(value){
       let data = value;

        if(!data.id){  //add
            console.log('add')
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            delete data.id;

            console.log(data, 'fffffffffffffffffffffffffffffffffffffffffffffffffff')

            var checkDuplicate = (await moduleCollections.doc(generateUid(data.name)).get()).exists;
            if(checkDuplicate){ throw new Error('Duplicate Data Entry') }
            await moduleCollections.doc(generateUid(data.name)).set(purifyObject(data)).then(()=> {
                return ;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            console.log('update')
            let id = data.id;
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;
            console.log(data, 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')

            return moduleCollections.doc(id).update(purifyObject(data)).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }
    }

    static async search(newValue){
        return new AlgoliaService("modules").search(newValue).then((result) => {
            return result;
        }).catch(err => {
            throw err;
        })
    }


    static async deleteById(id){
        let data = {};
        data.deletedAt = timestamp; data.deleter = firebaseAuth.currentUser.displayName;
        await moduleCollections.doc(id).update(data);

        return moduleCollections.doc(id).delete().then(() => {
            return ;
        }).catch(err => console.log(err));

    }





    /////////////////////



    //MODULE_NOTIFIER
    static fetchModuleNotifiers(type, cb){
        let ref;
        if(moduleNotifierDataRef && type == 'next'){
            ref =notifierCollectionGroups.where('ref','==','modules').orderBy('timestamp','desc').startAfter(moduleNotifierDataRef).limit(10);
        }else if(type == 'initial'){
            moduleNotifierData = [];
            ref = notifierCollectionGroups.where('ref','==','modules').orderBy('timestamp','desc').limit(10);
        }

        return ref.onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            if(lastVisible){
                 moduleNotifierDataRef = lastVisible;
            }
            
            // console.log('Last Visible', lastVisible)
            if(!querySnapshot.empty){
                moduleNotifierData = [];
            }

            querySnapshot.forEach((doc) => {
                let ch = { ...doc.data() };
                ch.id = doc.id;
                moduleNotifierData.push(ch);
                 
             });

             querySnapshot.docChanges().forEach((change) => {
                if(querySnapshot.empty && change.type === "removed"){
                    moduleNotifierData = [];
                }
            });
             console.log(moduleNotifierData,'moduleNotifier ooo')
            return cb(moduleNotifierData, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([],errMessage);
            
        }); 

       
    }
    static async searchModuleNotifier(newValue){
        return new AlgoliaService("module_notifiers").search(newValue).then((result) => {
            return result;
        }).catch(err => {
            throw err;
        })
    }



}


export default Module;