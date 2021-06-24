import { extensionCategoryCollections, firebaseAuth, timestamp, fs } from '../boot/firebase'
import { purifyObject, generateUid } from '../repositories/pick';

class ExtensionCategory{
    constructor(name, description, id = null){
        this.name = name;
        this.description = description;
        this.id = id;
    }

    fetch(cb){
        
        return extensionCategoryCollections.orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc) => {
                let ch = { ...doc.data() };
                ch.id = doc.id;
                data.push(ch);
                 
             });
            return cb(data, null)
        },(err) => {
            const errMessage = {message: err.code };
            return cb([], errMessage);
        });
    }

    async save(){
        let data = this;

        if(!this.id){  //add
            data.createdAt = timestamp; data.creator = firebaseAuth.currentUser.uid;
            data.deletedAt = null; data.editedAt = null; //default
            delete data.id;

            var checkDuplicate = (await extensionCategoryCollections.doc(generateUid(data.name)).get()).exists;
            if(checkDuplicate){ throw new Error('Duplicate Data Entry') }
            await extensionCategoryCollections.doc(generateUid(data.name)).set(purifyObject(data)).then(()=> {
                return ;
            }).catch(err => {
                throw err;
            });


        }else{  //update
            let id = data.id;
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;

            return extensionCategoryCollections.doc(id).update(purifyObject(data)).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }
    }


    static async deleteById(id){
        return extensionCategoryCollections.doc(id).delete().then(() => {
            return ;
        }).catch(err => console.log(err));
    }



}


export default ExtensionCategory;