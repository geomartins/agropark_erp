import { extensionCollections, configurationCollections, firebaseAuth, timestamp, fs } from '../boot/firebase'
import { purifyObject, generateUid } from '../repositories/pick';
import AlgoliaService from '../services/algolia_service';

let dataRef = null;
let data = [];
class Extension{
    constructor(name, description, category, id = null){
        this.name = name;
        this.description = description;
        this.category = category;
        this.id = id;
    }

    async dependencies(cb){
        return configurationCollections.doc('extension_categories').get().then(doc => {
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
            ref = extensionCollections.orderBy('createdAt','desc').startAfter(dataRef).limit(25);
        }else if(type == 'initial'){
            ref = extensionCollections.orderBy('createdAt','desc').limit(25);
        }

        return ref.onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            if(lastVisible){
                 dataRef = lastVisible;
            }
            console.log('Last Visible', lastVisible)
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
            delete data.id;

            var checkDuplicate = (await extensionCollections.doc(generateUid(data.name)).get()).exists;
            if(checkDuplicate){ throw new Error('Duplicate Data Entry') }
            await extensionCollections.doc(generateUid(data.name)).set(purifyObject(data)).then(()=> {
                return ;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            let id = data.id;
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;

            return extensionCollections.doc(id).update(purifyObject(data)).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }
    }

    static async search(newValue){
        return new AlgoliaService("extensions").search(newValue).then((result) => {
            return result;
        }).catch(err => {
            throw err;
        })
    }


    static async deleteById(id){
        return extensionCollections.doc(id).delete().then(() => {
            return ;
        }).catch(err => console.log(err));

    }



}


export default Extension;