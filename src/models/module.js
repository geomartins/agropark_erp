import { moduleCollections, configurationCollections, firebaseAuth, timestamp, fs } from '../boot/firebase'
import { purifyObject, generateUid } from '../repositories/pick';

class Module{
    constructor(name, description, category, approval, id = null){
        this.name = name;
        this.description = description;
        this.category = category;
        this.approval = approval;
        this.id = id;
    }

    async dependencies(cb){
        return configurationCollections.doc('module_categories').get().then(doc => {
            if(!doc.exists){
               return cb([])
            }        
            return cb(doc.data().ids);
        })
    }

    fetch(cb){
        
        return moduleCollections.orderBy('createdAt','desc').onSnapshot({ includeMetadataChanges: true},(querySnapshot) => {
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

            var checkDuplicate = (await moduleCollections.doc(generateUid(data.name)).get()).exists;
            if(checkDuplicate){ throw new Error('Duplicate Data Entry') }
            await moduleCollections.doc(generateUid(data.name)).set(purifyObject(data)).then(()=> {
                return ;
            }).catch(err => {
                throw err;
            });

        }else{  //update
            let id = data.id;
            delete data.id;
            data.editor = firebaseAuth.currentUser.uid; data.editedAt = timestamp;

            return moduleCollections.doc(id).update(purifyObject(data)).then((docRef) => {
                return docRef;
            }).catch(err => {
                throw err;
            });
        }
    }


    static async deleteById(id){
        return moduleCollections.doc(id).delete().then(() => {
            return ;
        }).catch(err => console.log(err));

    }



}


export default Module;